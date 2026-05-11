export const RecursivePage = () => (
  <>
    <h1>Recursive Memory</h1>
    <p class="docs-lead">Recursive memory implements the <strong>Recursive Language Model (RLM)</strong> pattern — the model iteratively queries a DO-backed document store, deciding what to read at each step, rather than making a single RAG retrieval guess.</p>

    <h2 id="why-recursive">Why recursive instead of semantic?</h2>
    <p>Semantic (RAG) retrieval embeds your query and fetches the top-k similar chunks. It makes one guess before the model has started reasoning. Recursive memory lets the model <em>earn</em> its answer by reading what it needs, learning from it, and reading further.</p>

    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th></th>
            <th>Semantic (RAG)</th>
            <th>Recursive (RLM)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Retrieval</strong></td>
            <td>Embedding similarity — a guess before reasoning</td>
            <td>Model decides what to read during reasoning</td>
          </tr>
          <tr>
            <td><strong>Cross-references</strong></td>
            <td>Misses joins — top-k doesn't follow links</td>
            <td>Iterative — reads lead to further reads</td>
          </tr>
          <tr>
            <td><strong>Structured data</strong></td>
            <td>Flattens tables and matrices into embeddings</td>
            <td>Queries structure directly via keyword index</td>
          </tr>
          <tr>
            <td><strong>Token cost</strong></td>
            <td>One large context per call</td>
            <td>Many small calls — reads only what's needed</td>
          </tr>
          <tr>
            <td><strong>Best for</strong></td>
            <td>Unstructured text, past conversations</td>
            <td>Product docs, error codes, KB articles, version matrices</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="setup">Setup</h2>
    <p>No extra bindings — recursive memory uses the agent's existing Durable Object storage.</p>

    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">createAgent</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="kw">export const</span> <span class="fn">agent</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}</span></div>
        <div class="line"><span class="ln"> 4</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'support-agent'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 5</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-20250514'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="pr">memory</span><span class="op">:</span> {'{'}</span></div>
        <div class="line"><span class="ln"> 7</span><span>    <span class="pr">recursive</span><span class="op">:</span> {'{'}</span></div>
        <div class="line"><span class="ln"> 8</span><span>      <span class="pr">enabled</span><span class="op">:</span> <span class="kw">true</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 9</span><span>      <span class="pr">maxDepth</span><span class="op">:</span> <span class="num">10</span><span class="op">,</span>       <span class="cm">// max REPL iterations (default: 10)</span></span></div>
        <div class="line"><span class="ln">10</span><span>      <span class="pr">timeoutMs</span><span class="op">:</span> <span class="num">30_000</span><span class="op">,</span>  <span class="cm">// loop timeout in ms (default: 30s)</span></span></div>
        <div class="line"><span class="ln">11</span><span>      <span class="pr">chunkSize</span><span class="op">:</span> <span class="num">800</span><span class="op">,</span>     <span class="cm">// chars per chunk (default: 800)</span></span></div>
        <div class="line"><span class="ln">12</span><span>    {'}'}</span></div>
        <div class="line"><span class="ln">13</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">14</span><span>{'}'})</span></div>
      </div>
    </div>

    <p>For voice agents where latency is critical, use a tighter profile:</p>

    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span>  <span class="pr">recursive</span><span class="op">:</span> {'{'} <span class="pr">enabled</span><span class="op">:</span> <span class="kw">true</span><span class="op">,</span> <span class="pr">maxDepth</span><span class="op">:</span> <span class="num">5</span><span class="op">,</span> <span class="pr">timeoutMs</span><span class="op">:</span> <span class="num">5_000</span> {'}'}</span></div>
      </div>
    </div>

    <h2 id="loading-documents">Loading documents</h2>
    <p>Load KB documents from a tool handler — the <code>ctx.recursive</code> instance is available to all tool handlers when recursive memory is enabled.</p>

    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">tool</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span><span class="kw">import</span> {'{'} <span class="ty">z</span> {'}'} <span class="kw">from</span> <span class="str">'zod'</span></span></div>
        <div class="line"><span class="ln"> 3</span><span></span></div>
        <div class="line"><span class="ln"> 4</span><span><span class="kw">const</span> <span class="fn">loadKb</span> <span class="op">=</span> <span class="fn">tool</span>({'{'}</span></div>
        <div class="line"><span class="ln"> 5</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'load_kb'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="pr">description</span><span class="op">:</span> <span class="str">'Load a KB article into the document store'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 7</span><span>  <span class="pr">input</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">object</span>({'{'} <span class="pr">id</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>()<span class="op">,</span> <span class="pr">content</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>()<span class="op">,</span> <span class="pr">title</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>().<span class="fn">optional</span>() {'}'})<span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 8</span><span>  <span class="kw">async</span> <span class="fn">handler</span>({'{'} id<span class="op">,</span> content<span class="op">,</span> title {'}'}<span class="op">,</span> ctx) {'{'}</span></div>
        <div class="line"><span class="ln"> 9</span><span>    <span class="kw">await</span> ctx.<span class="fn">recursive</span>!.<span class="fn">loadDocument</span>(id<span class="op">,</span> content<span class="op">,</span> title)</span></div>
        <div class="line"><span class="ln">10</span><span>    <span class="kw">return</span> {'{'} <span class="pr">ok</span><span class="op">:</span> <span class="kw">true</span> {'}'}</span></div>
        <div class="line"><span class="ln">11</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">12</span><span>{'}'})</span></div>
      </div>
    </div>

    <h2 id="how-it-works">How the loop works</h2>
    <p>When recursive memory is enabled, each request runs a REPL loop before the final streamed response:</p>

    <ol style="margin: 1rem 0 1.5rem 1.5rem; display:flex; flex-direction:column; gap:0.6rem; color:var(--text-secondary); font-size:0.95rem; line-height:1.6;">
      <li><strong style="color:var(--text)">User message arrives</strong> at the DO.</li>
      <li><strong style="color:var(--text)">runLoop() fires</strong> — the model calls <code>search()</code>, <code>read_chunks()</code>, and <code>get_index()</code> iteratively via <code>generateText</code> with <code>maxSteps</code>.</li>
      <li><strong style="color:var(--text)">Each tool call</strong> executes against DO storage — sub-millisecond, no network hop.</li>
      <li><strong style="color:var(--text)">Loop ends</strong> when the model returns text instead of a tool call, or when <code>maxDepth</code> / <code>timeoutMs</code> is reached.</li>
      <li><strong style="color:var(--text)">Research result</strong> is injected into the system prompt.</li>
      <li><strong style="color:var(--text)">streamText</strong> produces the final streamed response using the enriched context.</li>
    </ol>

    <h2 id="api">RecursiveMemory API</h2>
    <p>For direct use outside <code>createAgent()</code>:</p>

    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="ty">RecursiveMemory</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="kw">const</span> <span class="fn">mem</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">RecursiveMemory</span>(doStorage<span class="op">,</span> {'{'} <span class="pr">enabled</span><span class="op">:</span> <span class="kw">true</span> {'}'})</span></div>
        <div class="line"><span class="ln"> 4</span><span></span></div>
        <div class="line"><span class="ln"> 5</span><span><span class="cm">// Load a document (chunks + indexes into DO storage)</span></span></div>
        <div class="line"><span class="ln"> 6</span><span><span class="kw">await</span> mem.<span class="fn">loadDocument</span>(<span class="str">'bridge-kb'</span><span class="op">,</span> content<span class="op">,</span> <span class="str">'Bridge Upgrade Guide'</span>)</span></div>
        <div class="line"><span class="ln"> 7</span><span></span></div>
        <div class="line"><span class="ln"> 8</span><span><span class="cm">// Keyword search — returns ranked chunk IDs + snippets</span></span></div>
        <div class="line"><span class="ln"> 9</span><span><span class="kw">const</span> hits <span class="op">=</span> <span class="kw">await</span> mem.<span class="fn">search</span>(<span class="str">'arm mac activation error'</span>)</span></div>
        <div class="line"><span class="ln">10</span><span></span></div>
        <div class="line"><span class="ln">11</span><span><span class="cm">// Fetch full text for specific chunk IDs</span></span></div>
        <div class="line"><span class="ln">12</span><span><span class="kw">const</span> chunks <span class="op">=</span> <span class="kw">await</span> mem.<span class="fn">readChunks</span>([<span class="num">0</span><span class="op">,</span> <span class="num">1</span><span class="op">,</span> <span class="num">2</span>])</span></div>
        <div class="line"><span class="ln">13</span><span></span></div>
        <div class="line"><span class="ln">14</span><span><span class="cm">// List all loaded documents</span></span></div>
        <div class="line"><span class="ln">15</span><span><span class="kw">const</span> index <span class="op">=</span> <span class="kw">await</span> mem.<span class="fn">getIndex</span>()</span></div>
        <div class="line"><span class="ln">16</span><span></span></div>
        <div class="line"><span class="ln">17</span><span><span class="cm">// Run the full REPL loop</span></span></div>
        <div class="line"><span class="ln">18</span><span><span class="kw">const</span> result <span class="op">=</span> <span class="kw">await</span> mem.<span class="fn">runLoop</span>(userMessage<span class="op">,</span> model<span class="op">,</span> systemPrompt)</span></div>
        <div class="line"><span class="ln">19</span><span><span class="cm">// → {'{'} answer: string, iterations: number, chunksRead: number[] {'}'}</span></span></div>
      </div>
    </div>

    <div class="docs-next" style="display:flex;gap:16px;flex-wrap:wrap">
      <a href="/docs/graph-memory">Graph Memory →</a>
      <a href="/docs/workflows" style="color:var(--text-secondary)">Workflows →</a>
    </div>
  </>
)
