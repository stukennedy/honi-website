import type { FC, PropsWithChildren } from 'hono/jsx'

const navItems = [
  { href: '/docs/getting-started', label: 'Getting Started' },
  { heading: 'Core Concepts' },
  { href: '/docs/create-agent', label: 'createAgent' },
  { href: '/docs/tools', label: 'Tools' },
  { href: '/docs/memory', label: 'Memory' },
  { href: '/docs/workflows', label: 'Workflows' },
  { href: '/docs/observability', label: 'Observability' },
  { heading: '' },
  { href: '/docs/cli', label: 'CLI Reference' },
] as const

export const DocsLayout: FC<PropsWithChildren<{ active: string }>> = ({ children, active }) => (
  <>
    <div class="docs-topbar">
      <a href="/" class="docs-back">&larr; Back to honi.dev</a>
      <button class="docs-menu-btn" onclick="document.querySelector('.docs-sidebar').classList.toggle('open')">
        Menu
      </button>
    </div>
    <div class="docs-shell">
      <aside class="docs-sidebar">
        <nav class="docs-nav">
          {navItems.map((item) => {
            if ('heading' in item) {
              return item.heading ? <div class="docs-nav-heading">{item.heading}</div> : <div class="docs-nav-spacer" />
            }
            return (
              <a
                href={item.href}
                class={`docs-nav-link${active === item.href ? ' active' : ''}`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </aside>
      <main class="docs-main">
        <article class="docs-content">{children}</article>
      </main>
    </div>
  </>
)
