# WI-TA-002 People 모듈 상세 설계

## 작업 ID

- `WI-TA-002`

## 목적

People 모듈은 단순 인사카드 목록이 아니라 `직원 데이터 운영 허브`여야 한다.
조직 구조, 고용 상태, 변경 이력, 문서 상태가 하나의 흐름으로 이어져야 한다.

## 화면 구성

- `TA-101` Employee Directory
- `TA-102` Employee Detail / Profile
- `TA-103` Organization Chart
- `TA-104` HR Change History
- `TA-105` Employee Import / Sync

## 핵심 UX

- 디렉토리는 검색과 필터가 메인이다.
- 상세 화면은 기본 정보, 고용 정보, 조직 정보, 최근 액션을 분리한다.
- 조직도는 보기용이 아니라 팀 이동, 리더 구조 확인, 인원 편차 확인에 써야 한다.
- 변경 이력은 감사를 겸해야 한다.

## 주요 섹션

### Employee Directory

- 이름, 부서, 직무, 고용형태, 상태
- 입사일, 관리자, 근무제도
- 다중 필터와 저장 뷰

### Employee Detail

- 기본 프로필
- 고용 및 계약 정보
- 조직 배치
- 최근 변경 이력
- 관련 문서와 워크플로우

### Change History

- 발령
- 부서 이동
- 직책/직무 변경
- 급여/계약 변경

## 산출물

- People 와이어프레임: [people-module-detailed.html](../../wireframes/tenant-admin/people-module-detailed.html)
