# FlowHR_V2 승인 로그 체계

## 목적

와이어 승인과 다음 단계 진입을 임의로 판단하지 않도록,
승인 기록과 상태 변경 이력을 남기는 공통 체계를 정의한다.

## 왜 필요한가

- 와이어 컨펌 후 다음 단계로 이동한다는 사용자 요구가 있었다.
- 지금까지는 승인 여부가 대화 문맥에만 남아 있어 루프 기준점으로 약하다.
- 이후에는 문서 기반 승인 로그가 있어야 단계 변경과 WI 상태 변경을 일관되게 판단할 수 있다.

## 승인 로그 단위

승인 로그는 화면 또는 WI 단위로 남긴다.

- 화면 승인: `APP-SCREEN-*`
- 설계 묶음 승인: `APP-BUNDLE-*`
- 구현 진입 승인: `APP-READY-*`

## 로그 필드

| 필드 | 설명 |
|---|---|
| `approvalId` | 승인 로그 ID |
| `targetType` | `screen`, `bundle`, `readiness` |
| `targetId` | 화면 ID 또는 WI ID |
| `title` | 승인 대상 이름 |
| `requestedBy` | 요청자 |
| `reviewedAt` | 검토 일시 |
| `decision` | `approved`, `changes_requested`, `hold` |
| `reason` | 승인/보류 사유 |
| `followUp` | 다음 액션 |
| `evidence` | 관련 문서/와이어 링크 |

## 승인 단계

### 1. Wire Approval

- 저해상도 와이어 구조 승인
- 정보 우선순위와 핵심 동선 확인
- 다음 단계: IA 세분화 또는 상세 와이어

### 2. Detail Design Approval

- 상세 상태, 액션, 권한 노출 방식 확인
- 다음 단계: 구현 연결 설계

### 3. Implementation Readiness Approval

- 라우트, API, 상태, i18n, 컴포넌트 기준 확인
- 다음 단계: 구현 착수

## 결정 규칙

- `approved`: 다음 단계 이동 가능
- `changes_requested`: 현재 단계 유지, 수정 후 재검토
- `hold`: 선행 조건이 없어서 일시 정지

## WI 상태와의 연결

- `changes_requested`면 WI는 `in_progress` 유지
- `approved`면 다음 WI를 `next` 또는 `in_progress`로 이동 가능
- `Implementation Readiness Approval` 전에는 `구현 직전` 표현을 사용하지 않는다

## 기록 예시

```md
- approvalId: APP-SCREEN-TA-001-001
- targetType: screen
- targetId: TA-001
- title: Admin Home Dashboard
- requestedBy: user
- reviewedAt: 2026-03-11
- decision: changes_requested
- reason: 예외 큐 우선순위는 맞지만 승인 로그 패턴이 없음
- followUp: 상태/예외 매핑표 작성 후 재검토
- evidence:
  - /C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/admin-home-detailed.html
  - /C:/Team-jane/FlowHR_V2/docs/tenant-admin/WI-TA-001-admin-home-dashboard.md
```

## 운영 규칙

- 승인 로그는 대화 기억이 아니라 문서 기록으로 남긴다.
- 화면 맵과 WI 백로그를 변경할 때 승인 로그의 최신 decision을 참고한다.
- `approved`가 없는 화면은 후속 단계에서 완료로 표현하지 않는다.

## 다음 단계

- 실제 승인 로그 저장 파일을 `docs/foundation/approvals/` 아래에 누적 생성
- 화면별 첫 승인 로그는 코어 화면부터 작성

## 연결 문서

- 단계 게이트: [00-stage-gates.md](./00-stage-gates.md)
- 요구사항 추적: [16-requirement-traceability.md](./16-requirement-traceability.md)
- WI 백로그: [05-wi-backlog.md](./05-wi-backlog.md)
