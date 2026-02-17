# 복붙용 프롬프트

**Supabase**: 이미 Vercel 환경변수에 넣어 두었다면 Jules 프롬프트에 값을 다시 넣을 필요 없습니다. Vercel에 아직 안 넣었다면 `project/info.md`에서 URL·anon key를 복사해 Vercel에 먼저 세팅하세요.

---

## GPT용 (DB 설계, 7단계)

**7단계(DB 설계)에서** ChatGPT를 쓰려면 아래 블록을 복사해 붙여넣고, 시안(Stitch/Figma) 스크린샷 + **project/screens/README.md**(화면 설명)을 함께 보내세요.

```
너는 제품 설계자이자 Supabase DB 설계자다. 아래 시안(Stitch/Figma) 화면(스크린샷/설명)을 보고 "로그인 없는 웹 MVP"에 필요한 Supabase DB 스키마를 만들어줘.

규칙:
- 화면에 보이거나 동작에 필요한 데이터만 포함(미래 확장/추측 금지)
- 테이블은 단순하게
- 관계는 단순하게 xxx_id FK로만 연결
- 이미지/링크는 URL string
- 배열/옵션은 jsonb 또는 text[]로 최소화
- 인증/권한/RLS는 이번 단계에서 제외(나중)

출력 형식:
A) 테이블 목록과 용도(한 줄씩)
B) 테이블별 컬럼(+타입, nullable 여부, 기본값)
C) PK/FK 관계
D) Supabase(Postgres)에서 실행 가능한 CREATE TABLE SQL(DDL)
E) 목데이터 예시(각 테이블 3~5개 rows)
```

**결과가 과하게 복잡할 때 보정용 한 줄:**
```
테이블 2개로 줄여줘. 그리고 컬럼은 화면에 보이는 것만 남겨줘.
```

---

## Jules용 (8단계)

**project/jules-prompt.md**에서 복사해서 Jules에 붙여넣으세요. (AI가 PRD와 기본 포맷을 머징해 둔 파일입니다. Jules 사용 방법은 AI가 채팅으로 안내.)
