# WI-TA-006 Documents 모듈 상세 설계

## 작업 ID

- `WI-TA-006`

## 변경 배경

기존 Documents 모듈은 템플릿, 발송, 서명, 보관의 흐름을 잘 정리했지만,
오피스형과 리테일형 조직이 우선적으로 다루는 문서 운영은 차이가 있다.

따라서 `WI-TA-006`은 범용 Documents Dashboard가 아니라
`업종 팩별 Documents Dashboard 변형`을 설계하는 작업으로 재정의한다.

## 현재 설계 범위

### Variant A. Office Pack Documents Dashboard

대상:

- 전자계약
- 연봉 변경 문서
- 정책 동의서
- 입사/퇴사 문서

핵심 목적:

- 서명 대기
- 만료 임박 계약
- 재발송
- 템플릿 변경 추적

핵심 결정:

- 어떤 문서 병목이 법적/계약 리스크를 만드는가
- 어떤 템플릿을 수정하거나 재발송해야 하는가

산출물:

- [documents-office.html](../../wireframes/tenant-admin/documents-office.html)

### Variant B. Retail Pack Documents Dashboard

대상:

- 매장 운영 동의서
- 근무 규정 안내
- 입사 문서
- 매장 공지 문서

핵심 목적:

- 현장 서명 완료율
- 미열람 / 미서명 매장
- 일괄 배포와 리마인드
- 감사지원 보관

핵심 결정:

- 어느 매장에서 문서 수신/서명이 밀리고 있는가
- 어떤 운영 문서를 다시 배포해야 하는가

산출물:

- [documents-retail.html](../../wireframes/tenant-admin/documents-retail.html)

## 공통 설계 원칙

- Documents는 보관함이 아니라 운영 모듈이어야 한다
- 첫 줄은 서명 대기와 발송 병목을 보여야 한다
- 업종 팩에 따라 문서 유형과 우선 리스크가 달라져야 한다
