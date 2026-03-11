# WI-TA-009 Recruiting / Onboarding / Offboarding 상세 설계

## 작업 ID

- `WI-TA-009`

## 목적

채용과 입사, 퇴사는 분리된 기능이 아니라 하나의 인력 라이프사이클 흐름으로 관리되어야 한다.
채용 파이프라인에서 확정된 후보자가 온보딩으로 자연스럽게 이어지고, 퇴사 절차도 같은 운영 축 안에서 추적 가능해야 한다.

## 화면 구성

- `TA-801` Hiring Dashboard
- `TA-802` Job Posting Manager
- `TA-803` Candidate Pipeline
- `TA-804` Onboarding Center
- `TA-805` Offboarding Center

## 핵심 UX

- 채용 병목은 단계별 숫자가 아니라 즉시 조치할 파이프라인 리스크로 보여야 한다.
- 온보딩은 계정, 장비, 문서, 교육 체크리스트를 한 허브에서 다뤄야 한다.
- 오프보딩은 자산 회수, 권한 종료, 문서 완료 상태를 누락 없이 추적해야 한다.
- HR과 현업 리더가 같은 흐름을 보더라도 역할별 시야가 달라야 한다.

## 운영 포인트

- 공고 상태
- 후보자 단계 이동
- 인터뷰 일정
- 입사 전 문서 완료 여부
- 자산 지급 / 회수
- 계정 생성 / 종료

## 주요 액션

- 공고 등록 / 종료
- 후보자 단계 이동
- 인터뷰 일정 확정
- 온보딩 체크리스트 시작
- 오프보딩 체크리스트 완료

## 산출물

- Recruiting 와이어프레임: [recruiting-module-detailed.html](../../wireframes/tenant-admin/recruiting-module-detailed.html)
