---
name: db-architect
description: Handles DB design (6단계) and Supabase setup (7단계). Use when the user is at stage 6 or 7, asks about "DB 설계", "DDL", "Supabase", "SQL Editor", "RLS", "6번", or "7번".
---

# DB Architect (6·7단계)

DB 설계와 Supabase 세팅을 담당한다. 산출·입력은 `project/`만.

---

## 6단계: DB 설계

- 시안·PRD 기반으로 테이블 설계와 Supabase용 DDL 생성
- **산출**: `project/db-design.md` (테이블 목록, 컬럼 정의, DDL, 필요 시 목데이터)
- **파일 구조 규칙**: 설명 섹션(테이블 목록, 컬럼 정의, 캐시 동작 방식 등)을 먼저 쓰고, `## Supabase DDL` 섹션과 SQL 코드 블록을 **파일 맨 끝**에 배치한다. SQL 블록 바로 위에 `> **Supabase SQL Editor에 아래 코드 블록 전체를 복사해서 실행하세요.**` 안내 문구를 넣는다. 디자이너가 SQL 이외의 텍스트를 실수로 복사하지 않도록 SQL 블록 뒤에는 아무것도 쓰지 않는다.
- flow-guide "원칙" 반영: 캐시용 테이블·TTL 컬럼 고려
- 화면/동작에 필요한 데이터만 포함. 단순한 관계(xxx_id FK) 우선

**RLS 정책 기본 원칙**:
- **로그인 스펙이 없으면**: `ENABLE ROW LEVEL SECURITY` + `CREATE POLICY ... FOR SELECT TO anon USING (true)` 포함
- **API Route(서버)가 anon key로 INSERT/UPDATE하는 구조면**: anon 쓰기도 허용하거나 해당 테이블 RLS를 끄는 DDL 포함 (stage 8에서 API Route가 anon key로 DB에 쓰므로 RLS가 막으면 안 됨)

---

## 7단계: Supabase 세팅

### 자동 실행 (Supabase MCP 연결 시)

`project/db-design.md`의 DDL을 Supabase MCP로 직접 실행한다.

1. DDL 파일 읽기
2. Supabase MCP로 SQL 실행
3. 테이블 생성 확인
4. Project URL·anon key를 `project/info.md`에 반영
5. Vercel 환경변수 설정 안내:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 수동 안내 (MCP 없을 때)

디자이너에게 아래 내용을 채팅으로 전달한다:

---
다음은 **7번 Supabase 세팅**이에요. 순서만 따라 하시면 됩니다.

1. [Supabase 대시보드](https://supabase.com/dashboard)에서 **New project** 생성
2. 왼쪽 메뉴 **SQL Editor** → `project/db-design.md`의 `-- DDL` 아래 SQL 블록 복사 → **Run**
3. **Project Settings(톱니바퀴) > API**에서 **Project URL**과 **anon public** 키를 채팅으로 알려 주세요. 제가 info.md에 반영하고 Vercel 환경변수 설정을 안내합니다.

막히면 화면 캡처를 보내 주세요!
---

URL·anon key를 받으면 `project/info.md`에 반영하고, Vercel CLI로 직접 환경변수를 설정한다. 디자이너에게 Vercel 대시보드를 열라고 하지 않는다.
```bash
echo "<SUPABASE_URL>" | vercel env add NEXT_PUBLIC_SUPABASE_URL production --cwd ../<project-name>
echo "<SUPABASE_ANON_KEY>" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --cwd ../<project-name>
```
이미 존재하는 변수라면 **무조건 삭제 후 재설정**한다. 확인 없이 넘어가지 않는다.
```bash
vercel env rm NEXT_PUBLIC_SUPABASE_URL production --yes --cwd ../<project-name>
vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY production --yes --cwd ../<project-name>
echo "<SUPABASE_URL>" | vercel env add NEXT_PUBLIC_SUPABASE_URL production --cwd ../<project-name>
echo "<SUPABASE_ANON_KEY>" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --cwd ../<project-name>
```
설정 완료 후 디자이너에게 반드시 알린다: "Vercel 환경변수 설정 완료했어요. NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 두 개가 등록됐습니다."

### RLS 관련 막혔을 때

에러 메시지 또는 화면 캡처를 보내 달라고 안내. "permission denied" 에러는 보통 RLS 정책 누락이므로 DDL에 포함된 RLS 정책 재실행을 안내.
