export const ToolsPage = () => (
  <>
    <h1>Tools</h1>
    <p class="docs-lead">Give your agent the ability to take actions and access external data through type-safe tool definitions.</p>

    <h2 id="tool-api">tool() API</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="kw">import</span> {'{'} <span class="fn">tool</span> {'}'} <span class="kw">from</span> <span class="str">'honi-cf'</span></span></div>
        <div class="line"><span class="ln">2</span><span></span></div>
        <div class="line"><span class="ln">3</span><span><span class="kw">function</span> <span class="fn">tool</span>(<span class="pr">config</span><span class="op">:</span> <span class="ty">ToolConfig</span>)<span class="op">:</span> <span class="ty">Tool</span></span></div>
      </div>
    </div>

    <h2 id="tool-config">ToolConfig</h2>
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
            <td><code>description</code></td>
            <td><code>string</code></td>
            <td>Human-readable description sent to the LLM</td>
          </tr>
          <tr>
            <td><code>input</code></td>
            <td><code>ZodSchema</code></td>
            <td>Zod schema defining the tool's input parameters</td>
          </tr>
          <tr>
            <td><code>run</code></td>
            <td><code>(input, ctx) =&gt; Promise&lt;any&gt;</code></td>
            <td>Async handler that executes when the tool is called</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="zod-schemas">Zod Schema Input</h2>
    <p>Tools use <a href="https://zod.dev" class="docs-link">Zod</a> schemas to define their input. Honi automatically converts these schemas to JSON Schema for LLM function calling.</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">z</span> {'}'} <span class="kw">from</span> <span class="str">'zod'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="cm">// Simple string input</span></span></div>
        <div class="line"><span class="ln"> 4</span><span><span class="fn">z</span>.<span class="fn">object</span>({'{'} <span class="pr">query</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>() {'}'})</span></div>
        <div class="line"><span class="ln"> 5</span><span></span></div>
        <div class="line"><span class="ln"> 6</span><span><span class="cm">// Complex input with validation</span></span></div>
        <div class="line"><span class="ln"> 7</span><span><span class="fn">z</span>.<span class="fn">object</span>({'{'}
        </span></div>
        <div class="line"><span class="ln"> 8</span><span>  <span class="pr">lat</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">number</span>().<span class="fn">min</span>(-<span class="str">90</span>).<span class="fn">max</span>(<span class="str">90</span>)<span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 9</span><span>  <span class="pr">lon</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">number</span>().<span class="fn">min</span>(-<span class="str">180</span>).<span class="fn">max</span>(<span class="str">180</span>)<span class="op">,</span></span></div>
        <div class="line"><span class="ln">10</span><span>  <span class="pr">units</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">enum</span>([<span class="str">'metric'</span><span class="op">,</span> <span class="str">'imperial'</span>]).<span class="fn">optional</span>()</span></div>
        <div class="line"><span class="ln">11</span><span>{'}'})</span></div>
      </div>
    </div>

    <h2 id="handler">Handler Signature</h2>
    <p>The <code>run</code> function receives the validated input and a context object:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="kw">type</span> <span class="ty">ToolHandler</span> <span class="op">=</span> (</span></div>
        <div class="line"><span class="ln">2</span><span>  <span class="pr">input</span><span class="op">:</span> <span class="ty">z.infer&lt;typeof schema&gt;</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">3</span><span>  <span class="pr">ctx</span><span class="op">:</span> {'{'} <span class="pr">env</span><span class="op">:</span> <span class="ty">Env</span><span class="op">;</span> <span class="pr">sessionId</span><span class="op">:</span> <span class="ty">string</span> {'}'}</span></div>
        <div class="line"><span class="ln">4</span><span>) <span class="op">=&gt;</span> <span class="ty">Promise</span><span class="op">&lt;</span><span class="ty">any</span><span class="op">&gt;</span></span></div>
      </div>
    </div>
    <p>The <code>ctx.env</code> object gives you access to all Cloudflare bindings (D1, KV, R2, etc.). The return value is serialized to JSON and sent back to the LLM.</p>

    <h2 id="function-calling">How Tools Map to LLM Function Calling</h2>
    <p>When you define tools, Honi:</p>
    <ol class="docs-list">
      <li>Converts each Zod schema to JSON Schema at startup</li>
      <li>Sends tool definitions alongside your messages to the LLM</li>
      <li>When the LLM requests a tool call, Honi validates the input against the Zod schema</li>
      <li>Executes the <code>run</code> handler with the validated input</li>
      <li>Returns the result to the LLM for the next turn</li>
    </ol>
    <p>This loop continues until the LLM responds with a text message instead of a tool call.</p>

    <h2 id="examples">Examples</h2>

    <h3>Search Tool</h3>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">const</span> <span class="fn">search</span> <span class="op">=</span> <span class="fn">tool</span>({'{'}
        </span></div>
        <div class="line"><span class="ln"> 2</span><span>  <span class="pr">description</span><span class="op">:</span> <span class="str">'Search the knowledge base for relevant articles'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 3</span><span>  <span class="pr">input</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">object</span>({'{'}
        </span></div>
        <div class="line"><span class="ln"> 4</span><span>    <span class="pr">query</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>().<span class="fn">describe</span>(<span class="str">'Search query'</span>)<span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 5</span><span>    <span class="pr">limit</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">number</span>().<span class="fn">default</span>(<span class="str">5</span>)</span></div>
        <div class="line"><span class="ln"> 6</span><span>  {'}'})<span class="op">,</span>
        </span></div>
        <div class="line"><span class="ln"> 7</span><span>  <span class="kw">async</span> <span class="fn">run</span>({'{'} <span class="pr">query</span><span class="op">,</span> <span class="pr">limit</span> {'}'}<span class="op">,</span> <span class="pr">ctx</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln"> 8</span><span>    <span class="kw">const</span> <span class="pr">results</span> <span class="op">=</span> <span class="kw">await</span> <span class="pr">ctx</span>.<span class="pr">env</span>.<span class="fn">VECTORIZE</span>.<span class="fn">query</span>(<span class="pr">query</span><span class="op">,</span> {'{'} <span class="pr">topK</span><span class="op">:</span> <span class="pr">limit</span> {'}'})</span></div>
        <div class="line"><span class="ln"> 9</span><span>    <span class="kw">return</span> <span class="pr">results</span>.<span class="pr">matches</span></span></div>
        <div class="line"><span class="ln">10</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">11</span><span>{'}'})</span></div>
      </div>
    </div>

    <h3>Calculator Tool</h3>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">const</span> <span class="fn">calculator</span> <span class="op">=</span> <span class="fn">tool</span>({'{'}
        </span></div>
        <div class="line"><span class="ln"> 2</span><span>  <span class="pr">description</span><span class="op">:</span> <span class="str">'Perform basic arithmetic calculations'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 3</span><span>  <span class="pr">input</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">object</span>({'{'}
        </span></div>
        <div class="line"><span class="ln"> 4</span><span>    <span class="pr">expression</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>().<span class="fn">describe</span>(<span class="str">'Math expression, e.g. "2 + 2"'</span>)</span></div>
        <div class="line"><span class="ln"> 5</span><span>  {'}'})<span class="op">,</span>
        </span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="kw">async</span> <span class="fn">run</span>({'{'} <span class="pr">expression</span> {'}'}) {'{'}
        </span></div>
        <div class="line"><span class="ln"> 7</span><span>    <span class="kw">const</span> <span class="pr">result</span> <span class="op">=</span> <span class="fn">Function</span>(<span class="str">`"use strict"; return (${'{'}expression{'}'})`</span>)()</span></div>
        <div class="line"><span class="ln"> 8</span><span>    <span class="kw">return</span> {'{'} <span class="pr">expression</span><span class="op">,</span> <span class="pr">result</span> {'}'}</span></div>
        <div class="line"><span class="ln"> 9</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">10</span><span>{'}'})</span></div>
      </div>
    </div>

    <div class="docs-next">
      <a href="/docs/memory">Next: Memory →</a>
    </div>
  </>
)
