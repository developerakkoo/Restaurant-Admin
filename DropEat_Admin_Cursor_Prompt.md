# DropEat Admin — Complete UI/UX Redesign Cursor Prompt

> Paste this entire file as your Cursor system/project prompt. It covers every screen, component, token, and interaction for a ground-up redesign of the DropEat Restaurant-Admin Ionic 7 + Angular 17 app.

---

## 0. Mission

Redesign the entire DropEat Admin dashboard into a **premium, modern food-delivery operations console**. The aesthetic is **"dark-command-center meets warm food brand"** — deep navy/charcoal shell with warm red-orange (#FF4C5A) as the single dominant accent. Think Stripe Dashboard energy applied to a food-ops context: crisp data tables, tight hierarchy, confident typography, purposeful motion. Every screen must feel intentional, not scaffolded.

Keep all existing Ionic 7 + Angular 17 code structure and routes. Replace all visual styling, layout, component patterns, and typography.

---

## 1. Design Tokens (Global)

### 1.1 Color System

Define all tokens in `src/theme/variables.scss`. Replace everything currently there.

```scss
:root {
  /* ── Brand ── */
  --brand-primary: #FF4C5A;
  --brand-primary-rgb: 255, 76, 90;
  --brand-primary-shade: #e6404d;
  --brand-primary-tint: #ff6e79;

  /* ── Ionic overrides ── */
  --ion-color-primary: #FF4C5A;
  --ion-color-primary-rgb: 255, 76, 90;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #e6404d;
  --ion-color-primary-tint: #ff6e79;

  --ion-color-secondary: #3dc2ff;
  --ion-color-secondary-rgb: 61, 194, 255;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-shade: #36abe0;
  --ion-color-secondary-tint: #50c8ff;

  --ion-color-tertiary: #5260ff;
  --ion-color-tertiary-rgb: 82, 96, 255;
  --ion-color-tertiary-contrast: #ffffff;
  --ion-color-tertiary-shade: #4854e0;
  --ion-color-tertiary-tint: #6370ff;

  --ion-color-success: #2dd36f;
  --ion-color-success-rgb: 45, 211, 111;
  --ion-color-success-contrast: #ffffff;
  --ion-color-success-shade: #28ba62;
  --ion-color-success-tint: #42d77d;

  --ion-color-warning: #ffc409;
  --ion-color-warning-rgb: 255, 196, 9;
  --ion-color-warning-contrast: #000000;
  --ion-color-warning-shade: #e0ac08;
  --ion-color-warning-tint: #ffca22;

  --ion-color-danger: #eb445a;
  --ion-color-danger-rgb: 235, 68, 90;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-shade: #cf3c4f;
  --ion-color-danger-tint: #ed576b;

  --ion-color-dark: #1a1d2e;
  --ion-color-dark-rgb: 26, 29, 46;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-shade: #12141f;
  --ion-color-dark-tint: #2a2e45;

  --ion-color-medium: #6b7280;
  --ion-color-medium-rgb: 107, 114, 128;
  --ion-color-medium-contrast: #ffffff;
  --ion-color-medium-shade: #5a606d;
  --ion-color-medium-tint: #7a8089;

  --ion-color-light: #f0f1f5;
  --ion-color-light-rgb: 240, 241, 245;
  --ion-color-light-contrast: #1a1d2e;
  --ion-color-light-shade: #d8d9dd;
  --ion-color-light-tint: #f3f4f7;

  /* ── Shell surfaces ── */
  --shell-bg: #0f1117;
  --sidebar-bg: #13161f;
  --sidebar-border: rgba(255,255,255,0.06);
  --card-bg: #1a1d2e;
  --card-border: rgba(255,255,255,0.07);
  --card-hover-border: rgba(255, 76, 90, 0.35);
  --page-bg: #0f1117;
  --input-bg: #1e2235;
  --input-border: rgba(255,255,255,0.1);
  --table-header-bg: #1e2235;
  --table-row-hover: rgba(255,255,255,0.035);
  --table-border: rgba(255,255,255,0.06);
  --toolbar-bg: #13161f;
  --toolbar-border: rgba(255,255,255,0.06);

  /* ── Text ── */
  --text-primary: #f0f1f5;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --text-accent: #FF4C5A;

  --ion-background-color: #0f1117;
  --ion-text-color: #f0f1f5;

  /* ── Status chip colors (order badges) ── */
  --status-received-bg: rgba(255,196,9,0.15);
  --status-received-text: #ffc409;
  --status-accepted-bg: rgba(45,211,111,0.15);
  --status-accepted-text: #2dd36f;
  --status-preparing-bg: rgba(255,76,90,0.15);
  --status-preparing-text: #FF4C5A;
  --status-assigned-bg: rgba(82,96,255,0.15);
  --status-assigned-text: #5260ff;
  --status-pickup-bg: rgba(61,194,255,0.15);
  --status-pickup-text: #3dc2ff;
  --status-delivered-bg: rgba(45,211,111,0.15);
  --status-delivered-text: #2dd36f;
  --status-cancelled-bg: rgba(235,68,90,0.15);
  --status-cancelled-text: #eb445a;
  --status-rejected-bg: rgba(235,68,90,0.15);
  --status-rejected-text: #eb445a;

  /* ── Elevation ── */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.4);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.35);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.45);
  --shadow-card: 0 2px 12px rgba(0,0,0,0.5);
  --glow-primary: 0 0 20px rgba(255,76,90,0.25);

  /* ── Spacing scale ── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* ── Border radius scale ── */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-full: 9999px;

  /* ── Z-index ── */
  --z-base: 1;
  --z-dropdown: 100;
  --z-modal: 200;
  --z-toast: 300;

  /* ── Transitions ── */
  --transition-fast: 0.15s ease;
  --transition-base: 0.25s ease;
  --transition-slow: 0.4s ease;
}
```

### 1.2 Typography

In `src/global.scss`, import Barlow + a complementary mono font:

```scss
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&family=Barlow+Condensed:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

ion-app, body {
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-primary);
  background: var(--page-bg);
  -webkit-font-smoothing: antialiased;
}

/* Scale */
.text-xs   { font-size: 11px; }
.text-sm   { font-size: 12px; }
.text-base { font-size: 14px; }
.text-md   { font-size: 16px; }
.text-lg   { font-size: 18px; }
.text-xl   { font-size: 20px; }
.text-2xl  { font-size: 24px; }
.text-3xl  { font-size: 30px; }
.text-4xl  { font-size: 36px; }

/* Weights */
.font-light    { font-weight: 300; }
.font-regular  { font-weight: 400; }
.font-medium   { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold     { font-weight: 700; }
.font-extrabold{ font-weight: 800; }

/* Condensed display (section labels, stats) */
.font-condensed { font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.02em; }

/* Mono (IDs, codes, phone numbers) */
.font-mono { font-family: 'JetBrains Mono', monospace; font-size: 12px; }

/* Text colors */
.text-primary   { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted     { color: var(--text-muted); }
.text-accent    { color: var(--text-accent); }
```

---

## 2. Global Component Styles

Add to `src/global.scss`:

### 2.1 Page wrapper

```scss
.page-root {
  --background: var(--page-bg);
  padding: 0;
}

.page-content {
  padding: var(--space-6);
  max-width: 1440px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-5);
  border-bottom: 1px solid var(--card-border);

  .page-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.3px;
  }

  .page-subtitle {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .page-actions {
    display: flex;
    gap: var(--space-2);
    align-items: center;
  }
}
```

### 2.2 Cards

```scss
.de-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);

  &:hover { border-color: var(--card-hover-border); }
  &--flat { box-shadow: none; }
  &--glow { box-shadow: var(--shadow-card), var(--glow-primary); }
}
```

### 2.3 Data table

```scss
.de-table-wrap {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.de-table {
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background: var(--table-header-bg);
    th {
      padding: 11px 16px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--text-muted);
      text-align: left;
      border-bottom: 1px solid var(--table-border);
      white-space: nowrap;
    }
  }

  tbody tr {
    border-bottom: 1px solid var(--table-border);
    transition: background var(--transition-fast);
    cursor: pointer;

    &:last-child { border-bottom: none; }
    &:hover { background: var(--table-row-hover); }

    td {
      padding: 13px 16px;
      font-size: 13px;
      color: var(--text-primary);
      vertical-align: middle;
    }
  }
}

/* Table toolbar (search + filters + actions) */
.de-table-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--table-border);
  flex-wrap: wrap;
}
```

### 2.4 Status chips (order badges)

```scss
.de-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  white-space: nowrap;

  ion-icon { font-size: 12px; }

  &--received  { background: var(--status-received-bg);  color: var(--status-received-text); }
  &--accepted  { background: var(--status-accepted-bg);  color: var(--status-accepted-text); }
  &--preparing { background: var(--status-preparing-bg); color: var(--status-preparing-text); }
  &--assigned  { background: var(--status-assigned-bg);  color: var(--status-assigned-text); }
  &--pickup    { background: var(--status-pickup-bg);    color: var(--status-pickup-text); }
  &--delivered { background: var(--status-delivered-bg); color: var(--status-delivered-text); }
  &--cancelled { background: var(--status-cancelled-bg); color: var(--status-cancelled-text); }
  &--rejected  { background: var(--status-rejected-bg);  color: var(--status-rejected-text); }
}
```

### 2.5 Buttons

```scss
/* Primary */
.de-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 9px 18px;
  border-radius: var(--radius-md);
  font-family: 'Barlow', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all var(--transition-base);

  &--primary {
    background: var(--brand-primary);
    color: #fff;
    box-shadow: 0 2px 10px rgba(255,76,90,0.35);
    &:hover { background: var(--brand-primary-tint); box-shadow: 0 4px 16px rgba(255,76,90,0.5); }
    &:active { transform: scale(0.97); }
  }

  &--ghost {
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--card-border);
    &:hover { border-color: var(--brand-primary); color: var(--text-primary); }
  }

  &--danger {
    background: rgba(235,68,90,0.15);
    color: var(--ion-color-danger);
    border: 1px solid rgba(235,68,90,0.25);
    &:hover { background: rgba(235,68,90,0.25); }
  }

  &--sm { padding: 6px 12px; font-size: 12px; }
  &--icon { padding: 8px; border-radius: var(--radius-md); }
}
```

### 2.6 Form inputs

```scss
.de-field {
  margin-bottom: var(--space-5);

  label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: var(--space-2);
  }

  input, select, textarea {
    width: 100%;
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: var(--radius-md);
    padding: 10px 14px;
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    color: var(--text-primary);
    outline: none;
    transition: border-color var(--transition-base);

    &::placeholder { color: var(--text-muted); }
    &:focus { border-color: var(--brand-primary); box-shadow: 0 0 0 3px rgba(255,76,90,0.15); }
  }
}
```

### 2.7 Search bar

```scss
.de-search {
  position: relative;
  min-width: 240px;

  ion-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 16px;
  }

  input {
    width: 100%;
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: var(--radius-md);
    padding: 8px 14px 8px 38px;
    font-size: 13px;
    color: var(--text-primary);
    outline: none;
    transition: border-color var(--transition-base);
    &:focus { border-color: var(--brand-primary); }
    &::placeholder { color: var(--text-muted); }
  }
}
```

### 2.8 KPI stat card

```scss
.de-stat-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-xl);
  padding: var(--space-5) var(--space-6);
  box-shadow: var(--shadow-card);
  transition: border-color var(--transition-base), transform var(--transition-base);

  &:hover { border-color: var(--card-hover-border); transform: translateY(-2px); }

  .stat-icon {
    width: 44px; height: 44px;
    border-radius: var(--radius-lg);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: var(--space-4);
    ion-icon { font-size: 22px; }

    &--red   { background: rgba(255,76,90,0.15); color: #FF4C5A; }
    &--green { background: rgba(45,211,111,0.15); color: #2dd36f; }
    &--blue  { background: rgba(61,194,255,0.15); color: #3dc2ff; }
    &--purple{ background: rgba(82,96,255,0.15); color: #5260ff; }
  }

  .stat-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  .stat-delta {
    margin-top: var(--space-3);
    font-size: 12px;
    font-weight: 600;
    &.up   { color: #2dd36f; }
    &.down { color: #eb445a; }
  }
}
```

### 2.9 Empty state

```scss
.de-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-6);
  text-align: center;

  ion-icon {
    font-size: 52px;
    color: var(--text-muted);
    margin-bottom: var(--space-4);
    opacity: 0.5;
  }

  h3 { font-size: 16px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; }
  p  { font-size: 13px; color: var(--text-muted); max-width: 280px; }
}
```

### 2.10 Modals

```scss
.de-modal {
  --background: var(--card-bg);
  --border-radius: var(--radius-xl);
  --box-shadow: var(--shadow-lg);

  .modal-header {
    padding: var(--space-5) var(--space-6);
    border-bottom: 1px solid var(--card-border);
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 { font-size: 18px; font-weight: 700; color: var(--text-primary); }
    .close-btn { color: var(--text-muted); cursor: pointer; &:hover { color: var(--text-primary); } }
  }

  .modal-body { padding: var(--space-6); }

  .modal-footer {
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid var(--card-border);
    display: flex;
    justify-content: flex-end;
    gap: var(--space-3);
  }
}
```

### 2.11 Animations (global)

```scss
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}

.animate-in       { animation: fadeInUp 0.35s ease forwards; }
.animate-in-delay-1 { animation-delay: 0.05s; opacity: 0; animation-fill-mode: forwards; }
.animate-in-delay-2 { animation-delay: 0.10s; opacity: 0; animation-fill-mode: forwards; }
.animate-in-delay-3 { animation-delay: 0.15s; opacity: 0; animation-fill-mode: forwards; }
.animate-in-delay-4 { animation-delay: 0.20s; opacity: 0; animation-fill-mode: forwards; }

/* Skeleton loader */
.skeleton {
  background: linear-gradient(90deg, var(--card-bg) 25%, var(--table-header-bg) 50%, var(--card-bg) 75%);
  background-size: 600px 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}
```

---

## 3. App Shell — Side Menu + Toolbar

### 3.1 `app.component.html` — full shell

```html
<ion-app>
  <ion-split-pane contentId="main-content" when="lg">

    <!-- ═══════════════════════════════════ SIDEBAR ═══════════════ -->
    <ion-menu contentId="main-content" type="overlay" class="de-sidebar">
      <ion-content class="de-sidebar__content">

        <!-- Brand -->
        <div class="de-sidebar__brand">
          <div class="de-sidebar__logo">
            <img src="assets/logo.svg" alt="DropEat" />
          </div>
          <div class="de-sidebar__brand-text">
            <span class="de-sidebar__name">DropEat</span>
            <span class="de-sidebar__tagline">We Drop You Eat!</span>
          </div>
        </div>

        <!-- Nav label -->
        <div class="de-sidebar__section-label">Main Menu</div>

        <!-- Navigation -->
        <ion-menu-toggle auto-hide="false" *ngFor="let p of appPages; let i = index">
          <ion-item
            [routerLink]="[p.url]"
            routerLinkActive="active"
            routerDirection="root"
            class="de-sidebar__item"
            lines="none"
            detail="false">
            <div class="de-sidebar__item-icon">
              <ion-icon [ios]="p.icon + '-outline'" [md]="p.icon + '-sharp'" slot="start"></ion-icon>
            </div>
            <ion-label class="de-sidebar__item-label">{{ p.title }}</ion-label>
            <div class="de-sidebar__item-dot" slot="end"></div>
          </ion-item>
        </ion-menu-toggle>

        <!-- Sidebar footer -->
        <div class="de-sidebar__footer">
          <div class="de-sidebar__footer-version">v1.0.0 · Admin</div>
        </div>

      </ion-content>
    </ion-menu>
    <!-- ════════════════════════════════════════════════════════════ -->

    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-split-pane>
</ion-app>
```

### 3.2 `app.component.scss`

```scss
.de-sidebar {
  --background: var(--sidebar-bg);
  --width: 260px;

  &__content {
    --background: var(--sidebar-bg);
    --padding-start: 0;
    --padding-end: 0;
    --padding-top: 0;
    --padding-bottom: 0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--sidebar-border);
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 28px 20px 24px;
    border-bottom: 1px solid var(--sidebar-border);
  }

  &__logo {
    width: 40px; height: 40px;
    background: rgba(255,76,90,0.12);
    border-radius: var(--radius-lg);
    display: flex; align-items: center; justify-content: center;
    padding: 8px;
    img { width: 100%; filter: brightness(0) saturate(100%) invert(42%) sepia(85%) saturate(900%) hue-rotate(330deg) brightness(105%); }
  }

  &__name {
    display: block;
    font-size: 17px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.3px;
  }

  &__tagline {
    display: block;
    font-size: 11px;
    color: var(--text-muted);
    font-style: italic;
  }

  &__section-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: var(--text-muted);
    padding: 20px 20px 8px;
  }

  &__item {
    --background: transparent;
    --background-activated: transparent;
    --background-focused: transparent;
    --border-radius: var(--radius-md);
    --padding-start: 12px;
    --padding-end: 12px;
    --inner-padding-end: 0;
    --min-height: 44px;
    margin: 2px 10px;
    cursor: pointer;
    transition: background var(--transition-fast);

    &:hover:not(.active) {
      --background: rgba(255,255,255,0.04);
    }

    &.active {
      --background: rgba(255,76,90,0.12);

      .de-sidebar__item-icon { color: var(--brand-primary); background: rgba(255,76,90,0.15); }
      .de-sidebar__item-label { color: var(--text-primary); font-weight: 600; }
      .de-sidebar__item-dot { opacity: 1; }
    }
  }

  &__item-icon {
    width: 34px; height: 34px;
    border-radius: var(--radius-md);
    display: flex; align-items: center; justify-content: center;
    margin-right: 10px;
    color: var(--text-muted);
    transition: all var(--transition-fast);
    ion-icon { font-size: 18px; }
  }

  &__item-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    transition: color var(--transition-fast);
  }

  &__item-dot {
    width: 6px; height: 6px;
    background: var(--brand-primary);
    border-radius: 50%;
    opacity: 0;
    transition: opacity var(--transition-fast);
  }

  &__footer {
    margin-top: auto;
    padding: 20px;
    border-top: 1px solid var(--sidebar-border);
    &-version { font-size: 11px; color: var(--text-muted); }
  }
}
```

### 3.3 Standard page toolbar (reuse across all pages)

```html
<!-- In each page's HTML, inside ion-header -->
<ion-header class="de-toolbar" [translucent]="false">
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button class="de-menu-btn"></ion-menu-button>
    </ion-buttons>
    <ion-title class="de-toolbar__title">{{ pageTitle }}</ion-title>
    <ion-buttons slot="end">
      <!-- page-specific buttons here -->
    </ion-buttons>
  </ion-toolbar>
</ion-header>
```

```scss
/* Toolbar global override in global.scss */
ion-toolbar {
  --background: var(--toolbar-bg);
  --border-color: var(--toolbar-border);
  --color: var(--text-primary);
  --padding-start: 16px;
  --padding-end: 16px;
  border-bottom: 1px solid var(--toolbar-border);
}

.de-toolbar__title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.de-menu-btn {
  color: var(--text-secondary);
}
```

---

## 4. Screen-by-Screen Specifications

### 4.1 Login Page (`/folder/login`)

**Remove Bootstrap entirely. Rebuild with Ionic/pure CSS.**

Layout: Full-screen split — left panel brand illustration (60%), right panel login form (40%) on desktop. Stacks to single column on mobile.

**Left panel:**
- Dark background `#0f1117` with subtle radial gradient in red at top-right corner
- Large DropEat logo + tagline centered
- Three floating stat cards (animated): "2,400+ Orders Today", "98% On-Time", "150+ Partners"
- Decorative grid lines / dot pattern overlay at 5% opacity

**Right panel (`login.page.html`):**
```html
<div class="login-panel">
  <div class="login-panel__header">
    <h1>Welcome back</h1>
    <p>Sign in to your admin dashboard</p>
  </div>

  <form class="login-form" (ngSubmit)="onLogin()">
    <div class="de-field">
      <label>Email address</label>
      <div class="de-field__icon-wrap">
        <ion-icon name="mail-outline"></ion-icon>
        <input type="email" placeholder="admin@dropeat.com" [(ngModel)]="email" name="email" />
      </div>
    </div>

    <div class="de-field">
      <label>Password</label>
      <div class="de-field__icon-wrap">
        <ion-icon name="lock-closed-outline"></ion-icon>
        <input [type]="showPass ? 'text' : 'password'" placeholder="••••••••" [(ngModel)]="password" name="password" />
        <ion-icon class="de-field__toggle" [name]="showPass ? 'eye-off-outline' : 'eye-outline'" (click)="showPass = !showPass"></ion-icon>
      </div>
    </div>

    <button class="de-btn de-btn--primary" style="width:100%;justify-content:center;margin-top:8px" type="submit">
      <ion-icon name="log-in-outline"></ion-icon>
      Sign in
    </button>
  </form>

  <p class="login-panel__footer">DropEat Admin · Restricted Access</p>
</div>
```

**login.page.scss:**
```scss
:host { --background: var(--page-bg); }

.login-root { display: flex; height: 100vh; }

.login-brand {
  flex: 1.4;
  background: #0f1117;
  position: relative;
  overflow: hidden;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;

  &::before {
    content: '';
    position: absolute; top: -80px; right: -80px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(255,76,90,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
}

.login-panel {
  width: 420px;
  background: var(--card-bg);
  border-left: 1px solid var(--card-border);
  display: flex; flex-direction: column; justify-content: center;
  padding: 48px 40px;

  &__header {
    margin-bottom: 32px;
    h1 { font-size: 28px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; }
    p  { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
  }

  &__footer {
    margin-top: 32px;
    font-size: 11px;
    color: var(--text-muted);
    text-align: center;
  }
}

.de-field__icon-wrap {
  position: relative;
  ion-icon:first-child {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    color: var(--text-muted); font-size: 16px; z-index: 1;
  }
  input { padding-left: 40px; }
}

.de-field__toggle {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  color: var(--text-muted); cursor: pointer; font-size: 16px;
  &:hover { color: var(--text-primary); }
}

@media (max-width: 768px) {
  .login-brand { display: none; }
  .login-panel { width: 100%; border: none; }
}
```

---

### 4.2 Dashboard (`/folder/dash`)

**dash.page.html structure:**

```html
<ion-header><!-- standard toolbar with notification + message icon buttons --></ion-header>

<ion-content class="page-root">
  <div class="page-content">

    <!-- Page header -->
    <div class="page-header animate-in">
      <div>
        <h2 class="page-title">Dashboard</h2>
        <p class="page-subtitle">Your operations at a glance</p>
      </div>
      <!-- Date filter row -->
      <div class="dash-filters">
        <div class="de-field" style="margin:0">
          <input type="date" [(ngModel)]="startDate" />
        </div>
        <span style="color:var(--text-muted)">→</span>
        <div class="de-field" style="margin:0">
          <input type="date" [(ngModel)]="endDate" />
        </div>
        <button class="de-btn de-btn--ghost de-btn--sm" (click)="applyFilter()">Apply</button>
      </div>
    </div>

    <!-- KPI row: 4 cards -->
    <div class="dash-kpi-grid animate-in animate-in-delay-1">
      <div class="de-stat-card">
        <div class="stat-icon stat-icon--red"><ion-icon name="cart-outline"></ion-icon></div>
        <div class="stat-value">{{ totalOrders | number }}</div>
        <div class="stat-label">Total Orders</div>
        <div class="stat-delta up">↑ 12% vs last period</div>
      </div>
      <div class="de-stat-card">
        <div class="stat-icon stat-icon--green"><ion-icon name="cash-outline"></ion-icon></div>
        <div class="stat-value">₹{{ totalRevenue | number:'1.0-0' }}</div>
        <div class="stat-label">Total Revenue</div>
        <div class="stat-delta up">↑ 8% vs last period</div>
      </div>
      <div class="de-stat-card">
        <div class="stat-icon stat-icon--blue"><ion-icon name="people-outline"></ion-icon></div>
        <div class="stat-value">{{ activeUsers | number }}</div>
        <div class="stat-label">Active Users</div>
        <div class="stat-delta down">↓ 3% vs last period</div>
      </div>
      <div class="de-stat-card">
        <div class="stat-icon stat-icon--purple"><ion-icon name="storefront-outline"></ion-icon></div>
        <div class="stat-value">{{ partnersCount | number }}</div>
        <div class="stat-label">Active Partners</div>
        <div class="stat-delta up">↑ 5% vs last period</div>
      </div>
    </div>

    <!-- Charts row 1: Revenue + Orders (2-col) -->
    <div class="dash-chart-grid--2 animate-in animate-in-delay-2">
      <div class="de-card dash-chart-card">
        <div class="dash-chart-card__header">
          <span class="dash-chart-card__title">Revenue Statistics</span>
          <div class="dash-granularity">
            <button *ngFor="let g of granularities" [class.active]="revenueGran === g.value" (click)="setGran('revenue', g.value)">{{ g.label }}</button>
          </div>
        </div>
        <canvas id="revenueChart"></canvas>
      </div>
      <div class="de-card dash-chart-card">
        <div class="dash-chart-card__header">
          <span class="dash-chart-card__title">Order Statistics</span>
          <div class="dash-granularity">
            <button *ngFor="let g of granularities" [class.active]="ordersGran === g.value" (click)="setGran('orders', g.value)">{{ g.label }}</button>
          </div>
        </div>
        <canvas id="ordersChart"></canvas>
      </div>
    </div>

    <!-- Charts row 2: Platform Fees + GST + Admin Earnings (3-col) -->
    <div class="dash-chart-grid--3 animate-in animate-in-delay-3">
      <div class="de-card dash-chart-card">
        <div class="dash-chart-card__header">
          <span class="dash-chart-card__title">Platform Fees</span>
          <!-- granularity selector -->
        </div>
        <canvas id="feesChart"></canvas>
      </div>
      <div class="de-card dash-chart-card">
        <div class="dash-chart-card__header"><span class="dash-chart-card__title">GST Amount</span></div>
        <canvas id="gstChart"></canvas>
      </div>
      <div class="de-card dash-chart-card">
        <div class="dash-chart-card__header"><span class="dash-chart-card__title">Admin Earnings</span></div>
        <canvas id="earningsChart"></canvas>
      </div>
    </div>

    <!-- Bottom row: Profit chart + Recent Activity (2-col) -->
    <div class="dash-chart-grid--2 animate-in animate-in-delay-4">
      <div class="de-card dash-chart-card">
        <div class="dash-chart-card__header"><span class="dash-chart-card__title">Profit Statistics</span></div>
        <canvas id="profitChart"></canvas>
      </div>

      <!-- Recent Activity -->
      <div class="de-card">
        <div class="dash-chart-card__header" style="padding:20px 20px 16px">
          <span class="dash-chart-card__title">Recent Activity</span>
          <a routerLink="/folder/orders" class="text-accent" style="font-size:12px;font-weight:600">View all →</a>
        </div>
        <div class="dash-activity-list">
          <div class="dash-activity-item" *ngFor="let a of recentActivity">
            <div class="dash-activity-item__icon">
              <ion-icon name="receipt-outline"></ion-icon>
            </div>
            <div class="dash-activity-item__body">
              <div class="dash-activity-item__top">
                <span class="font-mono text-accent">#{{ a.orderId }}</span>
                <span class="dash-activity-item__amount">₹{{ a.amount }}</span>
              </div>
              <div class="dash-activity-item__sub">
                <span>{{ a.customerPhone }}</span>
                <span class="separator">·</span>
                <span>{{ a.hotelName }}</span>
              </div>
              <div class="dash-activity-item__meta">
                <span class="de-chip" [ngClass]="'de-chip--' + a.paymentMode.toLowerCase()">{{ a.paymentMode }}</span>
                <span class="text-muted text-xs">{{ a.time | date:'shortTime' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</ion-content>
```

**Chart.js config — dark theme for all charts:**
```typescript
// In dash.page.ts, set global Chart defaults:
Chart.defaults.color = '#6b7280';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = 'Barlow';

// Per chart config example:
{
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1d2e',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#f0f1f5',
        bodyColor: '#9ca3af',
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280' } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280' } },
    }
  },
  data: {
    datasets: [{
      borderColor: '#FF4C5A',
      backgroundColor: (ctx) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        g.addColorStop(0, 'rgba(255,76,90,0.25)');
        g.addColorStop(1, 'rgba(255,76,90,0)');
        return g;
      },
      tension: 0.4, fill: true, pointRadius: 0, pointHoverRadius: 5,
      pointHoverBackgroundColor: '#FF4C5A',
    }]
  }
}
```

**dash.page.scss:**
```scss
.dash-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1200px) { grid-template-columns: repeat(2,1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
}

.dash-chart-grid--2 {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 16px; margin-bottom: 24px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
}

.dash-chart-grid--3 {
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  gap: 16px; margin-bottom: 24px;
  @media (max-width: 1100px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 700px)  { grid-template-columns: 1fr; }
}

.dash-chart-card {
  padding: 20px;
  &__header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  &__title { font-size: 14px; font-weight: 600; color: var(--text-primary); }
  canvas { height: 200px !important; width: 100% !important; }
}

.dash-granularity {
  display: flex; gap: 2px;
  button {
    padding: 4px 10px; font-size: 11px; font-weight: 600;
    background: transparent; border: 1px solid var(--card-border);
    border-radius: var(--radius-sm); color: var(--text-muted); cursor: pointer;
    transition: all var(--transition-fast);
    &.active { background: var(--brand-primary); border-color: var(--brand-primary); color: #fff; }
    &:hover:not(.active) { border-color: var(--text-muted); color: var(--text-primary); }
  }
}

.dash-activity-list { overflow-y: auto; max-height: 340px; }

.dash-activity-item {
  display: flex; gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--table-border);
  &:last-child { border-bottom: none; }
  &:hover { background: var(--table-row-hover); }

  &__icon {
    width: 36px; height: 36px;
    background: rgba(255,76,90,0.1);
    border-radius: var(--radius-md);
    display: flex; align-items: center; justify-content: center;
    color: var(--brand-primary); flex-shrink: 0;
    ion-icon { font-size: 16px; }
  }

  &__body { flex: 1; min-width: 0; }
  &__top  { display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 13px; font-weight: 600; }
  &__amount { color: var(--text-primary); }
  &__sub  { font-size: 12px; color: var(--text-muted); margin-bottom: 5px; }
  .separator { margin: 0 4px; }
  &__meta { display: flex; align-items: center; gap: 8px; }
}

.dash-filters {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  input[type=date] {
    background: var(--input-bg); border: 1px solid var(--input-border);
    border-radius: var(--radius-md); padding: 7px 12px;
    color: var(--text-primary); font-family: 'Barlow', sans-serif; font-size: 13px;
    outline: none; color-scheme: dark;
  }
}
```

---

### 4.3 Orders (`/folder/orders` + `/folder/orders/view/:id`)

**orders.page.html:**
```html
<ion-header><!-- toolbar: "Order Management" title + refresh icon + export button --></ion-header>
<ion-content class="page-root">
  <div class="page-content">

    <div class="page-header animate-in">
      <div>
        <h2 class="page-title">Order Management</h2>
        <p class="page-subtitle">{{ totalOrders }} total orders</p>
      </div>
      <div class="page-actions">
        <button class="de-btn de-btn--ghost de-btn--sm" (click)="refresh()">
          <ion-icon name="refresh-outline"></ion-icon> Refresh
        </button>
        <button class="de-btn de-btn--primary de-btn--sm" (click)="exportXlsx()">
          <ion-icon name="download-outline"></ion-icon> Export
        </button>
      </div>
    </div>

    <div class="de-table-wrap animate-in animate-in-delay-1">

      <!-- Table toolbar -->
      <div class="de-table-toolbar">
        <div class="de-search">
          <ion-icon name="search-outline"></ion-icon>
          <input placeholder="Search order ID, customer..." [(ngModel)]="searchQuery" (ngModelChange)="onSearch()" />
        </div>

        <!-- Status filter chips -->
        <div class="de-filter-chips">
          <button class="de-chip-filter" [class.active]="statusFilter === null" (click)="setStatusFilter(null)">All</button>
          <button *ngFor="let s of statuses" class="de-chip-filter" [class.active]="statusFilter === s.code" (click)="setStatusFilter(s.code)">
            {{ s.shortLabel }}
          </button>
        </div>

        <!-- Date range -->
        <div class="de-date-range">
          <input type="date" [(ngModel)]="dateFrom" placeholder="From" />
          <span>—</span>
          <input type="date" [(ngModel)]="dateTo" placeholder="To" (change)="applyDateFilter()" />
        </div>
      </div>

      <!-- Table -->
      <table class="de-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Partner</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date/Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders" (click)="viewOrder(order.id)">
            <td><span class="font-mono text-accent">#{{ order.id }}</span></td>
            <td>
              <div class="de-table-user">
                <span class="de-table-user__name">{{ order.customerName }}</span>
                <span class="de-table-user__sub font-mono">{{ order.customerPhone }}</span>
              </div>
            </td>
            <td>{{ order.hotelName }}</td>
            <td><strong>₹{{ order.total | number:'1.2-2' }}</strong></td>
            <td><span class="de-chip de-chip--{{ order.paymentMode | lowercase }}">{{ order.paymentMode }}</span></td>
            <td>
              <span class="de-chip de-chip--{{ order.statusClass }}">
                <ion-icon [name]="order.statusIcon"></ion-icon>
                {{ order.statusLabel }}
              </span>
            </td>
            <td class="text-muted text-sm">{{ order.createdAt | date:'dd MMM, h:mm a' }}</td>
            <td (click)="$event.stopPropagation()">
              <div class="de-table-actions">
                <button *ngIf="order.canAccept" class="de-btn de-btn--sm" style="background:rgba(45,211,111,0.15);color:#2dd36f;border:1px solid rgba(45,211,111,0.25)" (click)="accept(order.id)">Accept</button>
                <button *ngIf="order.canReject" class="de-btn de-btn--danger de-btn--sm" (click)="reject(order.id)">Reject</button>
                <button *ngIf="order.canAssign" class="de-btn de-btn--ghost de-btn--sm" (click)="assignDriver(order)">
                  <ion-icon name="bicycle-outline"></ion-icon> Assign
                </button>
                <button class="de-btn de-btn--ghost de-btn--icon" (click)="viewOrder(order.id)">
                  <ion-icon name="eye-outline"></ion-icon>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="de-pagination">
        <span class="text-muted text-sm">Showing {{ paginationInfo }}</span>
        <div class="de-pagination__controls">
          <button class="de-btn de-btn--ghost de-btn--sm" [disabled]="page <= 1" (click)="prevPage()">← Prev</button>
          <span class="de-pagination__page">{{ page }}</span>
          <button class="de-btn de-btn--ghost de-btn--sm" [disabled]="!hasNextPage" (click)="nextPage()">Next →</button>
        </div>
      </div>

    </div>
  </div>
</ion-content>
```

**Order detail page (`orders/view/:id`):**

```html
<ion-header><!-- toolbar: "Order #ID" back button --></ion-header>
<ion-content class="page-root">
  <div class="page-content">

    <!-- Top: Status timeline -->
    <div class="de-card order-timeline animate-in">
      <div class="order-timeline__step" *ngFor="let step of statusTimeline" [class.done]="step.done" [class.active]="step.active">
        <div class="order-timeline__dot">
          <ion-icon [name]="step.icon"></ion-icon>
        </div>
        <div class="order-timeline__label">{{ step.label }}</div>
        <div class="order-timeline__time" *ngIf="step.time">{{ step.time | date:'h:mm a' }}</div>
      </div>
    </div>

    <div class="order-detail-grid animate-in animate-in-delay-1">

      <!-- Left column: Info cards -->
      <div class="order-detail-col">

        <!-- Customer card -->
        <div class="de-card order-info-card">
          <div class="order-info-card__header">
            <ion-icon name="person-outline"></ion-icon> Customer
          </div>
          <div class="order-info-card__body">
            <div class="order-info-row"><span>Name</span><strong>{{ order.customerName }}</strong></div>
            <div class="order-info-row"><span>Phone</span><span class="font-mono">{{ order.customerPhone }}</span></div>
            <div class="order-info-row"><span>Address</span><span>{{ order.deliveryAddress }}</span></div>
          </div>
          <div class="order-info-card__footer">
            <button class="de-btn de-btn--ghost de-btn--sm" (click)="viewCustomer(order.customerId)">
              View Profile →
            </button>
          </div>
        </div>

        <!-- Partner card -->
        <div class="de-card order-info-card">
          <div class="order-info-card__header">
            <ion-icon name="storefront-outline"></ion-icon> Partner
          </div>
          <!-- similar structure -->
          <div class="order-info-card__footer">
            <button class="de-btn de-btn--ghost de-btn--sm" (click)="viewPartner(order.partnerId)">View Partner →</button>
          </div>
        </div>

        <!-- Delivery boy card (if assigned) -->
        <div class="de-card order-info-card" *ngIf="order.driverId">
          <div class="order-info-card__header">
            <ion-icon name="bicycle-outline"></ion-icon> Delivery Driver
          </div>
          <!-- driver info -->
        </div>

      </div>

      <!-- Right column: Line items + pricing -->
      <div class="order-detail-col">
        <div class="de-card">
          <div class="order-items-header">Order Items</div>
          <table class="de-table">
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
            <tbody>
              <tr *ngFor="let item of order.items">
                <td>
                  <div style="font-weight:500">{{ item.name }}</div>
                  <div class="text-muted text-xs">{{ item.category }}</div>
                </td>
                <td>× {{ item.qty }}</td>
                <td>₹{{ item.price }}</td>
                <td><strong>₹{{ item.qty * item.price }}</strong></td>
              </tr>
            </tbody>
          </table>

          <!-- Price breakdown -->
          <div class="order-price-summary">
            <div class="order-price-row"><span>Subtotal</span><span>₹{{ order.subtotal }}</span></div>
            <div class="order-price-row"><span>Platform fee</span><span>₹{{ order.platformFee }}</span></div>
            <div class="order-price-row"><span>Delivery charge</span><span>₹{{ order.deliveryCharge }}</span></div>
            <div class="order-price-row"><span>GST</span><span>₹{{ order.gst }}</span></div>
            <div class="order-price-row order-price-row--total"><span>Total</span><span>₹{{ order.total }}</span></div>
          </div>

          <!-- Earnings split -->
          <div class="order-earnings-split">
            <div class="order-earnings-item partner">
              <span class="label">Partner Earnings</span>
              <span class="value">₹{{ order.partnerEarnings }}</span>
            </div>
            <div class="order-earnings-item admin">
              <span class="label">Admin Earnings</span>
              <span class="value">₹{{ order.adminEarnings }}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</ion-content>
```

**orders.page.scss:**
```scss
.de-filter-chips {
  display: flex; gap: 4px; flex-wrap: wrap;
}

.de-chip-filter {
  padding: 5px 12px; font-size: 11px; font-weight: 600;
  background: transparent; border: 1px solid var(--card-border);
  border-radius: var(--radius-full); color: var(--text-muted);
  cursor: pointer; transition: all var(--transition-fast);
  &.active { background: var(--brand-primary); border-color: var(--brand-primary); color: #fff; }
  &:hover:not(.active) { border-color: var(--text-muted); color: var(--text-primary); }
}

.de-date-range {
  display: flex; align-items: center; gap: 8px;
  input[type=date] {
    background: var(--input-bg); border: 1px solid var(--input-border);
    border-radius: var(--radius-md); padding: 6px 10px;
    color: var(--text-primary); font-family: 'Barlow', sans-serif;
    font-size: 12px; outline: none; color-scheme: dark;
    &:focus { border-color: var(--brand-primary); }
  }
  span { color: var(--text-muted); font-size: 12px; }
}

.de-table-user {
  &__name { display: block; font-weight: 500; font-size: 13px; }
  &__sub   { display: block; font-size: 11px; color: var(--text-muted); }
}

.de-table-actions {
  display: flex; gap: 6px; align-items: center; flex-wrap: nowrap;
}

.de-pagination {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px;
  border-top: 1px solid var(--table-border);
  &__controls { display: flex; align-items: center; gap: 12px; }
  &__page { font-size: 13px; font-weight: 600; color: var(--text-primary); min-width: 24px; text-align: center; }
}

/* Order detail */
.order-timeline {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 32px; margin-bottom: 20px; position: relative;
  &::before {
    content: ''; position: absolute;
    top: 50%; left: 32px; right: 32px;
    height: 2px; background: var(--table-border);
    transform: translateY(-50%); z-index: 0;
  }
  &__step {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    position: relative; z-index: 1;
    &.done .order-timeline__dot { background: var(--ion-color-success); border-color: var(--ion-color-success); }
    &.active .order-timeline__dot { background: var(--brand-primary); border-color: var(--brand-primary); box-shadow: var(--glow-primary); }
  }
  &__dot {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--card-bg); border: 2px solid var(--card-border);
    display: flex; align-items: center; justify-content: center;
    ion-icon { font-size: 16px; }
  }
  &__label { font-size: 11px; font-weight: 600; color: var(--text-secondary); text-align: center; }
  &__time  { font-size: 10px; color: var(--text-muted); }
}

.order-detail-grid {
  display: grid; grid-template-columns: 340px 1fr; gap: 20px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
}

.order-detail-col { display: flex; flex-direction: column; gap: 16px; }

.order-info-card {
  padding: 0;
  &__header {
    display: flex; align-items: center; gap: 8px;
    padding: 16px 20px; border-bottom: 1px solid var(--card-border);
    font-size: 13px; font-weight: 700; color: var(--text-primary);
    ion-icon { font-size: 16px; color: var(--brand-primary); }
  }
  &__body { padding: 16px 20px; display: flex; flex-direction: column; gap: 10px; }
  &__footer { padding: 12px 20px; border-top: 1px solid var(--card-border); }
}

.order-info-row {
  display: flex; justify-content: space-between; gap: 16px;
  font-size: 13px;
  span:first-child { color: var(--text-muted); flex-shrink: 0; }
  strong, span:last-child { color: var(--text-primary); text-align: right; }
}

.order-price-summary {
  padding: 16px 20px; border-top: 1px solid var(--table-border);
  display: flex; flex-direction: column; gap: 8px;
}
.order-price-row {
  display: flex; justify-content: space-between; font-size: 13px;
  span:first-child { color: var(--text-muted); }
  &--total {
    padding-top: 10px; margin-top: 4px; border-top: 1px solid var(--table-border);
    font-size: 16px; font-weight: 700; color: var(--text-primary) !important;
    span { color: var(--text-primary) !important; }
  }
}

.order-earnings-split {
  display: grid; grid-template-columns: 1fr 1fr;
  padding: 16px 20px; gap: 12px; border-top: 1px solid var(--table-border);
}
.order-earnings-item {
  background: var(--table-header-bg); border-radius: var(--radius-md); padding: 12px;
  &.partner { border-left: 3px solid var(--ion-color-secondary); }
  &.admin   { border-left: 3px solid var(--brand-primary); }
  .label { display: block; font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .value { font-size: 18px; font-weight: 700; font-family: 'Barlow Condensed', sans-serif; color: var(--text-primary); }
}

.order-items-header {
  padding: 16px 20px; font-size: 14px; font-weight: 700;
  border-bottom: 1px solid var(--table-border);
}
```

---

### 4.4 Partners (`/folder/partners` + sub-routes)

**Pattern:** Same table layout as Orders. Key differences:

- Table columns: Partner Name, Email, Phone, Hotels count, Status (online/offline toggle), Actions (View, Dishes, Settle, Delete)
- **Toggle online/offline** → `ion-toggle` inline in the table row, styled with brand primary when active
- **Register button** in page-header actions area
- Sub-pages follow same card/form pattern

**partners.page.scss additions:**
```scss
.de-toggle {
  --track-background: rgba(255,255,255,0.1);
  --track-background-checked: rgba(255,76,90,0.3);
  --handle-background: #6b7280;
  --handle-background-checked: var(--brand-primary);
}

.hotel-list { /* inside partner detail */
  display: flex; flex-direction: column; gap: 8px;
}
.hotel-card {
  background: var(--table-header-bg);
  border-radius: var(--radius-lg); padding: 14px 16px;
  display: flex; align-items: center; justify-content: space-between;
  &__name { font-weight: 600; font-size: 14px; }
  &__meta { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
}
```

**Map page (`/folder/partners/map/:id`):**
- Toolbar: "Set Business Location"
- Full-height Google Map (`height: calc(100vh - 56px)`)
- Floating bottom panel (dark card): current address, "Use this location" primary button
- Map style: dark map tiles (Google Maps dark theme via `styles` option)
- Marker: custom red SVG pin

**Add Hotel page (`/folder/partners/hotels/...`):**
- Two-column form layout: left = text fields, right = image upload + category multi-select
- Image upload: dashed border drop zone (`border: 2px dashed var(--card-border)`), preview thumbnail
- Category multi-select: custom chip-based multi-select component

**Bulk Add Dishes (`/folder/partners/dish/:id`):**
- Scrollable table form: each row is an editable dish entry
- Floating "Add Row" FAB at bottom-right
- Row fields: category dropdown, name input, veg/non-veg toggle (green/red chip), price inputs, stock input, image mini-upload, delete row button
- "Save All" primary button in toolbar

**Settlements (`/folder/partners/settle/:id`):**
- Summary cards at top (total owed, total settled)
- Table: order ID, date, amount, partner portion, admin portion, settled checkbox
- Bulk select + "Mark Paid" batch action bar that appears when rows selected

---

### 4.5 Customers (`/folder/customer` + view)

**customers.page.html:**
- Table: avatar (initials-based), name, email, phone, status chip (active/blocked), joined date, actions (view, block/unblock)
- **Status segment** at top of table: All / Active / Blocked — styled as chip group (not `ion-segment`)
- Block action: shows inline confirmation tooltip before API call
- Customer detail: profile card (large initials avatar + details), account status timeline

**customer.page.scss:**
```scss
.de-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,76,90,0.15); color: var(--brand-primary);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; flex-shrink: 0;
}

.status-segment {
  display: flex; gap: 4px;
  button {
    padding: 6px 16px; font-size: 12px; font-weight: 600;
    border-radius: var(--radius-full); border: 1px solid var(--card-border);
    background: transparent; color: var(--text-muted); cursor: pointer;
    &.active { background: var(--brand-primary); border-color: var(--brand-primary); color: #fff; }
  }
}
```

---

### 4.6 Delivery Boys (`/folder/delivery-boy` + add/view)

**delivery-boy.page.html:**
- Table: avatar, name, phone, city, blood group chip, status, earnings, actions
- Register route: multi-section form card:
  - Section 1: Personal (name, DOB, blood group)
  - Section 2: Contact (phone, city, address)
  - Section 3: Languages (tag input)
  - Section 4: Photo upload
- Detail page: profile hero section (large avatar + key stats in a row) + tabbed content (earnings, settlements)

**Blood group chip:**
```scss
.de-blood-chip {
  display: inline-flex; padding: 2px 8px; border-radius: var(--radius-full);
  font-size: 11px; font-weight: 700;
  background: rgba(235,68,90,0.15); color: #eb445a;
  border: 1px solid rgba(235,68,90,0.25);
}
```

---

### 4.7 Categories (`/folder/category`)

**Layout:** Card grid (not table) — each category is a card with image + name + edit/delete actions.

```scss
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.category-card {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--radius-xl); overflow: hidden;
  cursor: pointer; transition: all var(--transition-base);

  &:hover { border-color: var(--card-hover-border); transform: translateY(-3px); }

  &__image {
    width: 100%; aspect-ratio: 1/1; object-fit: cover;
    background: var(--table-header-bg);
  }

  &__body {
    padding: 12px;
    display: flex; align-items: center; justify-content: space-between;
  }

  &__name { font-size: 13px; font-weight: 600; color: var(--text-primary); }

  &__actions {
    display: flex; gap: 4px;
    ion-icon { font-size: 16px; color: var(--text-muted); cursor: pointer;
      &:hover { color: var(--text-primary); }
    }
  }
}

/* Add category FAB */
.de-fab {
  position: fixed; bottom: 28px; right: 28px;
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--brand-primary); color: #fff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--glow-primary), var(--shadow-lg);
  cursor: pointer; border: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-base);
  &:hover { transform: scale(1.08); }
  &:active { transform: scale(0.95); }
  ion-icon { font-size: 24px; }
}
```

**Add Category Modal:**
- Name input + image upload dropzone
- Image preview (circle, 120px, matching food icon style)

---

### 4.8 Promo Codes (`/folder/promo-code`)

**Table columns:** Code (monospaced badge), Type, Discount (chip), Min Order, Expiry, Actions (send notification, delete)

```scss
.promo-code-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; font-weight: 600;
  background: rgba(82,96,255,0.15); color: #5260ff;
  padding: 3px 10px; border-radius: var(--radius-md);
  letter-spacing: 1px;
}

.discount-chip {
  &--percent { background: rgba(45,211,111,0.15); color: #2dd36f; }
  &--flat    { background: rgba(255,196,9,0.15); color: #ffc409; }
}
```

**Add Promo Modal:** Two-column form — left: code, name, type, value; right: min order, expiry, description.

**Notification picker:** Searchable customer list modal with send button.

---

### 4.9 Banners (`/folder/banner`)

**Layout:** Tabbed by placement type (Home / Cart / Favorites / Profile) using chip tab group.

```scss
.banner-tabs {
  display: flex; gap: 8px; margin-bottom: 24px;
  button {
    padding: 8px 20px; font-size: 13px; font-weight: 600;
    border-radius: var(--radius-md); border: 1px solid var(--card-border);
    background: transparent; color: var(--text-muted); cursor: pointer;
    &.active { background: var(--brand-primary); border-color: var(--brand-primary); color: #fff; }
  }
}

.banner-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;
}

.banner-card {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--radius-xl); overflow: hidden;

  &__image {
    width: 100%; height: 140px; object-fit: cover; cursor: zoom-in;
    background: var(--table-header-bg);
    transition: opacity var(--transition-base);
    &:hover { opacity: 0.85; }
  }

  &__footer {
    padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--card-border);
  }

  &__type { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.6px; }
}
```

- Upload zone: large dashed card with icon + "Drag image or click to upload"
- Full-screen preview modal: image fills modal, dark overlay, close X button

---

### 4.10 Chat (`/folder/chat`)

**Layout:** Two-panel: left = chat list (320px), right = message thread.

```scss
.chat-root { display: flex; height: calc(100vh - 56px); overflow: hidden; }

.chat-list {
  width: 300px; flex-shrink: 0;
  border-right: 1px solid var(--card-border);
  display: flex; flex-direction: column;
  background: var(--sidebar-bg);

  &__header { padding: 16px; border-bottom: 1px solid var(--card-border); }

  &__item {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px; cursor: pointer;
    border-bottom: 1px solid var(--table-border);
    transition: background var(--transition-fast);
    &:hover, &.active { background: rgba(255,76,90,0.06); }
    &.active { border-right: 2px solid var(--brand-primary); }
  }
}

.chat-thread {
  flex: 1; display: flex; flex-direction: column; overflow: hidden;

  &__messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }

  &__input-bar {
    display: flex; gap: 10px; padding: 16px;
    border-top: 1px solid var(--card-border); background: var(--toolbar-bg);
    input {
      flex: 1; background: var(--input-bg); border: 1px solid var(--input-border);
      border-radius: var(--radius-full); padding: 10px 16px;
      color: var(--text-primary); font-family: 'Barlow', sans-serif; font-size: 14px;
      outline: none; &:focus { border-color: var(--brand-primary); }
    }
    button {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--brand-primary); color: #fff; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }
  }
}

.chat-msg {
  max-width: 70%; padding: 10px 14px; border-radius: var(--radius-lg);
  font-size: 13px; line-height: 1.5;
  &--admin { align-self: flex-end; background: var(--brand-primary); color: #fff; border-bottom-right-radius: 4px; }
  &--user  { align-self: flex-start; background: var(--card-bg); border: 1px solid var(--card-border); border-bottom-left-radius: 4px; }
  &__time  { font-size: 10px; color: rgba(255,255,255,0.6); margin-top: 4px; display: block; text-align: right; }
}
```

---

### 4.11 Settings (`/folder/settings`)

**Layout:** Multi-section form with collapsible section cards.

```html
<!-- Each settings section: -->
<div class="de-card settings-section">
  <div class="settings-section__header" (click)="toggle('delivery')">
    <div class="settings-section__title">
      <ion-icon name="car-outline"></ion-icon>
      Delivery Charges
    </div>
    <ion-icon [name]="expanded.delivery ? 'chevron-up' : 'chevron-down'"></ion-icon>
  </div>
  <div class="settings-section__body" *ngIf="expanded.delivery" [@expandCollapse]>
    <!-- Distance tier cards (3 tiers in grid) -->
    <div class="delivery-tier-grid">
      <div class="delivery-tier" *ngFor="let tier of deliveryTiers; let i = index">
        <div class="delivery-tier__label">Range {{ i+1 }}</div>
        <div class="de-field"><label>Min KM</label><input type="number" [(ngModel)]="tier.minKm" /></div>
        <div class="de-field"><label>Max KM</label><input type="number" [(ngModel)]="tier.maxKm" /></div>
        <div class="de-field"><label>Price (₹)</label><input type="number" [(ngModel)]="tier.price" /></div>
      </div>
    </div>
  </div>
</div>
```

```scss
.settings-section {
  margin-bottom: 16px;
  &__header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 20px; cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: border-color var(--transition-fast);
    &:hover { border-bottom-color: var(--card-border); }
    ion-icon:last-child { color: var(--text-muted); }
  }
  &__title {
    display: flex; align-items: center; gap: 10px;
    font-size: 15px; font-weight: 700;
    ion-icon { color: var(--brand-primary); font-size: 18px; }
  }
  &__body { padding: 20px; border-top: 1px solid var(--card-border); }
}

.delivery-tier-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.delivery-tier {
  background: var(--table-header-bg); border-radius: var(--radius-lg); padding: 16px;
  &__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: var(--brand-primary); margin-bottom: 12px; }
}
```

---

### 4.12 Pincode Setup (`/folder/pincode`)

**Layout:** Search bar + card grid of pincodes (not table).

```scss
.pincode-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px;
}

.pincode-card {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--radius-xl); padding: 18px;
  transition: all var(--transition-base);
  &:hover { border-color: var(--card-hover-border); transform: translateY(-2px); }

  &__pin {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 700; color: var(--brand-primary); margin-bottom: 4px;
  }
  &__address { font-size: 12px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.4; }
  &__coords {
    font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--text-muted);
    background: var(--table-header-bg); border-radius: var(--radius-sm);
    padding: 4px 8px; display: inline-block; margin-bottom: 12px;
  }
  &__actions { display: flex; gap: 6px; }
}
```

---

### 4.13 Stub Screens (Phase 2)

For Reviews, Notifications, and Messages, render a **consistent "coming soon" state:**

```html
<ion-content class="page-root">
  <div class="page-content">
    <div class="page-header">
      <div><h2 class="page-title">{{ pageTitle }}</h2></div>
    </div>
    <div class="de-card" style="padding: 80px 40px; text-align: center">
      <div style="width:72px;height:72px;background:rgba(255,76,90,0.1);border-radius:var(--radius-2xl);display:flex;align-items:center;justify-content:center;margin:0 auto 24px">
        <ion-icon [name]="pageIcon" style="font-size:32px;color:var(--brand-primary)"></ion-icon>
      </div>
      <h3 style="font-size:20px;font-weight:700;color:var(--text-primary);margin-bottom:8px">Coming Soon</h3>
      <p style="font-size:14px;color:var(--text-muted);max-width:320px;margin:0 auto">This module is under development and will be available in the next release.</p>
      <div style="margin-top:24px;display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:rgba(255,76,90,0.1);border-radius:var(--radius-full);font-size:12px;font-weight:600;color:var(--brand-primary)">
        Phase 2
      </div>
    </div>
  </div>
</ion-content>
```

---

## 5. Additional UX Patterns

### 5.1 Toast notifications

Replace `ion-toast` defaults:

```typescript
// In any page, inject ToastController and use:
const toast = await this.toastController.create({
  message: 'Order accepted successfully',
  duration: 3000,
  position: 'bottom',
  cssClass: 'de-toast de-toast--success',
  icon: 'checkmark-circle-outline',
  buttons: [{ icon: 'close', role: 'cancel' }]
});
```

```scss
.de-toast {
  --background: var(--card-bg);
  --color: var(--text-primary);
  --border-radius: var(--radius-lg);
  --box-shadow: var(--shadow-lg), 0 0 0 1px var(--card-border);
  --start: 20px; --end: 20px;

  &--success { --background: #1a2e22; --color: #2dd36f; box-shadow: 0 0 0 1px rgba(45,211,111,0.25); }
  &--danger  { --background: #2e1a1e; --color: #eb445a; box-shadow: 0 0 0 1px rgba(235,68,90,0.25); }
  &--warning { --background: #2e2614; --color: #ffc409; box-shadow: 0 0 0 1px rgba(255,196,9,0.25); }
}
```

### 5.2 Loading / skeleton states

For any list page, while data is loading show skeleton rows:

```html
<ng-container *ngIf="loading">
  <tr *ngFor="let i of [1,2,3,4,5]">
    <td><div class="skeleton" style="height:14px;width:80px"></div></td>
    <td><div class="skeleton" style="height:14px;width:140px"></div></td>
    <td><div class="skeleton" style="height:14px;width:100px"></div></td>
    <td><div class="skeleton" style="height:20px;width:60px;border-radius:99px"></div></td>
    <td><div class="skeleton" style="height:28px;width:80px;border-radius:6px"></div></td>
  </tr>
</ng-container>
```

### 5.3 Confirm action dialog

Replace native confirms with a custom `ion-alert`:

```typescript
const alert = await this.alertController.create({
  header: 'Confirm Action',
  message: 'Are you sure you want to delete this item?',
  cssClass: 'de-alert',
  buttons: [
    { text: 'Cancel', role: 'cancel', cssClass: 'de-alert__cancel' },
    { text: 'Delete', role: 'confirm', cssClass: 'de-alert__confirm' }
  ]
});
```

```scss
.de-alert {
  --background: var(--card-bg);
  --backdrop-opacity: 0.7;
  .alert-title { color: var(--text-primary) !important; font-family: 'Barlow', sans-serif !important; font-weight: 700 !important; }
  .alert-message { color: var(--text-muted) !important; font-family: 'Barlow', sans-serif !important; }
  .alert-button-group { border-top: 1px solid var(--card-border) !important; }
  .de-alert__confirm { color: var(--ion-color-danger) !important; font-weight: 700 !important; }
  .de-alert__cancel  { color: var(--text-muted) !important; }
}
```

### 5.4 Image upload drop zone

```scss
.de-upload-zone {
  border: 2px dashed var(--card-border);
  border-radius: var(--radius-xl); padding: 40px 20px;
  text-align: center; cursor: pointer;
  transition: all var(--transition-base);
  display: flex; flex-direction: column; align-items: center; gap: 12px;

  &:hover, &.drag-over {
    border-color: var(--brand-primary);
    background: rgba(255,76,90,0.04);
  }

  ion-icon { font-size: 36px; color: var(--text-muted); }
  .upload-label { font-size: 14px; font-weight: 600; color: var(--text-secondary); }
  .upload-sub { font-size: 12px; color: var(--text-muted); }
}
```

---

## 6. Responsive Breakpoints

```scss
/* Breakpoints */
$bp-sm:   480px;
$bp-md:   768px;
$bp-lg:   1024px;
$bp-xl:   1280px;
$bp-2xl:  1440px;

/* On mobile (< 768px): */
/* - Sidebar collapses to overlay */
/* - All grids go single column */
/* - Table horizontal scroll: .de-table-wrap { overflow-x: auto } */
/* - page-content padding: 16px */
/* - page-header: stacks vertically, actions below title */

@media (max-width: 768px) {
  .page-content { padding: var(--space-4); }
  .page-header { flex-direction: column; align-items: flex-start; gap: var(--space-3); }
  .de-table-wrap { overflow-x: auto; }
  .de-table { min-width: 700px; }
  .de-table-toolbar { flex-direction: column; align-items: stretch; }
  .de-search { min-width: unset; }
}
```

---

## 7. Implementation Checklist

Complete in this order:

1. `src/theme/variables.scss` — replace all tokens (Section 1.1)
2. `src/global.scss` — typography + global component styles (Sections 1.2, 2.1–2.11)
3. `app.component.html` + `app.component.scss` — sidebar (Section 3)
4. `login.page` — full redesign (Section 4.1)
5. `dash.page` — layout + Chart.js dark theme (Section 4.2)
6. `orders.page` + `orders/view` (Section 4.3)
7. `partners.page` + all sub-routes (Section 4.4)
8. `customer.page` + view (Section 4.5)
9. `delivery-boy.page` + add/view (Section 4.6)
10. `category.page` (Section 4.7)
11. `promo-code.page` + add/notification (Section 4.8)
12. `banner.page` (Section 4.9)
13. `chat.page` (Section 4.10)
14. `settings.page` (Section 4.11)
15. `pincode.page` (Section 4.12)
16. Stub screens: reviews, notifications, messages (Section 4.13)
17. Toast, loading skeletons, confirm dialogs, upload zones (Section 5)
18. Responsive overrides (Section 6)

---

## 8. Key Design Decisions Summary

| Decision | Value |
|---|---|
| Theme | Dark — deep navy shell (#0f1117 / #13161f) |
| Brand accent | #FF4C5A (unifies logo + UI) |
| Font | Barlow (UI) + Barlow Condensed (stats/numbers) + JetBrains Mono (IDs/codes) |
| List pattern | Dark data table with `de-table` class, not `ion-list` |
| Category/Pincode | Card grid, not table |
| Status badges | Custom `.de-chip` with per-status bg/text vars |
| Charts | Chart.js with dark theme, red gradient fills, no legend |
| Modals | Custom styled `ion-modal` with `.de-modal` class |
| Forms | Dark input bg, stacked labels, red focus ring |
| Motion | `fadeInUp` stagger on page entry, `transition` on hover/active |
| Alerts | Custom styled `ion-alert` via CSS class |
| No Bootstrap | Login rebuilt entirely in Ionic/CSS |
| No dark-mode toggle | Light mode meta removed; full dark only |
| Stub screens | Consistent "Phase 2" placeholder card |

---

*This prompt covers 100% of DropEat Admin's 31 pages + components. Every visual decision maps directly to the existing Ionic 7 / Angular 17 architecture — no routing or service changes required.*
