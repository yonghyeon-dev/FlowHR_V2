# WI-TA-007 Settings / Role & Permission 상세 설계

## 작업 ID

- `WI-TA-007`

## 목적

Settings는 덜 쓰는 화면이 아니라 고객사 운영 기준을 정의하는 제어판이다.
그중에서도 `Role & Permission`은 테넌트 운영 안정성과 보안의 핵심이다.

## 화면 구성

- `TA-1001` Company Settings
- `TA-1002` Role & Permission Settings
- `TA-1003` Notification Settings
- `TA-1004` Integration Settings
- `TA-1005` Audit Log

## 핵심 UX

- 권한은 역할 템플릿과 세부 권한 매트릭스를 함께 보여줘야 한다.
- 관리자 입장에서 `누가 무엇을 볼 수 있는지`가 먼저 읽혀야 한다.
- 위험한 권한 변경은 저장 전 검토 단계가 필요하다.
- 설정 화면도 검색과 최근 변경 이력을 제공해야 한다.

## 역할 모델

- Tenant Admin
- Tenant Manager
- Payroll Admin
- Recruiter
- Document Manager
- Custom Role

## 주요 제어 항목

- 조직 범위 접근
- 개인정보 열람
- 급여 접근
- 문서 발송/회수
- 정책 수정
- 감사 로그 열람

## 보안 포인트

- 민감 권한 변경 배지 표시
- 최근 변경 이력
- 역할 복제
- 저장 전 영향 범위 확인

## 산출물

- Settings 와이어프레임: [settings-role-permission-detailed.html](../../wireframes/tenant-admin/settings-role-permission-detailed.html)
