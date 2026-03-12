# FlowHR_V2 프로덕션 SSOT 마스터

## 목적

이 문서는 FlowHR_V2를 프로덕션까지 끌고 가기 위한 최상위 단일 기준이다.  
앞으로의 모든 작업은 이 문서를 기준으로 해석하고, 여기서 파생된 분류와 실행 순서를 따른다.

## SSOT 정의

### 1. 제품/도메인 SSOT

- 위치: `docs/foundation`
- 역할:
  - 제품 목표
  - 권한 구조
  - 정보구조
  - 기능 범위
  - 실행 우선순위

### 2. 화면/시각 SSOT

- 위치: `flowhr-ui`
- 역할:
  - 화면 구조
  - 레이아웃
  - 시각 구성
  - 화면 간 링크 구조

### 3. 권한 SSOT

- 위치: `src/lib/access-policy.ts`
- 역할:
  - `role -> area`
  - `role -> view`
  - `role -> action`
  - `role -> field`
  - `role -> default route`

### 4. 데이터 SSOT

- 위치: `prisma/schema.prisma`
- 역할:
  - 사용자
  - 테넌트
  - 멤버십
  - 요청
  - 결재
  - 문서
  - 설정
  - 감사 로그

### 5. 구현 레이어

- 위치: `src`
- 역할:
  - 위 SSOT를 코드로 구현
  - 독자적으로 구조를 재정의하지 않음

## 금지 규칙

- 사용자가 특정 화면을 언급했다고 해서 그 화면만 파고들지 않는다.
- 와이어프레임용 임시 상호작용을 프로덕션 기능처럼 추가하지 않는다.
- `src`에서 먼저 구조를 바꾸고 나중에 문서나 `flowhr-ui`를 맞추지 않는다.
- 부분 구현을 완료로 보고하지 않는다.

## 현재 착수 기준

현재 작업은 다음 문서를 반드시 선행 기준으로 본다.

1. [46-production-work-breakdown.md](./46-production-work-breakdown.md)
2. [47-production-execution-order.md](./47-production-execution-order.md)
3. [48-wireframe-control-inventory.md](./48-wireframe-control-inventory.md)
4. [49-authority-ssot-matrix.md](./49-authority-ssot-matrix.md)
