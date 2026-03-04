export const ObservabilityPage = () => (
  <>
    <h1>Observability</h1>
    <p class="docs-lead">Monitor, log, and trace every interaction your agent has — from LLM calls to tool invocations.</p>

    <h2 id="create-observability">createObservability() API</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="kw">import</span> {'{'} <span class="fn">createObservability</span> {'}'} <span class="kw">from</span> <span class="str">'@stukennedy/honi'</span></span></div>
        <div class="line"><span class="ln">2</span><span></span></div>
        <div class="line"><span class="ln">3</span><span><span class="kw">function</span> <span class="fn">createObservability</span>(<span class="pr">config</span><span class="op">:</span> <span class="ty">ObservabilityConfig</span>)<span class="op">:</span> <span class="ty">Observability</span></span></div>
      </div>
    </div>

    <h2 id="config">ObservabilityConfig</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>logLevel</code></td>
            <td><code>'debug' | 'info' | 'warn' | 'error'</code></td>
            <td>Minimum log level to capture</td>
          </tr>
          <tr>
            <td><code>aiGateway</code></td>
            <td><code>{'{'} accountId: string; gatewayId: string {'}'}</code></td>
            <td>Route LLM calls through Cloudflare AI Gateway</td>
          </tr>
          <tr>
            <td><code>onEvent</code></td>
            <td><code>(event: HoniEvent) =&gt; void</code></td>
            <td>Custom callback for every agent event</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="events">HoniEvent Types</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Description</th>
            <th>Key Fields</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>llm.request</code></td>
            <td>LLM API call initiated</td>
            <td><code>model, messages, tools</code></td>
          </tr>
          <tr>
            <td><code>llm.response</code></td>
            <td>LLM API response received</td>
            <td><code>model, response, latencyMs, tokens</code></td>
          </tr>
          <tr>
            <td><code>llm.error</code></td>
            <td>LLM API call failed</td>
            <td><code>model, error, latencyMs</code></td>
          </tr>
          <tr>
            <td><code>tool.call</code></td>
            <td>Tool invocation started</td>
            <td><code>toolName, input</code></td>
          </tr>
          <tr>
            <td><code>tool.result</code></td>
            <td>Tool execution completed</td>
            <td><code>toolName, output, latencyMs</code></td>
          </tr>
          <tr>
            <td><code>tool.error</code></td>
            <td>Tool execution failed</td>
            <td><code>toolName, error</code></td>
          </tr>
          <tr>
            <td><code>memory.read</code></td>
            <td>Memory retrieval</td>
            <td><code>tier, query, results</code></td>
          </tr>
          <tr>
            <td><code>memory.write</code></td>
            <td>Memory storage</td>
            <td><code>tier, data</code></td>
          </tr>
          <tr>
            <td><code>session.start</code></td>
            <td>New session created</td>
            <td><code>sessionId</code></td>
          </tr>
          <tr>
            <td><code>session.end</code></td>
            <td>Session terminated</td>
            <td><code>sessionId, messageCount</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="ai-gateway">AI Gateway Setup</h2>
    <p>Cloudflare AI Gateway provides caching, rate limiting, analytics, and logging for your LLM calls. To enable it:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="kw">export const</span> <span class="fn">agent</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}
        </span></div>
        <div class="line"><span class="ln">2</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'my-agent'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">3</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-20250514'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">4</span><span>  <span class="pr">observability</span><span class="op">:</span> {'{'}
        </span></div>
        <div class="line"><span class="ln">5</span><span>    <span class="pr">aiGateway</span><span class="op">:</span> {'{'}
        </span></div>
        <div class="line"><span class="ln">6</span><span>      <span class="pr">accountId</span><span class="op">:</span> <span class="str">'your-cf-account-id'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">7</span><span>      <span class="pr">gatewayId</span><span class="op">:</span> <span class="str">'my-gateway'</span></span></div>
        <div class="line"><span class="ln">8</span><span>    {'}'}</span></div>
        <div class="line"><span class="ln">9</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">10</span><span>{'}'})</span></div>
      </div>
    </div>
    <p>Once configured, all LLM requests are proxied through the AI Gateway. View analytics, logs, and caching stats in the Cloudflare dashboard.</p>

    <h2 id="example">Example: Logging Every Tool Call</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">export const</span> <span class="fn">agent</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}
        </span></div>
        <div class="line"><span class="ln"> 2</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'debug-agent'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 3</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-20250514'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 4</span><span></span></div>
        <div class="line"><span class="ln"> 5</span><span>  <span class="pr">observability</span><span class="op">:</span> {'{'}
        </span></div>
        <div class="line"><span class="ln"> 6</span><span>    <span class="pr">logLevel</span><span class="op">:</span> <span class="str">'debug'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 7</span><span></span></div>
        <div class="line"><span class="ln"> 8</span><span>    <span class="fn">onEvent</span>(<span class="pr">event</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln"> 9</span><span>      <span class="kw">if</span> (<span class="pr">event</span>.<span class="pr">type</span> <span class="op">===</span> <span class="str">'tool.call'</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln">10</span><span>        <span class="pr">console</span>.<span class="fn">log</span>(<span class="str">`Tool called: ${'{'}event.toolName{'}'}`</span>)</span></div>
        <div class="line"><span class="ln">11</span><span>        <span class="pr">console</span>.<span class="fn">log</span>(<span class="str">`  Input:`</span><span class="op">,</span> <span class="fn">JSON</span>.<span class="fn">stringify</span>(<span class="pr">event</span>.<span class="pr">input</span>))</span></div>
        <div class="line"><span class="ln">12</span><span>      {'}'}</span></div>
        <div class="line"><span class="ln">13</span><span>      <span class="kw">if</span> (<span class="pr">event</span>.<span class="pr">type</span> <span class="op">===</span> <span class="str">'tool.result'</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln">14</span><span>        <span class="pr">console</span>.<span class="fn">log</span>(<span class="str">`  Result (${'{'}event.latencyMs{'}'}ms):`</span><span class="op">,</span> <span class="pr">event</span>.<span class="pr">output</span>)</span></div>
        <div class="line"><span class="ln">15</span><span>      {'}'}</span></div>
        <div class="line"><span class="ln">16</span><span>    {'}'}<span class="op">,</span></span></div>
        <div class="line"><span class="ln">17</span><span></span></div>
        <div class="line"><span class="ln">18</span><span>    <span class="pr">aiGateway</span><span class="op">:</span> {'{'}
        </span></div>
        <div class="line"><span class="ln">19</span><span>      <span class="pr">accountId</span><span class="op">:</span> <span class="str">'abc123'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">20</span><span>      <span class="pr">gatewayId</span><span class="op">:</span> <span class="str">'my-gateway'</span></span></div>
        <div class="line"><span class="ln">21</span><span>    {'}'}</span></div>
        <div class="line"><span class="ln">22</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">23</span><span>{'}'})</span></div>
      </div>
    </div>

    <div class="docs-next">
      <a href="/docs/cli">Next: CLI Reference →</a>
    </div>
  </>
)
