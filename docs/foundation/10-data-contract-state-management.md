# FlowHR_V2 데이터 계약 및 상태 관리 설계

## 목적

구현 단계에서 가장 많이 흔들리는 부분은 `화면은 있는데 데이터 계약이 없는 상태`다.
이 문서는 화면 설계를 서버 상태, UI 상태, mutation 상태로 분해해서
프론트엔드와 API 설계를 연결하기 위한 기준을 정의한다.

## 상태 분류 원칙

### 1. Server State

- API에서 가져오는 정답 데이터
- 캐시, 동기화, 재검증 대상

예:

- 직원 목록
- 근태 기록
- 휴가 잔액
- 승인 대기 문서
- 테넌트 과금 상태

### 2. UI State

- 현재 화면에서만 의미 있는 상태

예:

- 열린 필터
- 선택된 행
- 현재 탭
- 드로어 열림 여부
- 정렬 옵션

### 3. Mutation State

- 저장 중, 발송 중, 승인 중, 마감 중 같은 처리 상태

예:

- 요청 제출 중
- 문서 서명 중
- 급여 마감 실행 중
- 기능 플래그 변경 중

## 권장 데이터 계약 단위

- `list response`
- `detail response`
- `summary response`
- `mutation response`
- `error envelope`

## 공통 응답 예시

```json
{
  "data": {},
  "meta": {
    "tenantId": "t_001"
  }
}
```

## 테이블형 화면 규칙

- 정렬, 필터, 검색, 페이지네이션 파라미터를 명시적으로 분리한다.
- 조회 전용 테이블과 처리 전용 테이블은 같은 응답 구조를 강제하지 않는다.
- bulk action 대상은 selection state와 mutation state를 분리해서 관리한다.

## 대시보드형 화면 규칙

- KPI summary는 상세 목록과 별도 응답으로 분리 가능하다.
- 홈 화면은 summary 중심 응답을 우선하고, drill-down 목록은 지연 로드 가능하다.
- 숫자와 큐가 다른 기준 시점을 가지면 시점 정보를 메타로 표시한다.

## 폼과 mutation 규칙

- draft 저장과 최종 제출를 분리할 수 있으면 API도 분리한다.
- destructive mutation은 결과 응답에 영향 범위 요약을 포함한다.
- 실패 응답은 field error와 action error를 구분한다.

## 캐시 전략 기준

- 자주 바뀌는 운영 큐: 짧은 stale time
- 상세 프로필 / 정책: 중간 stale time
- 템플릿 / 플랜 카탈로그: 긴 stale time
- 민감 액션 후 관련 summary는 즉시 invalidate한다

## 권한과 데이터 계약

- 권한이 없을 때는 빈 응답이 아니라 명시적 접근 거부 응답이 필요하다.
- summary는 보여주되 detail은 제한하는 경우 계약을 분리한다.
- tenant scope와 self scope를 같은 endpoint에서 숨기지 않는다.

## HR SaaS에서 우선 정리할 계약

1. Home summary
2. People list / detail
3. Attendance exception queue
4. Leave balance / request form
5. Approval inbox / detail
6. Document sign flow
7. Payroll closing summary
8. Platform tenant / billing / audit summary

## 연결 문서

- 공통 상태 패턴: [WI-DS-006-common-state-patterns.md](../design-system/WI-DS-006-common-state-patterns.md)
- 프론트엔드 구조 설계: [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- 설계 진행 종합 보고서: [08-design-progress-report.md](./08-design-progress-report.md)
