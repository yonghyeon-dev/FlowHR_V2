import Link from "next/link";

export function LandingPage() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-brand">
          Flow<span>HR</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features">기능</a>
          <a href="#roles">역할별 화면</a>
          <Link href="/login" className="btn btn-primary btn-sm">
            로그인
          </Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-inner">
          <div className="hero-badge">HR 운영을 하나로 묶는 기준</div>
          <h1 className="hero-title">
            분절된 도구 대신 <span className="accent">HR 운영</span>을 체계화하세요
          </h1>
          <p className="hero-desc">
            근태, 휴가, 결재, 문서, 급여, 성과, 채용까지.
            하나의 플랫폼에서 모든 HR 업무를 흐름으로 처리할 수 있습니다.
          </p>
          <Link href="/login" className="hero-cta">
            시작하기
          </Link>
          <div className="hero-sub">무료 체험 14일, 카드 등록 없음</div>
        </div>
      </section>

      <section className="landing-features" id="features">
        <h2 className="features-title">핵심 기능</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon teal">운영</div>
            <h3>운영 대시보드</h3>
            <p>오피스형과 리테일형 조직의 운영 리스크를 첫 화면에서 바로 확인합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon blue">승인</div>
            <h3>요청과 결재</h3>
            <p>직원 요청, 관리자 승인, 감사 로그까지 하나의 흐름으로 연결합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon amber">문서</div>
            <h3>문서와 서명</h3>
            <p>계약서와 필수 서명 문서를 템플릿으로 관리하고 진행 상태를 추적합니다.</p>
          </div>
        </div>
      </section>

      <section className="landing-roles" id="roles">
        <h2 className="roles-title">역할별 경험</h2>
        <p className="roles-subtitle">
          플랫폼 운영자, 고객사 관리자, 직원에게 각자 필요한 정보와 행동만 노출합니다.
        </p>
        <div className="roles-grid">
          <div className="role-card">
            <div className="role-avatar platform">P</div>
            <h3>Platform</h3>
            <p>테넌트 상태, 플랜, 보안 이벤트, 감사 로그를 운영합니다.</p>
          </div>
          <div className="role-card">
            <div className="role-avatar admin">A</div>
            <h3>Tenant Admin</h3>
            <p>근태, 결재, 문서, 설정 같은 핵심 운영 모듈을 처리합니다.</p>
          </div>
          <div className="role-card">
            <div className="role-avatar employee">E</div>
            <h3>Tenant Employee</h3>
            <p>출퇴근, 요청, 인박스, 서명, 개인 일정 중심의 셀프서비스를 사용합니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
