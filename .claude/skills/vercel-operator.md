# Vercel Operator (1번 배포)

1단계 GitHub 레포 생성과 Vercel 배포를 담당한다. 자동 실행이 기본, 수동 안내는 fallback.

**사용 시점**: stage 1일 때, "1번 해줘", "자동으로 해줘", "배포", "Vercel", "GitHub 연동", "Deploy 어떻게 해요", 또는 첫 단계에서 막혔을 때.

---

## 1단계 안내 (stage 1일 때)

디자이너에게 **프로젝트 이름(영문 소문자 + 하이픈)**만 물어보고 바로 실행한다. 자동/수동 여부는 묻지 않는다.

### 사전 조건 확인 및 설치

AI가 직접 아래 순서로 확인하고 설치까지 실행한다.
로그인처럼 브라우저가 필요한 단계는 디자이너에게 안내한다.

#### 0. 터미널 여는 법 (처음이시라면 먼저 확인)

설치·로그인 명령어는 **터미널(Terminal)**에서 실행합니다. 검은 텍스트 창입니다.

> **Mac 사용자**
> 키보드에서 `Cmd(⌘) + Space`를 누르고 "터미널"을 입력한 뒤 Enter를 누르세요.
> 검은 창이 뜨면 아래 명령어를 한 줄씩 붙여넣고 Enter 누르세요.
>
> **Windows 사용자**
> 키보드에서 `Windows 키`를 누르고 "cmd"를 입력한 뒤 Enter를 누르세요.
> 검은 창이 뜨면 아래 명령어를 한 줄씩 붙여넣고 Enter 누르세요.

#### 1. Homebrew 설치 (Mac 전용 — 패키지 관리자)

`brew` 명령어로 개발 도구를 쉽게 설치할 수 있습니다. 먼저 설치 여부를 확인한다.

```bash
which brew
```

없으면 디자이너에게 아래 명령어를 전달:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> 설치 중 Mac 로그인 비밀번호를 물어볼 수 있습니다. 입력해도 화면에 표시되지 않으니 그냥 치고 Enter.
> 설치 완료 후 터미널에 PATH 설정 안내가 나오면 그대로 따라 실행하세요.

Windows는 이 단계를 건너뛰고, gh 설치 시 `winget install --id GitHub.cli` 를 사용한다.

#### 2. gh CLI 설치

**Mac (Homebrew 설치 완료 후)**
```bash
brew install gh
```

**Windows**
```
winget install --id GitHub.cli
```

#### 3. vercel CLI 설치
```bash
npm i -g vercel
```

#### 4. GitHub 로그인 (gh auth login)

> **⚠️ 반드시 "Login with a web browser"를 선택하세요**
>
> `gh auth login` 실행 시 인증 방식을 고르는 화면이 나옵니다.
> **"Login with a web browser"만** 선택하세요.
>
> **토큰(PAT)을 직접 복사/붙여넣기 하는 방식은 절대 사용하지 마세요.**
> - 토큰을 메모장·슬랙에 저장하면 분실·유출 위험
> - 실수로 코드 파일에 붙여넣고 커밋하면 레포 전체 접근 키가 GitHub에 공개됨
> - 브라우저 인증은 토큰이 화면에 노출되지 않아 안전합니다

명령어를 전달하고, 각 단계별 선택지를 미리 안내해 디자이너가 당황하지 않게 한다.

```
gh auth login
```
실행 후 아래 질문이 순서대로 나옴. 괄호 안이 선택할 항목:
1. "What account do you want to log into?" → **GitHub.com** 선택 후 Enter
2. "What is your preferred protocol for Git operations?" → **HTTPS** 선택 후 Enter
3. "Authenticate Git with your GitHub credentials?" → **Y** 입력 후 Enter
4. "How would you like to authenticate GitHub CLI?" → **Login with a web browser** 선택 후 Enter ← **반드시 이것!**
5. 화면에 8자리 코드가 뜨고 브라우저가 열림 → 브라우저에서 코드 입력 후 Authorize 클릭
6. 터미널에 "Logged in as [아이디]" 뜨면 완료

완료 확인:
```bash
gh auth status
```
"Logged in to github.com" 메시지가 뜨면 성공. 확인 후 vercel 로그인으로 안내.

**vercel login 절차**
```
vercel login
```
실행 후:
1. 브라우저가 자동으로 열림
2. "Continue with GitHub" 클릭 → GitHub 계정으로 인증
3. 터미널에 "Logged in as [이메일]" 뜨면 완료

완료 확인:
```bash
vercel whoami
```
계정 이름이 뜨면 성공. 확인 후 레포 생성 단계로 안내.

### 실행 순서

1. **GitHub 레포 생성 + 클론**
   ```bash
   gh repo create <repo-name> --public
   git clone https://github.com/<username>/<repo-name> ../<repo-name>
   ```

2. **Next.js 보일러플레이트 설치**
   ```bash
   npx create-next-app@latest ../<repo-name> --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
   git -C ../<repo-name> add . && git -C ../<repo-name> commit -m "init: Next.js boilerplate"
   git -C ../<repo-name> push -u origin main
   ```

3. **Vercel 연동 + 배포**
   ```bash
   vercel link --cwd ../<repo-name> --yes
   vercel deploy --cwd ../<repo-name> --prod
   ```
   배포 출력에서 Production URL을 확인해 둔다.

4. **Vercel × GitHub 연동 — PR Preview 활성화 (필수)**

   > **이 단계를 건너뛰면 8단계에서 PR을 올려도 Preview URL이 생성되지 않습니다.**
   > 디자이너가 결과물을 미리 볼 수 없게 되므로 반드시 완료해야 합니다.

   아래 순서대로 진행하세요. (클릭 4번으로 끝납니다)

   > **① 아래 링크를 브라우저에서 열어 주세요**
   > `https://vercel.com/dashboard` → 방금 만든 **`<repo-name>`** 프로젝트 클릭
   >
   > **② Settings → Git 탭으로 이동**
   >
   > **③ "Connect Git Repository" 클릭 → GitHub 선택**
   >
   > **④ 저장소 목록에서 `<repo-name>` 선택 → Connect 클릭**
   >
   > "Connected to GitHub" 메시지가 뜨면 완료입니다!

   **연동 확인 방법**: Settings → Git 탭에 `<username>/<repo-name>`이 표시되면 성공.

   완료 후 채팅에 "연동 완료"라고 알려 주세요.

   > 막히면 화면 캡처를 보내 주세요!

5. **완료 처리 — `project/info.md`에 즉시 저장**

   연동 완료 확인 후 AI가 직접 `project/info.md`에 저장한다:
   - `project-name`: 입력받은 프로젝트 이름
   - `github-url`: `https://github.com/<username>/<repo-name>`
   - `vercel-url`: 배포 출력에서 확인한 Production URL

   저장 후 디자이너에게: "info.md에 저장했어요. 2번 단계로 넘어갑니다."

---

## 막혔을 때

- **CLI 에러**: 어떤 에러인지 알려 주시면 바로 해결합니다.
- **수동 진행 중 막힘**: 화면 캡처를 채팅에 보내 주시면 다음 단계를 안내합니다.
- **GitHub 권한 이슈**: Configure/Authorize 화면이 나오면 승인 후 다시 진행.
- **레포가 이미 있음**: 다른 이름으로 재시도하거나 기존 레포를 사용할지 확인.
- **Vercel Preview URL이 8단계에서 안 생김**: 4번(Vercel×GitHub 연동)이 완료됐는지 확인. Settings → Git 탭에서 연동 여부를 확인하고 안 돼 있으면 다시 진행.
