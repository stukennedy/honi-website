import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'

const app = new Hono()

const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root {
  --bg: #0A0A0A;
  --bg-card: #111111;
  --bg-code: #1a1a1a;
  --border: #1f1f1f;
  --border-subtle: #181818;
  --text: #EDEDED;
  --text-secondary: #888888;
  --text-muted: #555555;
  --amber: #F59E0B;
  --amber-dim: rgba(245, 158, 11, 0.15);
  --amber-glow: rgba(245, 158, 11, 0.06);
  --orange: #EA580C;
  --blue: #60A5FA;
  --purple: #A78BFA;
  --green: #34D399;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
}

html { scroll-behavior: smooth }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

a { color: inherit; text-decoration: none }

/* ── Nav ── */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(10,10,10,0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-left .wordmark {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  font-size: 14px;
  color: var(--text-muted);
  cursor: default;
}

.nav-btn {
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--amber);
  color: var(--amber);
  background: transparent;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: var(--font);
}

.nav-btn:hover {
  background: var(--amber);
  color: var(--bg);
}

/* ── Container ── */
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Hero ── */
.hero {
  position: relative;
  padding: 160px 0 100px;
  text-align: center;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, var(--amber-glow) 0%, transparent 70%);
  pointer-events: none;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.badge a {
  color: var(--amber);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.hero h1 {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
  position: relative;
}

.gradient-text {
  background: linear-gradient(135deg, var(--amber) 0%, var(--orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero .sub {
  font-size: 18px;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 560px;
  margin: 0 auto 40px;
}

.ctas {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 56px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  border-radius: 10px;
  background: var(--amber);
  color: #000;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.9 }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  border-radius: 10px;
  background: transparent;
  color: var(--text);
  font-weight: 500;
  font-size: 15px;
  border: 1px solid var(--border);
  cursor: pointer;
  font-family: var(--font);
  transition: border-color 0.2s;
}
.btn-secondary:hover { border-color: var(--text-muted) }

/* ── Code Block ── */
.code-window {
  max-width: 640px;
  margin: 0 auto;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg-code);
  overflow: hidden;
  text-align: left;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  background: #141414;
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
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code-body {
  padding: 20px;
  font-family: var(--mono);
  font-size: 13.5px;
  line-height: 1.7;
  overflow-x: auto;
  color: var(--text);
}

.code-body .line {
  display: flex;
  gap: 16px;
}

.code-body .ln {
  color: var(--text-muted);
  user-select: none;
  text-align: right;
  min-width: 20px;
  opacity: 0.5;
}

.kw { color: var(--purple) }
.fn { color: var(--blue) }
.str { color: var(--amber) }
.cm { color: var(--text-muted); font-style: italic }
.pr { color: var(--text-secondary) }
.op { color: var(--text-secondary) }
.ty { color: var(--green) }

/* ── Sections ── */
section {
  padding: 100px 0;
}

.section-label {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--amber);
  margin-bottom: 12px;
}

.section-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 56px;
}

/* ── Feature Grid ── */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  padding: 32px 28px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.feature-card:hover {
  border-color: rgba(245, 158, 11, 0.25);
  box-shadow: 0 0 40px rgba(245, 158, 11, 0.04);
}

.feature-icon {
  font-size: 28px;
  margin-bottom: 16px;
  display: block;
}

.feature-card h3 {
  font-size: 17px;
  font-weight: 650;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}

.feature-card p {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* ── Punch ── */
.punch {
  text-align: center;
  padding: 120px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.punch h2 {
  font-size: clamp(28px, 4.5vw, 48px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}

.punch p {
  font-size: 17px;
  color: var(--text-secondary);
}

/* ── Table ── */
.table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.compare-table th,
.compare-table td {
  padding: 14px 20px;
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
  font-weight: 650;
  font-size: 14px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border);
}

.compare-table thead th:nth-child(2) {
  color: var(--amber);
}

.compare-table tbody tr:last-child td {
  border-bottom: none;
}

.check { color: var(--green); font-weight: 700 }
.cross { color: var(--text-muted) }

/* ── Quick Start ── */
.quickstart {
  text-align: center;
}

.install-cmd {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg-code);
  font-family: var(--mono);
  font-size: 15px;
  color: var(--text);
  margin-bottom: 40px;
}

.install-cmd .dollar {
  color: var(--text-muted);
  user-select: none;
}

/* ── Footer ── */
footer {
  padding: 48px 0;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--text-muted);
}

.footer-inner a {
  color: var(--text-secondary);
  transition: color 0.2s;
}

.footer-inner a:hover { color: var(--amber) }

/* ── Responsive ── */
@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .hero h1 { font-size: 36px }
  .punch h2 { font-size: 28px }
  .compare-table { font-size: 12px }
  .compare-table th, .compare-table td { padding: 10px 12px }
}

@media (max-width: 480px) {
  .ctas { flex-direction: column; align-items: center }
  nav { padding: 0 16px }
  .container { padding: 0 16px }
}
`

const hexSvg = (size: number) => `
<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow">
      <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#F59E0B" flood-opacity="0.5"/>
    </filter>
  </defs>
  <polygon points="20,2 36.66,11 36.66,29 20,38 3.34,29 3.34,11" fill="#F59E0B" filter="url(#glow)"/>
</svg>
`

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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
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
        <div class="nav-left">
          <span dangerouslySetInnerHTML={{ __html: hexSvg(28) }} />
          <span class="wordmark">Honi</span>
        </div>
        <div class="nav-right">
          <span class="nav-link">Docs</span>
          <a href="https://github.com/stukennedy/honi" target="_blank" rel="noopener">
            <button class="nav-btn">GitHub</button>
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section class="hero">
        <div class="container">
          <div class="badge">
            <span>&#x1F6A7; Early Development</span>
            <span>·</span>
            <a href="https://github.com/stukennedy/honi" target="_blank" rel="noopener">Star on GitHub</a>
          </div>

          <h1>
            Edge-first <span class="gradient-text">AI agents</span>
            <br />
            for Cloudflare Workers
          </h1>

          <p class="sub">
            Build stateful, streaming agents backed by Durable Objects.
            <br />
            No server. No Redis. No cold starts. Deploy globally in seconds.
          </p>

          <div class="ctas">
            <a href="https://github.com/stukennedy/honi#quick-start" target="_blank" rel="noopener">
              <button class="btn-primary">Get Started &#x2192;</button>
            </a>
            <a href="https://github.com/stukennedy/honi" target="_blank" rel="noopener">
              <button class="btn-secondary">View on GitHub &#x2192;</button>
            </a>
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
      </section>

      {/* ── Why Honi ── */}
      <section>
        <div class="container">
          <p class="section-label">Why Honi</p>
          <h2 class="section-title">Built different for the edge</h2>

          <div class="feature-grid">
            <div class="feature-card">
              <span class="feature-icon">&#x2B21;</span>
              <h3>DO-Backed State</h3>
              <p>Every agent is a Durable Object. Persistent state, zero cold starts, global by default.</p>
            </div>
            <div class="feature-card">
              <span class="feature-icon">&#x26A1;</span>
              <h3>True Edge Deployment</h3>
              <p>Not "edge-compatible". Built from scratch to run on Cloudflare Workers.</p>
            </div>
            <div class="feature-card">
              <span class="feature-icon">&#x1F9E0;</span>
              <h3>Tiered Memory</h3>
              <p>Working (DO), Episodic (D1), Semantic (Vectorize). Wired up out of the box.</p>
            </div>
            <div class="feature-card">
              <span class="feature-icon">&#x1F527;</span>
              <h3>Type-safe Tools</h3>
              <p>Zod schemas, auto-generated JSON for LLM tool calling. Full TypeScript inference.</p>
            </div>
            <div class="feature-card">
              <span class="feature-icon">&#x1F504;</span>
              <h3>Durable Workflows</h3>
              <p>Multi-step pipelines via CF Workflows. Checkpointed retries built in.</p>
            </div>
            <div class="feature-card">
              <span class="feature-icon">&#x1F50C;</span>
              <h3>Any LLM</h3>
              <p>Anthropic, OpenAI, Workers AI. Switch model with one string.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Punch ── */}
      <section class="punch">
        <div class="container">
          <h2>
            Mastra is great.
            <br />
            It just doesn't run on the edge.
          </h2>
          <p>Honi is built for the infrastructure you actually deploy on.</p>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section>
        <div class="container">
          <p class="section-label">Comparison</p>
          <h2 class="section-title">How Honi stacks up</h2>

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
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="check">&#x2713;</span></td>
                </tr>
                <tr>
                  <td>DO-backed state</td>
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="check">&#x2713;</span></td>
                </tr>
                <tr>
                  <td>Built-in memory</td>
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                </tr>
                <tr>
                  <td>TypeScript-first</td>
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="check">&#x2713;</span></td>
                </tr>
                <tr>
                  <td>Edge distribution</td>
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="check">&#x2713;</span></td>
                </tr>
                <tr>
                  <td>Opinionated conventions</td>
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="check">&#x2713;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                  <td><span class="cross">&#x2717;</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Quick Start ── */}
      <section class="quickstart">
        <div class="container">
          <p class="section-label">Quick Start</p>
          <h2 class="section-title">Up and running in seconds</h2>

          <div class="install-cmd">
            <span class="dollar">$</span>
            <span>npm install honi</span>
          </div>

          <div class="code-window" style="max-width: 560px; margin: 0 auto; text-align: left">
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
      </section>

      {/* ── Footer ── */}
      <footer>
        <div class="container">
          <div class="footer-inner">
            <span dangerouslySetInnerHTML={{ __html: hexSvg(20) }} />
            <span>Honi</span>
            <span>·</span>
            <span>MIT License</span>
            <span>·</span>
            <span>Built by Stu Kennedy</span>
            <span>·</span>
            <a href="https://github.com/stukennedy/honi" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  )
)

export default app
