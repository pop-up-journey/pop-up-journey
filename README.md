
<a href="https://pop-up-journey.vercel.app"><img width="1000" height="450" alt="Image" src="https://github.com/user-attachments/assets/23a0a033-cbc9-4d49-8f9a-73c476976ce5" /></a>

<div align="center"><a href="https://pop-up-journey.vercel.app">✨서비스 링크✨</a> </div>

## 🚀 프로젝트 간단 소개! 
**팝업의 여정**은 누구나 쉽게 팝업 이벤트를 개설하고 참여할 수 있도록 돕는 Next.js 기반의 프론트엔드 프로젝트입니다.

- 현실적으로 빠르게 성장 중인 팝업스토어 시장에 초점을 맞춘 기획
- 참여 신청, 이벤트 등록 등 다양한 폼 처리 및 사용자 친화적 UI/UX 구현
- 효율적 상태 관리, 성능 최적화와 유지보수에 중점

## 🌟 주요 기능
- **회원 인증 및 접근 권한 관리**
  - 소셜/이메일 로그인 및 보호된 페이지 접근 제어

- **프로필 관리**
  - 나의 정보 조회 및 수정, 참여 내역/즐겨찾기 팝업 목록 확인
  - 회원 탈퇴 등 계정 관리 기능 제공

- **호스트 센터(대시보드)**
  - 새로운 이벤트 등록
  - 등록된 팝업 이벤트 통계 조회, 이벤트별 상세 데이터 확인

- **관심 팝업 저장 및 프로필에서 관리**

- **팝업 스토어 검색 및 필터링**
  - 키워드, 지역, 태그 기반의 다중 조건 검색과 필터 제공

- **사용자 경험을 높이는 최적화**
  - 비동기 데이터 캐싱, 상태 관리(즐겨찾기 영속화 등), 접근성 및 반응형 UI


## 📌 기술 스택 & 기술적 의사결정
<table>
  <tr>
    <td>

**Language & Framework**<br/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white">

**Code Quality**<br/>
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
<img src="https://img.shields.io/badge/husky-000000?style=for-the-badge&logo=git&logoColor=white">

**State Management**<br/>
<img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white">

**Authentication**<br/>
<img src="https://img.shields.io/badge/Auth.js-191919?style=for-the-badge&logo=nextauth&logoColor=black">

**Validation**<br/>
<img src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">

</td>
<td>

**Design System & Style**<br/>
<img src="https://img.shields.io/badge/heroui-000000?style=for-the-badge&logo=heroui&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

**Database & ORM**<br/>
<img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">
<img src="https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=white">

**Utils & 문서화**<br/>
<img src="https://img.shields.io/badge/React--Haiku-E36C38?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black">

**Project Management**<br/>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/GitHub%20Projects-181717?style=for-the-badge&logo=github&logoColor=white">

</td>
  </tr>
</table>

---
### 🔹 **TypeScript + Linting 파이프라인**

- 타입 안정성과 코드 일관성을 확보, 사전 오류를 차단하여 코드 품질을 유지하고 일관된 스타일을 보장
  - TypeScript : 컴파일 단계에서 타입 오류 사전 차단
  - ESLint : 잠재적 버그·코드 스멜 탐지
  - Prettier – 코드 스타일 자동 정렬
  - Husky + lint‑staged : 커밋 전에 코드 검사 자동화 및 불필요한 오류 방지
  ```
      // husky: commit-staged
      merge: 브랜치 병합
      feat: 새로운 기능 추가
      fix: 버그 수정
      refactor: 코드 리팩토링
      design: 디자인, UI 변경
      comment: 주석 추가, 주석 수정
      test: 테스트 추가, 테스트 수정
      chore: 기타 변경사항, asset폴더의 img 추가 등
      rename: 파일 이름 변경
      remove: 파일 이동 및 삭제
  ```

---

### 🔹 **Next.js**

- 서버 컴포넌트/액션 및 다양한 렌더링 방식(ISR, SSR, CSR) 지원  
- 빠른 개발, 서버리스 배포, SEO 친화성

---

### 🔹 **Auth.js**

- 인증/세션 관리 및 소셜로그인 구현 용이  
- Next.js와 높은 호환성

---

### 🔹 **Zustand**

- 간결하고 성능 최적화된 전역 상태 관리를 위해 Zustand 도입
- 폼 데이터, 인증, 검색 캐싱, 즐겨찾기 등 다양한 상태를 독립적이고 모듈화된 스토어로 관리함으로써 비즈니스 로직과 UI 분리 강화
- 로컬 스토리지와 연동이 편리함
- 스토어 간 동기화(인증 상태 변화 시 즐겨찾기 동기화 등)
- 유지보수성과 확장성을 모두 확보할 수 있다는 점

---

### 🔹 **Tailwind CSS & HeroUI**

- 빠르고 일관된 UI/UX 구현  
- 접근성·사용성을 고려한 컴포넌트

---

### 🔹 **Drizzle ORM & Zod**

- 스키마 기반의 타입 안전성과 확장성 보장
  - SQL 문법과 TypeScript 지원
  - 런타임 타입 오류 방지
  - 스키마기반으로 유지보수가 쉬움
  - Zod를 통해 백엔드에서 정의한 스키마를 클라이언트까지 안전하게 확장

---

### 🔹 **React-Haiku**

- react-haiku의 경량화된 유틸리티들을 적극 활용함으로써 직접 커스텀하여 구현하는 부담은 줄이고 재사용성 높은 코드베이스를 구축할 수 있다고 판단하여 도입
  - **React 전용 훅 기반**으로 구성되어 있어 최적화가 잘 되어 있으며 React의 동작 방식과 자연스럽게 통합
  - 소스코드가 **간단하고 직관적**으로 작성되어 있어 확장성과 이해도가 높음
  - **개발에 필요한 기능들이 적절하게 포함**되어 있어 실용성이 뛰어남
  - **8KB의 매우 가벼운 용량**

---

### 🔹 **GitHub-Flow 전략**

- **2인 팀에 적합한 간결하고 직관적인 브랜치 전략**
    - Git Flow와 같은 복잡한 브랜치 전략보다 기능 단위로 feature/ 브랜치를 만들어 작업 후 `main`에 머지하는 방식으로 협업 속도와 브랜치의 명확성을 높힘

- **`main` 브랜치의 프로덕션 코드 유지**
    - 항상 최신의 안정된 코드가 `main`브랜치에 위치할 수 있도록 개발하여 빠른 프로덕션 모드로 전환이 가능

- **PR과 Project-Dashboard를 활용한 협업**
    - GitHub의 Project Dashboard를 활용해 각 작업을 명확히 분배
    - PR 리뷰를 빠르게 처리함으로써 작업 충돌을 방지하고 개선사항을 즉각 반영

 
## 📁 폴더 구조 
```
src/
├── 📁 app/                # Next.js 라우팅 및 API 핸들러 관리 (App Router 기반)
├── 📁 assets/             # 이미지, 폰트 등 정적 리소스
├── 📁 components/         # 공통 UI 컴포넌트 (버튼, 모달 등)
├── 📁 configs/            # 전역 설정 파일 (env, constants 설정 등)
├── 📁 db/                 # 데이터베이스 설정 및 Prisma 스키마 관리
├── 📁 features/           # 페이지별 주요 기능 모듈
│   └── 📁 [slices]/       # 도메인 단위 기능 폴더
│       ├── 📁 api/            # 서버 API 연동 로직
│       ├── 📁 services/       # 비즈니스 로직
│       ├── 📁 hooks/          # 해당 기능 전용 커스텀 훅
│       ├── 📁 types/          # 해당 기능에서만 쓰이는 타입 정의
│       └── 📁 components/     # 해당 기능 전용 UI 컴포넌트
├── 📁 hooks/             # 프로젝트 전반에서 재사용 가능한 커스텀 훅
├── 📁 libs/              # API 클라이언트, 인증 등 외부 라이브러리 래퍼
├── 📁 providers/         # ThemeProvider, AuthProvider 등 글로벌 컨텍스트 제공자
├── 📁 routes/            # URL/라우팅 경로 상수 정의
├── 📁 services/          # 공통 서비스 로직
├── 📁 store/             # Zustand 기반 상태관리 스토어
├── 📁 stories/           # Storybook 구성 및 스토리 정의
├── 📁 styles/            # 전역 스타일 및 Tailwind 설정
├── 📁 types/             # 전역 타입 정의 (예: 유저, API 응답 타입 등)
└── 📁 utils/             # 공통 유틸리티 함수 (예: 날짜 포맷, 숫자 변환 등)
```
**FSD(Feature-Sliced Design)** 의 핵심 개념을 차용한 폴더 구조 설계

1. **기능 단위로 코드를 관리**
    각 도메인을 독립적으로 나누어 기능별로 개발할 수 있으며 기능 추가/수정 시 다른 영역에 영향을 주지 않도록 설계 가능
    
2. **관심사 분리**
    `segment`의 확장을 통해 코드의 목적과 책임을 명확히 할 수 있음
    
3. **높은 응집도와 낮은 커플링**
    각 기능과 관련된 로직과 UI, 상태관리, API 연동 등을 하나의 `slices`내부에 모아둠으로써 기능별 높은 응집도를 갖음과 동시에 다른 기능과의 의존도 최소화

    
React 프로젝트에서 흔히 사용하는 `components`, `hooks`는 단일 폴더로는 확장성과 복잡도를 감당하기 어렵다고 판단하여 각 기능(`slices`) 내부에 `components`, `hooks`, `api`, `services`, `types`를 함께 구성 <br />
이를 통해 전역과 로컬의 경계를 명확히하며 각 기능이 독립적으로 동작할 수 있도록 구성함과 동시에 한 명의 개발자가 하나의 기능을 온전히 맡아 개발할 수 있어 마치 개인 프로젝트처럼 독립적으로 작업이 가능하고 동시에 전체 시스템과의 충돌이나 의존성을 최소화해 유저보수성과 개발효율을 향상 시킴


## 🧭 유저 플로우
- 모든 일반 사용자
<img width="3296" height="2000" alt="Image" src="https://github.com/user-attachments/assets/b40246c3-3d34-4e8a-888a-147dbec99599" />

- 호스트
<img width="3296" height="1472" alt="Image" src="https://github.com/user-attachments/assets/d91a355a-bddb-44d9-83d2-0c78098c10ac" />

## ⚙️ ERD
<img width="1645" height="1301" alt="Image" src="https://github.com/user-attachments/assets/671b2653-9757-4fe4-8da6-2896051b2b24" />

## 🖥️ 화면 미리보기
### 🏠 메인페이지  
![MainPage](https://github.com/user-attachments/assets/7b53bca7-e8b6-4a6d-8efd-371074df9b4b)
<details>
<summary> 다른 페이지 더보기</summary>

<br />

### 🔐 로그인  
![SocialLogin](https://github.com/user-attachments/assets/0b3ed1ff-4b33-48b8-8c67-e0f3be46b7d4)


### 🔎 헤더 검색 기능  
![HeaderSearch](https://github.com/user-attachments/assets/494f864e-f238-4efa-9f87-df690fed3d9c)

### 🧩 검색 페이지 필터링  
![SearchPage](https://github.com/user-attachments/assets/4932a4da-0133-4a82-a9bd-d41a6252e2c5)

### 📄 디테일 페이지  
![DetailPage](https://github.com/user-attachments/assets/6c6fc7cf-0b76-4ff1-85e4-42f7fb4bc64e)

### 👤 프로필 페이지 & 수정  
![Profile](https://github.com/user-attachments/assets/b67c94ce-cc89-44c1-9094-bac62cca6d40)

### 📊 호스트 센터  
![HostCenter](https://github.com/user-attachments/assets/5e3ca4bb-651a-455b-a18e-f89bb5890272)

### 📝 팝업 등록 페이지  
![Register](https://github.com/user-attachments/assets/1b230c92-8027-4073-9fcc-56d62e64c394)

### 📱 반응형 화면  
![Responsive](https://github.com/user-attachments/assets/99be014b-70a9-407c-9b1c-03ed7d4cee25)

</details>

## 😎 팀원

<table>
  <tr align="center">
    <td><img src="https://avatars.githubusercontent.com/u/158163589?v=4" width="150" height="150" /></td>
    <td><img src="https://github.com/wrikit/wrikitFront/assets/67899735/0f3f503d-5123-48c8-8845-f58f8b3a795c" width="150" height="150"/></td>
   </tr>
  <tr align="center">
    <td><a href="https://github.com/HighRol1er">조성윤 a.k.a Hunter_Joe OR HighRoller🎲</a></td>
    <td><a href="https://github.com/uj-kim">김유정 a.k.a 유정 Queen👑</a></td>
  </tr>  
</table>

