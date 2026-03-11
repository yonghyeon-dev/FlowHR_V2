import { tx } from "./appCopy";

export const ADMIN_PAGES = {
  office: {
    home: {
      title: tx("Office Pack Admin Home", "Office Pack Admin Home"),
      description: tx("승인, 문서, 유연근무 예외를 먼저 처리하는 오피스형 관리자 홈입니다.", "An admin home for office organizations that prioritizes approvals, documents, and flexible work exceptions."),
      questions: [
        tx("오늘 어떤 승인과 문서를 먼저 처리해야 하는가", "Which approvals and documents should be handled first today"),
        tx("어떤 팀이 유연근무나 휴가로 결원 위험이 있는가", "Which teams are exposed to coverage risk from flexible work or leave"),
        tx("법적·계약 리스크를 만드는 병목이 무엇인가", "Which bottlenecks create legal or contractual risk"),
      ],
      kpis: [
        { value: "19", label: tx("오늘 승인 필요", "Needs approval today") },
        { value: "7", label: tx("SLA 지연", "SLA delays") },
        { value: "12", label: tx("서명 대기", "Pending signatures") },
        { value: "5", label: tx("만료 임박 계약", "Contracts nearing expiry") },
        { value: "4", label: tx("정정 요청", "Correction requests") },
      ],
      columns: [
        { title: tx("Decision Queue", "Decision Queue"), eyebrow: tx("오늘 우선 처리", "Handle first today"), tone: "primary", items: [
          { title: tx("근로계약 미서명 4건", "4 unsigned employment contracts"), meta: tx("연봉 변경 문서 / 오늘 효력 시작 / 재발송 필요", "Salary change docs / effective today / resend needed"), tone: "critical" },
          { title: tx("승인 SLA 초과 7건", "7 approvals past SLA"), meta: tx("비용, 휴가, 근태 혼합 / 담당자 재지정 필요", "Mixed expense, leave, attendance / reassignment needed"), tone: "critical" },
          { title: tx("유연근무 예외 집중", "Flexible work exceptions clustered"), meta: tx("Engineering / 원격 승인 대기 5건", "Engineering / 5 remote approvals pending"), tone: "watch" },
          { title: tx("휴가 승인 병목", "Leave approval bottleneck"), meta: tx("Product / 다음 주 집중 휴가", "Product / leave clustered next week"), tone: "watch" },
        ] },
        { title: tx("Team Risk Snapshot", "Team Risk Snapshot"), eyebrow: tx("커버리지 확인", "Coverage check"), items: [
          { title: tx("Engineering", "Engineering"), meta: tx("원격 승인 대기 5건 / 결원 위험 높음", "5 remote approvals pending / high coverage risk"), tone: "critical" },
          { title: tx("Product", "Product"), meta: tx("다음 주 휴가 집중 / 릴리즈 일정 충돌", "Leave clustered next week / release schedule conflict"), tone: "watch" },
          { title: tx("Finance", "Finance"), meta: tx("마감 승인 대기 3건 / 문서 증빙 누락", "3 close approvals pending / missing evidence"), tone: "critical" },
        ] },
        { title: tx("Approval and Document Split", "Approval and Document Split"), eyebrow: tx("병목 분해", "Bottleneck breakdown"), stats: [
          tx("휴가 승인 6", "Leave approvals 6"),
          tx("근태 정정 4", "Attendance corrections 4"),
          tx("비용 품의 7", "Expense requests 7"),
          tx("서명 대기 12", "Awaiting signature 12"),
          tx("재발송 필요 3", "Need resend 3"),
          tx("만료 임박 5", "Near expiry 5"),
        ] },
        { title: tx("Today Timeline", "Today Timeline"), eyebrow: tx("시간대별 결정", "Decisions by time"), timeline: [
          { lead: "09:30", text: tx("계약 서명 누락 확인", "Review missing contract signatures"), badge: tx("문서", "Documents") },
          { lead: "11:00", text: tx("휴가 승인 적체 정리", "Clear leave approval backlog"), badge: tx("승인", "Approvals") },
          { lead: "14:00", text: tx("유연근무 커버리지 검토", "Review flexible work coverage"), badge: tx("운영", "Ops") },
          { lead: "17:00", text: tx("마감 전 증빙 누락 정리", "Resolve missing evidence before close"), badge: tx("마감", "Closing") },
        ] },
      ],
    },
    attendance: {
      title: tx("Office Pack Attendance Dashboard", "Office Pack Attendance Dashboard"),
      description: tx("오피스형 근태는 결원보다 정정, 원격근무 예외, 휴가 충돌, 마감 지연을 먼저 봐야 합니다.", "Office attendance operations should prioritize corrections, remote-work exceptions, leave conflicts, and closing delays."),
      questions: [
        tx("어떤 정정 요청이 마감을 지연시키는가", "Which correction requests are delaying close"),
        tx("어떤 팀이 재택·휴가로 커버리지 공백을 만들고 있는가", "Which teams are creating coverage gaps through remote work or leave"),
        tx("누락 기록과 승인 병목이 연결되는가", "Whether missing records connect to approval bottlenecks"),
      ],
      kpis: [
        { value: "7", label: tx("정정 요청", "Corrections") },
        { value: "5", label: tx("누락 기록", "Missing logs") },
        { value: "4", label: tx("원격 예외", "Remote exceptions") },
        { value: "3", label: tx("휴가 충돌", "Leave conflicts") },
        { value: "2", label: tx("마감 지연", "Closing delays") },
      ],
      columns: [
        { title: tx("Correction Queue", "Correction Queue"), eyebrow: tx("Priority", "Priority"), tone: "primary", items: [
          { title: tx("Finance / 체크아웃 누락 3건", "Finance / 3 missing check-outs"), meta: tx("마감 전 처리 필요", "Resolve before close"), tone: "critical" },
          { title: tx("Product / 재택 승인 미반영 2건", "Product / 2 remote approvals not reflected"), meta: tx("근무 기록 반영 필요", "Needs record sync"), tone: "watch" },
          { title: tx("Engineering / 휴가 중복으로 리뷰 공백", "Engineering / review gap from overlapping leave"), meta: tx("팀 검토 필요", "Needs team review"), tone: "watch" },
        ] },
        { title: tx("Team Coverage Risk", "Team Coverage Risk"), eyebrow: tx("Teams", "Teams"), items: [
          { title: tx("Engineering", "Engineering"), meta: tx("원격 승인 대기 5건", "5 remote approvals pending"), tone: "critical" },
          { title: tx("Product", "Product"), meta: tx("다음 주 휴가 집중", "Clustered leave next week"), tone: "watch" },
          { title: tx("Finance", "Finance"), meta: tx("마감 인력 부족 위험", "Risk of insufficient close coverage"), tone: "critical" },
        ] },
        { title: tx("Closing Watch", "Closing Watch"), eyebrow: tx("Before close", "Before close"), stats: [
          tx("미확정 기록 5건", "5 unresolved records"),
          tx("승인 대기 정정 4건", "4 corrections awaiting approval"),
          tx("급여 반영 전 확인 2건", "2 checks before payroll sync"),
        ] },
      ],
    },
    leave: {
      title: tx("Office Pack Leave Dashboard", "Office Pack Leave Dashboard"),
      description: tx("오피스형 휴가 대시보드는 팀 일정 충돌, 승인 적체, 릴리즈 영향도를 먼저 봐야 합니다.", "The office leave dashboard should prioritize team schedule conflicts, approval backlog, and release impact."),
      questions: [
        tx("어느 팀에서 휴가가 일정 충돌을 만드는가", "Which teams have leave causing scheduling conflicts"),
        tx("승인이 늦어지는 요청은 무엇인가", "Which requests are waiting too long for approval"),
        tx("릴리즈나 마감에 직접 영향을 주는 휴가가 있는가", "Which leave plans directly impact releases or closing"),
      ],
      kpis: [
        { value: "6", label: tx("승인 대기", "Awaiting approval") },
        { value: "3", label: tx("충돌 일정", "Schedule conflicts") },
        { value: "5", label: tx("팀 커버 위험", "Team coverage risks") },
        { value: "2", label: tx("반려 재제출", "Rejected resubmits") },
        { value: "8.5", label: tx("평균 잔여 연차", "Avg. leave balance") },
      ],
      columns: [
        { title: tx("Leave Queue", "Leave Queue"), eyebrow: tx("Approval first", "Approval first"), tone: "primary", items: [
          { title: tx("Product / 다음 주 연차 집중", "Product / leave clustered next week"), meta: tx("릴리즈 일정 충돌 가능", "May collide with release schedule"), tone: "critical" },
          { title: tx("Engineering / 시간 단위 휴가 4건", "Engineering / 4 hourly leave requests"), meta: tx("팀장 승인 필요", "Manager approval required"), tone: "watch" },
          { title: tx("Finance / 월말 휴가 요청", "Finance / month-end leave requests"), meta: tx("마감 커버리지 확인 필요", "Needs close coverage check"), tone: "critical" },
        ] },
        { title: tx("Team Calendar Watch", "Team Calendar Watch"), eyebrow: tx("Conflicts", "Conflicts"), items: [
          { title: tx("Product", "Product"), meta: tx("금요일 2명 동시 휴가", "2 people off on Friday"), tone: "critical" },
          { title: tx("Engineering", "Engineering"), meta: tx("재택 + 휴가 혼합으로 스쿼드 공백", "Remote + leave mix weakens squad coverage"), tone: "watch" },
          { title: tx("Finance", "Finance"), meta: tx("급여 마감 주간 인력 축소", "Reduced staffing during payroll close"), tone: "critical" },
        ] },
      ],
    },
    workflow: {
      title: tx("Office Pack Approval Inbox", "Office Pack Approval Inbox"),
      description: tx("오피스형 승인 인박스는 휴가, 비용, 문서, 정정의 SLA와 증빙 상태를 먼저 봐야 합니다.", "The office approval inbox should prioritize SLA, evidence, and routing for leave, expense, document, and correction flows."),
      questions: [
        tx("오늘 승인 병목을 만드는 요청은 무엇인가", "Which requests create approval bottlenecks today"),
        tx("증빙 누락으로 반려될 건이 있는가", "Which items are likely to be rejected because evidence is missing"),
        tx("다시 배정해야 할 승인이 있는가", "Which approvals need reassignment"),
      ],
      columns: [
        { title: tx("Approval Queue", "Approval Queue"), eyebrow: tx("SLA priority", "SLA priority"), tone: "primary", items: [
          { title: tx("비용 품의 / 증빙 누락", "Expense approval / missing evidence"), meta: tx("오늘 15:00 전 처리", "Handle before 15:00 today"), tone: "critical" },
          { title: tx("휴가 승인 / 팀장 부재", "Leave approval / manager unavailable"), meta: tx("대리 승인자 지정 필요", "Need delegate approver"), tone: "watch" },
          { title: tx("근태 정정 / Payroll 영향", "Attendance correction / payroll impact"), meta: tx("마감 전 승인 필요", "Approve before close"), tone: "critical" },
        ] },
        { title: tx("Request Context", "Request Context"), eyebrow: tx("Evidence", "Evidence"), items: [
          { title: tx("요청 유형 / 일정 / 사유", "Request type / schedule / reason"), meta: tx("기본 정보", "Core fields") },
          { title: tx("증빙 / 정책 / 승인선", "Evidence / policy / route"), meta: tx("정책 검토", "Policy review") },
          { title: tx("재지정 / 승인 / 반려", "Reassign / approve / reject"), meta: tx("즉시 액션", "Immediate action") },
        ] },
      ],
    },
    documents: {
      title: tx("Office Pack Documents Dashboard", "Office Pack Documents Dashboard"),
      description: tx("오피스형 문서 화면은 계약 서명, 만료 임박 문서, 재발송 대기를 먼저 봐야 합니다.", "The office documents dashboard should prioritize contract signatures, expiring documents, and resend queues."),
      questions: [
        tx("오늘 효력이 시작되는데 아직 서명되지 않은 문서는 무엇인가", "Which documents take effect today but are still unsigned"),
        tx("만료 임박 문서를 누가 놓치고 있는가", "Who is at risk of missing near-expiry documents"),
        tx("재발송이 필요한 문서가 있는가", "Which documents need resend"),
      ],
      columns: [
        { title: tx("Signature Queue", "Signature Queue"), eyebrow: tx("Documents first", "Documents first"), tone: "primary", items: [
          { title: tx("연봉 변경 계약 4건", "4 salary change contracts"), meta: tx("오늘 효력 시작 / 재발송 필요", "Effective today / resend needed"), tone: "critical" },
          { title: tx("NDA 갱신 3건", "3 NDA renewals"), meta: tx("만료 임박", "Near expiry"), tone: "watch" },
          { title: tx("정책 변경 동의 12건", "12 policy acknowledgements"), meta: tx("이번 주 마감", "Due this week"), tone: "watch" },
        ] },
        { title: tx("Document Watch", "Document Watch"), eyebrow: tx("Expiry and resend", "Expiry and resend"), items: [
          { title: tx("재발송 필요 3건", "Need resend 3"), meta: tx("이메일 반송", "Email bounced"), tone: "critical" },
          { title: tx("만료 임박 5건", "Near expiry 5"), meta: tx("계약 갱신 검토", "Review renewal"), tone: "watch" },
          { title: tx("서명 대기 12건", "Awaiting signature 12"), meta: tx("오늘 후속조치 필요", "Follow up today"), tone: "critical" },
        ] },
      ],
    },
  },
  retail: {
    home: {
      title: tx("Retail Pack Admin Home", "Retail Pack Admin Home"),
      description: tx("매장별 결원, 피크타임 커버리지, 브레이크와 오버타임 리스크를 먼저 보는 리테일형 관리자 홈입니다.", "An admin home for retail operations that prioritizes store gaps, peak-time coverage, and break/overtime risk."),
      questions: [
        tx("오늘 어느 매장에서 결원이 생기는가", "Which stores have staffing gaps today"),
        tx("피크타임 커버리지가 충분한가", "Whether peak-time coverage is sufficient"),
        tx("브레이크와 오버타임 위반이 정산 리스크를 만드는가", "Whether break and overtime violations create payroll risk"),
      ],
      kpis: [
        { value: "3", label: tx("결원 매장", "Stores with gaps") },
        { value: "6", label: tx("피크타임 부족 슬롯", "Peak-time short slots") },
        { value: "5", label: tx("브레이크 위반 위험", "Break risks") },
        { value: "7", label: tx("오버타임 임박", "Overtime nearing") },
        { value: "6", label: tx("정산 전 확인 예외", "Pre-payroll exceptions") },
      ],
      columns: [
        { title: tx("Store Action Queue", "Store Action Queue"), eyebrow: tx("매장별 우선 처리", "Handle by store priority"), tone: "primary", items: [
          { title: tx("강남 2호점 결원 2명", "Gangnam Store 2 short by 2"), meta: tx("점심 피크타임 12:00~14:00 / 대체 배치 필요", "Lunch peak 12:00 to 14:00 / replacement assignment needed"), tone: "critical" },
          { title: tx("홍대점 브레이크 위반 위험", "Break violation risk at Hongdae store"), meta: tx("2명 연속 근무 / 브레이크 미배정", "2 workers on continuous shifts / no break assigned"), tone: "critical" },
          { title: tx("잠실점 체크인 누락", "Missing check-ins at Jamsil store"), meta: tx("오픈조 3명 중 1명 미체크인", "1 of 3 opening shift staff missing check-in"), tone: "watch" },
          { title: tx("월말 정산 예외 누적", "Month-end payroll exceptions accumulating"), meta: tx("야간수당 검토 6건 / 확정 전 확인 필요", "6 night allowance reviews / check before close"), tone: "critical" },
        ] },
        { title: tx("Compliance and Payroll Watch", "Compliance and Payroll Watch"), eyebrow: tx("정산 영향 중심", "Focus on payroll impact"), items: [
          { title: tx("브레이크 위반 위험 5건", "5 break violation risks"), meta: tx("즉시 시프트 조정 필요", "Shift adjustment needed immediately"), tone: "critical" },
          { title: tx("오버타임 임박 7명", "7 staff nearing overtime"), meta: tx("대체 배치 권장", "Replacement assignment recommended"), tone: "watch" },
          { title: tx("야간수당 확인 6건", "6 night allowance checks"), meta: tx("마감 전 규칙 재검토 필요", "Allowance rules need review before close"), tone: "critical" },
        ] },
        { title: tx("Coverage Board", "Coverage Board"), eyebrow: tx("매장별 커버리지", "Coverage by store"), stats: [
          tx("강남 2호점 / 점심 피크타임 2명 부족 / 74%", "Gangnam Store 2 / short by 2 at lunch peak / 74%"),
          tx("홍대점 / 브레이크 재배치 필요 / 81%", "Hongdae / needs break reallocation / 81%"),
          tx("잠실점 / 오픈조 체크인 누락 / 89%", "Jamsil / missing opening shift check-in / 89%"),
        ] },
        { title: tx("Peak Time Slots", "Peak Time Slots"), eyebrow: tx("시간대별 부족 인원", "Shortage by time slot"), timeline: [
          { lead: "11:30~13:30", text: tx("강남 2호점 / 2명 부족", "Gangnam Store 2 / short by 2"), badge: tx("심각", "Critical") },
          { lead: "14:00~16:00", text: tx("홍대점 / 브레이크 공백", "Hongdae / break gap"), badge: tx("주의", "Watch") },
          { lead: "18:00~21:00", text: tx("잠실점 / 추가 호출 필요", "Jamsil / extra call-in needed"), badge: tx("조치", "Act") },
        ] },
      ],
    },
    attendance: {
      title: tx("Retail Pack Attendance Dashboard", "Retail Pack Attendance Dashboard"),
      description: tx("리테일형 근태는 체크인 누락, 브레이크 위반, 당일 결원과 초과근무 노출을 먼저 봐야 합니다.", "Retail attendance operations should prioritize missing check-ins, break violations, same-day coverage gaps, and overtime exposure."),
      questions: [
        tx("어느 매장에서 당일 결원이 생기는가", "Which stores are short staffed today"),
        tx("브레이크와 오버타임 위반 위험이 어디에 몰려 있는가", "Where break and overtime risks are clustering"),
        tx("정산 전에 반드시 잡아야 할 근태 예외는 무엇인가", "Which attendance exceptions must be fixed before payroll"),
      ],
      kpis: [
        { value: "4", label: tx("체크인 누락", "Missing check-ins") },
        { value: "5", label: tx("브레이크 위험", "Break risks") },
        { value: "7", label: tx("오버타임 임박", "Overtime nearing") },
        { value: "3", label: tx("결원 매장", "Stores with gaps") },
        { value: "6", label: tx("정산 예외", "Payroll exceptions") },
      ],
      columns: [
        { title: tx("Store Exception Queue", "Store Exception Queue"), eyebrow: tx("Today first", "Today first"), tone: "primary", items: [
          { title: tx("강남 2호점 / 오픈조 체크인 누락", "Gangnam Store 2 / opening shift missing check-in"), meta: tx("연락 필요", "Needs contact"), tone: "critical" },
          { title: tx("홍대점 / 브레이크 미배정 2건", "Hongdae / 2 unassigned breaks"), meta: tx("즉시 조정", "Adjust immediately"), tone: "critical" },
          { title: tx("잠실점 / 초과근무 승인 대기", "Jamsil / overtime approvals pending"), meta: tx("주간 한도 임박", "Near weekly limit"), tone: "watch" },
        ] },
        { title: tx("Store Coverage Watch", "Store Coverage Watch"), eyebrow: tx("Coverage", "Coverage"), items: [
          { title: tx("강남 2호점", "Gangnam Store 2"), meta: tx("점심 피크타임 2명 부족", "Short by 2 at lunch peak"), tone: "critical" },
          { title: tx("홍대점", "Hongdae"), meta: tx("브레이크 재배치 필요", "Needs break reallocation"), tone: "watch" },
          { title: tx("잠실점", "Jamsil"), meta: tx("마감 전 추가 호출 가능", "May need extra call-in before close"), tone: "watch" },
        ] },
      ],
    },
    leave: {
      title: tx("Retail Pack Leave Dashboard", "Retail Pack Leave Dashboard"),
      description: tx("리테일형 휴가 대시보드는 매장 커버리지 공백과 피크타임 휴가 충돌을 먼저 봐야 합니다.", "The retail leave dashboard should prioritize store coverage gaps and peak-time leave conflicts."),
      questions: [
        tx("어느 매장에서 휴가로 결원이 생기는가", "Which stores have staffing gaps due to leave"),
        tx("피크타임과 충돌하는 휴가 요청이 있는가", "Which leave requests collide with peak time"),
        tx("대체 배치가 필요한 휴가 건은 무엇인가", "Which leave requests need replacement staff"),
      ],
      kpis: [
        { value: "3", label: tx("결원 매장", "Stores with gaps") },
        { value: "5", label: tx("피크타임 충돌", "Peak conflicts") },
        { value: "4", label: tx("대체 필요", "Need replacement") },
        { value: "7", label: tx("승인 대기", "Awaiting approval") },
        { value: "2", label: tx("만료 임박", "Near expiry") },
      ],
      columns: [
        { title: tx("Leave Queue", "Leave Queue"), eyebrow: tx("Coverage", "Coverage"), tone: "primary", items: [
          { title: tx("강남 2호점 / 점심 피크타임 휴가 충돌 2건", "Gangnam Store 2 / 2 leave conflicts at lunch peak"), meta: tx("대체 배치 필요", "Replacement needed"), tone: "critical" },
          { title: tx("홍대점 / 대체 배치 필요 3건", "Hongdae / 3 requests needing replacement"), meta: tx("매장장 확인", "Store manager check"), tone: "watch" },
          { title: tx("잠실점 / 주말 근무 커버리지 약화", "Jamsil / weekend coverage weakened"), meta: tx("주말 계획 조정", "Adjust weekend plan"), tone: "critical" },
        ] },
        { title: tx("Store Calendar Watch", "Store Calendar Watch"), eyebrow: tx("Stores", "Stores"), items: [
          { title: tx("강남 2호점", "Gangnam Store 2"), meta: tx("금요일 결원 위험", "Friday gap risk"), tone: "critical" },
          { title: tx("홍대점", "Hongdae"), meta: tx("토요일 피크 충돌", "Saturday peak conflict"), tone: "watch" },
          { title: tx("잠실점", "Jamsil"), meta: tx("주말 대체 근무 검토", "Review weekend swap"), tone: "watch" },
        ] },
      ],
    },
    workflow: {
      title: tx("Retail Pack Approval Inbox", "Retail Pack Approval Inbox"),
      description: tx("리테일형 승인 인박스는 정정, 시프트 변경, 초과근무 승인처럼 당일 운영에 직접 영향을 주는 건을 먼저 처리해야 합니다.", "The retail approval inbox should prioritize corrections, shift changes, and overtime requests that directly affect same-day operations."),
      questions: [
        tx("어떤 승인 건이 오늘 운영을 막는가", "Which approvals are blocking operations today"),
        tx("정산 전에 반드시 처리해야 할 승인은 무엇인가", "Which approvals must be resolved before payroll"),
        tx("대체 배치가 필요한 건이 있는가", "Which items require replacement staffing"),
      ],
      columns: [
        { title: tx("Approval Queue", "Approval Queue"), eyebrow: tx("Store operations", "Store operations"), tone: "primary", items: [
          { title: tx("체크아웃 정정 / 강남 2호점", "Checkout correction / Gangnam Store 2"), meta: tx("정산 전 처리 필요", "Resolve before payroll"), tone: "critical" },
          { title: tx("시프트 변경 승인 / 홍대점", "Shift change approval / Hongdae"), meta: tx("2시간 내 응답", "Respond within 2h"), tone: "critical" },
          { title: tx("초과근무 승인 / 잠실점", "Overtime approval / Jamsil"), meta: tx("주간 한도 임박", "Near weekly limit"), tone: "watch" },
        ] },
        { title: tx("Request Context", "Request Context"), eyebrow: tx("Impact", "Impact"), items: [
          { title: tx("근무 시간 / 매장 / 실제 기록", "Shift time / store / actual record"), meta: tx("근태 근거", "Attendance evidence") },
          { title: tx("브레이크 / 오버타임 / 정산 영향", "Break / overtime / payroll impact"), meta: tx("규정 확인", "Policy check") },
          { title: tx("대체 가능 인력 / 시프트 공백", "Available replacements / shift gap"), meta: tx("현장 조치", "Store action") },
        ] },
      ],
    },
    documents: {
      title: tx("Retail Pack Documents Dashboard", "Retail Pack Documents Dashboard"),
      description: tx("리테일형 문서 화면은 매장 운영 규정, 현장 공지, 근무 동의 문서를 먼저 봐야 합니다.", "The retail documents view should prioritize store policy, field notices, and work acknowledgement documents."),
      questions: [
        tx("오늘 근무에 영향을 주는 문서가 있는가", "Which documents affect today's work"),
        tx("매장 규정 미확인 인원이 있는가", "Who has not acknowledged store policies"),
        tx("현장 공지 동의가 지연되는가", "Whether notice acknowledgements are delayed"),
      ],
      columns: [
        { title: tx("Document Queue", "Document Queue"), eyebrow: tx("Field first", "Field first"), tone: "primary", items: [
          { title: tx("매장 운영 규정 변경", "Store policy update"), meta: tx("오늘 마감", "Due today"), tone: "critical" },
          { title: tx("브레이크 규정 개정 공지", "Break policy revision notice"), meta: tx("오픈 전 확인 필요", "Review before open"), tone: "critical" },
          { title: tx("대체 근무 동의 문서", "Shift swap acknowledgement"), meta: tx("이번 주 유효", "Valid this week"), tone: "watch" },
        ] },
        { title: tx("Read and Sign Watch", "Read and Sign Watch"), eyebrow: tx("Store notices", "Store notices"), items: [
          { title: tx("현장 공지 동의 지연", "Notice acknowledgement delayed"), meta: tx("내일 오픈 전 확인", "Review before tomorrow open"), tone: "watch" },
          { title: tx("동의 누락 8건", "8 missing acknowledgements"), meta: tx("매장장 후속조치 필요", "Needs manager follow-up"), tone: "critical" },
        ] },
      ],
    },
  },
};
