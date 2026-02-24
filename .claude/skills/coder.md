# Coder (8·9단계 — 직접 구현)

target repo를 직접 클론해 코드를 구현하고 PR을 생성한다. 모든 입력·산출은 `project/`에서 읽고, 코드는 target repo에만 쓴다.

**사용 시점**: stage 8 또는 9, "구현 시작", "코드 짜줘", "8번 해줘", "수정해줘", "Preview에서 이거 바꿔줘", 또는 Preview 피드백 논의 후.

---

## 8단계: 구현 + PR 생성

### 사전 확인
- `project/info.md`에서 GitHub URL, Supabase URL, anon key 확인
- `project/PRD.md`, `project/db-design.md`, `project/required-info.md` 읽기
- `project/screens/` 이미지 직접 읽기 (멀티모달)

### 실행 순서

1. **레포 클론**
   ```bash
   gh repo clone <github-url> ../<project-name>
   ```
   이미 클론돼 있으면 `git -C ../<project-name> pull` 로 최신화.

2. **feature 브랜치 생성**
   ```bash
   git -C ../<project-name> checkout -b feature/ai-implementation
   ```

3. **구현 순서** (Next.js App Router 기준)
   - `lib/supabase.ts` — Supabase 클라이언트 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `app/api/...` — 데이터 수집·캐시 API 라우트
   - `app/...` — 페이지·컴포넌트 (시안 기반 UI)

4. **로깅 필수 (빡세게)**
   모든 구현 파일에 아래 로그를 포함한다. Vercel 로그에서 empty view·에러 원인을 즉시 추적할 수 있어야 한다.
   - **크롤링**: 요청 시작/종료, 수집 행 수(0이면 `[CRAWL] 수집 결과 0건` 명시), 응답 상태, 에러 메시지
   - **DB**: INSERT/UPDATE 전후, 영향 행 수, SELECT 결과 행 수, Supabase 에러
   - **API Route**: 호출 시점, 응답 상태 코드, 반환 데이터 개수 또는 에러
   - **에러**: 스택 또는 `console.error`로 원인 추적 가능하게

5. **커밋·푸시**
   ```bash
   git -C ../<project-name> add .
   git -C ../<project-name> commit -m "feat: AI implementation based on PRD"
   git -C ../<project-name> push -u origin feature/ai-implementation
   ```

6. **PR 생성**
   ```bash
   gh pr create \
     --repo <github-url> \
     --title "AI Implementation" \
     --body "PRD 기반 구현. Preview URL로 확인 후 수정 요청 주세요." \
     --base main \
     --head feature/ai-implementation
   ```

7. **디자이너에게 전달**
   PR 생성 후 Vercel이 Preview URL을 자동 생성한다 (보통 1~2분 소요).
   PR URL을 디자이너에게 전달하고 아래 문구를 함께 안내한다:

   > "PR 페이지 하단 **Vercel → Visit Preview** 링크로 미리보기를 확인하세요.
   > 화면이 이상하거나 데이터가 안 보이면 바로 알려 주세요.
   > 크롬에서 `Cmd+Option+I` (Mac) / `F12` (Windows)를 눌러 **Console 탭**을 열면 에러 내용을 확인할 수 있어요. 빨간 메시지가 있으면 캡처해서 보내 주세요!"

---

## 9단계: 수정

1. 디자이너와 수정 내용 충분히 논의
2. cloned repo 이동 후 브랜치 확인
   ```bash
   git -C ../<project-name> checkout feature/ai-implementation
   git -C ../<project-name> pull
   ```
3. 코드 직접 수정 (Read → Edit 도구 사용)
4. 커밋·푸시
   ```bash
   git -C ../<project-name> add .
   git -C ../<project-name> commit -m "fix: <수정 내용 한 줄 요약>"
   git -C ../<project-name> push
   ```
5. "Preview URL 새로고침해서 확인해 보세요." 안내
6. 만족할 때까지 반복. 완료되면 "10번 Merge해줘"라고 하면 된다고 안내.

---

## 오류 발생 시 디버깅 가이드

Preview 또는 프로덕션에서 화면이 이상하거나 데이터가 안 보일 때, 디자이너에게 아래 내용을 전달한다.

### 1단계 — 크롬 콘솔에서 에러 확인

> 화면에 문제가 생겼을 때 가장 먼저 확인하는 방법이에요!
>
> **콘솔 여는 법**
> - **Mac**: 키보드 `Cmd(⌘) + Option + I` → 상단 탭 **Console** 클릭
> - **Windows**: 키보드 `F12` → 상단 탭 **Console** 클릭
>
> 빨간색 에러 메시지가 보이면 전체 내용을 **캡처해서 채팅에 보내 주세요.**

### 2단계 — API 응답 직접 확인

> **Network 탭으로 API 확인하기**
> 1. 개발자 도구 → **Network** 탭 클릭
> 2. 페이지 새로고침 (`Cmd+R` / `F5`)
> 3. 목록에서 `/api/stocks` (또는 해당 API 경로) 클릭
> 4. **Response** 탭에서 실제 응답 내용 확인
>
> 빨간색(실패)으로 표시된 요청이 있으면 캡처해서 보내 주세요.

### 3단계 — Vercel 서버 로그 확인 (AI가 직접)

디자이너가 콘솔 캡처를 보내오면, AI가 아래 명령으로 서버 로그를 함께 확인한다:
```bash
vercel logs <deployment-url> --cwd ../<project-name>
```
크롤링·DB 에러는 서버 로그에만 찍히므로 클라이언트 콘솔만으로 해결이 안 될 때 반드시 확인.

---

## 주의사항

- `.env.local`은 커밋하지 않는다. Vercel 환경변수가 이미 설정돼 있으므로 Preview 배포는 자동으로 동작한다.
- `project/` 폴더는 읽기만 한다. 코드 수정은 target repo(`../<project-name>`)에만 한다.
- `gh`, `git` 명령은 인증 상태를 먼저 확인한다. (`gh auth status`)
