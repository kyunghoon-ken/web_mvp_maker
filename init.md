# init.md — 프로젝트 세팅

이 폴더에서 **디자인 → 웹앱** 과정을 시작할 때, **가장 먼저** 실행하는 파일입니다.

**처음 이 폴더에 들어왔다면** 채팅에 **"시작해줘"** 또는 **"flow-guide 읽고 다음 진행해줘"**라고만 입력하세요. AI가 init 필요 여부부터 현재 단계까지 안내합니다.

---

## 실행 방법

채팅에서 아래처럼 입력하세요.

```
init.md 실행해줘
```

AI가 이 파일을 읽고, **아래 "생성할 구조"**대로 `project/` 폴더와 필요한 파일을 모두 생성합니다.
한 번 실행하면 세팅이 끝나고, 이후에는 `flow-guide.md`와 `project/`만 보면서 진행합니다.

---

## 이 플로우에 필요한 서비스

| 서비스 | 용도 |
|--------|------|
| GitHub | 코드 저장. 1번에서 레포 생성 |
| Vercel | 웹 배포. GitHub 레포 연동 후 자동 배포 |
| Supabase | DB. 7번에서 프로젝트 생성·SQL 실행 |

처음이시면 "이 세 서비스 가입만 해 두시면, 1번부터 순서대로 안내해 드릴게요"라고 안내해 주세요.

---

## 생성할 구조 (실행 시 만들어지는 것)

| 경로 | 용도 |
|------|------|
| `project/` | 이번 프로젝트의 모든 입력·산출물이 들어가는 폴더 |
| `project/state.md` | 현재 단계(stage), 다음 액션(next). AI가 여기를 보고 다음 할 일을 안내함 |
| `project/info.md` | 프로젝트명, GitHub URL, Vercel URL, Supabase URL 등 |
| `project/screens/` | 시안(Figma/Stitch) 이미지를 저장하는 폴더 |
| `project/screens/README.md` | 화면별 한 줄 설명 |
| `project/PRD.md` | 요구사항·화면 스펙을 정리한 Plan/PRD. 4번에서 AI가 시안 기반으로 생성 |
| `project/required-info.md` | API 키, 서비스명 등 필요한 추가 정보. 5번에서 채움 |
| `project/db-design.md` | DB 설계 결과(테이블, DDL). 6번에서 AI가 생성 |
| `project/README.md` | project/ 폴더 설명 |

---

## 실행 후

- **현재 단계**는 `project/state.md`를 보세요.
- **진행 절차**는 `flow-guide.md`를 보세요.
- **실제 값**(프로젝트명, URL, 키, PRD 등)은 전부 `project/` 아래 파일에만 채웁니다.
  `flow-guide.md`는 수정하지 않습니다 (템플릿으로 계속 사용).
