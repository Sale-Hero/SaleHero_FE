# SaleHero SEO 및 마케팅 체크리스트

이 문서는 SaleHero 프로젝트의 검색 엔진 최적화(SEO) 및 외부 노출을 위한 마케팅 관련 작업들을 관리하기 위한 체크리스트입니다.

---

## 1. 코드 레벨 액션 (제가 코드에서 직접 수정하거나 가이드 할 수 있는 부분)

### 1.1. 기본 메타 태그 설정 (public/index.html)

- [x] HTML `lang` 속성 'ko'로 변경 (적용 완료)
- [x] `<meta name="description">` 태그 내용 업데이트 (적용 완료)
- [x] `<title>` 태그 내용 최적화 (현재 "Sale Hero - 매일 엄선된 핫딜과 할인 정보"로 변경)
- [x] Open Graph (OG) 태그 점검 (현재 잘 설정되어 있으나, 내용 변경 시 업데이트 필요)
  - `og:type` (website)
  - `og:title` (Sale Hero)
  - `og:description` (매일 엄선된 알짜 할인정보)
  - `og:url` (https://salehero.kr)
  - `og:image` (%PUBLIC_URL%/sale_hero.png)

### 1.2. 동적 메타 태그 관리 (React 컴포넌트 레벨)

- [x] `react-helmet-async` 라이브러리 설치 (이미 설치되어 있었음)
- [x] `src/components/common/ComponentHelmet.tsx` 또는 유사 컴포넌트에 동적 메타 태그 로직 구현 (description prop 추가 완료)
- [x] 주요 라우트(예: 딜 상세 페이지, 커뮤니티 게시글 페이지)에 동적 메타 태그 적용 (DealDetail.tsx에 `ComponentHelmet` 적용 완료)

### 1.3. `robots.txt` 파일 점검 및 수정

- [x] `public/robots.txt` 파일 내용 확인 및 최적화 (admin 경로 `Disallow` 추가 완료)

---

## 2. 외부 설정 및 관리 액션 (사용자님께서 직접 하셔야 할 부분)

### 2.1. 사이트맵 (Sitemap.xml) 생성 및 제출

- [x] `sitemap.xml` 파일 생성
  - 모든 중요한 페이지 URL 포함
  - `public/sitemap.xml` 에 생성되었습니다.
- [x] (선택 사항) `sitemap` 생성 자동화 스크립트 또는 라이브러리 도입 고려
  - `scripts/sitemap-generator.js` 스크립트가 추가되었습니다.
  - `npm run sitemap` 또는 `yarn sitemap` 명령어로 사이트맵을 다시 생성할 수 있습니다.
  - **주의:** 동적 URL(딜, 아티클)을 포함하려면 로컬 백엔드 서버가 실행 중이어야 합니다.
- [ ] `sitemap.xml` 파일을 웹 서버 루트에 업로드
- [ ] **구글 서치 콘솔(Google Search Console)**에 `sitemap.xml` 제출

### 2.2. 구글 서치 콘솔 설정 및 모니터링

- [ ] 구글 서치 콘솔에 SaleHero 웹사이트 등록 및 소유권 확인 완료
- [ ] 색인 생성 범위 보고서 모니터링 (크롤링 오류 및 색인 상태 확인)
- [ ] URL 검사 도구를 사용하여 주요 페이지의 색인 생성 상태 확인 및 수동 색인 요청

### 2.3. SSR/SSG 도입 고려 (장기적인 아키텍처 변경)

- [ ] 현재 클라이언트 사이드 렌더링(CSR) 방식에서 서버 사이드 렌더링(SSR) 또는 정적 사이트 생성(SSG)으로의 전환 필요성 평가
- [ ] Next.js 또는 Remix와 같은 프레임워크로의 마이그레이션 계획 수립 (필요 시)

---

**참고:**
* `[x]` 표시는 완료된 작업을 의미합니다.
* `[ ]` 표시는 미완료된 작업을 의미합니다.
* 작업의 우선순위와 중요도는 프로젝트 상황에 따라 달라질 수 있습니다.