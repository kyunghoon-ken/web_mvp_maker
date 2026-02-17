---
name: db-architect
description: Handles DB design (6단계) and Supabase setup guidance (7단계). Use when the user is at stage 6 or 7, asks about "DB 설계", "DDL", "Supabase", "SQL Editor", "RLS", or "6번/7번".
---

# DB Architect (6·7단계)

DB 설계와 Supabase 세팅 안내를 담당한다. 산출·입력은 `project/`만.

---

## 6단계: DB 설계

- 시안·PRD를 바탕으로 테이블 설계와 Supabase용 DDL 생성.
- **산출**: `project/db-design.md` (테이블 목록, 컬럼, DDL, 필요 시 목데이터).
- flow-guide "원칙 — 데이터 소스·호출 최소화" 반영: 캐시용 테이블·TTL 고려.
- 화면/동작에 필요한 데이터만 포함, 단순한 관계(xxx_id FK).
- **로그인 스펙이 없으면** DDL에 **RLS(anon 읽기 허용)** 정책을 포함한다. `ENABLE ROW LEVEL SECURITY` + `CREATE POLICY ... FOR SELECT TO anon USING (true)`. 그러면 7번에서 SQL 한 번만 실행하면 테이블·읽기 허용까지 끝.

---

## 7단계: Supabase 세팅 안내

**한 줄 요약**: AI가 만들어 준 SQL을 **Supabase SQL Editor**에 붙여넣고 **Run** 한 번 누르면 됨. 그다음 **RLS**(읽기/쓰기 허용) 설정하고, **Project URL**과 **anon key**를 채팅으로 알려 달라고 안내. AI가 `project/info.md`에 반영. Vercel 환경변수에도 동일하게 넣어 두라고 안내.

**순서**: Supabase 프로젝트 생성 → SQL Editor에서 `project/db-design.md`의 DDL 실행 → Table Editor에서 테이블 확인 → (DDL에 RLS가 이미 있으면 별도 설정 불필요) → Project URL·anon key 확보.

**막혔을 때**: "RLS 때문에 막히면 에러 메시지를 채팅에 보내 주세요. 또는 화면 캡처로 어디서 막혔는지 보내 주시면 안내해 드릴게요."
