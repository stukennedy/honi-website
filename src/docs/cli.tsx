export const CliPage = () => (
  <>
    <h1>CLI Reference</h1>
    <p class="docs-lead">The Honi CLI helps you scaffold, develop, and deploy agents with zero boilerplate.</p>

    <h2 id="install">Installation</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>npm install -g @stukennedy/honi</span></div>
      </div>
    </div>

    <h2 id="new">honi new &lt;name&gt;</h2>
    <p>Scaffold a new Honi agent project with all the boilerplate pre-configured.</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>honi new my-agent</span></div>
        <div class="line"><span class="ln"> </span><span><span class="cm"># Creates a new directory with a ready-to-deploy agent</span></span></div>
      </div>
    </div>

    <h3>Generated File Structure</h3>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Files</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> </span><span>my-agent/</span></div>
        <div class="line"><span class="ln"> </span><span><span class="pr">  ├──</span> src/</span></div>
        <div class="line"><span class="ln"> </span><span><span class="pr">  │   ├──</span> index.ts         <span class="cm"># Agent entry point</span></span></div>
        <div class="line"><span class="ln"> </span><span><span class="pr">  │   └──</span> tools/</span></div>
        <div class="line"><span class="ln"> </span><span><span class="pr">  │       └──</span> example.ts   <span class="cm"># Example tool</span></span></div>
        <div class="line"><span class="ln"> </span><span><span class="pr">  ├──</span> wrangler.toml        <span class="cm"># Cloudflare config</span></span></div>
        <div class="line"><span class="ln"> </span><span><span class="pr">  ├──</span> package.json</span></div>
        <div class="line"><span class="ln"> </span><span><span class="pr">  ├──</span> tsconfig.json</span></div>
        <div class="line"><span class="ln"> </span><span><span class="pr">  └──</span> .dev.vars           <span class="cm"># Local secrets (API keys)</span></span></div>
      </div>
    </div>

    <h2 id="dev">honi dev</h2>
    <p>Start a local development server with hot reload. This wraps <code>wrangler dev</code> with Honi-specific defaults.</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>honi dev</span></div>
        <div class="line"><span class="ln"> </span><span><span class="cm"># Starts local server at http://localhost:8787</span></span></div>
        <div class="line"><span class="ln"> </span><span><span class="cm"># Watches for file changes and auto-reloads</span></span></div>
      </div>
    </div>

    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--port &lt;number&gt;</code></td>
            <td>Port to listen on (default: 8787)</td>
          </tr>
          <tr>
            <td><code>--persist</code></td>
            <td>Persist Durable Object state between restarts</td>
          </tr>
          <tr>
            <td><code>--remote</code></td>
            <td>Use remote Cloudflare resources instead of local emulation</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="deploy">honi deploy</h2>
    <p>Deploy your agent to Cloudflare Workers. This wraps <code>wrangler deploy</code> and handles all Durable Object migrations.</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>honi deploy</span></div>
        <div class="line"><span class="ln"> </span><span><span class="cm"># Builds, uploads, and deploys to Cloudflare's edge</span></span></div>
        <div class="line"><span class="ln"> </span><span><span class="cm"># Your agent is live globally in seconds</span></span></div>
      </div>
    </div>

    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--env &lt;name&gt;</code></td>
            <td>Deploy to a specific environment (e.g. staging, production)</td>
          </tr>
          <tr>
            <td><code>--dry-run</code></td>
            <td>Build and validate without actually deploying</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="docs-next">
      <a href="/docs/getting-started">&larr; Back to Getting Started</a>
    </div>
  </>
)
