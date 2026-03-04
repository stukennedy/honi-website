export const GettingStartedPage = () => (
  <>
    <h1>Getting Started</h1>
    <p class="docs-lead">Get a Honi agent running on Cloudflare Workers in under five minutes.</p>

    <h2 id="install">1. Install</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>npm install honidev</span></div>
      </div>
    </div>
    <p>Or use the CLI to scaffold a full project:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>npx honidev new my-agent</span></div>
      </div>
    </div>

    <h2 id="create-agent">2. Create your first agent</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">createAgent</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="kw">export const</span> <span class="fn">agent</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}
        </span></div>
        <div class="line"><span class="ln"> 4</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'my-agent'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 5</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-20250514'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="pr">system</span><span class="op">:</span> <span class="str">'You are a helpful assistant.'</span></span></div>
        <div class="line"><span class="ln"> 7</span><span>{'}'})</span></div>
      </div>
    </div>

    <p>Add the Durable Object binding to your <code>wrangler.toml</code>:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TOML</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="pr">name</span> <span class="op">=</span> <span class="str">"my-agent"</span></span></div>
        <div class="line"><span class="ln"> 2</span><span><span class="pr">main</span> <span class="op">=</span> <span class="str">"src/index.ts"</span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="pr">compatibility_date</span> <span class="op">=</span> <span class="str">"2024-12-01"</span></span></div>
        <div class="line"><span class="ln"> 4</span><span></span></div>
        <div class="line"><span class="ln"> 5</span><span><span class="cm"># Durable Object for agent state</span></span></div>
        <div class="line"><span class="ln"> 6</span><span><span class="kw">[[durable_objects.bindings]]</span></span></div>
        <div class="line"><span class="ln"> 7</span><span><span class="pr">name</span> <span class="op">=</span> <span class="str">"AGENT"</span></span></div>
        <div class="line"><span class="ln"> 8</span><span><span class="pr">class_name</span> <span class="op">=</span> <span class="str">"AgentDO"</span></span></div>
        <div class="line"><span class="ln"> 9</span><span></span></div>
        <div class="line"><span class="ln">10</span><span><span class="kw">[[migrations]]</span></span></div>
        <div class="line"><span class="ln">11</span><span><span class="pr">tag</span> <span class="op">=</span> <span class="str">"v1"</span></span></div>
        <div class="line"><span class="ln">12</span><span><span class="pr">new_classes</span> <span class="op">=</span> [<span class="str">"AgentDO"</span>]</span></div>
      </div>
    </div>

    <h2 id="run-locally">3. Run locally</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>honi dev</span></div>
        <div class="line"><span class="ln"> </span><span><span class="cm"># or: npx wrangler dev</span></span></div>
      </div>
    </div>
    <p>Your agent is now running at <code>http://localhost:8787</code>. Send a message:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>curl -X POST http://localhost:8787/chat \</span></div>
        <div class="line"><span class="ln"> </span><span>  -H <span class="str">"Content-Type: application/json"</span> \</span></div>
        <div class="line"><span class="ln"> </span><span>  -d <span class="str">{'\'{"message": "Hello!"}\''}</span></span></div>
      </div>
    </div>

    <h2 id="deploy">4. Deploy</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>honi deploy</span></div>
        <div class="line"><span class="ln"> </span><span><span class="cm"># or: npx wrangler deploy</span></span></div>
      </div>
    </div>
    <p>Your agent is now live on Cloudflare's global edge network — over 300 locations worldwide.</p>

    <div class="docs-next">
      <a href="/docs/create-agent">Next: createAgent API →</a>
    </div>
  </>
)
