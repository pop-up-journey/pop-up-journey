# 🚀 Pop-Up Journey

🌐 배포 링크 https://pop-up-journey.vercel.app

## 프로젝트 간단 소개! 
사용자가 간편하게 팝업 이벤트를 개설하고 참여할 수 있도록 돕는 Next.js 기반 프론트엔드 프로젝트

### ⭐ 프로젝트 목표

✅ 최근 빠르게 확산되는 팝업스토어 문화를 반영한 현실적인 주제
✅ 참여 신청, 이벤트 등록 등 다양한 폼 처리 로직 구현
✅ 사용자 친화적인 UI/UX, 효율적인 상태 관리 및 성능 최적화에 중점

# 🧭User-Flow

# ⚙️ ERD

# 📌 주요 기술 스택 & 기술적 의사결정
<table>
  <tr>
    <td>

✔️ **Language & Framework**<br>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white">

✔️ **Code Quality & Git Hooks**<br>
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
<img src="https://img.shields.io/badge/husky-000000?style=for-the-badge&logo=git&logoColor=white">

✔️ **State management**<br>
<img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white">

✔️ **Authentication**<br>
<img src="https://img.shields.io/badge/Auth.js-191919?style=for-the-badge&logo=nextauth&logoColor=black">

✔️ **Validation**<br>
<img src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">

</td>
<td>

✔️ **Design System & Style**<br>
<img src="https://img.shields.io/badge/heroui-000000?style=for-the-badge&logo=heroui&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">

✔️ **Database & ORM**<br>
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">
<img src="https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=white">

✔️ **Utils**<br>
<img src="https://img.shields.io/badge/React--Haiku-E36C38?style=for-the-badge&logo=react&logoColor=white">

✔️ **API Documentation**<br>
<img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black">

✔️ **Project Management**<br>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/GitHub%20Projects-181717?style=for-the-badge&logo=github&logoColor=white">

</td>
  </tr>
</table>

## 기술적 의사결정
### 🔹 **TypeScript**

- 타입을 통해 코드의 신뢰성과 유지보수성을 향상시키기 위해 선택
    - 컴파일 단계에서 오류 방지
    - 프로젝트에서 코드 품질 관리 용이
    - eslint를 통한 코드 신뢰성 증가

---

### 🔹 **Next.js**

- 서버리스 어플리케이션빠른 개발과 최적화를 동시에 추구하기 위해 선택
    - **서버 컴포넌트** 및 **서버 액션**을 활용해 서버와의 연결 최적화
    - **ISR, SSR, CSR** 등 상황에 따라 유연한 렌더링 전략 적용 가능
    - SEO 친화적

---

### 🔹 **Auth.js**

- 인증 및 세션 관리를 쉽게 구축하기 위해 Auth.js를 사용했습니다.
    - 다양한 소셜 로그인 방식 지원
    - Next.js와의 높은 호환성
    - 세션 및 토큰 기반 인증을 간편하게 구성 가능

---

### 🔹 **Zustand - form 상태**

- 전역 상태 관리 라이브러리로, React 애플리케이션에서 불필요한 렌더링을 최소화하며 간결한 상태관리를 가능하게 합니다.
    - useShallow 및 개별 구독을 통한 최적화
    - Selector 기반의 가벼운 구독 시스템
- 

---

### 🔹 **Tailwind CSS & HeroUI**

- 디자인 시스템 구축 시 빠르고 일관된 UI를 만들기 위해 선택했습니다.
    - Tailwind CSS로 유틸리티 중심의 빠른 스타일링 가능
    - HeroUI로 접근성과 UX를 고려한 컴포넌트 사용
    - 디자인 시스템이 코드 기반으로 통합됨으로써 유지보수 용이

---

### 🔹 **Drizzle ORM & Zod**

- 타입 안정성과 마이그레이션 시스템이 강화된 타입 안전 ORM
    - SQL 친화적인 문법과 완벽한 TypeScript 지원
    - 런타임 타입 오류 방지
    - 구조화된 스키마로 유지보수가 쉬움
    - Drizzle과 Zod는 둘다 스키마 기반으로 작동해 서버와 클라이언트 간 타입 일관성과 유효성 검사 통합 가능해 백엔드에서 정의한 스키마를 클라이언트까지 안전하게 확장 가능

---

### 🔹 **ESLint, Prettier, Husky**

- 코드 품질 유지와 일관된 스타일을 보장하기 위해 구성
    - ESLint: 코드 규칙 강제 및 잠재적 오류 사전 감지
    - Prettier: 코드 스타일 일관성 유지
    - Husky + lint-staged: 커밋 전에 코드 검사 자동화하여 불필요한 오류 방지
        
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

### 🔹 **React-Haiku**

<details>
<summary>React-Haiku란?</summary>

- React 컴포넌트 간 통신과 연결을 선언적으로 구성할 수 있게 해주는 유틸리티  
  - **React 전용 훅 기반**으로 구성되어 있어 최적화가 잘 되어 있으며 React의 동작 방식과 자연스럽게 통합  
  - 소스코드가 **간단하고 직관적**으로 작성되어 있어 확장성과 이해도가 높음  
  - **개발에 필요한 기능들이 적절하게 포함**되어 있어 실용성이 뛰어남  
  - **8KB의 매우 가벼운 용량**

</details>
 
# 📁 폴더 구조 
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
이번 프로젝트는 FSD(Feature-Sliced Design)의 핵심 개념을 차용하여 폴더 구조를 설계했습니다.
저희 팀에서 생각하는 FSD의 가장 큰 장점은 다음과 같습니다.

1. **기능 단위로 코드를 관리**
    각 도메인을 독립적으로 나누어 기능별로 개발할 수 있으며 기능 추가/수정 시 다른 영역에 영향을 주지 않도록 설계가 가능한 부분
    
2. **관심사 분리(Separation of Concerns)**
    `segment`의 확장을 통해 코드의 목적과 책임을 명확히 나눌 수 있는 부분
    
3. **높은 응집도와 낮은 커플링**
    각 기능은 관련된 로직과 UI, 상태관리, API 연동 등을 하나의 `slice`내부에 모아둠으로써 높은 응집도
    다른 기능과의 의존도를 최소화하여, 기능 간 변경이 서로에게 영향을 주지않는 낮은 커플링 
    
React 프로젝트에서 흔히 사용하는 `components`, `hooks`는 단일 폴더로는 확장성과 복잡도를 감당하기 어렵다고 판단하여, 각 기능(`slices`) 내부에 `components`, `hooks`, `api`, `services`, `types`를 함께 구성했습니다.
이를 통해 전역과 로컬의 경계를 명확히 하며, 각 기능이 독립적으로 동작할 수 있도록 구성함과 동시에 한 명의 개발자가 하나의 기능을 온전히 맡아 개발할 수 있어 마치 개인 프로젝트처럼 독립적으로 작업이 가능하고 동시에 전체 시스템과의 충돌이나 의존성을 최소화해 유저보수성과 개발효율을 높일 수 있는 폴더구조를 설계하였습니다.

# ✅ 주요 기능
- **사용자 인증 , 로그인 및 접근 권한 제어 기능 제공**
- **팝업 이벤트 생성, 조회 및 관리**
- **이벤트 참여 신청 및 참여 이벤트 기록 조회**
- **관심 팝업 저장 기능**
- **원하는 이벤트를 쉽게 찾을 수 있도록 강력한 검색 및 지역, 태그 기반 필터링**
- **프로필 관리** - 사용자 개인 정보 및 활동 기록 관리 기능을 제공합니다.

# 📑 Git 전략: GitHub-Flow
이번 프로젝트에서는 **협업 효율성과 배포 안정성**을 동시에 고려하여, **GitHub Flow 전략**을 사용했습니다. `main` 브랜치를 항상 배포 가능한 상태로 유지하면서, **기능 단위(feature-based) 브랜치 전략**을 통해 빠른 개발과 리뷰, 머지를 수행했습니다.

### ✔️ 선택한 이유

- **2인 팀에 최적화된 간단하면서도 명확한 브랜치 전략**
    - 복잡한 브랜치 분기 없이, 기능별 브랜치를 만들어 작업하고 `main`으로 직접 머지하는 구조로 **의사결정과 협업 속도를 높였습니다.**
- **`main` 브랜치의 배포 가능성 유지**
    - 항상 최신의 안정된 코드가 `main`에 존재하도록 관리하여, 필요 시 즉시 프로덕션에 반영할 수 있는 상태를 유지했습니다.
- **기능 단위 개발 & 빠른 피드백 루프**
    - 각 기능을 feature 브랜치로 분리해 작업함으로써 충돌을 방지하고, **작고 명확한 단위의 코드 리뷰**가 가능했습니다.

# 📌 **향후 개선 사항**

# 🖥️ 화면

# 💬 팀원 정보
```
<table>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/158163589?v=4" width="150" height="150" /></td>
    <td><img src="https://github.com/wrikit/wrikitFront/assets/67899735/0f3f503d-5123-48c8-8845-f58f8b3a795c" width="150" height="150"/></td>
   </tr>
  <tr align="center">
    <td><a href="https://github.com/HighRol1er">조성윤</a></td>
    <td><a href="https://github.com/uj-kim">김유정</a></td>
  </tr>
</table>
```
