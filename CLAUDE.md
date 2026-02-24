# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

디자이너가 채팅만으로 Next.js + Supabase + Vercel 웹앱을 완성하는 **10단계 MVP 워크플로우 프레임워크**. Claude가 전 과정을 직접 실행한다 — 코드 구현, 배포, DB 세팅 모두 포함.

실제 웹앱 코드는 별도 GitHub 레포에 있고, 이 워크스페이스는 그 레포를 클론·구현·배포하는 제어 센터다.

---

## 오케스트레이터 규칙

- **항상** `project/state.md`를 먼저 읽고 `stage`, `next`를 확인한 뒤, 해당 단계 액션을 실행한다.
- 모든 입력·산출은 **`project/`** 아래 파일에만 반영한다. **`flow-guide.md`는 수정하지 않는다.**
- 디자이너에게는 "채팅만 보면 된다"고 안내하고, 다음 액션은 `state.md`의 `next`와 flow-guide 해당 stage 안내를 조합해 말한다.
- 단계가 완료되면 **매 단계 완료 시** `project/state.md`의 `stage`와 `next`를 갱신한다.
- **stage 8 (AI 구현)**: target repo를 직접 클론하고 코드를 구현한다. 외부 AI를 거치지 않는다.

---

## 시작 방법

**항상 `project/state.md`를 먼저 읽는다.** `stage`와 `next`를 확인한 뒤 해당 단계 액션을 실행.

- `project/state.md` 없음 → "init 실행해줘"를 안내하거나 직접 init 실행
- `project/` 없음 → `init.md` 읽고 폴더 구조 생성

---

## 단계별 스킬 파일 — 반드시 읽고 따른다

해당 stage에 진입하면 **스킬 파일을 먼저 읽은 뒤** 그 지침을 따라 실행한다. 스킬 파일보다 이 파일의 지침이 충돌할 경우 스킬 파일을 우선한다.

| Stage | 진입 시 반드시 읽을 파일 |
|-------|--------------------------|
| 1 | `.claude/skills/vercel-operator.md` |
| 6, 7 | `.claude/skills/db-architect.md` |
| 8, 9 | `.claude/skills/coder.md` |
| init · 단계 전환 · "지금 어디야?" | `.claude/skills/product-pm.md` |

---

## 10단계 흐름 및 실행 방식

| 단계 | 내용 | 실행 방식 |
|------|------|-----------|
| 1 | GitHub 레포 + Vercel 배포 | `gh repo create` + `vercel deploy` → URL 자동 저장 |
| 2 | 프로젝트 정보 확인 | AI가 자동 저장한 info.md 디자이너가 확인 (수동 진행 시 URL 직접 입력) |
| 3 | 시안 이미지 분석 | 이미지 직접 읽기 (멀티모달) → `project/screens/` 저장 |
| 4 | PRD 생성 | 시안+기획 기반 작성 → `project/PRD.md` |
| 5 | 필요 정보 수집 | 채팅 Q&A → `project/required-info.md` |
| 6 | DB 설계 | DDL 생성 → `project/db-design.md` |
| 7 | Supabase 세팅 | Supabase MCP 직접 실행 (또는 수동 안내) |
| 8 | AI 직접 구현 | `gh repo clone` → 코드 작성 → `gh pr create` |
| 9 | 피드백·수정 | 브랜치 직접 수정 → `git push` |
| 10 | Merge·배포 | `gh pr merge` (또는 수동) |

---

## 단계 되돌리기

디자이너가 "N번으로 돌아가줘", "3번 다시 해줘", "PRD 수정하고 싶어" 같이 이전 단계 재실행을 요청하면:
1. `project/state.md`의 `stage`를 해당 번호로 갱신한다.
2. 해당 stage의 스킬 파일을 읽고 처음부터 다시 실행한다.
3. 이미 만들어진 산출물(예: PRD.md)은 덮어쓰기 전에 "기존 내용을 덮어써도 될까요?"라고 확인한다.

---

## Stage별 핵심 지침

### Stage 1 — GitHub + Vercel
상세 지침: `.claude/skills/vercel-operator.md` **← 반드시 먼저 읽는다**
```bash
gh auth status
gh repo create <name> --public
git clone https://github.com/<username>/<name> ../<name>
vercel link --cwd ../<name> --yes && vercel deploy --cwd ../<name> --prod
```
완료 즉시 GitHub URL, Vercel URL, 프로젝트명 → `project/info.md`에 **AI가 직접 저장**.

### Stage 2 — 프로젝트 정보 확인
Stage 1을 AI가 직접 실행했다면 info.md가 이미 채워져 있다.
- **자동 완료**: "info.md에 저장됐어요. 확인해 주세요." → 디자이너 확인 후 다음 단계.
- **수동 진행한 경우**: 프로젝트명, GitHub URL, Vercel URL을 채팅으로 받아 info.md에 저장.

### Stage 3 — 시안 분석
이미지를 Read 도구로 직접 읽는다. 텍스트 설명 없이 이미지만으로 화면 스펙 추출 가능.
저장: `project/screens/<번호>-<화면명>.png`

### Stage 4 — PRD 작성
두 관점 필수:
- **기획자**: 요구사항, 화면 스펙, 예외 시나리오, 사용자 메시지
- **개발자**: 데이터 전략 (후보 소스 2~3개, 난이도/리스크, 권장안, 캐시 전략 + TTL)

### Stage 7 — Supabase
상세 지침: `.claude/skills/db-architect.md` **← 반드시 먼저 읽는다**

Supabase MCP 연결 시 DDL 직접 실행. 없으면 수동 안내:
- SQL Editor에 `project/db-design.md` DDL 붙여넣기
- Project URL + anon key → `project/info.md`
- Vercel 환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Stage 8 — 직접 구현 (핵심)
상세 지침: `.claude/skills/coder.md` **← 반드시 먼저 읽는다**
```bash
gh repo clone <github-url> ../<project-name>
git -C ../<project-name> checkout -b feature/ai-implementation
# lib/supabase.ts → app/api/... → app/... (페이지·컴포넌트)
git -C ../<project-name> add . && git commit -m "feat: AI implementation"
git -C ../<project-name> push -u origin feature/ai-implementation
gh pr create --repo <github-url> --title "AI Implementation" --base main
```
**로깅 필수**: 크롤링/DB/API Route 전 구간에 console 로그. Vercel 로그에서 즉시 추적 가능해야 함.

### Stage 9 — 수정
상세 지침: `.claude/skills/coder.md` **← 반드시 먼저 읽는다**
```bash
git -C ../<project-name> checkout feature/ai-implementation
git -C ../<project-name> add . && git commit -m "fix: <내용>" && git push
```

### Stage 10 — Merge
```bash
gh pr merge <pr-number> --repo <github-url> --merge
```

---

## 핵심 파일

| 파일 | 역할 |
|------|------|
| `project/state.md` | 현재 stage + next 액션. **모든 진입점** |
| `project/info.md` | GitHub URL, Vercel URL, Supabase URL/key |
| `project/PRD.md` | 요구사항 전체 |
| `project/db-design.md` | Supabase DDL |
| `project/screens/` | 시안 이미지 |
| `flow-guide.md` | 단계별 상세 지침 (수정 금지) |
| `.claude/skills/` | 단계별 스킬 파일 |

---

## 중요 제약

- 모든 입출력은 `project/` 안에서만. `flow-guide.md`는 수정하지 않는다.
- 코드 구현은 target repo(`../<project-name>`)에서만 한다.
- `project/`와 `scripts/`는 `.gitignore` 처리 — 이 워크스페이스 레포에 커밋하지 않는다.
- 외부 API/크롤링은 Supabase TTL 캐시로 호출 최소화.
- 크롤링 전 robots.txt·이용약관 확인.
