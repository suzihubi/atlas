# AUM Atlas — Content Extract

Complete extract of every piece of copy, data point, label, and value currently
visible on the AUM Atlas dashboard.

**Hand-off workflow:**
1. Edit any value below.
2. Hand back the edited markdown.
3. I'll map your edits to the source data files (paths listed under each section)
   and push to GitHub → Vercel auto-deploys.

Notation:
- `[field]` → value you can edit
- Each section names the source file so changes are traceable
- `EDIT:` lines are placeholders for free-text notes/instructions to me

---

## 1. Page Metadata

> Source: `src/app/layout.tsx`

- **Browser tab title**: `AUM Atlas — Global Operations Command Center`
- **Meta description**: `Executive dashboard for AUM: jurisdictional flows, gold reserves, tokenization, treasury and compliance — visualized on an interactive 3D globe.`
- **Theme color** (iOS status bar tint): `#1a1410`

EDIT:

---

## 2. Top Header Bar

> Source: `src/app/page.tsx` (top bar JSX)

- **Module eyebrow**: `AUM ATLAS`
- **Page title (desktop)**: `Global Operations Command Center`
- **Page title (mobile)**: `Global Operations`
- **Access badge**: `Executive Access` (green dot)
- **Classification badge**: `Class · Internal`
- **Clock format**: `HH:MM:SS UTC` (live)

EDIT:

---

## 3. Header KPI Rail (6 cards across the top)

> Source: `src/data/kpis.ts` → `headerKpis`

| # | Label | Value | Delta | Status |
|---|---|---|---|---|
| 1 | `Global Treasury` | `$184.2M` | `+1.4%` | ok (green) |
| 2 | `Allocated Gold` | `62,140 oz` | `+820 oz` | ok (green) |
| 3 | `Active Jurisdictions` | `11` | — | — |
| 4 | `Live Flows` | `27` | `+4` | ok (green) |
| 5 | `Compliance Exceptions` | `3` | — | warn (amber) |
| 6 | `Reserve Verification` | `98.4%` | — | ok (green) |

EDIT:

---

## 4. Left Panel — Global Operations Cards

> Source: `src/data/kpis.ts`
>
> Visible on desktop; collapses into the mobile "Operations" bottom-sheet.

### 4.1 Global Treasury Exposure

- **Card eyebrow**: `Global Treasury Exposure`
- **Hero value**: `$184.2M`
- **24h delta**: `+1.4%` (green)
- **Gold Allocation**: `$112.6M`
- **Fiat / Stablecoin**: `$48.9M`
- **Tokenized Reserves**: `$22.7M`
- **Risk-Weighted**: `$172.0M`

EDIT:

### 4.2 Reserve Status

- **Card eyebrow**: `Reserve Status`
- **Card title**: `Allocated Gold Under Control`
- **Allocated Gold**: `62,140 oz`
- **Verified Bars**: `1,184 / 1,202`
- **Pending Assay**: `18`
- **Active Vaults**: `4`
- **Coverage Ratio**: `101.6%` (green accent)
- **Last Verification**: `13:12 UTC`

EDIT:

### 4.3 Jurisdictional Footprint

- **Card eyebrow**: `Jurisdictional Footprint`
- **Card title**: `11 Active`
- **Legal Entities**: `5`
- **Vault Jurisdictions**: `3`
- **Banking Jurisdictions**: `4`
- **Sourcing Corridors**: `3`
- **Enhanced Monitoring**: `1`

EDIT:

### 4.4 TROY Operations

- **Card eyebrow**: `TROY Operations`
- **Card title**: `Reserve-Backed Tokenization`
- **Active Supply**: `2,217,518`
- **Minted (lifetime)**: `2,401,820`
- **Burned (lifetime)**: `184,302`
- **NFT Bars Linked**: `1,184`
- **Reserve Ratio**: `101.6%` (green accent)
- **Mint Queue**: `11`
- **Redemption Queue**: `6`

EDIT:

### 4.5 AUX Treasury

- **Card eyebrow**: `AUX Treasury`
- **Card title**: `Stable Instrument Monitor`
- **Parity Target**: `1.000 AED`
- **Hedge Coverage**: `98.2%` (green accent)
- **Liquidity Pool**: `$14.6M`
- **Parity Deviation**: `+0.02 bps`
- **Settlement Liquidity**: `$48.2M`
- **Treasury Stress**: `Low`

EDIT:

---

## 5. Right Panel — Activity Feed

> Source: `src/data/kpis.ts`
>
> Visible on large desktop; collapses into the mobile "Activity" bottom-sheet.

### 5.1 Live Operational Feed

- **Card eyebrow**: `Live Operational Feed`
- **Card title**: `Last 60 minutes`

| Time (UTC) | Category | Event |
|---|---|---|
| `14:42` | vault | `Zurich vault — 8,000 oz inbound confirmed` |
| `14:36` | token | `TROY mint — 1,420 oz allocated` |
| `14:32` | gold | `Accra corridor — shipment 02-A scheduled` |
| `14:21` | compliance | `Mozambique EDD — supplier 7 escalated` |
| `14:08` | settlement | `UAE→SG liquidity sweep — $4.2M` |
| `13:54` | risk | `Country risk — Mozambique watch raised` |
| `13:42` | token | `TROY redemption — bar 0091 released` |
| `13:12` | vault | `Reserve verification cycle complete` |

Categories color-coded: `gold`, `token`, `settlement`, `compliance`, `vault`, `risk`

EDIT:

### 5.2 Risk & Alerts

- **Card eyebrow**: `Risk & Alerts`
- **Card title**: `4 open`

| Severity | Alert |
|---|---|
| high | `Mozambique route — EDD required before next shipment` |
| medium | `Ghana corridor — Assay certificate pending (24h)` |
| medium | `Colombia LATAM — Sanctions screening pending` |
| low | `Singapore counterparty — annual review window opening` |

EDIT:

### 5.3 Compliance Monitor

- **Card eyebrow**: `Compliance Monitor`
- **Card title**: `Open Items`

| Label | Value |
|---|---|
| `KYC / KYB Clearance Rate` | `98.1%` |
| `Sanctions Screening` | `Clear` |
| `Audit Status` | `On Track` |
| `MLRO Queue` | `4` |
| `Documents Pending` | `12` |
| `Pending Approvals` | `2` |

EDIT:

---

## 6. Globe — Flow Legend Overlay

> Source: `src/components/atlas/FlowLegend.tsx`

- **Header**: `Flow Legend`

| Color sample | Label |
|---|---|
| Gold | `Bullion / Reserve Movement` |
| White-gold | `Vault / Custody` |
| Blue-gold | `Fiat / Settlement Rail` |
| Purple-gold | `Legal / Issuance Structure` |
| Cool white | `Compliance / Audit` |
| Amber | `Pending / Medium Risk` |
| Red-amber | `High Risk / EDD` |

EDIT:

---

## 7. Globe Stage — Hint Strip

> Source: `src/app/page.tsx`

- **Desktop hint**: `Drag · Scroll · Click jurisdictions`
- **Mobile hint**: `Pinch · Drag · Tap nodes`

EDIT:

---

## 8. Globe — Jurisdictions (11 active points)

> Source: `src/data/jurisdictions.ts`
>
> Each jurisdiction renders as a pulsing point + halo on the globe. Highlighted
> country polygons are filled with creme accent. Clicking a node opens the
> Jurisdiction Detail Drawer.

### 8.1 United Arab Emirates

- **ID**: `uae`
- **Country label**: `United Arab Emirates`
- **Cities**: `Dubai`, `Abu Dhabi`
- **Coordinates**: `25.2048, 55.2708`
- **Status**: `active`
- **Risk**: `low`
- **Regulatory classification**: `Primary Operating Jurisdiction`
- **Operational roles**:
  - `Operating Core`
  - `VARA / DWTC Operating Context`
  - `Gold Vaulting`
  - `Treasury`
  - `Token Operations`
  - `Broker-Dealer Activity`
- **AUM entities**:
  - `AUM Fintech FZE`
  - `AUM Global LLC FZ`
  - `Schiff Gold Precious Metals Trading LLC`
- **Active layers**: `gold, treasury, tokenization, compliance, vault`

EDIT:

### 8.2 Switzerland

- **ID**: `switzerland`
- **Country label**: `Switzerland`
- **Cities**: `Zurich`, `Geneva`, `Zug`
- **Coordinates**: `47.3769, 8.5417`
- **Status**: `active`
- **Risk**: `low`
- **Regulatory classification**: `Strategic Bullion Corridor`
- **Operational roles**:
  - `Bullion Liquidity`
  - `Vaulting`
  - `Institutional Settlement`
  - `Gold Market Corridor`
- **AUM entities**: (none)
- **Active layers**: `gold, vault`

EDIT:

### 8.3 United Kingdom

- **ID**: `uk`
- **Country label**: `United Kingdom`
- **Cities**: `London`
- **Coordinates**: `51.5072, -0.1276`
- **Status**: `active`
- **Risk**: `low`
- **Regulatory classification**: `Institutional Market Corridor`
- **Operational roles**:
  - `OTC Liquidity`
  - `Institutional Counterparties`
  - `Bullion Market Access`
- **AUM entities**: (none)
- **Active layers**: `treasury, institutional`

EDIT:

### 8.4 Singapore

- **ID**: `singapore`
- **Country label**: `Singapore`
- **Cities**: `Singapore`
- **Coordinates**: `1.3521, 103.8198`
- **Status**: `active`
- **Risk**: `low`
- **Regulatory classification**: `Asian Financial Hub`
- **Operational roles**:
  - `Asian Liquidity`
  - `Institutional Distribution`
  - `Settlement`
  - `Regional Treasury Corridor`
- **AUM entities**: (none)
- **Active layers**: `treasury, institutional`

EDIT:

### 8.5 Hong Kong

- **ID**: `hong_kong`
- **Country label**: `Hong Kong`
- **Cities**: `Hong Kong`
- **Coordinates**: `22.3193, 114.1694`
- **Status**: `active`
- **Risk**: `low`
- **Regulatory classification**: `Oversight / Compliance Jurisdiction`
- **Operational roles**:
  - `Oversight`
  - `Compliance Linkage`
  - `Asian Institutional Access`
- **AUM entities**:
  - `AUM Oversight HK Limited`
- **Active layers**: `compliance, legal`

EDIT:

### 8.6 Cayman Islands

- **ID**: `cayman`
- **Country label**: `Cayman Islands`
- **Cities**: `George Town`
- **Coordinates**: `19.2866, -81.3744`
- **Status**: `structural`
- **Risk**: `medium`
- **Regulatory classification**: `Issuance / Offshore Structuring`
- **Operational roles**:
  - `Token Issuance`
  - `Legal Structuring`
  - `Issuer Entity`
- **AUM entities**:
  - `AUM TROY ER KY LTD`
- **Active layers**: `tokenization, legal`

EDIT:

### 8.7 British Virgin Islands

- **ID**: `bvi`
- **Country label**: `British Virgin Islands`
- **Cities**: `Tortola`
- **Coordinates**: `18.4207, -64.64`
- **Status**: `strategic`
- **Risk**: `medium`
- **Regulatory classification**: `Offshore Structuring`
- **Operational roles**:
  - `Structuring Optionality`
  - `SPV Optionality`
  - `Legal Architecture`
- **AUM entities**: (none)
- **Active layers**: `legal`

EDIT:

### 8.8 Malaysia / Labuan

- **ID**: `malaysia_labuan`
- **Country label**: `Malaysia / Labuan`
- **Cities**: `Labuan`, `Kuala Lumpur`
- **Coordinates**: `5.2831, 115.2308`
- **Status**: `active`
- **Risk**: `low`
- **Regulatory classification**: `Foundation / Beneficiary Rights`
- **Operational roles**:
  - `Foundation`
  - `Beneficiary Structure`
  - `Legal Rights Layer`
- **AUM entities**:
  - `AUM (L) Foundation LTD`
- **Active layers**: `legal, compliance`

EDIT:

### 8.9 Ghana

- **ID**: `ghana`
- **Country label**: `Ghana`
- **Cities**: `Accra`
- **Coordinates**: `5.6037, -0.187`
- **Status**: `active`
- **Risk**: `medium`
- **Regulatory classification**: `Sourcing Jurisdiction`
- **Operational roles**:
  - `Gold Sourcing`
  - `African Supply Corridor`
- **AUM entities**: (none)
- **Active layers**: `gold`

EDIT:

### 8.10 Colombia

- **ID**: `colombia`
- **Country label**: `Colombia`
- **Cities**: `Bogota`
- **Coordinates**: `4.711, -74.0721`
- **Status**: `exploratory`
- **Risk**: `medium`
- **Regulatory classification**: `Strategic Expansion Jurisdiction`
- **Operational roles**:
  - `LATAM Expansion`
  - `Potential Gold / Commodity Corridor`
- **AUM entities**: (none)
- **Active layers**: `gold`

EDIT:

### 8.11 Mozambique

- **ID**: `mozambique`
- **Country label**: `Mozambique`
- **Cities**: `Maputo`
- **Coordinates**: `-25.9692, 32.5732`
- **Status**: `monitoring`
- **Risk**: `high`
- **Regulatory classification**: `Enhanced Due Diligence Jurisdiction`
- **Operational roles**:
  - `Gold / Commodity Sourcing`
  - `African Supply Corridor`
- **AUM entities**: (none)
- **Active layers**: `gold, risk`

EDIT:

---

## 9. Globe — Animated Flow Arcs (8 corridors)

> Source: `src/data/flows.ts`
>
> Each flow renders as a dashed animated arc between source and destination.
> Clicking opens the Flow Detail Drawer.

### 9.1 Ghana Gold Sourcing Corridor

- **ID**: `flow-gh-uae-gold-001`
- **Name**: `Ghana Gold Sourcing Corridor`
- **Type**: `gold_sourcing`
- **Source**: `Accra, Ghana` (5.6037, -0.187)
- **Destination**: `Dubai, United Arab Emirates` (25.2048, 55.2708)
- **Asset**: `Allocated Gold`
- **Volume**: `2,450 oz`
- **Status**: `active`
- **Risk**: `medium`
- **Compliance**: `under_review`
- **Settlement window**: `T+2`
- **Responsible entity**: `AUM Gold Operations`
- **Related product**: `TROY`
- **Arc color**: `gold`
- **Last updated**: `14:32 UTC`
- **Timeline**:
  1. `Supplier sourced`
  2. `KYB completed`
  3. `Assay pending`
  4. `Logistics scheduled`
  5. `UAE vault allocation pending`
- **Documents**:
  - `Supplier KYB`
  - `Assay Certificate`
  - `Logistics Confirmation`
  - `AML Screening`
  - `Purchase Agreement`
  - `Reserve Allocation Record`
- **Executive notes**: `EDD recommended before increasing corridor volume.`

EDIT:

### 9.2 Swiss Vault Liquidity Corridor

- **ID**: `flow-ch-uae-vault-001`
- **Name**: `Swiss Vault Liquidity Corridor`
- **Type**: `vault_transfer`
- **Source**: `Zurich, Switzerland` (47.3769, 8.5417)
- **Destination**: `Dubai, United Arab Emirates`
- **Asset**: `Good Delivery Gold`
- **Volume**: `8,000 oz`
- **Status**: `active`
- **Risk**: `low`
- **Compliance**: `verified`
- **Settlement window**: `T+1`
- **Responsible entity**: `AUM Treasury`
- **Related product**: `TROY`
- **Arc color**: `white_gold`
- **Last updated**: (none)
- **Timeline**: (none)
- **Documents**: (none)
- **Executive notes**: (none)

EDIT:

### 9.3 UAE–Singapore Liquidity Corridor

- **ID**: `flow-uae-sg-liquidity-001`
- **Name**: `UAE–Singapore Liquidity Corridor`
- **Type**: `liquidity`
- **Source**: `Dubai, United Arab Emirates`
- **Destination**: `Singapore, Singapore` (1.3521, 103.8198)
- **Asset**: `Stablecoin / Fiat Liquidity`
- **Volume**: `$12.4M`
- **Status**: `active`
- **Risk**: `low`
- **Compliance**: `verified`
- **Settlement window**: `same-day`
- **Responsible entity**: `AUM Treasury`
- **Related product**: `AUX`
- **Arc color**: `blue_gold`

EDIT:

### 9.4 Labuan–Cayman Issuance Structure

- **ID**: `flow-labuan-cayman-legal-001`
- **Name**: `Labuan–Cayman Issuance Structure`
- **Type**: `legal_structure`
- **Source**: `Labuan, Malaysia` (5.2831, 115.2308)
- **Destination**: `George Town, Cayman Islands` (19.2866, -81.3744)
- **Asset**: `Legal / Beneficiary Rights`
- **Volume**: `N/A`
- **Status**: `structural`
- **Risk**: `low`
- **Compliance**: `documented`
- **Settlement window**: `N/A`
- **Responsible entity**: `AUM Legal Structure`
- **Related product**: `TROY`
- **Arc color**: `purple_gold`

EDIT:

### 9.5 UAE–Hong Kong Compliance Oversight

- **ID**: `flow-uae-hk-oversight-001`
- **Name**: `UAE–Hong Kong Compliance Oversight`
- **Type**: `compliance`
- **Source**: `Dubai, United Arab Emirates`
- **Destination**: `Hong Kong, Hong Kong` (22.3193, 114.1694)
- **Asset**: `Compliance / Audit Linkage`
- **Volume**: `N/A`
- **Status**: `active`
- **Risk**: `low`
- **Compliance**: `verified`
- **Settlement window**: `continuous`
- **Responsible entity**: `AUM Oversight`
- **Related product**: `Group Operations`
- **Arc color**: `cool_white`

EDIT:

### 9.6 UK–UAE OTC Institutional Corridor

- **ID**: `flow-uk-uae-otc-001`
- **Name**: `UK–UAE OTC Institutional Corridor`
- **Type**: `otc`
- **Source**: `London, United Kingdom` (51.5072, -0.1276)
- **Destination**: `Dubai, United Arab Emirates`
- **Asset**: `OTC Settlement`
- **Volume**: `$5.8M`
- **Status**: `active`
- **Risk**: `medium`
- **Compliance**: `verified`
- **Settlement window**: `T+1`
- **Responsible entity**: `AUM Broker-Dealer Desk`
- **Related product**: `TROY / AUX`
- **Arc color**: `gold`

EDIT:

### 9.7 Colombia–UAE LATAM Expansion Route

- **ID**: `flow-co-uae-latam-001`
- **Name**: `Colombia–UAE LATAM Expansion Route`
- **Type**: `regional_expansion`
- **Source**: `Bogota, Colombia` (4.711, -74.0721)
- **Destination**: `Dubai, United Arab Emirates`
- **Asset**: `Strategic Operations`
- **Volume**: `N/A`
- **Status**: `exploratory`
- **Risk**: `medium`
- **Compliance**: `pending`
- **Settlement window**: `N/A`
- **Responsible entity**: `AUM Global Expansion`
- **Related product**: `Group Operations`
- **Arc color**: `amber`

EDIT:

### 9.8 Mozambique–UAE Sourcing Route

- **ID**: `flow-mz-uae-source-001`
- **Name**: `Mozambique–UAE Sourcing Route`
- **Type**: `gold_sourcing`
- **Source**: `Maputo, Mozambique` (-25.9692, 32.5732)
- **Destination**: `Dubai, United Arab Emirates`
- **Asset**: `Gold / Commodity Sourcing`
- **Volume**: `1,100 oz`
- **Status**: `monitoring`
- **Risk**: `high`
- **Compliance**: `enhanced_due_diligence`
- **Settlement window**: `T+5`
- **Responsible entity**: `AUM Gold Operations`
- **Related product**: `TROY`
- **Arc color**: `red_amber`

EDIT:

---

## 10. Bottom Control Bar — Mode Tabs (7)

> Source: `src/components/atlas/LayerControlPanel.tsx`

Each mode filters which layers are visible on the globe.

| ID | Label | Default visible layers |
|---|---|---|
| `live` | `Global Live` | all 8 |
| `gold` | `Gold Ops` | gold, vault |
| `tokenization` | `Tokenization` | tokenization, vault |
| `treasury` | `Treasury` | treasury, institutional |
| `legal` | `Legal` | legal, compliance |
| `risk` | `Risk` | risk, compliance, gold |
| `report` | `Executive Report` | all 8 |

EDIT:

---

## 11. Bottom Control Bar — Layer Toggles (8)

> Source: `src/components/atlas/LayerControlPanel.tsx`

| ID | Label |
|---|---|
| `gold` | `Gold` |
| `vault` | `Vaults` |
| `tokenization` | `Tokenization` |
| `treasury` | `Treasury` |
| `compliance` | `Compliance` |
| `legal` | `Legal` |
| `risk` | `Risk` |
| `institutional` | `Institutional` |

EDIT:

---

## 12. Bottom Control Bar — Snapshot Button

> Source: `src/components/atlas/LayerControlPanel.tsx`

- **Button label**: `Executive Snapshot`
- **Current behavior**: shows browser alert `Executive Snapshot — coming soon`
  (placeholder — pending real modal/export implementation)

EDIT:

---

## 13. Flow Detail Drawer (opens when a flow arc is clicked)

> Source: `src/components/atlas/FlowDetailDrawer.tsx`
>
> Renders dynamically from a selected flow object. Section headers shown:

- **Eyebrow line**: `{Source country} → {Destination country}`
- **Title**: flow name
- **Inline badges**: Status, Risk, Compliance
- **Body rows**: Source City, Destination City, Asset, Volume, Settlement Window,
  Responsible Entity, Related Product, Last Update
- **Optional sections**: `Timeline`, `Documents`, `Executive Notes`

EDIT:

---

## 14. Jurisdiction Detail Drawer (opens when a city node is clicked)

> Source: `src/components/atlas/JurisdictionDetailDrawer.tsx`
>
> Renders dynamically from a selected jurisdiction object. Section headers shown:

- **Eyebrow line**: jurisdiction's regulatory classification
- **Title**: jurisdiction country label
- **Inline badges**: Risk, Status
- **Body sections**:
  - `Operational Role` (bullet list)
  - `Cities` (· separated)
  - `AUM Entities` (bullet list, only shown if any)
  - `Active Flows (N)` (linked flow list, only shown if any)
  - `Active Layers` (chip list)

EDIT:

---

## 15. Mobile Sheet Titles

> Source: `src/app/page.tsx`

- **Operations sheet eyebrow**: `Global Operations`
- **Operations sheet title**: `Treasury · Reserves · Footprint`
- **Activity sheet eyebrow**: `Activity`
- **Activity sheet title**: `Feed · Alerts · Compliance`

Floating trigger buttons (mobile only):
- Top-left: `Operations`
- Top-right: `Activity`

EDIT:

---

## 16. Status / Risk / Compliance Vocabulary

> Source: `src/types/atlas.ts` and `src/lib/atlas-colors.ts`
>
> These are the canonical enums used everywhere. Changing labels updates badges
> sitewide.

### Flow status options

`active`, `pending`, `settled`, `delayed`, `paused`, `escalated`, `failed`,
`under_review`, `verified`, `simulated`, `structural`, `exploratory`,
`monitoring`

Display labels:

| Internal | Displayed as |
|---|---|
| `active` | `Active` |
| `pending` | `Pending` |
| `settled` | `Settled` |
| `delayed` | `Delayed` |
| `paused` | `Paused` |
| `escalated` | `Escalated` |
| `failed` | `Failed` |
| `under_review` | `Under Review` |
| `verified` | `Verified` |
| `simulated` | `Simulated` |
| `structural` | `Structural` |
| `exploratory` | `Exploratory` |
| `monitoring` | `Monitoring` |

EDIT:

### Risk levels

`low`, `medium`, `high`, `critical`

EDIT:

### Compliance status options

| Internal | Displayed as |
|---|---|
| `verified` | `Verified` |
| `pending_review` | `Pending Review` |
| `under_review` | `Under Review` |
| `enhanced_due_diligence` | `Enhanced Due Diligence` |
| `missing_documentation` | `Missing Documentation` |
| `audit_required` | `Audit Required` |
| `regulator_review` | `Regulator Review` |
| `blocked` | `Blocked` |
| `documented` | `Documented` |
| `pending` | `Pending` |

EDIT:

---

## 17. Brand Palette & Typography

> Source: `src/app/globals.css` and `src/lib/atlas-colors.ts`
>
> Pulled from the live AUM website tokens — don't change unless rebranding.

- **Background brown**: `#201914`
- **Dark brown**: `#1a1410`
- **Deep**: `#0f0b08`
- **Creme (primary text/accent)**: `#ffebc4`
- **Success green**: `#9ed6a6`
- **Warn amber**: `#e6b85c`
- **Danger red**: `#d86868`
- **Font family**: `kh-teka-regular`, sans-serif
- **Single font weight**: `400`
- **Button pill radius**: `40px`

Flow line colors:

| Token | Hex |
|---|---|
| `gold` | `#e8c87a` |
| `white_gold` | `#f3e2a3` |
| `blue_gold` | `#a8c4d8` |
| `purple_gold` | `#c8a8d4` |
| `cool_white` | `#e8e1d0` |
| `amber` | `#e6b85c` |
| `red_amber` | `#d86868` |

EDIT:

---

## 18. Open Items / Not Yet Implemented

For Cowork context — these features are scaffolded in the UI but lack real
behavior. Edits in this doc won't affect them; flag here what you want me to
build next.

- Executive Snapshot button → shows placeholder alert; needs modal with
  treasury value, allocated gold, top jurisdictions, high-risk routes,
  exceptions, top 5 flows, pending approvals, recommended actions, and
  export buttons (PDF / CSV / Board Pack / Regulator View / Investor View).
- Hover tooltips on globe arcs/nodes — only click → drawer is wired.
- Section 20 sub-modules from the original brief (Reserve Proof Engine,
  Counterparty Matrix, Flow of Funds graph view) — not yet built.
- Microcharts (treasury over time, mint/burn, parity deviation, etc.)
- Real API adapters for any of the mock data above.

EDIT:

---

## How to hand this back

1. Edit values in place; add `EDIT:` notes where you want commentary attached.
2. Either:
   - **Path-based**: send me back the edited file (or commit it to the repo)
     and tell me "apply CONTENT_EXTRACT.md edits"
   - **Inline**: paste the changed sections in chat and I'll patch them
3. I'll diff against the values listed here, update the corresponding source
   files under `src/data/` and `src/components/atlas/`, run a production build,
   and push to `main` so Vercel redeploys.
