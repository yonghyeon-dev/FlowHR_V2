# FlowHR_V2 문서 인덱스

## 최상위 기준

아래 문서가 현재 프로덕션 작업의 최상위 기준이다.

1. [45-production-ssot-master.md](./foundation/45-production-ssot-master.md)
2. [46-production-work-breakdown.md](./foundation/46-production-work-breakdown.md)
3. [47-production-execution-order.md](./foundation/47-production-execution-order.md)
4. [48-wireframe-control-inventory.md](./foundation/48-wireframe-control-inventory.md)
5. [49-authority-ssot-matrix.md](./foundation/49-authority-ssot-matrix.md)
6. [50-wi-execution-cards.md](./foundation/50-wi-execution-cards.md)

이후 작업은 사용자가 특정 화면이나 기능을 언급하더라도 위 문서의 우선순위를 먼저 따른다.

## SSOT 계층

- 제품/도메인 SSOT: `docs/foundation`
- 화면/시각 SSOT: `flowhr-ui`
- 권한 SSOT: `src/lib/access-policy.ts`
- 데이터 SSOT: `prisma/schema.prisma`
- 구현 레이어: `src`

`src`는 SSOT가 아니라 구현 레이어다.  
구현은 항상 `docs + flowhr-ui + 권한/데이터 정책`을 따라야 한다.

## 현재 즉시 참고 문서

- 로드맵 요약: [42-production-delivery-roadmap.md](./foundation/42-production-delivery-roadmap.md)
- 우선순위 요약: [43-production-priority-order.md](./foundation/43-production-priority-order.md)
- UI SSOT 매핑: [44-ui-ssot-mapping.md](./foundation/44-ui-ssot-mapping.md)

## 디렉터리 구조

`docs/foundation`
- 제품 방향, 정보구조, 우선순위, 실행 순서, 준비도, 승인, 핸드오프

`docs/platform`
- Platform Operator 관련 문서

`docs/tenant-admin`
- Tenant Admin 관련 문서

`docs/tenant-employee`
- Tenant Employee 관련 문서

`docs/design-system`
- 디자인 토큰, 컴포넌트, 상태 패턴
