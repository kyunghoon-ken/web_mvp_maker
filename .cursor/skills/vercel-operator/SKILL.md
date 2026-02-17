---
name: vercel-operator
description: Guides 1단계 Vercel deployment and GitHub setup. Use when the user is at stage 1, asks about "배포", "1번", "Vercel", "GitHub 연동", or "Deploy 어떻게 해요", or when they are stuck on the first step.
---

# Vercel Operator (1번 배포)

1단계 "먼저 할 일" 안내와 막혔을 때 도움을 담당한다.

---

## 1단계 안내 (stage 1일 때)

**한 줄 요약**: [Next.js Boilerplate](https://vercel.com/templates/next.js/nextjs-boilerplate) 링크를 누르고, 화면대로 **Deploy → 다음 → 다음** 하면 끝. GitHub 연동·레포 이름만 입력하면 GitHub URL과 Vercel URL이 생긴다.

**순서**:
1. 템플릿 페이지 이동 → **Deploy** 클릭
2. Vercel이 GitHub 연동 안내 → GitHub 권한 승인(처음 1회)
3. Repository Name 입력(예: meet-labs-web) → **Continue / Deploy**
4. 완료 시 Vercel에서 Production URL 표시, GitHub에 새 레포 생성

**입력 보관**: 끝나면 프로젝트명·GitHub URL·Vercel URL을 알려 달라고 안내. AI가 `project/info.md`에 반영.

---

## 막혔을 때

- "화면 캡처를 채팅에 보내 주시면, 다음에 뭘 누르면 되는지 안내해 드릴게요."
- 자주 나오는 상황: GitHub 권한 처음이라 Configure/Authorize 나오면 승인 후 다시 Deploy 단계로. 레포 이름은 원하는 영문 이름으로 입력.
