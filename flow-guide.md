# MVP Flow — 진행 가이드 (템플릿)

**디자이너는 채팅만 보면 됩니다.** 다음에 할 일은 제가 말해 드리고, 파일 작업은 제가 직접 합니다. 진행이 궁금하면 채팅에 **"지금 어디야?"** 또는 **"다음 액션 알려줘"**라고만 하세요.

**이 파일(flow-guide)은 덮어쓰지 않습니다.** 이번 프로젝트의 실제 값·산출물은 모두 **`project/`** 폴더에만 채웁니다.

---

## 원칙 — 데이터 소스·호출 최소화

아래 원칙은 제가 기획·구현 방향을 잡을 때 참고하는 것이에요. **디자이너는 읽지 않으셔도 됩니다.**

**1. 외부 API 호출량을 최대한 줄인다.**
검색 조건과 결과를 **Supabase에 저장**하고 **TTL**을 두면, 유효 시간 내 같은 요청은 DB에서 먼저 제공해 API 호출이 크게 줄어든다. PRD 작성·구현 시 이 원칙을 반영한다(캐시 전략, 저장 구조, TTL 명시).

**2. 필요하면 외부 API뿐 아니라, 합법적인 외부 사이트 크롤링을 고려한다.**
API가 없거나 비용·제한이 클 때, 해당 사이트의 **robots.txt·이용약관**을 확인한 뒤 크롤링을 옵션으로 검토한다.

**3. 크롤링 시 주기를 세팅하고 결과를 DB에 저장해 최신성을 유지한다.**
일/주/월 단위로 갱신하고 결과를 DB에 저장해 두면, 호출 부담과 최신성 사이의 균형을 잡을 수 있다.

---

## 0. 시작 전 준비 (필요한 서비스)

이 플로우를 따라가려면 **아래 세 서비스**를 쓰게 됩니다.

| 서비스 | 한 줄 설명 | 미리 할 일 |
|--------|------------|------------|
| **GitHub** | 코드 저장소. 1번에서 레포를 생성합니다. | [가입](https://github.com/join) |
| **Vercel** | 웹 앱 배포. GitHub 레포와 연동해 자동 배포합니다. | [가입](https://vercel.com/signup) (GitHub로 로그인 가능) |
| **Supabase** | DB(데이터 저장). 7번에서 프로젝트 만들고 테이블을 생성합니다. | [가입](https://supabase.com/dashboard) |

처음이시면 **"시작해줘"**라고만 하시면, 제가 init부터 1번까지 순서대로 안내합니다.

**이 가이드에서 자주 쓰는 말**
- **PR**: 코드 수정 제안서. AI가 올리면 GitHub에서 확인할 수 있어요.
- **Merge**: 그 수정안을 반영(합치기)하는 것.
- **Preview URL**: 수정본 미리보기 링크. 배포 전에 확인하는 주소.
- **레포(저장소)**: GitHub에 만드는 프로젝트 저장 공간.
- **feature 브랜치**: 구현 작업을 위해 만드는 별도 코드 브랜치.

---

## 1. 먼저 할 일

**이걸 해야 2번 이후가 모두 가능해요.**

프로젝트 이름(영문 소문자 + 하이픈)을 알려주시면 제가 GitHub 레포 생성과 Vercel 배포를 직접 실행합니다.

- **CLI 설치**: `gh`, `vercel`이 없으면 제가 직접 설치합니다
- **로그인**: 브라우저 인증이 필요해 한 번만 직접 하셔야 합니다. 터미널 여는 법부터 안내드릴게요.
  - **Mac**: `Cmd(⌘) + Space` → "터미널" 입력 → Enter
  - **Windows**: `Windows 키` → "cmd" 입력 → Enter

**입력 보관**: `project/info.md`

---

## 2. 프로젝트 정보 (1번 완료 후)

프로젝트명, GitHub URL, Vercel URL을 알려주세요. 제가 `project/info.md`에 반영합니다.

**TIP — 어디를 보면 돼요?**
- **GitHub URL**: GitHub 로그인 → **Your repositories** → 방금 만든 레포 클릭 → 상단 주소창 URL
- **Vercel URL**: Vercel 로그인 → **Dashboard** → 방금 배포한 프로젝트 → **Domains** 또는 **Visit** 링크

**입력 보관**: `project/info.md`

---

## 3. 프로젝트 스펙 정의 (시안 이미지 필수)

**해 주실 일**
- Figma나 Stitch 시안 이미지를 채팅에 첨부해 주세요. 제가 직접 이미지를 읽고 화면 스펙을 분석합니다.
- 이미지만 있어도 충분합니다. "이 화면은 ○○ 화면이에요"처럼 한 줄 설명을 붙여 주시면 더 정확합니다.
- 시안이 없으면 [Stitch](https://stitch.withgoogle.com/)를 추천해요.

**입력 보관**: `project/screens/`, `project/screens/README.md`

---

## 4. Plan 생성 (및 검토)

기획서·시안을 받은 뒤, **"기획서와 시안을 모두 제공해 주셨을까요? 모두 제공해 주셨다면 계획을 세워 드리겠습니다."**라고 확인하고, 제공 완료되면 PRD를 생성합니다.

**PRD 작성 시 두 관점을 반영한다.**
- **시니어 기획자 관점**: 요구사항·화면 스펙·예외 시나리오·우선순위·사용자 메시지(에러·빈 상태 등) 정리.
- **시니어 개발자 관점**: 데이터가 외부 API·크롤링이면 웹 검색으로 리서치 후, 데이터 전략 섹션에 **(1) 후보 소스 2~3개 구체 명시, (2) 각 옵션 난이도·리스크·이유, (3) 권장안과 이유** 작성. 외부 API/캐시 원칙 반영(DB 저장 + TTL).

생성 후 디자이너가 OK하면 5번으로.

**산출물**: `project/PRD.md`

---

## 5. 필요한 정보 수집

프로젝트에 필요한 추가 정보(API 키, Supabase URL·키, 서비스명 등)를 제가 **채팅에서** 물어봅니다. 답변을 받으면 제가 `project/required-info.md`를 직접 갱신합니다. 다 채우면 6번으로.

**입력 보관**: `project/required-info.md`

---

## 6. DB 설계

시안·PRD 기반으로 테이블 설계와 Supabase용 DDL을 생성합니다. 디자이너는 따로 하실 일 없어요.

**산출물**: `project/db-design.md`

---

## 7. Supabase 세팅

**자동 실행 (Supabase MCP 연결 시)**: 제가 DDL을 직접 실행합니다. "7번 자동으로 해줘"라고 하시면 됩니다.

**수동 진행 (MCP 없을 때)**:
1. Supabase 대시보드에서 **New project** 생성
2. 왼쪽 메뉴 **SQL Editor**에서 `project/db-design.md`의 DDL 블록 복사 → **Run**
3. **Project Settings(톱니바퀴) > API**에서 **Project URL**과 **anon public** 키를 채팅으로 알려 주세요. 제가 `project/info.md`에 반영하고 Vercel 환경변수 설정을 안내합니다.

**막히면** 화면 캡처를 채팅에 보내 주세요.

**입력 보관**: `project/info.md` (Supabase URL, anon key)

---

## 8. AI 구현

PRD, DB 설계, 시안을 기반으로 제가 직접 코드를 구현합니다. **디자이너는 따로 하실 일 없어요.**

1. GitHub 레포를 클론하고 feature 브랜치를 생성합니다.
2. `project/PRD.md`, `project/db-design.md`, `project/screens/` 이미지를 읽고 Next.js 코드를 구현합니다.
   (Supabase 클라이언트 → API 라우트 → 페이지·컴포넌트 순)
3. 구현 완료 후 PR을 생성하고 **Vercel Preview URL**을 알려드립니다.
4. Preview URL로 결과를 확인하세요.

**구현 시 로깅 필수**: 크롤링(요청 시작/종료·수집 행 수·에러), DB(INSERT/UPDATE 전후·영향 행 수·에러), API Route(호출 시점·응답 코드·반환 개수·에러) 모두 console 로그 포함. Vercel 로그에서 empty view·에러 원인을 바로 추적할 수 있게.

---

## 9. 피드백·수정

Preview URL을 확인하고 **수정하고 싶은 것이 있으면 저에게 채팅으로 말씀해 주세요.** 제가 직접 코드를 수정합니다.

- 논의 후 제가 feature 브랜치에 직접 코드 수정 → push
- Vercel Preview URL이 자동으로 업데이트됩니다.
- 더 수정할 게 없고 만족스러우면 10번으로 가세요.

수정 요청은 `[페이지] + [무엇을] + [어떻게 바꿔]` 포맷이 명확해요. 예: `/ 카드 간격을 16→20으로 넓혀줘`

---

## 10. Merge → 운영·반복

"10번 Merge해줘"라고 하시면 제가 `gh pr merge`로 자동 반영합니다. 또는 GitHub에서 직접 Merge해도 됩니다.

Merge 후 Vercel이 자동 배포합니다. 추가 개선이 있으면 9번부터 반복하세요.

---

## (선택) 데이터 소스 — 외부 API

화면에 보여줄 데이터가 외부 API에서 올 때만 정리합니다.

- **무슨 데이터를 보여주나요?**
- **사용할 API/서비스 이름** (모르면 "OO API 추천해줘")
- **API 키 발급 경로** (비우면 제가 안내)
- **환경변수 이름** (비우면 제가 제안)
- **캐시 전략**: 결과를 DB에 저장 + TTL로 API 호출 최소화

**입력 보관**: `project/required-info.md`

---

## 체크리스트

- [ ] 0. (선택) 필요한 서비스 가입 — GitHub, Vercel, Supabase
- [ ] 1. GitHub 레포 + Vercel 배포 (자동: "1번 자동으로 해줘" / 수동: Boilerplate 링크)
- [ ] 2. 프로젝트 정보 → `project/info.md`
- [ ] 3. 시안 이미지 첨부 → `project/screens/`
- [ ] 4. PRD 생성 → 확인·수정 후 OK → `project/PRD.md`
- [ ] 5. 필요한 정보 수집 → `project/required-info.md`
- [ ] 6. DB 설계 → `project/db-design.md`
- [ ] 7. Supabase 세팅 (자동 or 수동) → `project/info.md`에 URL·key
- [ ] 8. AI 구현 → PR 생성 → Preview URL 확인
- [ ] 9. Preview 확인 → 수정 있으면 채팅으로 → AI가 직접 수정
- [ ] 10. Merge (자동: "10번 Merge해줘" / 수동: GitHub) → 운영·반복

---

## AI 요약 (진입 시 참고)

- **1)** `project/state.md` 읽기 → stage, next 확인
- **2)** flow-guide 해당 stage 문단만 수행
- **3)** 입력·산출은 `project/`만, flow-guide는 수정 금지
- **4)** 단계 완료 시 `state.md`의 stage·next 갱신

---

## AI 안내 (이 파일 읽었을 때)

1. **`project/state.md`**를 읽어서 현재 **stage**와 **next**를 확인한다. stage를 바꾼 뒤에는 **next**를 그 단계에 맞는 다음 액션 한 문장(디자이너에게 할 말)으로 갱신한다.
2. flow-guide는 수정하지 않고, 모든 입력·산출은 **project/** 아래 파일에만 반영한다.
3. 단계별 안내:
   - **stage 1**: "1번을 진행해 주세요. '1번 자동으로 해줘'라고 하시면 제가 gh + vercel CLI로 직접 실행합니다. 수동으로 하실 경우 Next.js Boilerplate 링크에서 Deploy를 눌러 주세요."
   - **stage 2**: "프로젝트명, GitHub URL, Vercel URL을 알려주세요." → `project/info.md` 갱신
   - **stage 3**: "시안 이미지를 채팅에 첨부해 주세요. 제가 직접 분석합니다." → `project/screens/` 저장, README 갱신
   - **stage 4**: 먼저 "기획서와 시안을 모두 제공해 주셨을까요?"라고 확인. 제공 완료 시 PRD 생성 (시니어 기획자 + 개발자 관점, 데이터 전략 포함). 생성 후 "project/PRD.md를 한 번 확인해 보시고, 수정하거나 더 넣고 싶은 게 있으면 말해 주세요."라고 안내. 디자이너가 OK하면 5로 갱신.
   - **stage 5**: 필요한 추가 정보를 채팅으로 물어보고 `project/required-info.md`에 직접 반영. 다 채우면 6으로.
   - **stage 6**: PRD·시안 기반으로 DDL 생성 → `project/db-design.md` 갱신.
   - **stage 7**: Supabase MCP 연결 여부 확인. MCP 있으면 DDL 직접 실행. 없으면 flow-guide 7번 수동 안내 전달 (대시보드 → SQL Editor → DDL 실행 → URL·anon key 수집 → `project/info.md` 반영 → Vercel 환경변수 안내).
   - **stage 8**: `project/info.md`에서 GitHub URL 읽기 → `gh repo clone` → feature 브랜치 생성 → PRD·DB·screens 읽기 → Next.js 코드 구현 (로깅 포함) → `gh pr create` → Preview URL 디자이너에게 전달.
   - **stage 9**: "수정하고 싶은 것이 있으면 저에게 알려주세요!" 안내. 디자이너가 요청하면 논의 후 feature 브랜치 직접 수정 → push → "Preview URL 새로고침해 보세요." 만족하면 10으로.
   - **stage 10**: "10번 Merge해줘"라고 하시면 `gh pr merge`로 자동 반영. 또는 GitHub에서 직접 Merge. Merge 후 Vercel 자동 배포 안내.

---

## 용어 한줄 정리

| 용어 | 한 줄 설명 |
|------|------------|
| **PR** | 수정 제안서. 코드 변경 내용을 담은 요청. |
| **Merge** | 그 제안을 반영하기(합치기). |
| **Preview URL** | 수정본 미리보기 주소. 배포 전에 확인하는 링크. |
| **RLS** | DB 읽기/쓰기 허용 설정(행 단위 보안). |
| **DDL** | 테이블 구조를 만드는 SQL 문장. |
| **SQL Editor** | Supabase에서 SQL을 붙여넣고 실행하는 화면. |
| **feature 브랜치** | 구현 작업을 위해 AI가 만드는 별도 코드 브랜치. |
