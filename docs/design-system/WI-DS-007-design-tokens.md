# WI-DS-007 디자인 토큰

## 작업 ID

- `WI-DS-007`

## 목적

FlowHR_V2의 시각 규칙을 실제 구현 가능한 토큰 체계로 고정한다.
이 문서는 와이어 수준의 방향 문서를 프론트엔드 스타일 시스템으로 연결하는 기준이다.

## 1. Token Naming

- `color.*`
- `font.*`
- `space.*`
- `radius.*`
- `border.*`
- `shadow.*`
- `breakpoint.*`
- `motion.*`

## 2. Color Tokens

### Surface

| 토큰 | 값 | 용도 |
|---|---|---|
| `color.surface.canvas` | `#F4F7F9` | 앱 전체 배경 |
| `color.surface.primary` | `#FFFFFF` | 기본 카드/패널 |
| `color.surface.secondary` | `#EEF3F6` | 보조 패널/필터 영역 |
| `color.surface.inverse` | `#14202B` | 어두운 헤더/강조 영역 |

### Text

| 토큰 | 값 | 용도 |
|---|---|---|
| `color.text.primary` | `#13202B` | 기본 본문 |
| `color.text.secondary` | `#506070` | 보조 정보 |
| `color.text.tertiary` | `#748191` | 비활성/힌트 |
| `color.text.inverse` | `#FFFFFF` | 어두운 배경 위 텍스트 |

### Border

| 토큰 | 값 | 용도 |
|---|---|---|
| `color.border.default` | `#D9E1E8` | 기본 테두리 |
| `color.border.strong` | `#B9C5CF` | 강조 분리선 |
| `color.border.focus` | `#1F6FEB` | 포커스 링 |

### Brand / Accent

| 토큰 | 값 | 용도 |
|---|---|---|
| `color.brand.primary` | `#176B87` | 관리자/플랫폼 포인트 |
| `color.brand.secondary` | `#2C8FA3` | 보조 액센트 |
| `color.brand.soft` | `#D8EEF2` | 연한 브랜드 배경 |

### Status

| 토큰 | 값 | 용도 |
|---|---|---|
| `color.status.critical.fg` | `#8E1F1A` | 긴급 텍스트 |
| `color.status.critical.bg` | `#FDE8E5` | 긴급 tint |
| `color.status.high.fg` | `#A45408` | 경고 텍스트 |
| `color.status.high.bg` | `#FFF1DE` | 경고 tint |
| `color.status.medium.fg` | `#176B87` | 주시 텍스트 |
| `color.status.medium.bg` | `#E5F4F7` | 주시 tint |
| `color.status.neutral.fg` | `#5A6A79` | 일반 상태 텍스트 |
| `color.status.neutral.bg` | `#EEF3F6` | 일반 상태 배경 |
| `color.status.success.fg` | `#1E6A42` | 성공 텍스트 |
| `color.status.success.bg` | `#E5F5EC` | 성공 tint |

## 3. Typography Tokens

### Font Family

| 토큰 | 값 | 용도 |
|---|---|---|
| `font.family.base` | `"Pretendard", "Noto Sans KR", sans-serif` | 기본 UI |
| `font.family.numeric` | `"IBM Plex Sans", "Pretendard", sans-serif` | 숫자/KPI |

### Font Size

| 토큰 | 값 | 용도 |
|---|---|---|
| `font.size.12` | `12px` | 캡션/배지 |
| `font.size.14` | `14px` | 기본 본문 |
| `font.size.16` | `16px` | 큰 본문/입력 |
| `font.size.20` | `20px` | 섹션 제목 |
| `font.size.24` | `24px` | 페이지 제목 |
| `font.size.32` | `32px` | KPI/히어로 타이틀 |

### Font Weight

| 토큰 | 값 | 용도 |
|---|---|---|
| `font.weight.regular` | `400` | 기본 본문 |
| `font.weight.medium` | `500` | 라벨 |
| `font.weight.semibold` | `600` | 섹션 제목 |
| `font.weight.bold` | `700` | KPI/강조 |

### Line Height

| 토큰 | 값 | 용도 |
|---|---|---|
| `font.line.compact` | `1.2` | 배지/KPI |
| `font.line.default` | `1.5` | 본문 |
| `font.line.relaxed` | `1.7` | 설명 문구 |

## 4. Spacing Tokens

| 토큰 | 값 | 용도 |
|---|---|---|
| `space.4` | `4px` | 미세 간격 |
| `space.8` | `8px` | 배지 간격 |
| `space.12` | `12px` | 소형 패딩 |
| `space.16` | `16px` | 기본 컴포넌트 패딩 |
| `space.20` | `20px` | 카드 내부 여백 |
| `space.24` | `24px` | 섹션 내부 여백 |
| `space.32` | `32px` | 화면 블록 간격 |
| `space.40` | `40px` | 페이지 상단 여백 |

## 5. Radius / Border / Shadow

### Radius

| 토큰 | 값 | 용도 |
|---|---|---|
| `radius.8` | `8px` | 입력/배지 |
| `radius.12` | `12px` | 카드 |
| `radius.16` | `16px` | 모달/패널 |
| `radius.round` | `999px` | pill, chip |

### Border

| 토큰 | 값 | 용도 |
|---|---|---|
| `border.width.default` | `1px` | 기본 테두리 |
| `border.width.strong` | `2px` | 강조 상태 |

### Shadow

| 토큰 | 값 | 용도 |
|---|---|---|
| `shadow.card` | `0 8px 24px rgba(19, 32, 43, 0.08)` | 카드 |
| `shadow.panel` | `0 12px 32px rgba(19, 32, 43, 0.10)` | 드로어/패널 |
| `shadow.modal` | `0 20px 48px rgba(19, 32, 43, 0.18)` | 모달 |

## 6. Breakpoints

| 토큰 | 값 | 용도 |
|---|---|---|
| `breakpoint.mobile` | `390px` | 직원 모바일 기준 |
| `breakpoint.tablet` | `768px` | 태블릿/좁은 관리자 |
| `breakpoint.desktop` | `1280px` | 기본 데스크톱 |
| `breakpoint.wide` | `1600px` | 고밀도 운영 화면 |

## 7. Motion

| 토큰 | 값 | 용도 |
|---|---|---|
| `motion.fast` | `120ms` | hover/focus |
| `motion.normal` | `180ms` | drawer/tab 전환 |
| `motion.slow` | `240ms` | modal 진입 |
| `motion.ease.standard` | `cubic-bezier(0.2, 0, 0, 1)` | 기본 easing |

## 8. 적용 원칙

- Platform과 Admin은 같은 토큰 세트를 공유하되 밀도 설정만 다르게 가져간다.
- Employee는 같은 색 체계를 쓰되 여백과 CTA 비율을 더 넓게 잡는다.
- 상태 색상은 장식이 아니라 운영 우선순위 전달 수단으로만 사용한다.
- 텍스트 대비와 상태 tint는 접근성 AA를 목표로 점검한다.

## 9. 구현 예시

```css
:root {
  --color-surface-canvas: #f4f7f9;
  --color-surface-primary: #ffffff;
  --color-text-primary: #13202b;
  --color-brand-primary: #176b87;
  --color-status-critical-bg: #fde8e5;
  --font-size-14: 14px;
  --space-16: 16px;
  --radius-12: 12px;
  --shadow-card: 0 8px 24px rgba(19, 32, 43, 0.08);
}
```

## 연결 문서

- 시각 방향: [WI-DS-001-design-system-direction.md](./WI-DS-001-design-system-direction.md)
- 상태 색상: [WI-DS-005-status-color-visual-language.md](./WI-DS-005-status-color-visual-language.md)
- 공통 컴포넌트 규격서: [WI-DS-008-component-specifications.md](./WI-DS-008-component-specifications.md)
