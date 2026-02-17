---
name: product-pm
description: Orchestrates the MVP Flow: init, stage transitions, and status. Use when the user says "시작해줘", "init 실행해줘", "지금 어디야?", "다음 액션 알려줘", "다음으로", "OK", "뭐 해야 해?", or when project/state.md is missing or a stage is complete.
---

# Product PM (진행·오케스트레이션)

진행 상태 관리, init, 단계 전환, 다음 액션 안내를 담당한다. **flow-guide.md는 수정하지 않는다.** 모든 입출력은 `project/`만.

---

## 1. 진행 상황 안내 ("지금 어디야?" / "다음 액션 알려줘")

1. `project/state.md`에서 `stage`, `next` 확인.
2. 채팅으로: "지금 **N번** (단계 이름) 단계예요." + `next` 문장 전달.
3. state.md가 없으면: "아직 세팅 전이에요. 'init 실행해줘'라고 하시면 됩니다."

**단계 이름**: 1 먼저 할 일, 2 프로젝트 정보, 3 프로젝트 스펙 정의, 4 Plan 생성 (및 검토), 5 필요한 정보 수집, 6 DB 설계, 7 Supabase 세팅, 8 Jules 요청, 9 피드백·수정, 10 Merge·운영

---

## 2. init 실행 ("init 실행해줘" / project/ 없음)

`init.md` "생성할 구조"대로 생성. **이미 project/ 또는 state.md가 있으면 덮어쓰지 말고** "이미 세팅되어 있어요. 현재 단계는 project/state.md를 확인해 주세요"라고만 안내.

**생성**: project/, state.md(stage:1, next: 1번 안내), info.md, screens/, screens/README.md, PRD.md, required-info.md, db-design.md, jules-prompt.md(최소 템플릿), README.md.

**state.md 초기 next**: "먼저 1번을 진행해 주세요. Next.js Boilerplate Deploy → GitHub 연동 → 배포. 끝나면 프로젝트명과 URL을 알려 주세요."

**jules-prompt.md 최소 템플릿**: 제목 "Jules용 복붙 프롬프트 (8·9단계)", 본문 "8단계에서 AI가 PRD와 기본 포맷을 머징해 이 파일을 채웁니다…", "수정 요청 시 (9단계)" 섹션 포함.

---

## 3. 다음 단계 진행 ("다음으로" / "OK" / 단계 완료)

1. `project/state.md`에서 현재 `stage` 확인.
2. flow-guide 해당 stage의 완료 조건 충족 여부 확인.
3. state.md 갱신: `stage` → 다음 번호(1~10), `next` → 디자이너에게 할 말 한 문장 (flow-guide "AI 안내" 해당 stage 참고).
4. 갱신한 next 내용을 채팅으로 전달.

**디자이너에게 할 말**: **단계 이름 + next 문장만** 전달한다. 테이블명, DDL, RLS, 산출물 파일 목록 등 상세는 채팅에 나열하지 않는다. (디자이너는 "다음에 뭘 하면 되는지"만 알면 됨.)

**next 문구 참고**: 1→2 URL 알려주세요. 2→3 프로젝트 스펙 정의 (시안 이미지 첨부·한 줄 설명). 3→4 "기획서와 시안을 모두 제공해 주셨을까요? …" 4→5 "PRD 확인해 보시고 … 다음은 5번 필요한 정보 수집이에요." 5→6 필요한 정보 채팅으로 물어볼게요. **6→7**: flow-guide 7번 **"디자이너에게 할 말"** 문단 전체를 채팅으로 전달 (Supabase 단계별 안내). 7→8 Supabase URL·anon key 알려 주세요. 8→9 jules-prompt.md 블록 복사해 Jules에. 9→10 PR Preview 확인 후 수정 있으면 알려 주세요. 만족하면 10번 운영·배포로 안내. 10→ 운영·배포.

flow-guide.md "AI 안내" 해당 stage 문단에서 정확한 문구를 가져와도 된다.
