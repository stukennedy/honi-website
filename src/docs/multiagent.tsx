export const MultiAgentPage = () => (
  <>
    <h1>Multi-Agent Orchestration</h1>
    <p class="docs-lead">Route messages between agents, call tools on remote agents via MCP, and compose complex pipelines from independent Durable Object agents.</p>

    <h2 id="how-it-works">How it works</h2>
    <p>Each Honi agent is a Durable Object — addressable by binding name and thread ID. The multi-agent helpers let you communicate between agents directly over DO stubs, with no HTTP round-trips leaving your Cloudflare account.</p>

    <h2 id="routing">Routing Messages</h2>
    <p>Use <code>routeToAgent</code> to send a chat message to another agent and get back its full response:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">routeToAgent</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="kw">const</span> <span class="pr">result</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">routeToAgent</span>(</span></div>
        <div class="line"><span class="ln"> 4</span><span>  <span class="pr">env</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 5</span><span>  {'{'} <span class="pr">binding</span><span class="op">:</span> <span class="str">'RESEARCHER_AGENT'</span><span class="op">,</span> <span class="pr">threadId</span><span class="op">:</span> <span class="str">'thread-1'</span> {'}'}<span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="str">'Summarise the latest earnings report for AAPL'</span></span></div>
        <div class="line"><span class="ln"> 7</span><span>)</span></div>
        <div class="line"><span class="ln"> 8</span><span></span></div>
        <div class="line"><span class="ln"> 9</span><span><span class="fn">console</span>.<span class="fn">log</span>(<span class="pr">result</span>.<span class="pr">response</span>)  <span class="cm">// final assistant reply</span></span></div>
      </div>
    </div>

    <h2 id="tool-calls">Calling Tools on Remote Agents</h2>
    <p>Use <code>callAgentTool</code> to invoke a specific tool on another agent via its MCP endpoint — useful for composing agent capabilities without full chat:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">callAgentTool</span><span class="op">,</span> <span class="fn">listAgentTools</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="cm">// See what tools another agent exposes</span></span></div>
        <div class="line"><span class="ln"> 4</span><span><span class="kw">const</span> <span class="pr">tools</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">listAgentTools</span>(<span class="pr">env</span><span class="op">,</span> {'{'} <span class="pr">binding</span><span class="op">:</span> <span class="str">'DATA_AGENT'</span> {'}'})</span></div>
        <div class="line"><span class="ln"> 5</span><span></span></div>
        <div class="line"><span class="ln"> 6</span><span><span class="cm">// Call a specific tool directly</span></span></div>
        <div class="line"><span class="ln"> 7</span><span><span class="kw">const</span> <span class="pr">data</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">callAgentTool</span>(</span></div>
        <div class="line"><span class="ln"> 8</span><span>  <span class="pr">env</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 9</span><span>  {'{'} <span class="pr">binding</span><span class="op">:</span> <span class="str">'DATA_AGENT'</span> {'}'}<span class="op">,</span></span></div>
        <div class="line"><span class="ln">10</span><span>  <span class="str">'fetch_metrics'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">11</span><span>  {'{'} <span class="pr">metricId</span><span class="op">:</span> <span class="str">'revenue-q4'</span> {'}'}</span></div>
        <div class="line"><span class="ln">12</span><span>)</span></div>
      </div>
    </div>

    <h2 id="wrangler-setup">wrangler.toml Setup</h2>
    <p>Each agent needs its own Durable Object binding. Agents that call each other need both bindings declared:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TOML — wrangler.toml</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="cm"># Orchestrator agent</span></span></div>
        <div class="line"><span class="ln"> 2</span><span>[[<span class="pr">durable_objects.bindings</span>]]</span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="pr">name</span> <span class="op">=</span> <span class="str">"ORCHESTRATOR"</span></span></div>
        <div class="line"><span class="ln"> 4</span><span><span class="pr">class_name</span> <span class="op">=</span> <span class="str">"OrchestratorDO"</span></span></div>
        <div class="line"><span class="ln"> 5</span><span></span></div>
        <div class="line"><span class="ln"> 6</span><span><span class="cm"># Sub-agents</span></span></div>
        <div class="line"><span class="ln"> 7</span><span>[[<span class="pr">durable_objects.bindings</span>]]</span></div>
        <div class="line"><span class="ln"> 8</span><span><span class="pr">name</span> <span class="op">=</span> <span class="str">"RESEARCHER_AGENT"</span></span></div>
        <div class="line"><span class="ln"> 9</span><span><span class="pr">class_name</span> <span class="op">=</span> <span class="str">"ResearcherDO"</span></span></div>
        <div class="line"><span class="ln">10</span><span></span></div>
        <div class="line"><span class="ln">11</span><span>[[<span class="pr">durable_objects.bindings</span>]]</span></div>
        <div class="line"><span class="ln">12</span><span><span class="pr">name</span> <span class="op">=</span> <span class="str">"DATA_AGENT"</span></span></div>
        <div class="line"><span class="ln">13</span><span><span class="pr">class_name</span> <span class="op">=</span> <span class="str">"DataDO"</span></span></div>
      </div>
    </div>

    <h2 id="full-example">Full Example — Orchestrator Pattern</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript — src/index.ts</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">createAgent</span><span class="op">,</span> <span class="fn">tool</span><span class="op">,</span> <span class="fn">routeToAgent</span><span class="op">,</span> <span class="fn">z</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="cm">// Sub-agent: handles research tasks</span></span></div>
        <div class="line"><span class="ln"> 4</span><span><span class="kw">const</span> <span class="fn">researcher</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}</span></div>
        <div class="line"><span class="ln"> 5</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'researcher'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-5'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 7</span><span>  <span class="pr">binding</span><span class="op">:</span> <span class="str">'RESEARCHER_AGENT'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 8</span><span>  <span class="pr">system</span><span class="op">:</span> <span class="str">'You are a research specialist.'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 9</span><span>{'}'})</span></div>
        <div class="line"><span class="ln">10</span><span></span></div>
        <div class="line"><span class="ln">11</span><span><span class="cm">// Orchestrator: routes tasks to sub-agents</span></span></div>
        <div class="line"><span class="ln">12</span><span><span class="kw">const</span> <span class="fn">delegateResearch</span> <span class="op">=</span> <span class="fn">tool</span>({'{'}</span></div>
        <div class="line"><span class="ln">13</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'delegate_research'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">14</span><span>  <span class="pr">description</span><span class="op">:</span> <span class="str">'Send a research task to the researcher agent'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">15</span><span>  <span class="pr">input</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">object</span>({'{'} <span class="pr">task</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>() {'}'})<span class="op">,</span></span></div>
        <div class="line"><span class="ln">16</span><span>  <span class="pr">handler</span><span class="op">:</span> <span class="kw">async</span> ({'{'} <span class="pr">task</span> {'}'}<span class="op">,</span> {'{'} <span class="pr">env</span> {'}'}) <span class="op">=&gt;</span> {'{'}</span></div>
        <div class="line"><span class="ln">17</span><span>    <span class="kw">const</span> <span class="pr">res</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">routeToAgent</span>(<span class="pr">env</span><span class="op">,</span> {'{'} <span class="pr">binding</span><span class="op">:</span> <span class="str">'RESEARCHER_AGENT'</span> {'}'}<span class="op">,</span> <span class="pr">task</span>)</span></div>
        <div class="line"><span class="ln">18</span><span>    <span class="kw">return</span> <span class="pr">res</span>.<span class="pr">response</span></span></div>
        <div class="line"><span class="ln">19</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">20</span><span>{'}'})</span></div>
        <div class="line"><span class="ln">21</span><span></span></div>
        <div class="line"><span class="ln">22</span><span><span class="kw">const</span> <span class="fn">orchestrator</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}</span></div>
        <div class="line"><span class="ln">23</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'orchestrator'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">24</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-5'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">25</span><span>  <span class="pr">binding</span><span class="op">:</span> <span class="str">'ORCHESTRATOR'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">26</span><span>  <span class="pr">tools</span><span class="op">:</span> [<span class="fn">delegateResearch</span>]<span class="op">,</span></span></div>
        <div class="line"><span class="ln">27</span><span>  <span class="pr">system</span><span class="op">:</span> <span class="str">'You coordinate tasks across specialist agents.'</span></span></div>
        <div class="line"><span class="ln">28</span><span>{'}'})</span></div>
        <div class="line"><span class="ln">29</span><span></span></div>
        <div class="line"><span class="ln">30</span><span><span class="kw">export default</span> {'{'} <span class="fn">fetch</span><span class="op">:</span> <span class="fn">orchestrator</span>.<span class="fn">fetch</span> {'}'}</span></div>
        <div class="line"><span class="ln">31</span><span><span class="kw">export const</span> <span class="ty">OrchestratorDO</span> <span class="op">=</span> <span class="fn">orchestrator</span>.<span class="fn">DurableObject</span></span></div>
        <div class="line"><span class="ln">32</span><span><span class="kw">export const</span> <span class="ty">ResearcherDO</span> <span class="op">=</span> <span class="fn">researcher</span>.<span class="fn">DurableObject</span></span></div>
      </div>
    </div>

    <h2 id="api">API Reference</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr><th>Function</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>routeToAgent(env, agent, message)</code></td>
            <td>Send a chat message to another agent. Returns <code>{'{ response, messages }'}</code></td>
          </tr>
          <tr>
            <td><code>callAgentTool(env, agent, toolName, args)</code></td>
            <td>Call a specific tool on another agent via MCP</td>
          </tr>
          <tr>
            <td><code>listAgentTools(env, agent)</code></td>
            <td>List tools exposed by another agent's MCP endpoint</td>
          </tr>
          <tr>
            <td><code>getAgentHistory(env, agent)</code></td>
            <td>Fetch conversation history from another agent</td>
          </tr>
          <tr>
            <td><code>clearAgentHistory(env, agent)</code></td>
            <td>Clear another agent's conversation history</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>AgentReference</h3>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr><th>Field</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>binding</code></td>
            <td><code>string</code></td>
            <td>Durable Object namespace binding name from wrangler.toml</td>
          </tr>
          <tr>
            <td><code>threadId</code></td>
            <td><code>string?</code></td>
            <td>Thread/instance ID (defaults to <code>'default'</code>)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="docs-next">
      <a href="/docs/cli">CLI Reference →</a>
    </div>
  </>
)
