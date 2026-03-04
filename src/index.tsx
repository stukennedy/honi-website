import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { DocsLayout } from './docs/layout'
import { GettingStartedPage } from './docs/getting-started'
import { CreateAgentPage } from './docs/create-agent'
import { ToolsPage } from './docs/tools'
import { MemoryPage } from './docs/memory'
import { WorkflowsPage } from './docs/workflows'
import { ObservabilityPage } from './docs/observability'
import { CliPage } from './docs/cli'

const app = new Hono()

// ── Crystalline Amber CSS ──
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=JetBrains+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root {
  --bg: #080A0E;
  --surface: #0F1219;
  --border: #1E2433;
  --amber: #F59E0B;
  --amber-bright: #FCD34D;
  --amber-dim: #92400E;
  --text: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #475569;
  --blue: #60A5FA;
  --purple: #A78BFA;
  --green: #34D399;
  --heading: 'Bebas Neue', sans-serif;
  --ui: 'DM Mono', monospace;
  --body: 'DM Sans', sans-serif;
  --mono: 'JetBrains Mono', 'Fira Code', monospace;
}

html { scroll-behavior: smooth }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* ── Hex tessellation background ── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92.376'%3E%3Cpath d='M40 0 L80 23.094 L80 69.282 L40 92.376 L0 69.282 L0 23.094 Z' fill='none' stroke='%231E2433' stroke-width='0.5' opacity='0.4'/%3E%3C/svg%3E");
  background-size: 80px 92.376px;
}

/* ── Grain overlay ── */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
}

a { color: inherit; text-decoration: none }

/* Everything rendered needs z-index above bg */
nav, section, footer, .docs-topbar { position: relative; z-index: 2; }
.docs-shell { position: relative; z-index: 2; }

/* ── Nav ── */
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 0 32px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(8,10,14,0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-wordmark {
  font-family: var(--heading);
  font-size: 24px;
  letter-spacing: 0.15em;
  color: var(--text);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-family: var(--ui);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
}
.nav-link:hover { color: var(--amber) }

.npm-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--amber);
  background: transparent;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--amber);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  line-height: 1;
}
.npm-pill:hover {
  background: rgba(245,158,11,0.1);
}
.npm-pill .copy-icon {
  font-size: 14px;
  opacity: 0.7;
}

/* ── Container ── */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

/* ── Hero ── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0 80px;
  overflow: hidden;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.hero::before {
  content: '';
  position: absolute;
  top: 10%;
  right: 20%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 55% 45%;
  gap: 48px;
  align-items: center;
  width: 100%;
}

.hero-left {
  position: relative;
  z-index: 1;
}

.hero-label {
  font-family: var(--ui);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 24px;
}

.hero h1 {
  font-family: var(--heading);
  font-size: clamp(4rem, 10vw, 9rem);
  line-height: 0.95;
  letter-spacing: 0.02em;
  margin-bottom: 32px;
  color: var(--text);
}

.hero-rule {
  width: 120px;
  height: 2px;
  background: var(--amber);
  border: none;
  margin-bottom: 28px;
}

.hero .sub {
  font-family: var(--body);
  font-size: 18px;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 480px;
  margin-bottom: 40px;
}

.hero-ctas {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: var(--amber);
  color: #080A0E;
  font-family: var(--heading);
  font-size: 18px;
  letter-spacing: 0.08em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}
.btn-primary:hover { background: var(--amber-bright) }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: transparent;
  color: var(--amber);
  font-family: var(--heading);
  font-size: 18px;
  letter-spacing: 0.08em;
  border: 1px solid var(--amber);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
}
.btn-ghost:hover {
  background: rgba(245,158,11,0.1);
}

.hero-stats {
  display: flex;
  gap: 32px;
}

.hero-stat {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--ui);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.hex-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
}

/* ── Hero code block ── */
.hero-right {
  position: relative;
  z-index: 1;
}

.hero-code {
  transform: rotate(-1.5deg);
  border-radius: 12px;
  border-left: 3px solid var(--amber);
  background: #0A0C10;
  box-shadow: 0 0 60px rgba(245,158,11,0.15), 0 20px 60px rgba(0,0,0,0.4);
  overflow: hidden;
  max-width: 100%;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
  background: rgba(15,18,25,0.8);
}

.code-dots {
  display: flex;
  gap: 6px;
}
.code-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.code-lang {
  font-family: var(--ui);
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.code-body {
  padding: 24px;
  font-family: var(--mono);
  font-size: 13.5px;
  line-height: 1.75;
  overflow-x: auto;
  color: var(--text);
}

.code-body .line {
  display: flex;
  gap: 16px;
}

.code-body .line > span:last-child {
  white-space: pre;
}

.code-body .ln {
  color: var(--text-muted);
  user-select: none;
  text-align: right;
  min-width: 20px;
  opacity: 0.5;
}

.kw { color: var(--blue) }
.fn { color: var(--blue) }
.str { color: var(--amber) }
.cm { color: var(--text-muted); font-style: italic }
.pr { color: var(--text-secondary) }
.op { color: var(--text-secondary) }
.ty { color: var(--purple) }

/* ── Code window (reusable) ── */
.code-window {
  border-radius: 12px;
  border: 1px solid var(--border);
  background: #0A0C10;
  overflow: hidden;
  text-align: left;
  max-width: 100%;
}

/* ── Sections ── */
section { padding: 100px 0 }

.section-label {
  font-family: var(--ui);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 16px;
}

.section-title {
  font-family: var(--heading);
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: 0.02em;
  margin-bottom: 56px;
}

/* ── Punch Section ── */
.punch {
  text-align: center;
  padding: 140px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.punch::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92.376'%3E%3Cpath d='M40 0 L80 23.094 L80 69.282 L40 92.376 L0 69.282 L0 23.094 Z' fill='none' stroke='%231E2433' stroke-width='0.5' opacity='0.7'/%3E%3C/svg%3E");
  background-size: 80px 92.376px;
  pointer-events: none;
  z-index: 0;
}

.punch .container { position: relative; z-index: 1; }

.punch h2 {
  font-family: var(--heading);
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  line-height: 1.05;
  letter-spacing: 0.03em;
  margin-bottom: 28px;
}

.punch h2 .line-white { color: var(--text) }
.punch h2 .line-amber { color: var(--amber) }

.punch-rule {
  width: 200px;
  height: 2px;
  background: var(--amber);
  border: none;
  margin: 28px auto 0;
}

.punch p {
  font-family: var(--body);
  font-size: 18px;
  color: var(--text-secondary);
}

/* ── Feature Grid ── */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  padding: 32px 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  border-color: var(--amber);
  box-shadow: 0 0 30px rgba(245,158,11,0.08);
}

.feature-card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.feature-card h3 {
  font-family: var(--ui);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 500;
}

.feature-card p {
  font-family: var(--body);
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* ── Comparison Table ── */
.table-wrap {
  overflow-x: auto;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--surface);
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--body);
  font-size: 14px;
}

.compare-table th,
.compare-table td {
  padding: 16px 24px;
  text-align: center;
  border-bottom: 1px solid var(--border);
}

.compare-table th:first-child,
.compare-table td:first-child {
  text-align: left;
  color: var(--text-secondary);
  font-weight: 400;
}

.compare-table thead th {
  font-family: var(--ui);
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 18px 24px;
  background: var(--amber);
  color: #080A0E;
  border-bottom: none;
}

.compare-table thead th:first-child {
  color: #080A0E;
}

.compare-table tbody tr:last-child td {
  border-bottom: none;
}

.compare-table tbody tr {
  transition: background 0.15s;
}
.compare-table tbody tr:hover {
  background: #141824;
}

.check { color: var(--amber); }
.cross { color: var(--text-muted); }

/* ── Quick Start ── */
.quickstart-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.qs-steps {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.qs-step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.qs-num {
  font-family: var(--heading);
  font-size: 36px;
  color: var(--amber);
  line-height: 1;
  min-width: 36px;
}

.qs-step-content h4 {
  font-family: var(--ui);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

.qs-step-content p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.qs-step-content .qs-cmd {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 4px;
  background: #0A0C10;
  border: 1px solid var(--border);
  font-family: var(--mono);
  font-size: 13px;
  color: var(--amber);
  margin-top: 8px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.qs-step-content .qs-cmd:hover { border-color: var(--amber) }

/* ── Footer ── */
footer {
  padding: 48px 0;
  border-top: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92.376'%3E%3Cpath d='M40 0 L80 23.094 L80 69.282 L40 92.376 L0 69.282 L0 23.094 Z' fill='none' stroke='%231E2433' stroke-width='0.5' opacity='0.25'/%3E%3C/svg%3E");
  background-size: 80px 92.376px;
  pointer-events: none;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  font-family: var(--ui);
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  position: relative;
  z-index: 1;
}

.footer-wordmark {
  font-family: var(--heading);
  font-size: 18px;
  letter-spacing: 0.15em;
  color: var(--text-secondary);
}

.footer-inner a {
  color: var(--text-secondary);
  transition: color 0.2s;
}
.footer-inner a:hover { color: var(--amber) }

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .hero { min-height: auto; padding: 120px 0 80px }
  .hero-code { transform: none }
  .hero h1 { font-size: clamp(3rem, 12vw, 5rem) }
  .quickstart-grid { grid-template-columns: 1fr }
}

@media (max-width: 768px) {
  .feature-grid { grid-template-columns: 1fr }
  nav { padding: 0 16px }
  .container { padding: 0 20px }
  section { padding: 60px 0 }
  .punch { padding: 80px 0 }
  .hero { padding: 80px 0 60px }
  .hero h1 { font-size: clamp(3rem, 12vw, 5rem) }
  .hero .sub { font-size: 16px }
  .hero-ctas {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .hero-ctas a, .hero-ctas button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
  .hero-stats { flex-wrap: wrap; gap: 16px }
  .hero-stat { font-size: 11px }
  .section-title { margin-bottom: 32px }
  .compare-table { font-size: 12px }
  .compare-table th, .compare-table td { padding: 10px 14px }
  .npm-pill { display: none }
  .code-body { font-size: 12px; padding: 16px }
  .docs-code { max-width: 100%; overflow-x: auto }
}

@media (max-width: 480px) {
  .hero h1 { font-size: 2.8rem }
  .punch h2 { font-size: 2.2rem }
  .nav-right { gap: 12px }
  .nav-link { font-size: 11px }
  .container { padding: 0 16px }
}

/* ── Docs Layout ── */
.docs-topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(8,10,14,0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.docs-back {
  font-family: var(--ui);
  font-size: 12px;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  transition: color 0.2s;
}
.docs-back:hover { color: var(--amber) }

.docs-menu-btn {
  display: none;
  font-family: var(--ui);
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-secondary);
  cursor: pointer;
  letter-spacing: 0.05em;
}

.docs-shell {
  min-height: calc(100vh - 48px);
  margin-top: 48px;
  padding-left: 240px;
}

.docs-sidebar {
  position: fixed;
  top: 48px;
  left: 0;
  bottom: 0;
  width: 240px;
  overflow-y: auto;
  padding: 24px 20px;
  border-right: 1px solid var(--border);
  background: var(--bg);
}

.docs-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.docs-nav-heading {
  font-family: var(--ui);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--amber);
  margin-top: 20px;
  margin-bottom: 6px;
  padding-left: 10px;
}

.docs-nav-spacer { height: 12px }

.docs-sidebar-header {
  display: none;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.docs-sidebar-title {
  font-family: var(--ui);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}

.docs-close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
}
.docs-close-btn:hover { color: var(--text); background: var(--surface); }

.docs-nav-link {
  display: block;
  font-family: var(--body);
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 4px;
  color: var(--text-secondary);
  transition: color 0.15s, background 0.15s;
}
.docs-nav-link:hover {
  color: var(--text);
  background: var(--surface);
}
.docs-nav-link.active {
  color: var(--amber);
  background: rgba(245,158,11,0.1);
}

.docs-main {
  padding: 48px 56px 80px;
  max-width: 900px;
}

.docs-content h1 {
  font-family: var(--heading);
  font-size: 42px;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
}

.docs-lead {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
}

.docs-content h2 {
  font-family: var(--heading);
  font-size: 28px;
  letter-spacing: 0.02em;
  margin-top: 48px;
  margin-bottom: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.docs-content h2:first-of-type {
  border-top: none;
  padding-top: 0;
}

.docs-content h3 {
  font-family: var(--body);
  font-size: 17px;
  font-weight: 650;
  margin-top: 32px;
  margin-bottom: 12px;
}

.docs-content p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 16px;
}

.docs-content code {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--amber);
  background: rgba(245, 158, 11, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.docs-content .code-window code {
  background: none;
  padding: 0;
  color: inherit;
}

.docs-code {
  max-width: 100%;
  margin: 0 0 24px;
}

.docs-content ol,
.docs-content ul {
  margin-bottom: 16px;
  padding-left: 24px;
}

.docs-list {
  list-style: decimal;
  padding-left: 20px;
  margin-bottom: 24px;
}

.docs-list li {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 6px;
}

.docs-link {
  color: var(--amber) !important;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.docs-table-wrap {
  overflow-x: auto;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--surface);
  margin-bottom: 24px;
}

.docs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.docs-table th {
  text-align: left;
  font-family: var(--ui);
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  background: rgba(15,18,25,0.8);
}

.docs-table td {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
  vertical-align: top;
}

.docs-table tbody tr:last-child td {
  border-bottom: none;
}

.docs-table td strong {
  color: var(--text);
}

.docs-next {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.docs-next a {
  font-family: var(--ui);
  font-size: 14px;
  color: var(--amber);
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}
.docs-next a:hover { opacity: 0.8 }

@media (max-width: 768px) {
  .docs-menu-btn { display: flex; align-items: center; gap: 6px; }
  .docs-shell { padding-left: 0; }
  .docs-sidebar {
    display: none;
    position: fixed;
    top: 48px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 90;
    background: var(--bg);
    overflow-y: auto;
    padding: 24px 28px 80px;
    border-right: none;
  }
  .docs-sidebar.open { display: block }
  .docs-sidebar-header { display: flex }
  .docs-nav-heading { font-size: 12px; margin-top: 24px; }
  .docs-nav-link {
    font-size: 16px;
    padding: 14px 12px;
    border-bottom: 1px solid var(--border);
    border-radius: 0;
  }
  .docs-main {
    margin-left: 0;
    padding: 24px 20px 60px;
  }
  .docs-content h1 { font-size: 32px; margin-bottom: 8px }
  .docs-lead { margin-bottom: 24px }
  .docs-content h2 { margin-top: 32px; margin-bottom: 12px; padding-top: 16px }
  .docs-content h3 { margin-top: 24px }
}
`

// ── Inline hex SVG ──
const hexSvg = (size: number, color = '#F59E0B') => `
<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="20,2 36.66,11 36.66,29 20,38 3.34,29 3.34,11" fill="${color}" opacity="0.9"/>
</svg>
`

const hexIcon = (size: number) => `
<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="none" stroke="#F59E0B" stroke-width="2"/>
</svg>
`

const smallHex = `<svg width="8" height="9" viewBox="0 0 8 9" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg"><polygon points="4,0.5 7.5,2.5 7.5,6.5 4,8.5 0.5,6.5 0.5,2.5"/></svg>`

app.use(
  '*',
  jsxRenderer(({ children }) => (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Honi — Edge-first AI agents for Cloudflare Workers</title>
        <meta name="description" content="Build stateful, streaming AI agents backed by Durable Objects. No server. No Redis. No cold starts. Deploy globally in seconds." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{children}</body>
    </html>
  ))
)

app.get('/', (c) =>
  c.render(
    <>
      {/* ── Nav ── */}
      <nav>
        <a href="/" class="nav-left">
          <span dangerouslySetInnerHTML={{ __html: hexSvg(28) }} />
          <span class="nav-wordmark">HONI</span>
        </a>
        <div class="nav-right">
          <a href="/docs" class="nav-link">Docs</a>
          <a href="https://github.com/stukennedy/honi" target="_blank" rel="noopener" class="nav-link">GitHub</a>
          <button class="npm-pill" id="npm-copy" type="button">
            <span>npm install honi-cf</span>
            <span class="copy-icon" id="copy-icon">&#x2398;</span>
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section class="hero">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-left">
              <div class="hero-label">Cloudflare Workers × Durable Objects</div>
              <h1>
                EDGE-FIRST<br />AI AGENTS
              </h1>
              <hr class="hero-rule" />
              <p class="sub">
                Build stateful, streaming agents backed by Durable Objects. No server. No Redis. No cold starts.
              </p>
              <div class="hero-ctas">
                <a href="/docs/getting-started" class="btn-primary">GET STARTED →</a>
                <a href="https://github.com/stukennedy/honi" target="_blank" rel="noopener" class="btn-ghost">GITHUB ↗</a>
              </div>
              <div class="hero-stats">
                <div class="hero-stat">
                  <span dangerouslySetInnerHTML={{ __html: smallHex }} />
                  <span>5 PHASES</span>
                </div>
                <div class="hero-stat">
                  <span dangerouslySetInnerHTML={{ __html: smallHex }} />
                  <span>3 MEMORY TIERS</span>
                </div>
                <div class="hero-stat">
                  <span dangerouslySetInnerHTML={{ __html: smallHex }} />
                  <span>EDGE-NATIVE</span>
                </div>
              </div>
            </div>

            <div class="hero-right">
              <div class="hero-code">
                <div class="code-header">
                  <div class="code-dots"><span /><span /><span /></div>
                  <span class="code-lang">TypeScript</span>
                </div>
                <div class="code-body">
                  <div class="line"><span class="ln">1</span><span><span class="kw">import</span> {'{'} <span class="fn">createAgent</span> {'}'} <span class="kw">from</span> <span class="str">'honi'</span></span></div>
                  <div class="line"><span class="ln">2</span><span></span></div>
                  <div class="line"><span class="ln">3</span><span><span class="kw">export const</span> <span class="fn">agent</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}
                  </span></div>
                  <div class="line"><span class="ln">4</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'support-bot'</span><span class="op">,</span></span></div>
                  <div class="line"><span class="ln">5</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-20250514'</span><span class="op">,</span></span></div>
                  <div class="line"><span class="ln">6</span><span>  <span class="pr">memory</span><span class="op">:</span> <span class="str">'tiered'</span><span class="op">,</span>  <span class="cm">{'// DO + D1 + Vectorize'}</span></span></div>
                  <div class="line"><span class="ln">7</span><span></span></div>
                  <div class="line"><span class="ln">8</span><span>  <span class="fn">tools</span><span class="op">:</span> {'{'}</span></div>
                  <div class="line"><span class="ln">9</span><span>    <span class="fn">lookupOrder</span><span class="op">:</span> {'{'}</span></div>
                  <div class="line"><span class="ln">10</span><span>      <span class="pr">description</span><span class="op">:</span> <span class="str">'Look up a customer order'</span><span class="op">,</span></span></div>
                  <div class="line"><span class="ln">11</span><span>      <span class="pr">input</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">object</span>({'{'} <span class="pr">orderId</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>() {'}'})<span class="op">,</span></span></div>
                  <div class="line"><span class="ln">12</span><span>      <span class="kw">async</span> <span class="fn">run</span>({'{'} <span class="pr">orderId</span> {'}'}) {'{'}</span></div>
                  <div class="line"><span class="ln">13</span><span>        <span class="kw">return</span> <span class="fn">db</span>.<span class="fn">query</span>(<span class="str">`SELECT * FROM orders WHERE id = ?`</span><span class="op">,</span> <span class="pr">orderId</span>)</span></div>
                  <div class="line"><span class="ln">14</span><span>      {'}'}</span></div>
                  <div class="line"><span class="ln">15</span><span>    {'}'}</span></div>
                  <div class="line"><span class="ln">16</span><span>  {'}'}</span></div>
                  <div class="line"><span class="ln">17</span><span>{'}'})</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Punch Line ── */}
      <section class="punch">
        <div class="container">
          <h2>
            <span class="line-white">MASTRA IS GREAT.</span><br />
            <span class="line-amber">IT JUST DOESN'T</span><br />
            <span class="line-white">RUN ON THE EDGE.</span>
          </h2>
          <p>Honi is built for the infrastructure you actually deploy on.</p>
          <hr class="punch-rule" />
        </div>
      </section>

      {/* ── Features ── */}
      <section>
        <div class="container">
          <p class="section-label">Why Honi</p>
          <h2 class="section-title">BUILT DIFFERENT FOR THE EDGE</h2>

          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-card-top">
                <span dangerouslySetInnerHTML={{ __html: hexIcon(24) }} />
                <h3>DO-Backed State</h3>
              </div>
              <p>Every agent is a Durable Object. Persistent state, zero cold starts, global by default.</p>
            </div>
            <div class="feature-card">
              <div class="feature-card-top">
                <span dangerouslySetInnerHTML={{ __html: hexIcon(24) }} />
                <h3>True Edge</h3>
              </div>
              <p>Not "edge-compatible". Built from scratch to run on Cloudflare Workers.</p>
            </div>
            <div class="feature-card">
              <div class="feature-card-top">
                <span dangerouslySetInnerHTML={{ __html: hexIcon(24) }} />
                <h3>Tiered Memory</h3>
              </div>
              <p>Working (DO), Episodic (D1), Semantic (Vectorize). Wired up out of the box.</p>
            </div>
            <div class="feature-card">
              <div class="feature-card-top">
                <span dangerouslySetInnerHTML={{ __html: hexIcon(24) }} />
                <h3>Type-safe Tools</h3>
              </div>
              <p>Zod schemas, auto-generated JSON for LLM tool calling. Full TypeScript inference.</p>
            </div>
            <div class="feature-card">
              <div class="feature-card-top">
                <span dangerouslySetInnerHTML={{ __html: hexIcon(24) }} />
                <h3>Workflows</h3>
              </div>
              <p>Multi-step pipelines via CF Workflows. Checkpointed retries built in.</p>
            </div>
            <div class="feature-card">
              <div class="feature-card-top">
                <span dangerouslySetInnerHTML={{ __html: hexIcon(24) }} />
                <h3>Any LLM</h3>
              </div>
              <p>Anthropic, OpenAI, Workers AI. Switch model with one string.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section>
        <div class="container">
          <p class="section-label">Comparison</p>
          <h2 class="section-title">HOW HONI STACKS UP</h2>

          <div class="table-wrap">
            <table class="compare-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Honi</th>
                  <th>Mastra</th>
                  <th>LangChain</th>
                  <th>@cf/agents</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CF Workers native</td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="check">&#x2726;</span></td>
                </tr>
                <tr>
                  <td>DO-backed state</td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="check">&#x2726;</span></td>
                </tr>
                <tr>
                  <td>Built-in memory</td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                </tr>
                <tr>
                  <td>TypeScript-first</td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="check">&#x2726;</span></td>
                </tr>
                <tr>
                  <td>Edge distribution</td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="check">&#x2726;</span></td>
                </tr>
                <tr>
                  <td>Opinionated conventions</td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="check">&#x2726;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Quick Start ── */}
      <section>
        <div class="container">
          <p class="section-label">Quick Start</p>
          <h2 class="section-title">UP AND RUNNING IN SECONDS</h2>

          <div class="quickstart-grid">
            <div class="qs-steps">
              <div class="qs-step">
                <span class="qs-num">1</span>
                <div class="qs-step-content">
                  <h4>Install</h4>
                  <div class="qs-cmd" onclick="navigator.clipboard.writeText('npm install honi-cf');this.querySelector('span:last-child').textContent='copied!'">
                    <span>npm install honi-cf</span>
                    <span style="color:var(--text-muted);font-size:11px">↵</span>
                  </div>
                </div>
              </div>
              <div class="qs-step">
                <span class="qs-num">2</span>
                <div class="qs-step-content">
                  <h4>Create Agent</h4>
                  <p>Define your agent with createAgent() — model, tools, memory, and instructions.</p>
                </div>
              </div>
              <div class="qs-step">
                <span class="qs-num">3</span>
                <div class="qs-step-content">
                  <h4>Deploy</h4>
                  <p>Ship to 300+ Cloudflare locations with a single command. Global by default.</p>
                </div>
              </div>
            </div>

            <div class="code-window">
              <div class="code-header">
                <div class="code-dots"><span /><span /><span /></div>
                <span class="code-lang">TypeScript</span>
              </div>
              <div class="code-body">
                <div class="line"><span class="ln">1</span><span><span class="kw">import</span> {'{'} <span class="fn">createAgent</span> {'}'} <span class="kw">from</span> <span class="str">'honi'</span></span></div>
                <div class="line"><span class="ln">2</span><span></span></div>
                <div class="line"><span class="ln">3</span><span><span class="kw">export const</span> <span class="fn">agent</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}
                </span></div>
                <div class="line"><span class="ln">4</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'my-agent'</span><span class="op">,</span></span></div>
                <div class="line"><span class="ln">5</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-20250514'</span><span class="op">,</span></span></div>
                <div class="line"><span class="ln">6</span><span>  <span class="pr">instructions</span><span class="op">:</span> <span class="str">'You are a helpful assistant.'</span></span></div>
                <div class="line"><span class="ln">7</span><span>{'}'})</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div class="container">
          <div class="footer-inner">
            <span dangerouslySetInnerHTML={{ __html: hexSvg(20) }} />
            <span class="footer-wordmark">HONI</span>
            <span>·</span>
            <span>MIT License · Built by Stu Kennedy</span>
            <span>·</span>
            <a href="https://github.com/stukennedy/honi" target="_blank" rel="noopener">GitHub</a>
            <span>·</span>
            <a href="https://www.npmjs.com/package/honi-cf" target="_blank" rel="noopener">npm</a>
          </div>
        </div>
      </footer>

      {/* ── Copy-to-clipboard script ── */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('npm-copy').addEventListener('click', function() {
          navigator.clipboard.writeText('npm install honi-cf').then(function() {
            var icon = document.getElementById('copy-icon');
            icon.textContent = '\\u2713';
            setTimeout(function() { icon.innerHTML = '\\u2398'; }, 2000);
          });
        });
      `}} />
    </>
  )
)

// ── Docs Routes ──
app.get('/docs', (c) => c.redirect('/docs/getting-started'))

app.get('/docs/getting-started', (c) =>
  c.render(
    <DocsLayout active="/docs/getting-started">
      <GettingStartedPage />
    </DocsLayout>
  )
)

app.get('/docs/create-agent', (c) =>
  c.render(
    <DocsLayout active="/docs/create-agent">
      <CreateAgentPage />
    </DocsLayout>
  )
)

app.get('/docs/tools', (c) =>
  c.render(
    <DocsLayout active="/docs/tools">
      <ToolsPage />
    </DocsLayout>
  )
)

app.get('/docs/memory', (c) =>
  c.render(
    <DocsLayout active="/docs/memory">
      <MemoryPage />
    </DocsLayout>
  )
)

app.get('/docs/workflows', (c) =>
  c.render(
    <DocsLayout active="/docs/workflows">
      <WorkflowsPage />
    </DocsLayout>
  )
)

app.get('/docs/observability', (c) =>
  c.render(
    <DocsLayout active="/docs/observability">
      <ObservabilityPage />
    </DocsLayout>
  )
)

app.get('/docs/cli', (c) =>
  c.render(
    <DocsLayout active="/docs/cli">
      <CliPage />
    </DocsLayout>
  )
)

export default app
