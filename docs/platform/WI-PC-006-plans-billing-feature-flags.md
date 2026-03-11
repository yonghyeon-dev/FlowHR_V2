# WI-PC-006 플랜, 과금, 기능 플래그 운영 설계

## 작업 ID

- `WI-PC-006`

## 목적

플랫폼 운영 조직은 테넌트의 계약 상태, 청구 상태, 기능 가용 범위를
한 흐름으로 관리해야 한다. 따라서 `플랜`, `과금`, `기능 플래그`는 서로
별도 메뉴여도 운영 맥락상 하나의 모듈 언어로 설계해야 한다.

## 대상 화면

- `PC-201` Plan Catalog
- `PC-202` Billing Accounts
- `PC-203` Invoices & Payment History
- `PC-204` Billing Adjustments
- `PC-205` Feature Flag Console

## 주요 사용자

### Platform Billing Admin

- 플랜 할당 / 변경
- 청구 이슈 추적
- 결제 실패 대응
- 수동 조정 기록

### Platform Operator

- 테넌트별 기능 범위 확인
- 시범 기능 활성화
- 계약 상태에 따른 기능 제한 처리

### Product Ops

- 베타 기능 노출 범위 관리
- 플래그 롤아웃 상태 확인
- 고객사별 예외 제공 여부 검토

## 핵심 UX 원칙

- 플랜 변경, 과금 상태, 기능 플래그가 테넌트 상세 안에서 함께 읽혀야 한다.
- 수동 조정과 예외 제공은 일반 상태와 시각적으로 분리해야 한다.
- 기능 플래그는 개발용 토글처럼 보이면 안 되고, 계약/운영 맥락이 함께 보여야 한다.
- 결제 실패와 기능 제한 사이의 연결을 명확히 보여야 한다.

## 화면 구성

### 1. Plans & Billing Overview

- 활성 플랜 분포
- 결제 실패 테넌트
- 업그레이드 후보
- 예외 할인 / 수동 조정 현황
- 기능 플래그가 계약 범위를 초과한 테넌트 목록

### 2. Plan Catalog

- 플랜 이름
- 포함 좌석 / 모듈
- 지원 대상 규모
- 기본 기능 세트
- 가격 정책 요약

### 3. Billing Accounts

- 테넌트별 청구 주체
- 결제 수단 상태
- 미수금 / 실패 결제 현황
- 다음 청구 예정일

### 4. Invoices & Payment History

- 송장 발행 이력
- 결제 성공/실패 기록
- 환불 / 크레딧
- 재시도 이력

### 5. Billing Adjustments

- 수동 할인
- 크레딧 부여
- 좌석 수 예외 처리
- 계약 특약 메모

### 6. Feature Flag Console

- 기능 플래그 목록
- 환경/테넌트별 상태
- 롤아웃 단계
- 만료 예정 베타
- 계약 외 예외 활성화 이력

## 주요 상태

- `critical`: 결제 실패로 기능 제한 임박, 계약 외 핵심 기능 활성화, 수동 조정 누락
- `high`: 다음 청구 전 확인 필요, 만료 예정 베타, 플랜-기능 불일치
- `medium`: 업그레이드 후보, 할인 만료 예정, 좌석 수 초과 경향
- `success`: 결제 정상, 플랜/기능 정합성 정상, 조정 완료

## 주요 액션

- 플랜 변경
- 청구 계정 확인
- 송장 상세 열기
- 수동 조정 등록
- 기능 플래그 활성/비활성
- 만료일 설정
- 롤아웃 범위 확인

## 기능 플래그 설계 원칙

- 플래그는 `개발 실험`과 `계약 예외`를 구분해야 한다.
- 만료일 없는 예외 플래그는 경고 대상으로 다룬다.
- 테넌트 단위, 세그먼트 단위, 글로벌 단위 플래그를 구분한다.
- 플래그 변경은 감사 로그와 연결되어야 한다.

## 산출물

- 문서: 플랜/과금/기능 플래그 운영 기준
- 와이어: [plans-billing-feature-flags.html](../../wireframes/platform/plans-billing-feature-flags.html)

## 연결 문서

- Platform Console 개요: [WI-PC-004-platform-console.md](./WI-PC-004-platform-console.md)
- 감사/보안 운영: [WI-PC-005-audit-security-ux.md](./WI-PC-005-audit-security-ux.md)
- 멀티테넌시 경계: [WI-PC-001-multitenancy-tenant-boundaries.md](./WI-PC-001-multitenancy-tenant-boundaries.md)
