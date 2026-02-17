---
name: jules-bridge
description: Bridges between the project and Jules: 8단계 Jules usage guidance and 9단계 modification block. Use when the user is at stage 8 or 9, says "Jules에 수정 요청 넣어줘", "Jules 어떻게 써요", "수정 요청 블록 만들어줘", or after Preview feedback discussion.
---

# Jules Bridge (8·9단계)

Jules 사용 안내와 수정 요청 블록 추가를 담당한다. 변경하는 파일은 `project/jules-prompt.md`만. **flow-guide.md는 수정하지 않는다.**

---

## 8단계: Jules 사용 방법 안내

채팅에서 순서대로 안내:

1. Jules 접속·로그인
2. **먼저 GitHub repo 선택 (필수).** **Choose a repo**에서 이번 프로젝트 레포를 선택한다. **1번에서 신규로 만든 레포**는 목록에 안 보일 수 있음 → **Configure repo access** → GitHub에서 Repository access에 해당 레포 추가 → Save → Jules로 돌아와 **Choose a repo**에서 해당 레포 선택. **repo를 선택한 뒤에만** 프롬프트·시안을 보낸다.
3. 새 작업 시작
4. **project/jules-prompt.md** 첫 번째 블록 전체 복사해 Jules에 붙여넣기
5. project/screens/ 시안 이미지 첨부
6. 전송. PR 오면 9번 포맷으로 피드백 안내

Supabase는 이미 Vercel에 세팅돼 있으면 그대로 두면 됨.

**jules-prompt.md**에 넣는 구현 규칙에는 **로깅(필수, 빡세게)** 요구사항을 반드시 넣는다. 다음을 **기술** 섹션에 구체적으로 적는다: 크롤링(요청 시작/종료, 수집된 행 수·0이면 명시, 응답 상태·에러 메시지), DB(INSERT/UPDATE 전·후·영향 행 수, SELECT 결과 행 수, Supabase/쿼리 에러), API Route(호출 시점, 응답 상태 코드, 반환 데이터 개수 또는 에러), 에러 시 스택 또는 console.error로 원인 파악 가능하게. empty view·에러 원인 추적용으로 매 프로젝트 동일 적용.

---

## 9단계: 수정 요청 블록 추가

1. **블록 작성**: 타임스탬프 + `[수정 요청]` + 번호·항목(상세 요청). 내용은 `[페이지] + [무엇을] + [어떻게]` 포맷 권장.
2. **파일 반영**: `project/jules-prompt.md` 맨 아래 "수정 요청 블록" 섹션에 추가. 맨 위에 **현재 시간 `YYYY.MM.DD HH:mm`** 기록.
3. **채팅에 붙여넣기**: 같은 블록 전체를 채팅에도 붙여 넣고, "아래 블록을 복사해서 Jules 채팅에 붙여넣으세요"라고 안내.

**블록 형식**:
```
YYYY.MM.DD HH:mm
[수정 요청]

1. (항목) — (한 줄)
• (상세)
2. …
```

반영 후 **반드시** 채팅에 블록을 붙여 넣어 디자이너가 파일 없이 복사할 수 있게 한다.
