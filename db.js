/* =====================================================================
   데이터 연결 계층 — Supabase(실제) / 데모(이 브라우저 안) 두 가지를 같은 방식으로 씁니다.
   ===================================================================== */
(function () {
  const cfg = window.EXAM_CONFIG || {};
  const LIVE = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  const nowISO = () => new Date().toISOString();
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }));

  /* ------------------------------------------------------------------ */
  /*  Supabase                                                           */
  /* ------------------------------------------------------------------ */
  function makeLive() {
    const sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: 'exam-auth-' + (location.pathname.includes('teacher') ? 't' : 's') },
      realtime: { params: { eventsPerSecond: 20 } }
    });
    const must = ({ data, error }) => { if (error) throw error; return data; };

    return {
      mode: 'live', client: sb,

      /* ---------- 학생 ---------- */
      async ensureStudentAuth() {
        const { data: { session } } = await sb.auth.getSession();
        if (session) return session.user;
        const res = await sb.auth.signInAnonymously();
        if (res.error) throw res.error;
        return res.data.user;
      },
      async findMyStudent(unit) {
        const { data: { session } } = await sb.auth.getSession();
        if (!session) return null;
        const rows = must(await sb.from('exam_students').select('*')
          .eq('user_id', session.user.id).eq('unit', unit).limit(1));
        return rows[0] || null;
      },
      async startStudent(info) {
        let user = await this.ensureStudentAuth();
        // 같은 기기를 다른 학생이 이어 쓰는 경우: 앞 학생 기록을 덮어쓰지 않도록 새 익명 계정을 만듭니다
        const prev = await this.findMyStudent(info.unit);
        if (prev && String(prev.student_no) !== String(info.student_no)) {
          await sb.auth.signOut({ scope: 'local' });
          const res = await sb.auth.signInAnonymously(); if (res.error) throw res.error; user = res.data.user;
        }
        const row = {
          user_id: user.id, unit: info.unit, student_no: info.student_no, name: info.name,
          device: info.device, user_agent: info.user_agent, last_seen: nowISO()
        };
        return must(await sb.from('exam_students').upsert(row, { onConflict: 'user_id,unit' }).select().single());
      },
      async loadMyAnswers(sid) {
        return must(await sb.from('exam_answers').select('*').eq('student_id', sid));
      },
      async saveAnswer(sid, qno, patch) {
        const row = Object.assign({ student_id: sid, qno }, patch);
        must(await sb.from('exam_answers').upsert(row, { onConflict: 'student_id,qno' }));
      },
      async logEvent(sid, type, detail) {
        must(await sb.from('exam_events').insert({ student_id: sid, type, detail: detail || {} }));
      },
      async heartbeat(sid, currentQ) {
        must(await sb.from('exam_students').update({ last_seen: nowISO(), current_q: currentQ }).eq('id', sid));
      },
      async submit(sid) {
        return must(await sb.from('exam_students').update({ submitted_at: nowISO(), last_seen: nowISO() }).eq('id', sid).select().single());
      },
      async signOutStudent() { await sb.auth.signOut(); },

      /* ---------- 교사 ---------- */
      async teacherSession() {
        const { data: { session } } = await sb.auth.getSession();
        if (!session || session.user.is_anonymous) return null;
        const ok = must(await sb.rpc('exam_is_teacher'));
        return ok ? session.user : { notTeacher: true, email: session.user.email };
      },
      async teacherLogin(email, password) {
        const res = await sb.auth.signInWithPassword({ email, password });
        if (res.error) throw res.error;
        return this.teacherSession();
      },
      async teacherLogout() { await sb.auth.signOut(); },
      async loadUnit(unit) {
        const students = must(await sb.from('exam_students').select('*').eq('unit', unit).order('student_no'));
        const ids = students.map(s => s.id);
        let answers = [], events = [], grades = [];
        if (ids.length) {
          const chunks = []; for (let i = 0; i < ids.length; i += 150) chunks.push(ids.slice(i, i + 150));
          for (const c of chunks) {
            answers = answers.concat(must(await sb.from('exam_answers').select('*').in('student_id', c)));
            events = events.concat(must(await sb.from('exam_events').select('*').in('student_id', c).order('created_at').limit(5000)));
            grades = grades.concat(must(await sb.from('exam_grades').select('*').in('student_id', c)));
          }
        }
        const keys = must(await sb.from('exam_keys').select('*').eq('unit', unit));
        return { students, answers, events, grades, keys };
      },
      subscribe(handler) {
        const ch = sb.channel('exam-teacher');
        ['exam_students', 'exam_answers', 'exam_events', 'exam_grades'].forEach(t => {
          ch.on('postgres_changes', { event: '*', schema: 'public', table: t },
            p => handler({ table: t, type: p.eventType, row: p.new && Object.keys(p.new).length ? p.new : p.old }));
        });
        ch.subscribe(status => handler({ table: '_status', type: status }));
        return () => sb.removeChannel(ch);
      },
      async setGrade(sid, qno, mark) {
        if (!mark) must(await sb.from('exam_grades').delete().eq('student_id', sid).eq('qno', qno));
        else must(await sb.from('exam_grades').upsert({ student_id: sid, qno, mark, graded_at: nowISO() }, { onConflict: 'student_id,qno' }));
      },
      async reopen(sid) { must(await sb.from('exam_students').update({ submitted_at: null }).eq('id', sid)); },
      async removeStudent(sid) { must(await sb.from('exam_students').delete().eq('id', sid)); }
    };
  }

  /* ------------------------------------------------------------------ */
  /*  데모 모드 : localStorage + BroadcastChannel (같은 브라우저 안에서만)   */
  /* ------------------------------------------------------------------ */
  function makeDemo() {
    const KEY = 'exam-demo-db-v1';
    const ME = 'exam-demo-me-v1';
    const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { students: [], answers: [], events: [], grades: [] }; } catch (e) { return { students: [], answers: [], events: [], grades: [] }; } };
    const write = db => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { console.warn(e); } };
    let bc = null; try { bc = new BroadcastChannel('exam-demo'); } catch (e) {}
    const listeners = [];
    const emit = msg => { listeners.forEach(f => f(msg)); if (bc) bc.postMessage(msg); };
    if (bc) bc.onmessage = e => listeners.forEach(f => f(e.data));
    if (!bc) window.addEventListener('storage', e => { if (e.key === KEY) listeners.forEach(f => f({ table: '_reload', type: 'storage' })); });
    const myUid = () => { let u = localStorage.getItem(ME); if (!u) { u = uuid(); localStorage.setItem(ME, u); } return u; };

    return {
      mode: 'demo',
      async ensureStudentAuth() { return { id: myUid() }; },
      async findMyStudent(unit) { return read().students.find(s => s.user_id === myUid() && s.unit === unit) || null; },
      async startStudent(info) {
        const db0 = read(); const p0 = db0.students.find(x => x.user_id === myUid() && x.unit === info.unit);
        if (p0 && String(p0.student_no) !== String(info.student_no)) localStorage.removeItem(ME);
        const db = read(); const uid = myUid();
        let s = db.students.find(x => x.user_id === uid && x.unit === info.unit);
        if (!s) { s = { id: uuid(), user_id: uid, unit: info.unit, first_seen: nowISO(), submitted_at: null, current_q: 1 }; db.students.push(s); }
        Object.assign(s, { student_no: info.student_no, name: info.name, device: info.device, user_agent: info.user_agent, last_seen: nowISO() });
        write(db); emit({ table: 'exam_students', type: 'UPDATE', row: s }); return s;
      },
      async loadMyAnswers(sid) { return read().answers.filter(a => a.student_id === sid); },
      async saveAnswer(sid, qno, patch) {
        const db = read(); const s = db.students.find(x => x.id === sid);
        if (s && s.submitted_at) throw new Error('이미 제출했습니다');
        let a = db.answers.find(x => x.student_id === sid && x.qno === qno);
        if (!a) { a = { student_id: sid, qno, final_answer: '', typed: '', strokes: [], pad_height: 600, mode: 'type', hint_level: 0 }; db.answers.push(a); }
        Object.assign(a, patch, { updated_at: nowISO() }); write(db); emit({ table: 'exam_answers', type: 'UPDATE', row: a });
      },
      async logEvent(sid, type, detail) {
        const db = read(); const ev = { id: Date.now() + Math.random(), student_id: sid, type, detail: detail || {}, created_at: nowISO() };
        db.events.push(ev); if (db.events.length > 4000) db.events = db.events.slice(-4000);
        write(db); emit({ table: 'exam_events', type: 'INSERT', row: ev });
      },
      async heartbeat(sid, currentQ) {
        const db = read(); const s = db.students.find(x => x.id === sid); if (!s) return;
        s.last_seen = nowISO(); s.current_q = currentQ; write(db); emit({ table: 'exam_students', type: 'UPDATE', row: s });
      },
      async submit(sid) {
        const db = read(); const s = db.students.find(x => x.id === sid);
        s.submitted_at = nowISO(); s.last_seen = nowISO(); write(db); emit({ table: 'exam_students', type: 'UPDATE', row: s }); return s;
      },
      async signOutStudent() { localStorage.removeItem(ME); },

      async teacherSession() { return { email: '데모 교사' }; },
      async teacherLogin() { return { email: '데모 교사' }; },
      async teacherLogout() {},
      async loadUnit(unit) {
        const db = read(); const students = db.students.filter(s => s.unit === unit).sort((a, b) => String(a.student_no).localeCompare(String(b.student_no)));
        const ids = new Set(students.map(s => s.id));
        return { students, answers: db.answers.filter(a => ids.has(a.student_id)), events: db.events.filter(e => ids.has(e.student_id)),
                 grades: db.grades.filter(g => ids.has(g.student_id)), keys: [] };
      },
      subscribe(handler) { listeners.push(handler); setTimeout(() => handler({ table: '_status', type: 'SUBSCRIBED' }), 50); return () => {}; },
      async setGrade(sid, qno, mark) {
        const db = read(); db.grades = db.grades.filter(g => !(g.student_id === sid && g.qno === qno));
        if (mark) db.grades.push({ student_id: sid, qno, mark, graded_at: nowISO() });
        write(db); emit({ table: 'exam_grades', type: 'UPDATE', row: { student_id: sid, qno, mark } });
      },
      async reopen(sid) { const db = read(); const s = db.students.find(x => x.id === sid); s.submitted_at = null; write(db); emit({ table: 'exam_students', type: 'UPDATE', row: s }); },
      async removeStudent(sid) {
        const db = read(); db.students = db.students.filter(s => s.id !== sid); db.answers = db.answers.filter(a => a.student_id !== sid);
        db.events = db.events.filter(e => e.student_id !== sid); db.grades = db.grades.filter(g => g.student_id !== sid);
        write(db); emit({ table: '_reload', type: 'DELETE' });
      }
    };
  }

  window.ExamDB = LIVE ? makeLive() : makeDemo();
})();
