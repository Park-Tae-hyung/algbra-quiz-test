/* =====================================================================
   설정 파일 — 이 파일 하나만 고치면 학생 화면과 교사 화면이 모두 연결됩니다.

   1) Supabase 대시보드 → Project Settings → API 에서 두 값을 복사해 붙여 넣으세요.
      - Project URL        →  SUPABASE_URL
      - anon public key    →  SUPABASE_ANON_KEY   (‘service_role’ 키는 절대 넣지 마세요!)
   2) 두 값을 비워 두면 ‘데모 모드’로 동작합니다.
      (서버 없이 이 컴퓨터 안에서만 저장 — 화면 미리보기와 연습용)
   ===================================================================== */
window.EXAM_CONFIG = {
  SUPABASE_URL: 'https://tntywsmcdnxtqrejawbh.supabase.co',          // 예: 'https://abcdefghijkl.supabase.co'
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRudHl3c21jZG54dHFyZWphd2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwMDA1NDAsImV4cCI6MjEwODU3NjU0MH0.d7aXbEOQDNO9rWLQzjL7iq31xZHgiLkcTO4PLLEe2ro',     // 예: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....'

  SCHOOL_NAME: '',           // 예: 'OO고등학교' (문제지 머리에 표시)
  COURSE_NAME: '고급 대수',

  STUDENT_NO_PATTERN: '^[0-9]{4,6}$',   // 학번 형식 (숫자 4~6자리)
  ONLINE_SECONDS: 50                     // 마지막 신호 후 이 시간(초) 안이면 ‘접속 중’
};
