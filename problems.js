/* =====================================================================
   고급 대수 단원평가 — 문항 · 개념 · 힌트
   (정답은 이 파일에 없습니다. 정답표는 Supabase의 exam_keys 표에만 있고
    교사 로그인 후 교사 화면에서만 보입니다.)
   ===================================================================== */
const R = String.raw;
window.EXAM = {
  title: '고급 대수 단원평가',
  units: {
    1: {
      name: 'Ⅰ. 벡터공간',
      range: '교과서 pp.10–57',
      intro: '벡터의 연산, 부분공간, 일차독립, 기저, 내적과 정사영',
      questions: [
        {
          no: 1, level: '하', topic: '벡터의 상등', ref: 'p.12 문제 1',
          text: R`두 벡터 \(\vec u=(6,\ a-b,\ 8,\ 2)\), \(\vec w=(2c,\ 1,\ a+b+c,\ 2)\)에 대하여 \(\vec u=\vec w\)일 때, 실수 \(a,\ b,\ c\)의 값을 각각 구하시오.`,
          concept: R`두 \(n\)차원 벡터가 <b>같다</b>는 것은 <b>대응하는 성분이 모두 같다</b>는 뜻입니다.
$$\vec u=\vec w\iff u_i=w_i\quad(i=1,\dots,n)$$`,
          hints: [
            R`성분끼리 등식을 세웁니다: \(6=2c,\quad a-b=1,\quad 8=a+b+c\)`,
            R`첫째 식에서 \(c=3\). 셋째 식에 넣으면 \(a+b=5\). 이제 \(a-b=1\)과 연립하세요.`
          ],
          answerGuide: '예: a = ?, b = ?, c = ?'
        },
        {
          no: 2, level: '하', topic: '벡터의 연산', ref: 'p.18 문제 3',
          text: R`두 벡터 \(\vec u=(1,\ 0,\ 2,\ -1)\), \(\vec v=(2,\ 1,\ -1,\ 3)\)에 대하여 $$3\vec u-2\vec x=\vec u+4\vec v$$ 를 만족시키는 벡터 \(\vec x\)를 구하시오.`,
          concept: R`벡터의 덧셈과 실수배는 <b>성분별로</b> 계산하며, 일차방정식처럼 이항하여 풀 수 있습니다.
$$c\vec u=(cu_1,\dots,cu_n),\qquad \vec u+\vec w=(u_1+w_1,\dots,u_n+w_n)$$`,
          hints: [
            R`\(\vec x\)가 있는 항만 한쪽으로 모으면 \(2\vec x=3\vec u-\vec u-4\vec v=2\vec u-4\vec v\)`,
            R`양변을 2로 나누면 \(\vec x=\vec u-2\vec v\). 성분별로 계산하세요.`
          ],
          answerGuide: '예: x = (1, 2, 3, 4)'
        },
        {
          no: 3, level: '하', topic: '벡터의 크기와 거리', ref: 'p.14 문제 4',
          text: R`두 벡터 \(\vec u=(2,\ a,\ 1,\ -1)\), \(\vec w=(-1,\ 1,\ 1,\ a+2)\)에 대하여 \(|\vec u-\vec w|=5\)일 때, 양수 \(a\)의 값을 구하시오.`,
          concept: R`\(\vec w=(w_1,\dots,w_n)\)의 크기는 \(|\vec w|=\sqrt{w_1^2+\cdots+w_n^2}\)이고, 두 벡터 사이의 거리는 \(|\vec u-\vec w|\)입니다.`,
          hints: [
            R`먼저 \(\vec u-\vec w=(3,\ a-1,\ 0,\ -a-3)\)을 구합니다.`,
            R`\(|\vec u-\vec w|^2=25\)로 놓으면 \(9+(a-1)^2+(a+3)^2=25\). 정리하면 \(a^2+2a-3=0\)`
          ],
          answerGuide: '예: a = 2'
        },
        {
          no: 4, level: '하', topic: '단위벡터', ref: 'p.15 문제 5',
          text: R`벡터 \(\vec w=(1,\ 3,\ 0,\ \sqrt6\,)\)와 <b>방향이 반대인</b> 단위벡터를 구하시오.`,
          concept: R`크기가 1인 벡터를 <b>단위벡터</b>라 합니다. \(\vec w\ne\vec0\)와 평행한 단위벡터는
$$\pm\frac{\vec w}{|\vec w|}$$ 이고, 방향이 같으면 \(+\), 반대이면 \(-\)입니다.`,
          hints: [
            R`\(|\vec w|=\sqrt{1+9+0+6}=\ ?\)`,
            R`\(|\vec w|=4\)이므로 구하는 벡터는 \(-\frac14\vec w\)입니다.`
          ],
          answerGuide: '예: (-1/2, 0, 1/2, 1/2)'
        },
        {
          no: 5, level: '중', topic: '부분공간', ref: 'p.21 문제 3',
          text: R`다음 부분집합 \(W\)가 \(\mathbb R^3\)의 부분공간인지 조사하고, 그 이유를 쓰시오.
<ol class="sub">
<li>\(W=\{(x,\ 3y,\ 2x)\mid x,y\in\mathbb R\}\)</li>
<li>\(W=\{(x,y,z)\mid x-2y+z=3,\ x,y,z\in\mathbb R\}\)</li>
<li>\(W=\{(x,y,z)\mid z=x^2+y^2,\ x,y,z\in\mathbb R\}\)</li>
</ol>`,
          concept: R`\(W\ (\ne\varnothing)\)가 벡터공간 \(V\)의 <b>부분공간</b>일 조건:
<ul><li>\(\vec u,\vec v\in W\Rightarrow \vec u+\vec v\in W\) (덧셈에 닫힘)</li><li>\(c\in\mathbb R,\ \vec u\in W\Rightarrow c\vec u\in W\) (실수배에 닫힘)</li></ul>
특히 부분공간은 반드시 <b>영벡터</b>를 포함합니다.`,
          hints: [
            R`가장 먼저 \(\vec 0=(0,0,0)\)이 \(W\)에 들어 있는지 확인하세요. (2)는 여기서 바로 판정됩니다.`,
            R`(1)은 \(x(1,0,2)+y(0,3,0)\) 꼴로 쓸 수 있습니다. (3)은 \((1,0,1)\in W\)일 때 \(2(1,0,1)\)도 \(W\)에 속하는지 확인해 보세요.`
          ],
          answerGuide: '예: (1) 부분공간이다 (2) … (3) …'
        },
        {
          no: 6, level: '중', topic: '일차독립과 일차종속', ref: 'p.27 문제 3',
          text: R`\(\mathbb R^3\)에서 다음 벡터들의 일차독립, 일차종속을 조사하시오.
<ol class="sub">
<li>\((1,0,2),\ (2,1,0),\ (0,1,1)\)</li>
<li>\((1,2,0),\ (0,1,-1),\ (2,5,-1)\)</li>
<li>\((1,1,0),\ (0,1,1),\ (1,0,1),\ (2,3,4)\)</li>
</ol>`,
          concept: R`\(c_1\vec v_1+\cdots+c_k\vec v_k=\vec0\)을 만족시키는 \(c_i\)가 \(c_1=\cdots=c_k=0\)뿐이면 <b>일차독립</b>, 그렇지 않으면 <b>일차종속</b>입니다.
<br>\(\mathbb R^3\)의 벡터 3개는 이를 열로 하는 행렬의 행렬식이 \(0\)이 아니면 일차독립입니다.`,
          hints: [
            R`(1) \(\begin{vmatrix}1&2&0\\0&1&1\\2&0&1\end{vmatrix}\)을 계산해 보세요. (2) 세 번째 벡터를 앞의 두 벡터로 만들 수 있는지 살펴보세요.`,
            R`(2) \(2(1,2,0)+(0,1,-1)=\ ?\) &nbsp; (3) \(\mathbb R^3\)의 차원은 3입니다. 벡터가 4개이면?`
          ],
          answerGuide: '예: (1) 일차독립 (2) … (3) …'
        },
        {
          no: 7, level: '중', topic: '내적과 사잇각', ref: 'p.40 문제 5',
          text: R`두 벡터 \(\vec u,\ \vec v\)에 대하여 $$|\vec u|=2,\qquad |\vec v|=3,\qquad (\vec u+2\vec v)\cdot(2\vec u-\vec v)=-1$$ 일 때, \(\vec u\)와 \(\vec v\)가 이루는 각의 크기 \(\theta\ (0\le\theta\le\pi)\)를 구하시오.`,
          concept: R`내적의 성질: \(\vec u\cdot\vec u=|\vec u|^2\), 분배법칙이 성립합니다. 두 벡터가 이루는 각 \(\theta\)는
$$\cos\theta=\frac{\vec u\cdot\vec v}{|\vec u||\vec v|}$$`,
          hints: [
            R`전개하면 \((\vec u+2\vec v)\cdot(2\vec u-\vec v)=2|\vec u|^2+3\,\vec u\cdot\vec v-2|\vec v|^2\)`,
            R`\(8+3\,\vec u\cdot\vec v-18=-1\)에서 \(\vec u\cdot\vec v\)를 구한 뒤 \(\cos\theta\)를 계산하세요.`
          ],
          answerGuide: '예: θ = π/4'
        },
        {
          no: 8, level: '상', topic: '기저와 차원', ref: 'p.32 문제 4',
          text: R`평면 \(x+2y-z=0\)에 대하여 다음 물음에 답하시오.
<ol class="sub">
<li>이 평면(부분공간)의 기저를 하나 구하고, 차원을 구하시오.</li>
<li>벡터 \((3,\,-1,\,1)\)을 (1)에서 구한 기저의 일차결합으로 나타내시오.</li>
</ol>`,
          concept: R`벡터공간 \(V\)의 부분집합 \(B\)가 <b>일차독립</b>이고 \(V\)를 <b>생성</b>하면 \(B\)를 \(V\)의 <b>기저</b>라 하고, 기저의 원소 개수를 <b>차원</b>이라 합니다.`,
          hints: [
            R`평면의 식을 \(z=x+2y\)로 바꾸면 평면 위의 점은 \((x,\ y,\ x+2y)\)입니다.`,
            R`\((x,y,x+2y)=x(1,0,1)+y(0,1,2)\). 두 벡터는 일차독립이므로 기저입니다. (2)는 \(x=3,\ y=-1\)을 대입해 보세요.`
          ],
          answerGuide: '예: 기저 {(…), (…)}, 차원 …, (3,−1,1) = …'
        },
        {
          no: 9, level: '상', topic: '정사영과 거리', ref: 'p.45 문제 2, 3',
          text: R`두 벡터 \(\vec u=(1,\ 1,\ 0,\ 2)\), \(\vec v=(3,\ 1,\ 2,\ 4)\)에 대하여 다음을 구하시오.
<ol class="sub">
<li>\(\vec v\)의 \(\vec u\)에 평행한 성분과 수직인 성분</li>
<li>점 \(A(3,1,2,4)\)와 원점 \(O\), 점 \(B(1,1,0,2)\)를 지나는 직선 \(OB\) 사이의 거리</li>
</ol>`,
          concept: R`\(\vec v\)의 \(\vec u\)에 대한 정사영(평행 성분)은
$$\mathrm{proj}_{\vec u}\vec v=\frac{\vec v\cdot\vec u}{|\vec u|^2}\,\vec u$$ 이고, 수직 성분은 \(\vec v-\mathrm{proj}_{\vec u}\vec v\)입니다. 점과 직선 사이의 거리는 <b>수직 성분의 크기</b>입니다.`,
          hints: [
            R`\(\vec v\cdot\vec u=3+1+0+8=12\), \(|\vec u|^2=6\)이므로 평행 성분은 \(2\vec u\)입니다.`,
            R`수직 성분 \(\vec v-2\vec u\)를 구하고, 그 벡터와 \(\vec u\)의 내적이 0인지 검산하세요. 거리는 그 벡터의 크기입니다.`
          ],
          answerGuide: '예: 평행 (…), 수직 (…), 거리 …'
        },
        {
          no: 10, level: '상', topic: '정규직교기저와 정사영', ref: 'p.52 문제 6',
          text: R`두 벡터 \(\vec v_1=(1,0,1)\), \(\vec v_2=(1,1,1)\)로 생성된 부분공간을 \(W\)라 하자. \(\vec u=(2,3,4)\)일 때 다음을 구하시오.
<ol class="sub">
<li>그람–슈미트 방법으로 구한 \(W\)의 정규직교기저</li>
<li>\(\mathrm{proj}_W\vec u\)</li>
</ol>`,
          concept: R`<b>그람–슈미트</b>: \(\vec w_1=\vec v_1\), \(\vec w_2=\vec v_2-\dfrac{\vec v_2\cdot\vec w_1}{|\vec w_1|^2}\vec w_1\)로 직교화한 뒤 크기로 나누어 정규화합니다.
<br>정규직교기저 \(\{\vec q_1,\vec q_2\}\)가 있으면 \(\mathrm{proj}_W\vec u=(\vec u\cdot\vec q_1)\vec q_1+(\vec u\cdot\vec q_2)\vec q_2\)`,
          hints: [
            R`\(\vec w_2=(1,1,1)-\frac{2}{2}(1,0,1)=(0,1,0)\). 따라서 \(\vec q_1=\frac{1}{\sqrt2}(1,0,1)\), \(\vec q_2=(0,1,0)\)`,
            R`\(\vec u\cdot\vec q_1=\frac{6}{\sqrt2}\), \(\vec u\cdot\vec q_2=3\). 검산: \(\vec u-\mathrm{proj}_W\vec u\)는 \(\vec v_1,\vec v_2\)와 모두 수직이어야 합니다.`
          ],
          answerGuide: '예: {…}, proj = (…)'
        }
      ]
    },
    2: {
      name: 'Ⅱ. 행렬과 선형변환',
      range: '교과서 pp.60–105',
      intro: '연립일차방정식, 역행렬, 행렬식, 선형변환과 도형의 이동',
      questions: [
        {
          no: 1, level: '하', topic: '가우스 소거법', ref: 'p.63 문제 1',
          text: R`가우스 소거법을 이용하여 다음 연립일차방정식을 푸시오.
$$\begin{cases}x+y+z=6\\ 2x-y+z=3\\ x+2y-z=2\end{cases}$$`,
          concept: R`첨가행렬에 <b>기본행연산</b>(① 두 행 교환 ② 한 행에 0이 아닌 수 곱하기 ③ 한 행의 상수배를 다른 행에 더하기)을 적용해도 해는 바뀌지 않습니다. 왼쪽이 단위행렬이 되면 오른쪽이 해입니다.`,
          hints: [
            R`첨가행렬 \(\left(\begin{array}{ccc|c}1&1&1&6\\2&-1&1&3\\1&2&-1&2\end{array}\right)\)에서 1열의 아래 두 성분을 먼저 0으로 만드세요.`,
            R`\((2)\to(2)-2(1)\), \((3)\to(3)-(1)\)을 하면 \(\left(\begin{array}{ccc|c}1&1&1&6\\0&-3&-1&-9\\0&1&-2&-4\end{array}\right)\)`
          ],
          answerGuide: '예: x = ?, y = ?, z = ?'
        },
        {
          no: 2, level: '하', topic: '2×2 역행렬', ref: 'p.70 문제 1',
          text: R`행렬 \(A=\begin{pmatrix}3&5\\1&2\end{pmatrix}\)에 대하여 다음을 구하시오.
<ol class="sub"><li>\(A^{-1}\)</li><li>\(AX=\begin{pmatrix}4\\1\end{pmatrix}\)을 만족시키는 행렬 \(X\)</li></ol>`,
          concept: R`\(A=\begin{pmatrix}a&b\\c&d\end{pmatrix}\)에서 \(ad-bc\ne0\)이면
$$A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$$ 이고, \(AX=B\)의 해는 \(X=A^{-1}B\)입니다.`,
          hints: [
            R`\(ad-bc=6-5=1\). 대각선은 자리 바꾸고, 반대각선은 부호 바꾸기!`,
            R`\(X=A^{-1}\begin{pmatrix}4\\1\end{pmatrix}\)를 계산한 뒤, \(AX\)를 직접 곱해 검산하세요.`
          ],
          answerGuide: '예: A⁻¹ = [[…],[…]], X = (…)'
        },
        {
          no: 3, level: '하', topic: '행렬식', ref: 'p.77 사루스 법칙',
          text: R`다음 행렬식의 값을 구하시오. $$\begin{vmatrix}2&1&3\\0&-1&4\\1&2&1\end{vmatrix}$$`,
          concept: R`3차 행렬식은 <b>사루스 법칙</b> 또는 <b>여인수 전개</b>로 구합니다. 0이 많은 행이나 열로 전개하면 계산이 간단합니다.
$$\det A=a_{11}C_{11}+a_{21}C_{21}+a_{31}C_{31}\quad(C_{ij}=(-1)^{i+j}M_{ij})$$`,
          hints: [
            R`1열에 0이 있으니 1열로 전개해 봅시다: \(2\begin{vmatrix}-1&4\\2&1\end{vmatrix}-0+1\begin{vmatrix}1&3\\-1&4\end{vmatrix}\)`,
            R`\(\begin{vmatrix}-1&4\\2&1\end{vmatrix}=-1-8\), \(\begin{vmatrix}1&3\\-1&4\end{vmatrix}=4+3\)`
          ],
          answerGuide: '예: 5'
        },
        {
          no: 4, level: '하', topic: '선형변환을 나타내는 행렬', ref: 'p.88 문제 4',
          text: R`관계식 \(x'=2x-y,\ \ y'=x+3y\)로 정의된 선형변환 \(f\)에 대하여 다음을 구하시오.
<ol class="sub"><li>\(f\)를 나타내는 행렬</li><li>점 \((1,\,2)\)가 \(f\)에 의하여 옮겨지는 점</li><li>단위정사각형이 \(f\)에 의하여 옮겨진 도형의 넓이</li></ol>`,
          concept: R`선형변환의 행렬은 <b>\(\vec e_1\)이 간 곳을 1열, \(\vec e_2\)가 간 곳을 2열</b>로 세운 것입니다. 선형변환은 넓이를 \(|\det A|\)배 합니다.`,
          hints: [
            R`계수를 그 자리 그대로: \(\begin{pmatrix}x'\\y'\end{pmatrix}=\begin{pmatrix}2&-1\\1&3\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}\)`,
            R`(2) 행렬과 \(\begin{pmatrix}1\\2\end{pmatrix}\)을 곱하세요. (3) 단위정사각형의 넓이 1에 \(|\det A|\)를 곱합니다.`
          ],
          answerGuide: '예: [[…],[…]], (…), 넓이 …'
        },
        {
          no: 5, level: '중', topic: '3×3 역행렬', ref: 'p.72 문제 2',
          text: R`행렬 \(A=\begin{pmatrix}1&1&0\\0&1&1\\1&0&2\end{pmatrix}\)에 대하여 다음을 구하시오.
<ol class="sub"><li>\(A^{-1}\)</li><li>\(AX=\begin{pmatrix}3\\3\\3\end{pmatrix}\)을 만족시키는 \(X\)</li></ol>`,
          concept: R`\([A\,|\,I]\)에 기본행연산을 하여 \([I\,|\,A^{-1}]\)로 만들거나, 수반행렬을 이용합니다.
$$A^{-1}=\frac{1}{\det A}\,\mathrm{adj}(A)$$`,
          hints: [
            R`\(\det A=1(2-0)-1(0-1)+0=3\)이므로 역행렬이 존재합니다.`,
            R`여인수를 구해 전치하면 \(\mathrm{adj}(A)=\begin{pmatrix}2&-2&1\\1&2&-1\\-1&1&1\end{pmatrix}\). 검산: \(AA^{-1}=I\)`
          ],
          answerGuide: '예: A⁻¹ = (1/3)[[…],[…],[…]], X = (…)'
        },
        {
          no: 6, level: '중', topic: '회전변환', ref: 'p.93 예제 3',
          text: R`좌표평면 위의 점 \(A\)를 원점을 중심으로 \(\dfrac{\pi}{3}\)만큼 반시계 방향으로 회전하였더니 점 \(B(-1,\ \sqrt3\,)\)가 되었다. 점 \(A\)의 좌표를 구하시오.`,
          concept: R`원점을 중심으로 \(\theta\)만큼 반시계 방향으로 회전하는 변환의 행렬은
$$R_\theta=\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix}$$ 이고, 되돌리는 변환은 \(R_{-\theta}\)입니다.`,
          hints: [
            R`거꾸로 \(-\frac{\pi}{3}\)만큼 돌리면 됩니다: \(A=R_{-\pi/3}\,B\)`,
            R`그림으로: \(B\)는 원점에서 거리 2, 방향 \(120^\circ\)인 점입니다. \(60^\circ\)를 빼면?`
          ],
          answerGuide: '예: A(√2, √2)'
        },
        {
          no: 7, level: '중', topic: '합성변환', ref: 'p.95 예제 2',
          text: R`좌표평면에서 \(f\)는 직선 \(y=x\)에 대한 대칭변환, \(g\)는 원점을 중심으로 \(\dfrac{\pi}{2}\)만큼 반시계 방향으로 회전하는 회전변환이다. 다음을 구하시오.
<ol class="sub"><li>합성변환 \(g\circ f\)를 나타내는 행렬</li><li>\((g\circ f)(3,1)\)과 \((f\circ g)(3,1)\)</li></ol>`,
          concept: R`\(f,\ g\)를 나타내는 행렬이 각각 \(A,\ B\)이면 \(g\circ f\)(\(f\) 먼저)를 나타내는 행렬은 \(BA\)입니다. 일반적으로 \(BA\ne AB\)이므로 순서가 중요합니다.`,
          hints: [
            R`\(A=\begin{pmatrix}0&1\\1&0\end{pmatrix}\), \(B=\begin{pmatrix}0&-1\\1&0\end{pmatrix}\)`,
            R`한 단계씩 따라가도 됩니다: \((3,1)\xrightarrow{f}(1,3)\xrightarrow{g}\ ?\)`
          ],
          answerGuide: '예: [[…],[…]], (…), (…)'
        },
        {
          no: 8, level: '상', topic: '선형변환에 의한 직선의 이동', ref: 'p.98 예제 6',
          text: R`행렬 \(A=\begin{pmatrix}3&1\\2&1\end{pmatrix}\)로 나타내어지는 선형변환에 의하여 직선 \(x-y+2=0\)이 옮겨지는 도형의 방정식을 구하시오.`,
          concept: R`도형을 옮기는 3단계: <b>① 되감기</b> \(\begin{pmatrix}x\\y\end{pmatrix}=A^{-1}\begin{pmatrix}x'\\y'\end{pmatrix}\) <b>② 대입</b> 원래 방정식에 넣기 <b>③ 정리</b> 후 \(x',y'\)을 \(x,y\)로 바꿔 쓰기`,
          hints: [
            R`\(\det A=1\), \(A^{-1}=\begin{pmatrix}1&-1\\-2&3\end{pmatrix}\)이므로 \(x=x'-y',\ y=-2x'+3y'\)`,
            R`\((x'-y')-(-2x'+3y')+2=0\)을 정리하세요. 검산: 원래 직선 위의 점 \((0,2)\)를 옮긴 점이 새 직선 위에 있는지!`
          ],
          answerGuide: '예: 직선 x + y − 1 = 0'
        },
        {
          no: 9, level: '상', topic: '합성변환에 의한 원의 이동', ref: 'p.99 문제 7',
          text: R`두 선형변환 \(f,\ g\)를 나타내는 행렬이 각각 \(\begin{pmatrix}2&0\\0&2\end{pmatrix}\), \(\begin{pmatrix}0&-1\\1&0\end{pmatrix}\)일 때, 원 \(C:(x-2)^2+y^2=1\)이 합성변환 \(g\circ f\)에 의하여 옮겨지는 도형의 방정식을 구하시오.`,
          concept: R`\(kI\)는 닮음비 \(k\)인 닮음변환(확대), \(\begin{pmatrix}0&-1\\1&0\end{pmatrix}\)은 \(90^\circ\) 회전입니다. 회전과 닮음변환은 원을 원으로 옮기므로 <b>중심과 반지름</b>만 따라가면 됩니다.`,
          hints: [
            R`\(f\) 먼저: 중심 \((2,0)\to(4,0)\), 반지름 \(1\to2\)`,
            R`그다음 \(g\): 중심 \((4,0)\)을 \(90^\circ\) 회전하면? 반지름은 그대로입니다.`
          ],
          answerGuide: '예: 원 (x − 1)² + (y − 1)² = 9'
        },
        {
          no: 10, level: '상', topic: '역행렬이 없는 선형변환', ref: 'p.100 문제 8',
          text: R`선형변환 \(\begin{pmatrix}x'\\y'\end{pmatrix}=\begin{pmatrix}1&-2\\-2&4\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}\)에 의하여 다음 도형이 옮겨지는 도형을 구하시오.
<ol class="sub"><li>직선 \(x-2y+4=0\)</li><li>원 \(x^2+y^2=5\)</li></ol>`,
          concept: R`\(\det A=0\)이면 역행렬이 없고, 평면 전체가 <b>원점을 지나는 한 직선</b>으로 납작해집니다. 직선은 <b>점</b> 또는 <b>원점을 지나는 직선</b>으로, 원은 <b>선분</b>으로 옮겨집니다.`,
          hints: [
            R`\(x'=x-2y\), \(y'=-2x+4y=-2(x-2y)=-2x'\). 모든 상은 직선 \(y=-2x\) 위에 있습니다.`,
            R`(1) 직선 위에서 \(x-2y\)의 값은 항상 \(-4\)입니다. (2) 원 위에서 \(x-2y\)가 가질 수 있는 범위는? (코시–슈바르츠 또는 \(x=\sqrt5\cos t,\ y=\sqrt5\sin t\))`
          ],
          answerGuide: '예: (1) 점 (…) (2) 선분 …'
        }
      ]
    }
  }
};
