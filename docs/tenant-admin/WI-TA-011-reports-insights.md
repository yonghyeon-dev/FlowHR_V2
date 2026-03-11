# WI-TA-011 Reports / Insights 상세 설계

## 작업 ID

- `WI-TA-011`

## 목적

리포트 모듈은 정적 다운로드 센터가 아니라, 운영자가 조직 상태와 추세를 읽고
다음 조치를 결정하는 인사이트 허브여야 한다.

## 화면 구성

- `TA-901` Report Center
- `TA-902` People Insights
- `TA-903` Attendance Insights
- `TA-904` Export & Scheduled Reports

## 핵심 UX

- 핵심 지표와 이상 징후를 먼저 보여주고, 상세 분석은 그 다음에 이어야 한다.
- People / Attendance / Leave / Workflow 데이터를 리포트 축에서 연결해 읽을 수 있어야 한다.
- 예약 리포트와 수동 추출을 같은 모듈 언어로 다뤄야 한다.
- 다운로드 중심이 아니라 판단 중심으로 설계한다.

## 운영 포인트

- 조직별 인원 추세
- 근태 예외 추세
- 휴가 사용률
- 승인 병목
- 정기 리포트 발송 상태

## 주요 액션

- 리포트 조회
- 기간 / 조직 필터링
- 이상 징후 drill-down
- CSV / XLSX / PDF 추출
- 정기 발송 설정

## 산출물

- Reports 와이어프레임: [reports-insights-detailed.html](../../wireframes/tenant-admin/reports-insights-detailed.html)
