import { tx } from "./appCopy";

export const EMPLOYEE_PAGES = {
  office: {
    home: {
      title: tx("Office Pack Employee Home", "Office Pack Employee Home"),
      description: tx(
        "오피스형 직원은 요청, 서명, 일정 확인을 가장 먼저 처리해야 합니다.",
        "Office employees typically need to handle requests, signatures, and schedule checks before anything else.",
      ),
      questions: [
        tx("오늘 제출하거나 확인해야 할 요청은 무엇인가", "What requests do I need to submit or review today"),
        tx("서명해야 할 문서가 있는가", "Do I have documents to sign"),
        tx("이번 주 일정과 휴가에 충돌이 있는가", "Are there conflicts in my week or leave plans"),
      ],
      mustDo: [
        tx("연봉 변경 계약 서명", "Sign salary change contract"),
        tx("휴가 초안 제출", "Submit leave draft"),
        tx("팀 공지 확인", "Review team notice"),
      ],
      quickActions: [
        tx("휴가 요청", "Request leave"),
        tx("정정 요청", "Request correction"),
        tx("일반 요청", "General request"),
        tx("문서 서명", "Sign document"),
      ],
      weekly: [
        tx("수요일 원격근무", "Remote on Wednesday"),
        tx("금요일 휴가 예정", "Leave planned on Friday"),
        tx("1:1 미팅 14:00", "1:1 meeting at 14:00"),
      ],
      summary: [
        tx("휴가 잔여 8.5일", "8.5 leave days left"),
        tx("진행 중 요청 2건", "2 active requests"),
        tx("서명 대기 1건", "1 pending signature"),
      ],
      mobileHero: {
        title: tx("오늘 처리할 일 3건", "3 items to handle today"),
        text: tx("서명 1건 / 제출 필요 2건", "1 signature / 2 items to submit"),
      },
    },
    requests: {
      title: tx("Office Pack Request Hub", "Office Pack Request Hub"),
      description: tx(
        "오피스형 요청 허브는 휴가, 일반 품의, 문서 요청, 반려 후 재제출 흐름을 빠르게 처리해야 합니다.",
        "The office request hub should help employees quickly handle leave, general approvals, document-related requests, and rejected resubmissions.",
      ),
      quickActions: [
        tx("휴가 요청", "Leave request"),
        tx("일반 품의", "General approval"),
        tx("출퇴근 정정", "Attendance correction"),
        tx("문서 요청", "Document request"),
      ],
      hints: [
        tx("시간 단위 휴가는 팀장 승인 필요", "Hourly leave needs manager approval"),
        tx("비용 품의는 증빙 첨부 필수", "Expense-related approvals require evidence"),
      ],
      history: [
        tx("휴가 요청 / 승인 대기", "Leave request / awaiting approval"),
        tx("일반 품의 / 반려 / 재제출 필요", "General approval / rejected / needs resubmission"),
        tx("출퇴근 정정 / 승인 완료", "Attendance correction / approved"),
      ],
    },
    signatures: {
      title: tx("Office Pack Signature Inbox", "Office Pack Signature Inbox"),
      description: tx(
        "오피스형 서명 인박스는 계약, 정책 동의, 재발송 대기 문서를 우선 처리해야 합니다.",
        "The office signature inbox should prioritize contracts, policy acknowledgements, and resend queues.",
      ),
      priority: [
        tx("연봉 변경 계약 / 오늘 서명 필요", "Salary change contract / sign today"),
        tx("보안 정책 동의 / 이번 주 마감", "Security policy acknowledgement / due this week"),
      ],
      alerts: [
        tx("NDA 갱신 문서 확인", "Review NDA renewal"),
        tx("원격근무 정책 동의", "Acknowledge remote work policy"),
      ],
      detail: [
        tx("문서 제목 / 마감일 / 발송자", "Title / due date / sender"),
        tx("핵심 변경 사항", "Key changes"),
        tx("서명 또는 재확인", "Sign or re-acknowledge"),
      ],
    },
  },
  retail: {
    home: {
      title: tx("Retail Pack Employee Home", "Retail Pack Employee Home"),
      description: tx(
        "리테일형 직원은 오늘 근무, 체크인 상태, 시프트 변경, 현장 공지를 가장 먼저 확인해야 합니다.",
        "Retail employees should prioritize today's shift, check-in state, shift changes, and field notices.",
      ),
      questions: [
        tx("오늘 어느 매장에서 몇 시에 근무하는가", "Where and when am I working today"),
        tx("체크인 전 확인할 공지나 변경이 있는가", "Which notices or changes need review before check-in"),
        tx("대체근무나 추가 호출 요청이 들어왔는가", "Whether I received a swap or call-in request"),
      ],
      mustDo: [
        tx("11:30 오픈조 체크인", "Check in for 11:30 opening shift"),
        tx("브레이크 규정 개정 확인", "Review revised break policy"),
        tx("대체근무 요청 응답", "Respond to shift swap request"),
      ],
      quickActions: [
        tx("체크인", "Check in"),
        tx("체크아웃", "Check out"),
        tx("시프트 확인", "View shift"),
        tx("대체근무 응답", "Respond to swap"),
      ],
      weekly: [
        tx("금요일 11:30~20:00", "Friday 11:30 to 20:00"),
        tx("토요일 추가 호출 가능", "Possible extra call-in Saturday"),
        tx("월말 야간수당 확인", "Review night allowance at month end"),
      ],
      summary: [
        tx("이번 주 근무 34시간", "34 hours scheduled this week"),
        tx("변경 응답 1건", "1 pending schedule response"),
        tx("공지 확인 2건", "2 notices to review"),
      ],
      mobileHero: {
        title: tx("오늘 11:30 근무 시작", "Shift starts at 11:30 today"),
        text: tx("체크인 전 공지 2건 / 응답 필요 1건", "2 notices before check-in / 1 response needed"),
      },
    },
    requests: {
      title: tx("Retail Pack Request Hub", "Retail Pack Request Hub"),
      description: tx(
        "리테일형 요청 허브는 출퇴근 정정, 시프트 변경 응답, 대체근무 회신을 빠르게 처리해야 합니다.",
        "The retail request hub should help employees quickly handle attendance corrections, shift changes, and swap responses.",
      ),
      quickActions: [
        tx("출퇴근 정정", "Attendance correction"),
        tx("시프트 변경 응답", "Shift change response"),
        tx("대체근무 회신", "Swap response"),
        tx("근무 문의", "Work request"),
      ],
      hints: [
        tx("브레이크 규정 예외는 매장 관리자 검토 필요", "Break-rule exceptions need store manager review"),
        tx("초과근무 요청은 당일 승인 기준", "Overtime requests are reviewed same day"),
      ],
      history: [
        tx("체크아웃 정정 / 승인 대기", "Checkout correction / awaiting approval"),
        tx("대체근무 회신 / 확인 필요", "Swap response / needs confirmation"),
        tx("시프트 변경 / 승인 완료", "Shift change / approved"),
      ],
    },
    signatures: {
      title: tx("Retail Pack Signature Inbox", "Retail Pack Signature Inbox"),
      description: tx(
        "리테일형 서명 인박스는 매장 운영 규정, 현장 공지, 근무 관련 동의 문서를 우선 처리해야 합니다.",
        "The retail signature inbox should prioritize store policy, field notices, and work-related acknowledgement documents.",
      ),
      priority: [
        tx("매장 운영 규정 / 오늘 마감", "Store policy / due today"),
        tx("현장 공지 동의 / 내일 오픈 전 확인", "Field notice acknowledgement / review before tomorrow open"),
      ],
      alerts: [
        tx("대체근무 안내 확인", "Review swap guidance"),
        tx("브레이크 규정 개정 공지", "Review break policy revision"),
      ],
      detail: [
        tx("문서 제목 / 매장 / 마감일", "Title / store / due date"),
        tx("현장 적용 영향", "Operational impact"),
        tx("동의 체크", "Acknowledgement"),
      ],
    },
  },
};
