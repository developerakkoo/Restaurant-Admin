# DropEat Admin — design.md
### Complete Light-Mode Design System & UI Specification

> **Scope:** Full UI/UX redesign of the DropEat Restaurant-Admin (Ionic 7 + Angular 17).
> Light mode only. Professional SaaS admin aesthetic. Consistent design system applied to all 31 pages.
> Paste into Cursor as your project design reference.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Sizing](#4-spacing--sizing)
5. [Border Radius & Elevation](#5-border-radius--elevation)
6. [Global Component Library](#6-global-component-library)
7. [App Shell — Sidebar & Toolbar](#7-app-shell--sidebar--toolbar)
8. [Page Specifications](#8-page-specifications)
9. [Order Status Reference](#9-order-status-reference)
10. [Motion & Animation](#10-motion--animation)
11. [Responsive System](#11-responsive-system)
12. [Implementation Checklist](#12-implementation-checklist)

---

## 1. Design Philosophy

### 1.1 Aesthetic Direction

**"Crisp, warm, purposeful."**

This is a professional operations dashboard used daily by food-delivery administrators. The design must communicate trust, clarity, and efficiency — not be flashy. Think Linear, Vercel, or Retool: sharp whitespace, strong typographic hierarchy, a restrained palette where the brand accent is used sparingly and always meaningfully.

The DropEat red (`#FF4C5A`) is a warm, energetic accent. Against a clean white/gray-50 surface, it reads with authority without being aggressive. It should appear on: primary CTAs, active nav items, key metrics, status highlights. Not on backgrounds, not on text blocks, not decoratively.

### 1.2 Design Principles

| Principle | In practice |
|---|---|
| **Hierarchy first** | Every screen has one clear primary action. Content is ranked: title → KPI → data → actions |
| **Data density with breathing room** | Tables are compact but padded. Cards never feel cramped |
| **Consistent not rigid** | Same tokens everywhere, but layouts adapt to content type |
| **Feedback always** | Every interactive element has hover, active, focus, loading, and empty states |
| **Red is earned** | `#FF4C5A` appears when it means something: action, alert, active, brand |

### 1.3 What this is NOT

- Not dark mode, not dual-theme. Light only. `<meta name="color-scheme" content="light" />` stays.
- Not a consumer product. No playful illustrations, no onboarding confetti.
- Not Bootstrap. Login page rebuilt with Ionic + Barlow — consistent with the rest.

---

## 2. Color System

### 2.1 Brand Colors

```scss
// src/theme/variables.scss — replace entirely

:root {

  /* ─────────────────────────────────────────
     BRAND
  ───────────────────────────────────────── */
  --brand-50:   #fff1f2;
  --brand-100:  #ffe4e6;
  --brand-200:  #fecdd3;
  --brand-400:  #fb7185;
  --brand-500:  #FF4C5A;   /* PRIMARY — DropEat red */
  --brand-600:  #e6404d;
  --brand-700:  #c73340;

  /* ─────────────────────────────────────────
     IONIC OVERRIDES (primary = brand red)
  ───────────────────────────────────────── */
  --ion-color-primary:              #FF4C5A;
  --ion-color-primary-rgb:          255, 76, 90;
  --ion-color-primary-contrast:     #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade:        #e6404d;
  --ion-color-primary-tint:         #ff6e79;

  --ion-color-secondary:              #2563eb;
  --ion-color-secondary-rgb:          37, 99, 235;
  --ion-color-secondary-contrast:     #ffffff;
  --ion-color-secondary-shade:        #1d4ed8;
  --ion-color-secondary-tint:         #3b82f6;

  --ion-color-tertiary:              #7c3aed;
  --ion-color-tertiary-rgb:          124, 58, 237;
  --ion-color-tertiary-contrast:     #ffffff;
  --ion-color-tertiary-shade:        #6d28d9;
  --ion-color-tertiary-tint:         #8b5cf6;

  --ion-color-success:              #16a34a;
  --ion-color-success-rgb:          22, 163, 74;
  --ion-color-success-contrast:     #ffffff;
  --ion-color-success-shade:        #15803d;
  --ion-color-success-tint:         #22c55e;

  --ion-color-warning:              #d97706;
  --ion-color-warning-rgb:          217, 119, 6;
  --ion-color-warning-contrast:     #ffffff;
  --ion-color-warning-shade:        #b45309;
  --ion-color-warning-tint:         #f59e0b;

  --ion-color-danger:               #dc2626;
  --ion-color-danger-rgb:           220, 38, 38;
  --ion-color-danger-contrast:      #ffffff;
  --ion-color-danger-shade:         #b91c1c;
  --ion-color-danger-tint:          #ef4444;

  --ion-color-dark:                 #111827;
  --ion-color-dark-rgb:             17, 24, 39;
  --ion-color-dark-contrast:        #ffffff;
  --ion-color-dark-shade:           #0f172a;
  --ion-color-dark-tint:            #1f2937;

  --ion-color-medium:               #6b7280;
  --ion-color-medium-rgb:           107, 114, 128;
  --ion-color-medium-contrast:      #ffffff;
  --ion-color-medium-shade:         #4b5563;
  --ion-color-medium-tint:          #9ca3af;

  --ion-color-light:                #f9fafb;
  --ion-color-light-rgb:            249, 250, 251;
  --ion-color-light-contrast:       #111827;
  --ion-color-light-shade:          #f3f4f6;
  --ion-color-light-tint:           #ffffff;

  /* ─────────────────────────────────────────
     SURFACES (light mode)
  ───────────────────────────────────────── */
  --surface-page:      #f8f9fb;   /* outer page background */
  --surface-white:     #ffffff;   /* cards, panels, sidebar */
  --surface-subtle:    #f3f4f6;   /* table header, alt row, input bg */
  --surface-hover:     #f9fafb;   /* row hover, item hover */
  --surface-overlay:   rgba(0, 0, 0, 0.45);

  /* ─────────────────────────────────────────
     BORDERS
  ───────────────────────────────────────── */
  --border-subtle:  #e5e7eb;   /* most dividers, card borders */
  --border-default: #d1d5db;   /* form inputs, stronger dividers */
  --border-strong:  #9ca3af;   /* emphasized borders */
  --border-brand:   #FF4C5A;   /* focus rings, active borders */

  /* ─────────────────────────────────────────
     TEXT
  ───────────────────────────────────────── */
  --text-primary:   #111827;   /* headings, strong labels */
  --text-secondary: #374151;   /* body text, table rows */
  --text-muted:     #6b7280;   /* helper text, subtitles */
  --text-placeholder: #9ca3af; /* input placeholders */
  --text-disabled:  #d1d5db;   /* disabled states */
  --text-inverse:   #ffffff;   /* text on dark/colored bg */
  --text-brand:     #FF4C5A;   /* accent text, links */
  --text-link:      #2563eb;   /* hyperlinks */

  /* Ionic globals */
  --ion-background-color:          #f8f9fb;
  --ion-background-color-rgb:      248, 249, 251;
  --ion-text-color:                #111827;
  --ion-text-color-rgb:            17, 24, 39;

  /* ─────────────────────────────────────────
     STATUS BADGE TOKENS (order chips)
  ───────────────────────────────────────── */
  --badge-received-bg:    #fefce8;
  --badge-received-text:  #854d0e;
  --badge-received-border:#fde047;

  --badge-accepted-bg:    #f0fdf4;
  --badge-accepted-text:  #14532d;
  --badge-accepted-border:#86efac;

  --badge-preparing-bg:   #fff1f2;
  --badge-preparing-text: #881337;
  --badge-preparing-border:#fecdd3;

  --badge-assigned-bg:    #ede9fe;
  --badge-assigned-text:  #3b0764;
  --badge-assigned-border:#c4b5fd;

  --badge-pickup-bg:      #eff6ff;
  --badge-pickup-text:    #1e3a8a;
  --badge-pickup-border:  #93c5fd;

  --badge-delivered-bg:   #f0fdf4;
  --badge-delivered-text: #14532d;
  --badge-delivered-border:#86efac;

  --badge-cancelled-bg:   #fef2f2;
  --badge-cancelled-text: #7f1d1d;
  --badge-cancelled-border:#fca5a5;

  --badge-rejected-bg:    #fef2f2;
  --badge-rejected-text:  #7f1d1d;
  --badge-rejected-border:#fca5a5;

  /* ─────────────────────────────────────────
     ELEVATION
  ───────────────────────────────────────── */
  --shadow-xs:   0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm:   0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md:   0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-lg:   0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
  --shadow-xl:   0 20px 25px rgba(0, 0, 0, 0.08), 0 8px 10px rgba(0, 0, 0, 0.04);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-ring: 0 0 0 3px rgba(255, 76, 90, 0.15);

  /* ─────────────────────────────────────────
     SPACING SCALE
  ───────────────────────────────────────── */
  --sp-1:  4px;
  --sp-2:  8px;
  --sp-3:  12px;
  --sp-4:  16px;
  --sp-5:  20px;
  --sp-6:  24px;
  --sp-8:  32px;
  --sp-10: 40px;
  --sp-12: 48px;
  --sp-16: 64px;

  /* ─────────────────────────────────────────
     BORDER RADIUS
  ───────────────────────────────────────── */
  --r-xs:   2px;
  --r-sm:   4px;
  --r-md:   6px;
  --r-lg:   8px;
  --r-xl:   12px;
  --r-2xl:  16px;
  --r-3xl:  20px;
  --r-full: 9999px;

  /* ─────────────────────────────────────────
     TRANSITIONS
  ───────────────────────────────────────── */
  --t-fast:   120ms ease;
  --t-base:   200ms ease;
  --t-slow:   320ms ease;
  --t-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 2.2 Color Usage Rules

| Element | Token |
|---|---|
| Page background | `--surface-page` (#f8f9fb) |
| Sidebar, cards, modals | `--surface-white` (#ffffff) |
| Table header rows, input backgrounds | `--surface-subtle` (#f3f4f6) |
| All borders, dividers | `--border-subtle` (#e5e7eb) |
| Form input borders | `--border-default` (#d1d5db) |
| Primary headings | `--text-primary` (#111827) |
| Body text, table cells | `--text-secondary` (#374151) |
| Subtitles, helper text | `--text-muted` (#6b7280) |
| Primary CTA buttons | `--brand-500` (#FF4C5A) |
| Active nav item | `--brand-500` text + `--brand-50` background |
| Danger actions | `--ion-color-danger` (#dc2626) |
| Success indicators | `--ion-color-success` (#16a34a) |

### 2.3 Color Do's and Don'ts

**DO:**
- Use `--brand-500` only for: primary buttons, active sidebar item, key numeric values (orders count etc.), focus rings
- Use `--surface-page` as the outer background, `--surface-white` for all cards/panels
- Keep text on white: `--text-primary` for headings, `--text-secondary` for body, `--text-muted` for helpers
- Tinted backgrounds for status badges (e.g. `--badge-received-bg`) — never solid colors

**DON'T:**
- Red backgrounds on sections or page areas
- Mix badge color families inconsistently
- Use brand red for body text or paragraph content
- Use gradients on UI surfaces (only permitted on the Login brand panel)

---

## 3. Typography

### 3.1 Font Setup

```scss
// src/global.scss

@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&family=Barlow+Condensed:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

ion-app,
body {
  font-family: 'Barlow', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary);
  background-color: var(--surface-page);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 3.2 Type Scale

| Class | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `.t-display` | 36px | 800 | 1.1 | Login hero only |
| `.t-h1` | 24px | 700 | 1.25 | Page titles |
| `.t-h2` | 20px | 700 | 1.3 | Card section titles |
| `.t-h3` | 16px | 600 | 1.4 | Sub-headers |
| `.t-h4` | 14px | 600 | 1.4 | Table section labels, modal titles |
| `.t-body` | 14px | 400 | 1.5 | Default body |
| `.t-body-sm` | 13px | 400 | 1.5 | Table cells, secondary content |
| `.t-label` | 11px | 600 | 1 | Form labels (uppercase + tracked) |
| `.t-caption` | 12px | 400 | 1.4 | Helper text, timestamps |
| `.t-mono` | 12px | 500 | 1 | IDs, phone numbers, codes |
| `.t-stat` | 32px | 700 | 1 | KPI numbers (Barlow Condensed) |
| `.t-stat-sm` | 20px | 700 | 1 | Smaller KPI numbers (Barlow Condensed) |

```scss
/* Type utility classes */
.t-display { font-size: 36px; font-weight: 800; line-height: 1.1; color: var(--text-primary); letter-spacing: -0.5px; }
.t-h1      { font-size: 24px; font-weight: 700; line-height: 1.25; color: var(--text-primary); letter-spacing: -0.3px; }
.t-h2      { font-size: 20px; font-weight: 700; line-height: 1.3;  color: var(--text-primary); letter-spacing: -0.2px; }
.t-h3      { font-size: 16px; font-weight: 600; line-height: 1.4;  color: var(--text-primary); }
.t-h4      { font-size: 14px; font-weight: 600; line-height: 1.4;  color: var(--text-primary); }
.t-body    { font-size: 14px; font-weight: 400; line-height: 1.5;  color: var(--text-secondary); }
.t-body-sm { font-size: 13px; font-weight: 400; line-height: 1.5;  color: var(--text-secondary); }
.t-label   { font-size: 11px; font-weight: 600; line-height: 1;    color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.7px; }
.t-caption { font-size: 12px; font-weight: 400; line-height: 1.4;  color: var(--text-muted); }
.t-mono    { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; color: var(--text-secondary); }
.t-stat    { font-family: 'Barlow Condensed', sans-serif; font-size: 32px; font-weight: 700; line-height: 1; color: var(--text-primary); }
.t-stat-sm { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 700; line-height: 1; color: var(--text-primary); }
.t-brand   { color: var(--text-brand); }
.t-muted   { color: var(--text-muted); }
.t-danger  { color: var(--ion-color-danger); }
.t-success { color: var(--ion-color-success); }
```

---

## 4. Spacing & Sizing

### 4.1 Spacing Rules

All padding and margin must use `--sp-*` tokens. Never raw pixel values in component styles.

| Context | Token(s) |
|---|---|
| Page outer padding | `--sp-6` (24px) desktop, `--sp-4` (16px) mobile |
| Card padding | `--sp-5` (20px) or `--sp-6` (24px) |
| Card header padding | `--sp-4` (16px) vertical, `--sp-5` (20px) horizontal |
| Table cell padding | `--sp-3` (12px) vertical, `--sp-4` (16px) horizontal |
| Table header padding | `10px` vertical, `--sp-4` horizontal |
| Form field gap | `--sp-5` (20px) between fields |
| Button padding | `9px` vertical, `--sp-4` (16px) horizontal |
| Small button padding | `6px` vertical, `12px` horizontal |
| Modal padding | `--sp-6` (24px) body, `--sp-5` (20px) header/footer |
| Gap in flex rows | `--sp-3` (12px) between buttons, `--sp-2` (8px) between icons |
| Section margin bottom | `--sp-6` (24px) |

### 4.2 Sidebar Dimensions

| Element | Size |
|---|---|
| Sidebar width (expanded) | 252px |
| Sidebar width (icon-only, future) | 64px |
| Toolbar height | 56px |
| Nav item height | 40px |
| Nav item margin | 2px vertical, 8px horizontal |

### 4.3 Content Max Width

```scss
.page-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--sp-6);
}
```

---

## 5. Border Radius & Elevation

### 5.1 Radius Usage

| Radius token | Value | Use |
|---|---|---|
| `--r-xs` | 2px | Accent lines, tiny tags |
| `--r-sm` | 4px | Small badges, compact chips |
| `--r-md` | 6px | Buttons, form inputs, nav items |
| `--r-lg` | 8px | Toolbars, dropdowns, tooltips |
| `--r-xl` | 12px | Cards, table containers, modals |
| `--r-2xl` | 16px | Large cards, stat cards, upload zones |
| `--r-3xl` | 20px | Floating panels, pill buttons |
| `--r-full` | 9999px | Status chips, toggle pills, avatars |

### 5.2 Elevation Levels

| Level | Shadow | Use |
|---|---|---|
| 0 (flat) | none | Table rows, sidebar items |
| 1 (card) | `--shadow-card` | Standard cards, panels |
| 2 (raised) | `--shadow-md` | Dropdowns, hover state cards |
| 3 (floating) | `--shadow-lg` | Modals, popovers, drawers |
| 4 (overlay) | `--shadow-xl` | Dialogs, critical alerts |

---

## 6. Global Component Library

All components below are shared across every page. Define once in `src/global.scss`. Never duplicate.

### 6.1 Page Wrapper

```html
<!-- Standard page structure for every page: -->
<ion-header class="de-header" [translucent]="false">
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button class="de-menu-btn" color="medium"></ion-menu-button>
    </ion-buttons>
    <ion-title class="de-header__title">Page Title</ion-title>
    <ion-buttons slot="end">
      <!-- page-specific toolbar buttons -->
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="de-page">
  <div class="de-page__inner">
    <!-- page header -->
    <div class="de-page-header">
      <div class="de-page-header__left">
        <h1 class="t-h1">Page Title</h1>
        <p class="t-caption" style="margin-top:2px">Subtitle / count</p>
      </div>
      <div class="de-page-header__right">
        <!-- actions -->
      </div>
    </div>
    <!-- content -->
  </div>
</ion-content>
```

```scss
/* ion-header */
.de-header ion-toolbar {
  --background: var(--surface-white);
  --border-color: var(--border-subtle);
  --color: var(--text-primary);
  --padding-start: var(--sp-4);
  --padding-end: var(--sp-4);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-xs);
}

.de-header__title {
  font-family: 'Barlow', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.2px;
}

.de-menu-btn { --color: var(--text-muted); }

/* ion-content */
.de-page {
  --background: var(--surface-page);
}

.de-page__inner {
  padding: var(--sp-6);
  max-width: 1400px;
  margin: 0 auto;
  animation: de-fade-up 0.3s ease both;
}

/* Page header */
.de-page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--sp-6);
  padding-bottom: var(--sp-5);
  border-bottom: 1px solid var(--border-subtle);
  gap: var(--sp-4);
  flex-wrap: wrap;

  &__left {}
  &__right { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; }
}
```

### 6.2 Cards

```scss
/* Base card */
.de-card {
  background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-card);
}

/* Card with a titled header bar */
.de-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border-subtle);

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: var(--sp-2);

    ion-icon { font-size: 16px; color: var(--brand-500); }
  }

  &__actions { display: flex; gap: var(--sp-2); align-items: center; }
}

.de-card-body { padding: var(--sp-5); }
.de-card-footer {
  padding: var(--sp-4) var(--sp-5);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--sp-2);
}
```

### 6.3 Data Table

The primary list pattern for all record-type pages.

```html
<!-- Full table layout -->
<div class="de-table-card">

  <!-- toolbar: search + filters + actions -->
  <div class="de-table-toolbar">
    <div class="de-search">
      <ion-icon name="search-outline"></ion-icon>
      <input type="text" placeholder="Search…" [(ngModel)]="q" />
    </div>
    <div class="de-table-toolbar__filters">
      <!-- filter chips, date pickers, segments -->
    </div>
    <div class="de-table-toolbar__actions">
      <!-- action buttons -->
    </div>
  </div>

  <!-- table -->
  <div class="de-table-scroll">
    <table class="de-table">
      <thead>
        <tr>
          <th>Column</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of rows">
          <td>{{ row.value }}</td>
        </tr>
        <!-- empty state inside tbody -->
        <tr *ngIf="rows.length === 0 && !loading">
          <td [attr.colspan]="colCount">
            <div class="de-table-empty">
              <ion-icon name="document-outline"></ion-icon>
              <p>No records found</p>
            </div>
          </td>
        </tr>
        <!-- skeleton rows while loading -->
        <tr *ngIf="loading" *ngFor="let i of [1,2,3,4,5]">
          <td *ngFor="let j of skeletonCols"><div class="de-skeleton" [style.width]="j + 'px'"></div></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- pagination -->
  <div class="de-table-pagination">
    <span class="t-caption">Showing {{ from }}–{{ to }} of {{ total }}</span>
    <div class="de-pagination-controls">
      <button class="de-btn de-btn--ghost de-btn--sm" [disabled]="page <= 1" (click)="prev()">← Prev</button>
      <span class="de-pagination-page">{{ page }} / {{ totalPages }}</span>
      <button class="de-btn de-btn--ghost de-btn--sm" [disabled]="page >= totalPages" (click)="next()">Next →</button>
    </div>
  </div>

</div>
```

```scss
.de-table-card {
  background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.de-table-toolbar {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border-subtle);
  flex-wrap: wrap;
  background: var(--surface-white);

  &__filters { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-left: auto; }
  &__actions { display: flex; gap: var(--sp-2); }
}

.de-table-scroll { overflow-x: auto; }

.de-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  thead tr {
    background: var(--surface-subtle);

    th {
      padding: 10px 16px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      color: var(--text-muted);
      text-align: left;
      border-bottom: 1px solid var(--border-subtle);
      white-space: nowrap;
      user-select: none;
    }
  }

  tbody tr {
    border-bottom: 1px solid var(--border-subtle);
    transition: background var(--t-fast);

    &:last-child { border-bottom: none; }
    &:hover { background: var(--surface-hover); cursor: pointer; }

    td {
      padding: 12px 16px;
      color: var(--text-secondary);
      vertical-align: middle;
    }
  }
}

.de-table-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 24px;
  gap: var(--sp-3);
  ion-icon { font-size: 40px; color: var(--text-placeholder); }
  p { font-size: 14px; color: var(--text-muted); font-weight: 500; }
}

.de-table-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px var(--sp-5);
  border-top: 1px solid var(--border-subtle);
  background: var(--surface-subtle);
}

.de-pagination-controls { display: flex; align-items: center; gap: var(--sp-3); }
.de-pagination-page { font-size: 13px; font-weight: 600; color: var(--text-primary); min-width: 60px; text-align: center; }
```

### 6.4 Buttons

```scss
.de-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  padding: 9px 16px;
  border-radius: var(--r-md);
  font-family: 'Barlow', sans-serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--t-base);
  text-decoration: none;
  outline: none;

  ion-icon { font-size: 15px; flex-shrink: 0; }

  &:focus-visible { box-shadow: var(--shadow-ring); }
  &:disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }

  /* Variants */
  &--primary {
    background: var(--brand-500);
    color: #ffffff;
    border-color: var(--brand-500);
    box-shadow: 0 1px 2px rgba(255,76,90,0.2);
    &:hover  { background: var(--brand-600); border-color: var(--brand-600); }
    &:active { background: var(--brand-700); transform: scale(0.98); }
  }

  &--secondary {
    background: var(--surface-white);
    color: var(--text-secondary);
    border-color: var(--border-default);
    box-shadow: var(--shadow-xs);
    &:hover  { border-color: var(--border-strong); color: var(--text-primary); background: var(--surface-hover); }
    &:active { background: var(--surface-subtle); transform: scale(0.98); }
  }

  &--ghost {
    background: transparent;
    color: var(--text-muted);
    border-color: transparent;
    &:hover  { background: var(--surface-subtle); color: var(--text-primary); }
    &:active { background: var(--surface-subtle); }
  }

  &--danger {
    background: var(--surface-white);
    color: var(--ion-color-danger);
    border-color: #fca5a5;
    &:hover  { background: #fef2f2; border-color: var(--ion-color-danger); }
    &:active { background: #fee2e2; }
  }

  &--success {
    background: var(--surface-white);
    color: var(--ion-color-success);
    border-color: #86efac;
    &:hover  { background: #f0fdf4; border-color: var(--ion-color-success); }
  }

  /* Sizes */
  &--sm { padding: 6px 12px; font-size: 12px; border-radius: var(--r-sm); ion-icon { font-size: 13px; } }
  &--lg { padding: 11px 20px; font-size: 14px; border-radius: var(--r-lg); ion-icon { font-size: 17px; } }
  &--icon { padding: 8px; border-radius: var(--r-md); ion-icon { font-size: 16px; margin: 0; } }
  &--icon-sm { padding: 6px; border-radius: var(--r-sm); ion-icon { font-size: 14px; margin: 0; } }
  &--full { width: 100%; }
}
```

### 6.5 Status Chips (Order Badges)

```html
<!-- Usage: -->
<span class="de-badge de-badge--received">
  <ion-icon name="time-outline"></ion-icon> Received
</span>
```

```scss
.de-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: var(--r-full);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2px;
  border: 1px solid transparent;
  white-space: nowrap;
  ion-icon { font-size: 11px; }

  &--received  { background: var(--badge-received-bg);  color: var(--badge-received-text);  border-color: var(--badge-received-border); }
  &--accepted  { background: var(--badge-accepted-bg);  color: var(--badge-accepted-text);  border-color: var(--badge-accepted-border); }
  &--preparing { background: var(--badge-preparing-bg); color: var(--badge-preparing-text); border-color: var(--badge-preparing-border); }
  &--assigned  { background: var(--badge-assigned-bg);  color: var(--badge-assigned-text);  border-color: var(--badge-assigned-border); }
  &--pickup    { background: var(--badge-pickup-bg);    color: var(--badge-pickup-text);    border-color: var(--badge-pickup-border); }
  &--delivered { background: var(--badge-delivered-bg); color: var(--badge-delivered-text); border-color: var(--badge-delivered-border); }
  &--cancelled { background: var(--badge-cancelled-bg); color: var(--badge-cancelled-text); border-color: var(--badge-cancelled-border); }
  &--rejected  { background: var(--badge-rejected-bg);  color: var(--badge-rejected-text);  border-color: var(--badge-rejected-border); }

  /* Generic utility badges */
  &--blue   { background: #eff6ff; color: #1e3a8a; border-color: #93c5fd; }
  &--gray   { background: var(--surface-subtle); color: var(--text-muted); border-color: var(--border-subtle); }
  &--orange { background: #fff7ed; color: #9a3412; border-color: #fdba74; }
}
```

### 6.6 Form Inputs

```html
<!-- Standard field -->
<div class="de-field">
  <label class="de-field__label">Email Address</label>
  <div class="de-field__wrap">
    <ion-icon class="de-field__icon" name="mail-outline"></ion-icon>
    <input class="de-field__input" type="email" placeholder="admin@dropeat.com" />
  </div>
  <span class="de-field__hint">We'll never share your email.</span>
</div>

<!-- Select -->
<div class="de-field">
  <label class="de-field__label">Category</label>
  <select class="de-field__input de-field__select">
    <option>Choose…</option>
  </select>
</div>
```

```scss
.de-field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  &__wrap {
    position: relative;
    .de-field__icon {
      position: absolute;
      left: 11px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: var(--text-placeholder);
      pointer-events: none;
      z-index: 1;
    }
    input { padding-left: 36px; }
  }

  &__input {
    width: 100%;
    background: var(--surface-white);
    border: 1px solid var(--border-default);
    border-radius: var(--r-md);
    padding: 9px 12px;
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    color: var(--text-primary);
    outline: none;
    transition: border-color var(--t-base), box-shadow var(--t-base);
    appearance: none;

    &::placeholder { color: var(--text-placeholder); }

    &:hover  { border-color: var(--border-strong); }
    &:focus  {
      border-color: var(--brand-500);
      box-shadow: var(--shadow-ring);
    }
    &:disabled {
      background: var(--surface-subtle);
      color: var(--text-disabled);
      cursor: not-allowed;
    }
  }

  &__select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%236b7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 30px;
    cursor: pointer;
  }

  textarea.de-field__input {
    resize: vertical;
    min-height: 88px;
    line-height: 1.5;
  }

  &__hint  { font-size: 12px; color: var(--text-muted); }
  &__error { font-size: 12px; color: var(--ion-color-danger); }

  &--error .de-field__input {
    border-color: var(--ion-color-danger);
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
}

/* Form grid helpers */
.de-form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
.de-form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--sp-5); }
@media (max-width: 680px) {
  .de-form-grid-2,
  .de-form-grid-3 { grid-template-columns: 1fr; }
}
```

### 6.7 Search Bar

```scss
.de-search {
  position: relative;
  min-width: 220px;
  max-width: 320px;

  ion-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-placeholder);
    font-size: 15px;
    pointer-events: none;
  }

  input {
    width: 100%;
    background: var(--surface-subtle);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-md);
    padding: 7px 12px 7px 32px;
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    color: var(--text-primary);
    outline: none;
    transition: all var(--t-base);

    &::placeholder { color: var(--text-placeholder); }
    &:focus {
      background: var(--surface-white);
      border-color: var(--brand-500);
      box-shadow: var(--shadow-ring);
    }
  }
}
```

### 6.8 Stat / KPI Card

```html
<div class="de-stat">
  <div class="de-stat__icon de-stat__icon--red">
    <ion-icon name="cart-outline"></ion-icon>
  </div>
  <div class="de-stat__value t-stat">2,847</div>
  <div class="de-stat__label t-label">Total Orders</div>
  <div class="de-stat__delta de-stat__delta--up">↑ 12% this period</div>
</div>
```

```scss
.de-stat {
  background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-2xl);
  padding: var(--sp-5) var(--sp-6);
  box-shadow: var(--shadow-card);
  transition: box-shadow var(--t-base), transform var(--t-base);
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  /* Left accent bar */
  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--stat-accent, var(--brand-500));
    border-radius: var(--r-xs) 0 0 var(--r-xs);
  }

  &__icon {
    width: 42px; height: 42px;
    border-radius: var(--r-lg);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: var(--sp-4);
    ion-icon { font-size: 20px; }

    &--red    { --stat-accent: #FF4C5A; background: var(--brand-50); color: var(--brand-500); }
    &--green  { --stat-accent: #16a34a; background: #f0fdf4; color: #16a34a; }
    &--blue   { --stat-accent: #2563eb; background: #eff6ff; color: #2563eb; }
    &--purple { --stat-accent: #7c3aed; background: #f5f3ff; color: #7c3aed; }
    &--orange { --stat-accent: #d97706; background: #fffbeb; color: #d97706; }
  }

  &__value { /* use t-stat */ }
  &__label { margin-top: 4px; /* use t-label */ }
  &__delta {
    margin-top: var(--sp-3);
    font-size: 12px;
    font-weight: 600;
    &--up   { color: var(--ion-color-success); }
    &--down { color: var(--ion-color-danger); }
    &--flat { color: var(--text-muted); }
  }
}
```

### 6.9 Filter Chips (Status Tabs)

```html
<div class="de-filter-tabs">
  <button class="de-filter-tab" [class.active]="filter === null" (click)="filter = null">All</button>
  <button *ngFor="let s of filters" class="de-filter-tab" [class.active]="filter === s.value" (click)="filter = s.value">
    {{ s.label }}
  </button>
</div>
```

```scss
.de-filter-tabs {
  display: flex;
  gap: var(--sp-1);
  flex-wrap: wrap;
}

.de-filter-tab {
  padding: 5px 12px;
  font-family: 'Barlow', sans-serif;
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--r-full);
  border: 1px solid var(--border-subtle);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--t-base);

  &:hover    { border-color: var(--border-strong); color: var(--text-primary); background: var(--surface-subtle); }
  &.active   { background: var(--brand-500); border-color: var(--brand-500); color: #ffffff; }
}
```

### 6.10 Avatar

```scss
.de-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--r-full);
  background: var(--brand-50);
  color: var(--brand-500);
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  flex-shrink: 0;
  user-select: none;
  text-transform: uppercase;

  &--sm  { width: 28px; height: 28px; font-size: 11px; }
  &--md  { width: 36px; height: 36px; font-size: 13px; }
  &--lg  { width: 48px; height: 48px; font-size: 16px; }
  &--xl  { width: 64px; height: 64px; font-size: 20px; }
  &--2xl { width: 96px; height: 96px; font-size: 28px; }

  img { width: 100%; height: 100%; object-fit: cover; border-radius: var(--r-full); }
}

/* Color variants for different users */
.de-avatar--green  { background: #f0fdf4; color: #16a34a; }
.de-avatar--blue   { background: #eff6ff; color: #2563eb; }
.de-avatar--purple { background: #f5f3ff; color: #7c3aed; }
.de-avatar--orange { background: #fff7ed; color: #d97706; }
```

### 6.11 Modals

```scss
/* ion-modal override */
ion-modal.de-modal {
  --background: var(--surface-white);
  --border-radius: var(--r-xl);
  --box-shadow: var(--shadow-xl);
  --width: auto;
  --min-width: 480px;
  --max-width: 640px;
  --height: auto;
  --max-height: 90vh;

  &::part(backdrop) { background: var(--surface-overlay); }
  &::part(content) { border-radius: var(--r-xl); overflow: hidden; }
}

.de-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-5) var(--sp-6);
  border-bottom: 1px solid var(--border-subtle);

  h3 { font-size: 17px; font-weight: 700; color: var(--text-primary); }

  .close-btn {
    width: 30px; height: 30px;
    border-radius: var(--r-md);
    border: none; background: transparent;
    color: var(--text-muted); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all var(--t-base);
    ion-icon { font-size: 18px; }
    &:hover { background: var(--surface-subtle); color: var(--text-primary); }
  }
}

.de-modal-body   { padding: var(--sp-6); overflow-y: auto; }
.de-modal-footer {
  padding: var(--sp-4) var(--sp-6);
  border-top: 1px solid var(--border-subtle);
  background: var(--surface-subtle);
  display: flex;
  justify-content: flex-end;
  gap: var(--sp-2);
}
```

### 6.12 Upload Zone

```scss
.de-upload {
  border: 2px dashed var(--border-default);
  border-radius: var(--r-2xl);
  padding: var(--sp-10) var(--sp-6);
  text-align: center;
  cursor: pointer;
  transition: all var(--t-base);
  background: var(--surface-subtle);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-3);

  &:hover,
  &--dragging {
    border-color: var(--brand-500);
    background: var(--brand-50);
  }

  &__icon {
    width: 52px; height: 52px;
    border-radius: var(--r-xl);
    background: var(--surface-white);
    border: 1px solid var(--border-subtle);
    display: flex; align-items: center; justify-content: center;
    box-shadow: var(--shadow-sm);
    ion-icon { font-size: 24px; color: var(--text-muted); }
  }

  &__label { font-size: 14px; font-weight: 600; color: var(--text-primary); }
  &__sub   { font-size: 12px; color: var(--text-muted); }

  /* Preview state */
  &--preview {
    padding: var(--sp-3);
    img { width: 100%; border-radius: var(--r-lg); max-height: 180px; object-fit: cover; }
  }
}
```

### 6.13 Empty State

```scss
.de-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--sp-16) var(--sp-6);
  text-align: center;

  &__icon {
    width: 72px; height: 72px;
    background: var(--surface-subtle);
    border-radius: var(--r-2xl);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: var(--sp-5);
    ion-icon { font-size: 32px; color: var(--text-placeholder); }
  }

  &__title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
  &__body  { font-size: 13px; color: var(--text-muted); max-width: 300px; line-height: 1.5; margin-bottom: var(--sp-5); }
}
```

### 6.14 Toast Notifications

```scss
/* ion-toast overrides */
ion-toast.de-toast {
  --border-radius: var(--r-lg);
  --box-shadow: var(--shadow-lg);
  --min-width: 280px;
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 500;

  &.success {
    --background: #f0fdf4;
    --color: #14532d;
    --border: 1px solid #86efac;
    box-shadow: var(--shadow-md), 0 0 0 1px #86efac;
  }
  &.danger {
    --background: #fef2f2;
    --color: #7f1d1d;
    box-shadow: var(--shadow-md), 0 0 0 1px #fca5a5;
  }
  &.warning {
    --background: #fffbeb;
    --color: #78350f;
    box-shadow: var(--shadow-md), 0 0 0 1px #fde68a;
  }
}
```

### 6.15 Skeleton Loader

```scss
@keyframes de-shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

.de-skeleton {
  background: linear-gradient(90deg, var(--surface-subtle) 25%, #e9ebee 50%, var(--surface-subtle) 75%);
  background-size: 400px 100%;
  animation: de-shimmer 1.4s ease infinite;
  border-radius: var(--r-sm);
  height: 14px;
}

/* Common skeleton sizes */
.de-skeleton--text  { height: 14px; }
.de-skeleton--badge { height: 22px; border-radius: var(--r-full); }
.de-skeleton--btn   { height: 30px; border-radius: var(--r-md); }
.de-skeleton--avatar{ border-radius: var(--r-full); }
```

### 6.16 Confirm Alert

```scss
ion-alert.de-alert {
  --background: var(--surface-white);
  --border-radius: var(--r-xl);
  --box-shadow: var(--shadow-xl);
  --backdrop-opacity: 0.5;
  font-family: 'Barlow', sans-serif;

  .alert-title   { font-weight: 700 !important; color: var(--text-primary) !important; font-family: 'Barlow', sans-serif !important; }
  .alert-message { font-size: 14px !important; color: var(--text-muted) !important; font-family: 'Barlow', sans-serif !important; }
  .alert-button-group { border-top: 1px solid var(--border-subtle) !important; }

  .btn-cancel  { color: var(--text-muted) !important; font-weight: 600 !important; }
  .btn-confirm { color: var(--ion-color-danger) !important; font-weight: 700 !important; }
}
```

---

## 7. App Shell — Sidebar & Toolbar

### 7.1 Sidebar (`app.component.html`)

```html
<ion-app>
  <ion-split-pane contentId="main-content" when="lg">

    <ion-menu contentId="main-content" type="overlay" class="de-sidebar">
      <ion-content class="de-sidebar__inner">

        <!-- Brand mark -->
        <div class="de-sidebar__brand">
          <div class="de-sidebar__brand-logo">
            <img src="assets/logo.svg" alt="DropEat" />
          </div>
          <div>
            <div class="de-sidebar__brand-name">DropEat</div>
            <div class="de-sidebar__brand-tagline">We Drop You Eat!</div>
          </div>
        </div>

        <!-- Nav section label -->
        <div class="de-sidebar__section">Main</div>

        <!-- Nav items -->
        <ion-menu-toggle auto-hide="false" *ngFor="let p of appPages">
          <a [routerLink]="[p.url]" routerLinkActive="active" class="de-nav-item" [routerLinkActiveOptions]="{exact: false}">
            <span class="de-nav-item__icon">
              <ion-icon [name]="p.icon + '-outline'"></ion-icon>
            </span>
            <span class="de-nav-item__label">{{ p.title }}</span>
          </a>
        </ion-menu-toggle>

        <!-- Bottom: user info -->
        <div class="de-sidebar__footer">
          <div class="de-sidebar__user">
            <div class="de-avatar de-avatar--sm">A</div>
            <div>
              <div class="de-sidebar__user-name">Admin</div>
              <div class="de-sidebar__user-role">Super Admin</div>
            </div>
          </div>
        </div>

      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-split-pane>
</ion-app>
```

### 7.2 `app.component.scss`

```scss
.de-sidebar {
  --background: var(--surface-white);
  --width: 252px;
  border-right: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm);

  &__inner {
    --background: var(--surface-white);
    --padding-start: 0;
    --padding-end: 0;
    --padding-top: 0;
    --padding-bottom: 0;
    display: flex;
    flex-direction: column;
  }

  /* Brand */
  &__brand {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    padding: 20px var(--sp-4) 18px;
    border-bottom: 1px solid var(--border-subtle);
  }

  &__brand-logo {
    width: 36px; height: 36px;
    background: var(--brand-50);
    border-radius: var(--r-lg);
    display: flex; align-items: center; justify-content: center;
    padding: 7px;
    flex-shrink: 0;
    img { width: 100%; }
  }

  &__brand-name {
    font-size: 16px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.3px;
    line-height: 1.2;
  }

  &__brand-tagline {
    font-size: 11px;
    color: var(--text-muted);
    font-style: italic;
    line-height: 1;
  }

  /* Section label */
  &__section {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-placeholder);
    padding: 18px var(--sp-4) 6px;
  }

  /* Footer */
  &__footer {
    margin-top: auto;
    padding: var(--sp-4);
    border-top: 1px solid var(--border-subtle);
    background: var(--surface-subtle);
  }

  &__user {
    display: flex;
    align-items: center;
    gap: var(--sp-2);
  }

  &__user-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
  }

  &__user-role {
    font-size: 11px;
    color: var(--text-muted);
  }
}

/* Nav item */
.de-nav-item {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 0 var(--sp-3);
  margin: 2px var(--sp-2);
  height: 40px;
  border-radius: var(--r-md);
  text-decoration: none;
  transition: all var(--t-base);
  cursor: pointer;

  &__icon {
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    border-radius: var(--r-sm);
    flex-shrink: 0;
    transition: all var(--t-base);
    ion-icon { font-size: 17px; color: var(--text-muted); transition: color var(--t-base); }
  }

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-muted);
    transition: color var(--t-base);
  }

  &:hover {
    background: var(--surface-subtle);
    .de-nav-item__label { color: var(--text-primary); }
    .de-nav-item__icon ion-icon { color: var(--text-primary); }
  }

  &.active {
    background: var(--brand-50);

    .de-nav-item__icon {
      background: var(--brand-100);
      ion-icon { color: var(--brand-500); }
    }

    .de-nav-item__label {
      color: var(--brand-600);
      font-weight: 600;
    }
  }
}
```

---

## 8. Page Specifications

### 8.1 Login (`/folder/login`)

**Remove Bootstrap. Full Ionic/CSS rebuild.**

Layout: Centered card on a light gray page background.

```scss
/* login.page.scss */
:host { --background: var(--surface-page); }

.login-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-6);
  background: var(--surface-page);
}

.login-card {
  background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-2xl);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
}

.login-card__top {
  background: var(--brand-500);
  padding: var(--sp-8) var(--sp-8) var(--sp-6);
  text-align: center;

  .logo { width: 44px; height: 44px; background: rgba(255,255,255,0.2); border-radius: var(--r-xl); margin: 0 auto var(--sp-4); display: flex; align-items: center; justify-content: center; padding: 9px; img { width: 100%; filter: brightness(0) invert(1); } }
  h1 { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.3px; }
  p  { font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 4px; }
}

.login-card__body { padding: var(--sp-6) var(--sp-6) var(--sp-8); }

.login-form { display: flex; flex-direction: column; gap: var(--sp-5); }
```

HTML:
```html
<ion-content>
  <div class="login-root">
    <div class="login-card animate-in">
      <div class="login-card__top">
        <div class="logo"><img src="assets/logo.svg" /></div>
        <h1>Welcome Back</h1>
        <p>Sign in to DropEat Admin</p>
      </div>
      <div class="login-card__body">
        <form class="login-form" (ngSubmit)="onLogin()">
          <div class="de-field">
            <label class="de-field__label">Email</label>
            <div class="de-field__wrap">
              <ion-icon class="de-field__icon" name="mail-outline"></ion-icon>
              <input class="de-field__input" type="email" placeholder="admin@dropeat.com" [(ngModel)]="email" name="email" />
            </div>
          </div>
          <div class="de-field">
            <label class="de-field__label">Password</label>
            <div class="de-field__wrap">
              <ion-icon class="de-field__icon" name="lock-closed-outline"></ion-icon>
              <input class="de-field__input" [type]="show ? 'text' : 'password'" placeholder="••••••••" [(ngModel)]="password" name="password" />
              <ion-icon style="position:absolute;right:11px;top:50%;transform:translateY(-50%);cursor:pointer;color:var(--text-muted);font-size:16px" [name]="show ? 'eye-off-outline' : 'eye-outline'" (click)="show = !show"></ion-icon>
            </div>
          </div>
          <button class="de-btn de-btn--primary de-btn--lg de-btn--full" type="submit">
            <ion-icon name="log-in-outline"></ion-icon>
            Sign In
          </button>
        </form>
        <p class="t-caption" style="text-align:center;margin-top:20px">DropEat Admin · Restricted Access</p>
      </div>
    </div>
  </div>
</ion-content>
```

---

### 8.2 Dashboard (`/folder/dash`)

**Toolbar buttons:** Notifications icon + Messages icon (right side).
**Layout:** 3 rows — KPI grid → 2-col charts → 3-col charts + activity feed.

```scss
/* dash.page.scss */
.dash-kpi   { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-4); margin-bottom: var(--sp-6); }
.dash-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); margin-bottom: var(--sp-4); }
.dash-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr 1.2fr; gap: var(--sp-4); }

@media (max-width: 1280px) { .dash-kpi { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 960px)  { .dash-row-2, .dash-row-3 { grid-template-columns: 1fr; } }
@media (max-width: 600px)  { .dash-kpi { grid-template-columns: 1fr; } }

.dash-chart-card {
  background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-card);
  padding: var(--sp-5);

  &__header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: var(--sp-4);
  }
  &__title { font-size: 13px; font-weight: 700; color: var(--text-primary); }
  canvas   { height: 180px !important; }
}

.dash-gran-tabs {
  display: flex; gap: 2px;
  button {
    padding: 3px 9px; font-size: 11px; font-weight: 600;
    border: 1px solid var(--border-subtle); border-radius: var(--r-sm);
    background: transparent; color: var(--text-muted); cursor: pointer;
    transition: all var(--t-fast);
    &.active { background: var(--brand-500); border-color: var(--brand-500); color: #fff; }
    &:hover:not(.active) { border-color: var(--border-strong); color: var(--text-primary); }
  }
}

.dash-date-filter {
  display: flex; align-items: center; gap: var(--sp-2);
  input[type=date] {
    background: var(--surface-subtle); border: 1px solid var(--border-default);
    border-radius: var(--r-md); padding: 6px 10px;
    font-family: 'Barlow', sans-serif; font-size: 12px; color: var(--text-primary); outline: none;
    &:focus { border-color: var(--brand-500); }
  }
}

/* Recent activity list */
.dash-activity { display: flex; flex-direction: column; overflow-y: auto; max-height: 360px; }
.dash-activity-row {
  display: flex; align-items: flex-start; gap: var(--sp-3);
  padding: 12px var(--sp-5); border-bottom: 1px solid var(--border-subtle);
  &:last-child { border-bottom: none; }
  &:hover { background: var(--surface-hover); }

  &__dot {
    width: 32px; height: 32px; border-radius: var(--r-md); flex-shrink: 0;
    background: var(--brand-50); display: flex; align-items: center; justify-content: center;
    ion-icon { font-size: 15px; color: var(--brand-500); }
    margin-top: 2px;
  }
  &__body { flex: 1; min-width: 0; }
  &__top  { display: flex; justify-content: space-between; margin-bottom: 2px; }
  &__id   { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600; color: var(--brand-500); }
  &__amt  { font-size: 13px; font-weight: 700; color: var(--text-primary); }
  &__sub  { font-size: 12px; color: var(--text-muted); }
  &__meta { display: flex; align-items: center; gap: var(--sp-2); margin-top: 5px; }
}
```

**Chart.js config (light theme):**
```typescript
Chart.defaults.color = '#6b7280';
Chart.defaults.borderColor = '#e5e7eb';
Chart.defaults.font.family = 'Barlow';

// Per-chart dataset config:
{
  borderColor: '#FF4C5A',
  backgroundColor: (ctx) => {
    const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 160);
    g.addColorStop(0, 'rgba(255, 76, 90, 0.12)');
    g.addColorStop(1, 'rgba(255, 76, 90, 0)');
    return g;
  },
  tension: 0.4,
  fill: true,
  pointRadius: 0,
  pointHoverRadius: 4,
  pointHoverBackgroundColor: '#FF4C5A',
  borderWidth: 2,
}
// Scales:
scales: {
  x: { grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af', font: { size: 11 } } },
  y: { grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af', font: { size: 11 } }, beginAtZero: true },
}
// Tooltip:
tooltip: {
  backgroundColor: '#111827',
  titleColor: '#f9fafb',
  bodyColor: '#9ca3af',
  borderColor: '#374151',
  borderWidth: 1,
  padding: 10,
  cornerRadius: 8,
}
```

---

### 8.3 Orders (`/folder/orders`)

**Table columns:** Order ID · Customer · Partner · Items · Amount · Payment · Status · Date · Actions

**Toolbar actions:** Refresh button + Export XLSX button (right side of page header)

**Row actions (inline):**
- Accept → `de-btn--success de-btn--sm` (show only when `canAccept`)
- Reject → `de-btn--danger de-btn--sm` (show only when `canReject`)
- Assign Driver → `de-btn--secondary de-btn--sm` with bicycle icon (show when `canAssign`)
- View → icon button (eye-outline)

**Order Detail page (`/folder/orders/view/:id`):**

Layout: full-width status timeline at top, then 3-column grid below (customer info | partner info | driver info), then full-width line items + price breakdown card.

```scss
/* orders.page.scss */
.order-timeline {
  display: flex; align-items: flex-start; justify-content: center;
  gap: 0; margin-bottom: var(--sp-6);
  padding: var(--sp-5) var(--sp-6);
  background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-card);
  overflow-x: auto;
}

.order-timeline-step {
  display: flex; flex-direction: column; align-items: center;
  gap: var(--sp-2); flex: 1; min-width: 80px; position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 17px; left: 50%; right: -50%;
    height: 2px;
    background: var(--border-subtle);
    z-index: 0;
  }

  &.done::after   { background: var(--ion-color-success); }
  &.active::after { background: var(--border-subtle); }

  &__dot {
    width: 34px; height: 34px; border-radius: 50%;
    background: var(--surface-subtle); border: 2px solid var(--border-default);
    display: flex; align-items: center; justify-content: center;
    position: relative; z-index: 1;
    ion-icon { font-size: 15px; color: var(--text-muted); }
  }

  &.done .order-timeline-step__dot   { background: #f0fdf4; border-color: #86efac; ion-icon { color: #16a34a; } }
  &.active .order-timeline-step__dot {
    background: var(--brand-50); border-color: var(--brand-500);
    box-shadow: 0 0 0 4px var(--brand-50);
    ion-icon { color: var(--brand-500); }
  }

  &__label { font-size: 11px; font-weight: 600; color: var(--text-muted); text-align: center; max-width: 80px; }
  &__time  { font-size: 10px; color: var(--text-placeholder); text-align: center; }
  &.active .order-timeline-step__label { color: var(--brand-600); }
}

.order-detail-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--sp-4);
  margin-bottom: var(--sp-4);
  @media (max-width: 900px) { grid-template-columns: 1fr; }
}

.order-info-card {
  .de-card-header__title { font-size: 13px; }
  .info-row {
    display: flex; justify-content: space-between; gap: var(--sp-4);
    padding: 9px 0; border-bottom: 1px solid var(--border-subtle);
    &:last-child { border-bottom: none; }
    font-size: 13px;
    .key { color: var(--text-muted); flex-shrink: 0; }
    .val { color: var(--text-primary); font-weight: 500; text-align: right; }
  }
}

.order-items-table {
  /* uses .de-table inside a .de-table-card — no horizontal scroll needed */
}

.order-price-breakdown {
  padding: var(--sp-4) var(--sp-5);
  border-top: 1px solid var(--border-subtle);

  .price-row {
    display: flex; justify-content: space-between;
    font-size: 13px; padding: 5px 0;
    .key { color: var(--text-muted); }
    .val { color: var(--text-secondary); font-weight: 500; }
  }

  .price-row--total {
    padding-top: var(--sp-3); margin-top: var(--sp-2);
    border-top: 2px solid var(--border-subtle);
    .key, .val { font-size: 16px; font-weight: 700; color: var(--text-primary); }
  }
}

.order-split {
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-5); border-top: 1px solid var(--border-subtle);
}

.order-split-card {
  padding: var(--sp-4); border-radius: var(--r-lg); background: var(--surface-subtle);
  &--partner { border-left: 3px solid var(--ion-color-secondary); }
  &--admin   { border-left: 3px solid var(--brand-500); }
  .split-label { font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.6px; }
  .split-value { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px; }
}
```

---

### 8.4 Partners (`/folder/partners` + all sub-routes)

**Partners list:** Table with avatar (initials), partner name, email, phone, hotels count, status badge, actions (View / Hotels / Settle / Delete).

**Map page:** Full-height Google Maps with dark-gray style overrides, floating bottom action panel (white card, address + confirm button).

**Add Hotel form:** Two-column layout. Image upload drop zone on right. Category multi-select as tag-chip input.

**Bulk Add Dishes:** Compact row-form table. Each row: category select, name, veg toggle, price fields, stock, image mini-upload, delete button. "+ Add Dish" text button below table. Save All button in toolbar.

**Settlements page:** Summary bar at top (total owed / total settled as two stat cards), then table with checkbox column for bulk select, action bar that animates in when rows are checked.

```scss
/* settlement bulk action bar */
.settle-action-bar {
  position: sticky; bottom: 0;
  background: var(--surface-white);
  border-top: 2px solid var(--brand-500);
  padding: var(--sp-4) var(--sp-5);
  display: flex; align-items: center; justify-content: space-between;
  box-shadow: 0 -4px 12px rgba(0,0,0,0.06);
  transform: translateY(100%);
  transition: transform var(--t-base);

  &.visible { transform: translateY(0); }

  .selected-count { font-size: 13px; font-weight: 600; color: var(--text-primary); }
}
```

---

### 8.5 Customers (`/folder/customer` + view)

**List:** Avatar (initials), Name, Email, Phone (mono), Status (active/blocked badge), Joined, Actions (View / Block-Unblock).

**Segment tabs above table:** All / Active / Blocked — use `.de-filter-tabs`.

**Customer detail (`/folder/customer/view/:id`):**
```
- Profile hero card: large avatar + name + status badge + join date
- Two-column info: contact details | account details
- Block/Unblock action button in card footer
```

---

### 8.6 Delivery Boys (`/folder/delivery-boy` + add/view)

**List:** Avatar, Name, Phone, City, Blood type badge, status, Actions.

**Register form (`/folder/delivery-boy/add`):** Multi-section single-column form with section dividers:
- Personal Info (name, DOB, blood group)
- Contact (phone, city, address)
- Additional (father name, languages as tag input)
- Photo Upload (upload zone)

**Detail view:** Profile hero + tabbed content (Tab 1: Earnings summary + settlement table | Tab 2: Profile details).

Tab styling:
```scss
.de-tabs {
  display: flex; border-bottom: 2px solid var(--border-subtle); margin-bottom: var(--sp-5);
}
.de-tab {
  padding: var(--sp-3) var(--sp-5); font-size: 13px; font-weight: 600;
  color: var(--text-muted); cursor: pointer; border: none; background: transparent;
  border-bottom: 2px solid transparent; margin-bottom: -2px;
  transition: all var(--t-base);
  &:hover { color: var(--text-primary); }
  &.active { color: var(--brand-500); border-bottom-color: var(--brand-500); }
}
```

---

### 8.7 Categories (`/folder/category`)

Layout: Page header (title + "Add Category" button) + responsive card grid.

```scss
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--sp-4);
}

.category-card {
  background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: all var(--t-base);
  cursor: pointer;

  &:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); border-color: var(--border-strong); }

  &__img {
    width: 100%; aspect-ratio: 1/1; object-fit: cover;
    background: var(--surface-subtle);
  }

  &__body {
    padding: 10px 12px;
    display: flex; align-items: center; justify-content: space-between;
  }

  &__name { font-size: 13px; font-weight: 600; color: var(--text-primary); }

  &__actions {
    display: flex; gap: 2px;
    button {
      padding: 4px; border: none; background: transparent; border-radius: var(--r-sm);
      cursor: pointer; color: var(--text-muted); transition: all var(--t-fast);
      &:hover { background: var(--surface-subtle); color: var(--text-primary); }
    }
    ion-icon { font-size: 15px; pointer-events: none; }
  }
}
```

**Add Category Modal:** Name field + circular image upload preview (120px circle). Save/Cancel in modal footer.

---

### 8.8 Promo Codes (`/folder/promo-code`)

**Table columns:** Code (mono badge) · Name · Type · Discount · Min Order · Expiry · Actions (Send / Delete).

```scss
.promo-code-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; font-weight: 600;
  background: #ede9fe; color: #3b0764;
  border: 1px solid #c4b5fd;
  padding: 3px 9px; border-radius: var(--r-md);
  letter-spacing: 1.5px; text-transform: uppercase;
}
```

**Add Promo modal:** Two-column form. Discount type toggle (Percentage / Flat) — styled as segmented button.

**Notification picker modal:** Search input + scrollable customer list with radio selection + Send button.

---

### 8.9 Banners (`/folder/banner`)

**Layout:** Tab group (Home / Cart / Favorites / Profile) + banner grid per tab.

```scss
.banner-type-tabs {
  display: flex; gap: var(--sp-2); margin-bottom: var(--sp-5);

  button {
    padding: 7px 18px; font-size: 13px; font-weight: 600;
    border-radius: var(--r-md); border: 1px solid var(--border-default);
    background: var(--surface-white); color: var(--text-muted);
    cursor: pointer; box-shadow: var(--shadow-xs); transition: all var(--t-base);
    &:hover  { border-color: var(--border-strong); color: var(--text-primary); }
    &.active { background: var(--brand-500); border-color: var(--brand-500); color: #fff; box-shadow: 0 2px 8px rgba(255,76,90,0.25); }
  }
}

.banner-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--sp-4);
}

.banner-card {
  background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl); overflow: hidden; box-shadow: var(--shadow-card);

  &__img {
    width: 100%; height: 130px; object-fit: cover; cursor: zoom-in; display: block;
    background: var(--surface-subtle);
    transition: opacity var(--t-base);
    &:hover { opacity: 0.85; }
  }

  &__footer {
    padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--border-subtle);
  }
}

/* Upload card (add new banner) */
.banner-add-card {
  border: 2px dashed var(--border-default); border-radius: var(--r-xl);
  height: 180px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: var(--sp-2);
  cursor: pointer; transition: all var(--t-base); background: var(--surface-subtle);
  &:hover { border-color: var(--brand-500); background: var(--brand-50); }
  ion-icon { font-size: 28px; color: var(--text-muted); }
  span { font-size: 13px; font-weight: 600; color: var(--text-muted); }
}
```

**Full-screen preview modal:** Image fills modal, white close button top-right.

---

### 8.10 Chat (`/folder/chat`)

**Layout:** Two-panel flex row.

```scss
/* chat.page.scss */
:host { --background: var(--surface-page); }

.chat-root {
  display: flex;
  height: calc(100vh - 56px);
  overflow: hidden;
  background: var(--surface-page);
  gap: var(--sp-4);
  padding: var(--sp-4);
}

.chat-list-panel {
  width: 280px; flex-shrink: 0;
  background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-card);
  display: flex; flex-direction: column;
  overflow: hidden;

  &__header {
    padding: var(--sp-4); border-bottom: 1px solid var(--border-subtle);
    font-size: 14px; font-weight: 700; color: var(--text-primary);
  }

  &__items { overflow-y: auto; flex: 1; }
}

.chat-list-item {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: 12px var(--sp-4); cursor: pointer;
  border-bottom: 1px solid var(--border-subtle);
  transition: background var(--t-fast);
  &:hover, &.active { background: var(--surface-hover); }
  &.active { background: var(--brand-50); border-right: 2px solid var(--brand-500); }

  &__body { flex: 1; min-width: 0; }
  &__name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
  &__preview { font-size: 12px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  &__time { font-size: 11px; color: var(--text-placeholder); flex-shrink: 0; }
}

.chat-thread-panel {
  flex: 1; background: var(--surface-white);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl); box-shadow: var(--shadow-card);
  display: flex; flex-direction: column; overflow: hidden;

  &__header {
    padding: var(--sp-4) var(--sp-5); border-bottom: 1px solid var(--border-subtle);
    display: flex; align-items: center; gap: var(--sp-3);
  }

  &__messages {
    flex: 1; overflow-y: auto; padding: var(--sp-5);
    display: flex; flex-direction: column; gap: var(--sp-3);
    background: var(--surface-page);
  }

  &__input {
    padding: var(--sp-4) var(--sp-5); border-top: 1px solid var(--border-subtle);
    display: flex; gap: var(--sp-3); align-items: center; background: var(--surface-white);
    input {
      flex: 1; background: var(--surface-subtle); border: 1px solid var(--border-subtle);
      border-radius: var(--r-full); padding: 9px 16px;
      font-family: 'Barlow', sans-serif; font-size: 14px; color: var(--text-primary); outline: none;
      &:focus { border-color: var(--brand-500); background: var(--surface-white); }
    }
    .send-btn {
      width: 38px; height: 38px; border-radius: 50%;
      background: var(--brand-500); color: #fff; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background var(--t-base);
      &:hover { background: var(--brand-600); }
      ion-icon { font-size: 17px; }
    }
  }
}

.chat-bubble {
  max-width: 68%; padding: 9px 14px; border-radius: var(--r-xl);
  font-size: 13px; line-height: 1.5;
  &--admin { align-self: flex-end; background: var(--brand-500); color: #fff; border-bottom-right-radius: var(--r-sm); }
  &--user  { align-self: flex-start; background: var(--surface-white); border: 1px solid var(--border-subtle); color: var(--text-secondary); border-bottom-left-radius: var(--r-sm); }
  &__time  { font-size: 10px; opacity: 0.65; margin-top: 4px; display: block; text-align: right; }
}
```

---

### 8.11 Settings (`/folder/settings`)

**Layout:** Page title + three collapsible section cards: Platform Fees & GST | Delivery Charges | Driver Bonus.

```scss
/* settings.page.scss */
.settings-wrap { display: flex; flex-direction: column; gap: var(--sp-4); max-width: 860px; }

.settings-card {
  background: var(--surface-white); border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl); overflow: hidden; box-shadow: var(--shadow-card);
}

.settings-card-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-4) var(--sp-5); cursor: pointer;
  transition: background var(--t-fast);
  &:hover { background: var(--surface-hover); }

  &__left { display: flex; align-items: center; gap: var(--sp-3); }
  &__icon {
    width: 34px; height: 34px; border-radius: var(--r-md);
    background: var(--brand-50); display: flex; align-items: center; justify-content: center;
    ion-icon { font-size: 17px; color: var(--brand-500); }
  }
  &__title { font-size: 14px; font-weight: 700; color: var(--text-primary); }
  &__sub   { font-size: 12px; color: var(--text-muted); }
  ion-icon.chevron { font-size: 18px; color: var(--text-muted); transition: transform var(--t-base); }
  &.open ion-icon.chevron { transform: rotate(180deg); }
}

.settings-card-body { padding: var(--sp-5); border-top: 1px solid var(--border-subtle); }

/* Delivery tier grid */
.delivery-tier-row {
  display: grid; grid-template-columns: auto 1fr 1fr 1fr; gap: var(--sp-4); align-items: end;
  padding: var(--sp-4) 0; border-bottom: 1px solid var(--border-subtle);
  &:last-child { border-bottom: none; }

  .tier-label {
    font-size: 12px; font-weight: 700; color: var(--brand-600);
    text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;
  }
}

/* Toggle row for GST */
.settings-toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-3) 0; border-bottom: 1px solid var(--border-subtle);
  &:last-child { border-bottom: none; }
  .label { font-size: 14px; font-weight: 500; color: var(--text-primary); }
  .sub   { font-size: 12px; color: var(--text-muted); }
  ion-toggle {
    --track-background: var(--border-default);
    --track-background-checked: var(--brand-500);
    --handle-background: #fff;
    --handle-background-checked: #fff;
  }
}

/* Settings save bar */
.settings-save-bar {
  position: sticky; bottom: 0; padding: var(--sp-4) var(--sp-6);
  background: var(--surface-white); border-top: 1px solid var(--border-subtle);
  box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
  display: flex; justify-content: flex-end; gap: var(--sp-3);
}
```

---

### 8.12 Pincode Setup (`/folder/pincode`)

**Layout:** Toolbar search + "Add Pincode" button in page header, then card grid.

```scss
.pincode-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--sp-4);
}

.pincode-card {
  background: var(--surface-white); border: 1px solid var(--border-subtle);
  border-radius: var(--r-xl); padding: var(--sp-5); box-shadow: var(--shadow-card);
  transition: all var(--t-base);
  &:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); border-color: var(--border-strong); }

  &__pin {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 26px; font-weight: 800; color: var(--brand-500); line-height: 1;
    letter-spacing: -0.5px; margin-bottom: var(--sp-2);
  }
  &__addr {
    font-size: 12px; color: var(--text-muted); line-height: 1.4;
    margin-bottom: var(--sp-3);
  }
  &__coords {
    font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--text-placeholder);
    background: var(--surface-subtle); border-radius: var(--r-sm);
    padding: 3px 7px; display: inline-block; margin-bottom: var(--sp-4);
  }
  &__actions { display: flex; gap: var(--sp-2); }
}
```

**Add/Edit Pincode modal:** Four fields — Pincode, Address, Latitude, Longitude. Save/Cancel footer.

---

### 8.13 Stub Screens (Phase 2)

Apply consistently to: Reviews, Notifications, Messages, Register.

```html
<ion-content class="de-page">
  <div class="de-page__inner">
    <div class="de-page-header">
      <div class="de-page-header__left">
        <h1 class="t-h1">{{ title }}</h1>
      </div>
    </div>
    <div class="de-card" style="padding: var(--sp-16) var(--sp-6);">
      <div class="de-empty">
        <div class="de-empty__icon">
          <ion-icon [name]="icon"></ion-icon>
        </div>
        <p class="de-empty__title">Coming Soon</p>
        <p class="de-empty__body">This module is scheduled for the next release. Check back soon.</p>
        <span class="de-badge de-badge--blue">Phase 2</span>
      </div>
    </div>
  </div>
</ion-content>
```

---

## 9. Order Status Reference

Complete badge spec for all 9 statuses:

| Code | Class modifier | Icon | Display label | Short label | Admin action? |
|---|---|---|---|---|---|
| 0 — Received | `de-badge--received` | `time-outline` | Received | New | Yes |
| 4 — Accepted | `de-badge--accepted` | `checkmark-outline` | Accepted | Accepted | Yes |
| 1 — Being Prepared | `de-badge--preparing` | `restaurant-outline` | Being Prepared | Prep | Yes |
| 2 — Delivery Assigned | `de-badge--assigned` | `bicycle-outline` | Delivery Assigned | Assigned | Yes |
| 6 — Pickup Confirmed | `de-badge--pickup` | `bag-check-outline` | Pickup Confirmed | Picked | No |
| 3 — Delivered | `de-badge--delivered` | `checkmark-circle-outline` | Delivered | Done | No (final) |
| 5 — Cancelled by Hotel | `de-badge--cancelled` | `close-circle-outline` | Cancelled by Hotel | Cancelled | No (final) |
| 7 — Cancelled by Customer | `de-badge--cancelled` | `close-outline` | Cancelled by Customer | Cancelled | No (final) |
| 8 — Rejected by Driver | `de-badge--rejected` | `close-circle-outline` | Rejected by Driver | Rejected | Yes (re-assign) |

Happy path: `Received → Accepted → Being Prepared → Delivery Assigned → Pickup Confirmed → Delivered`

---

## 10. Motion & Animation

### 10.1 Page entrance

```scss
@keyframes de-fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes de-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Apply to .de-page__inner for every page */
.de-page__inner { animation: de-fade-up 0.28s ease both; }

/* Staggered children */
.animate-in-1 { animation: de-fade-up 0.28s 0.05s ease both; opacity: 0; }
.animate-in-2 { animation: de-fade-up 0.28s 0.10s ease both; opacity: 0; }
.animate-in-3 { animation: de-fade-up 0.28s 0.15s ease both; opacity: 0; }
.animate-in-4 { animation: de-fade-up 0.28s 0.20s ease both; opacity: 0; }
```

### 10.2 Interaction rules

| Element | Transition |
|---|---|
| All buttons | `all 200ms ease` — hover color change + active scale(0.98) |
| Table rows | `background 120ms ease` on hover |
| Nav items | `all 200ms ease` — bg + color |
| Stat cards | `box-shadow + transform 200ms ease` on hover |
| Category cards | `box-shadow + transform 200ms ease` on hover |
| Modals | Ion modal default slide-up |
| Sidebar active dot | opacity `200ms ease` |
| Filter tab | `all 200ms ease` |

### 10.3 No gratuitous animation

- No page-level bounces or spring effects
- No floating particle effects
- Loading is shown with skeleton shimmer only
- Toasts appear/disappear with Ion defaults (fade + slide)

---

## 11. Responsive System

### 11.1 Breakpoints

```scss
$bp-sm:  480px;   // Mobile small
$bp-md:  768px;   // Mobile large / tablet portrait
$bp-lg:  1024px;  // Tablet landscape / small laptop
$bp-xl:  1280px;  // Standard desktop
$bp-2xl: 1440px;  // Wide desktop
```

### 11.2 Layout behavior per breakpoint

| Screen | Sidebar | Page padding | KPI grid | Chart grids |
|---|---|---|---|---|
| > 1024px | Fixed 252px | 24px | 4 col | 2-col / 3-col |
| 768–1024px | Hidden (overlay on menu tap) | 20px | 2 col | 2-col / 2-col |
| < 768px | Overlay only | 16px | 1 col | 1 col |

### 11.3 Global responsive overrides

```scss
@media (max-width: 768px) {
  .de-page__inner { padding: var(--sp-4); }
  .de-page-header { flex-direction: column; align-items: flex-start; gap: var(--sp-3); }
  .de-table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .de-table { min-width: 640px; }
  .de-table-toolbar { flex-direction: column; align-items: stretch; }
  .de-search { min-width: unset; max-width: unset; }
  .de-form-grid-2,
  .de-form-grid-3 { grid-template-columns: 1fr; }

  ion-modal.de-modal {
    --min-width: 90vw;
    --max-width: 90vw;
  }
}

@media (max-width: 480px) {
  .de-page__inner { padding: var(--sp-3); }
  .de-table-toolbar { padding: var(--sp-3); }
}
```

---

## 12. Implementation Checklist

Complete strictly in this order:

### Phase 1 — Tokens & Global Styles
- [ ] Replace `src/theme/variables.scss` with Section 2.1 tokens
- [ ] Update `src/global.scss`: add Google Fonts import, type utilities, all global component classes (Sections 3, 6)
- [ ] Verify `index.html`: `<meta name="color-scheme" content="light" />` present, dark mode media query removed

### Phase 2 — App Shell
- [ ] Rebuild `app.component.html` sidebar (Section 7.1)
- [ ] Rebuild `app.component.scss` (Section 7.2)
- [ ] Global toolbar styles in `global.scss` (Section 6.1)

### Phase 3 — Auth
- [ ] Rebuild `login.page.html` — remove Bootstrap, use Section 8.1 spec
- [ ] Rebuild `login.page.scss` — centered card layout

### Phase 4 — Dashboard
- [ ] `dash.page.html` — KPI grid, chart layout, activity feed
- [ ] `dash.page.scss` — grid + chart card styles
- [ ] `dash.page.ts` — apply Chart.js light theme config (Section 8.2)

### Phase 5 — Orders
- [ ] `orders.page.html` + `.scss` — table, filter chips, status badges
- [ ] `orders/view.page.html` + `.scss` — timeline, 3-col info grid, items + pricing

### Phase 6 — Partners
- [ ] `partners.page` — table list
- [ ] `partners/add` — register form
- [ ] `partners/map` — Google Maps dark style + floating panel
- [ ] `partners/hotels` — two-col form + image upload
- [ ] `partners/dish` — row-form table
- [ ] `partners/view` — partner detail
- [ ] `partners/settle` — settlements + bulk action bar

### Phase 7 — Customers
- [ ] `customer.page` — table + segment tabs
- [ ] `customer/view` — profile detail

### Phase 8 — Delivery Boys
- [ ] `delivery-boy.page` — table
- [ ] `delivery-boy/add` — multi-section form
- [ ] `delivery-boy/view` — profile hero + tabs

### Phase 9 — Supporting modules
- [ ] `category.page` — card grid + add modal
- [ ] `promo-code.page` — table + add modal + notification picker
- [ ] `banner.page` — type tabs + banner grid + upload zone + preview modal
- [ ] `chat.page` — two-panel layout
- [ ] `settings.page` — collapsible section cards
- [ ] `pincode.page` — card grid + add/edit modal

### Phase 10 — Stub screens & polish
- [ ] `reviews.page`, `notifications.page`, `messages.page`, `register.page` — Section 8.13 placeholder
- [ ] Toast styling (Section 6.14)
- [ ] Alert styling (Section 6.16)
- [ ] Skeleton loader usage in all list pages (Section 6.15)
- [ ] Empty state usage in all list pages (Section 6.13)
- [ ] Responsive overrides verified on mobile viewport (Section 11.3)
- [ ] Remove legacy `/folder/folder` route from app-routing

---

## Quick Reference Card

| Token | Value |
|---|---|
| Brand primary | `#FF4C5A` |
| Page background | `#f8f9fb` |
| Card / Panel background | `#ffffff` |
| Table header background | `#f3f4f6` |
| Border (default) | `#e5e7eb` |
| Text primary | `#111827` |
| Text body | `#374151` |
| Text muted | `#6b7280` |
| UI font | Barlow (300–800) |
| Stats font | Barlow Condensed (700) |
| Mono font | JetBrains Mono (400/500) |
| Card radius | `--r-xl` (12px) |
| Button radius | `--r-md` (6px) |
| Card shadow | `0 1px 3px rgba(0,0,0,.07)` |
| Focus ring | `0 0 0 3px rgba(255,76,90,.15)` |
| Page entrance | `fadeInUp 0.28s ease` |

---

*Covers all 31 pages + all shared components. Light mode only. No dark theme. Consistent design system throughout. Ready to paste into Cursor as project design spec.*
