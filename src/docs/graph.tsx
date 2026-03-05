export const GraphPage = () => (
  <>
    <h1>Graph Memory</h1>
    <p class="docs-lead">Graph memory adds a fourth tier to Honi's memory stack — a persistent, queryable knowledge graph backed by <strong>edgraph</strong>, an edge-native property graph built on Cloudflare Durable Objects. Use it to store entities and relationships that your agent discovers, and retrieve them via traversal rather than keyword or vector search.</p>

    <h2 id="why-graph">Why graph memory?</h2>
    <p>The other three tiers answer different questions:</p>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr><th>Tier</th><th>Answers</th></tr>
        </thead>
        <tbody>
          <tr><td>Working (DO)</td><td>"What happened in this conversation?"</td></tr>
          <tr><td>Episodic (D1)</td><td>"What was said across all conversations?"</td></tr>
          <tr><td>Semantic (Vectorize)</td><td>"What's conceptually similar to this?"</td></tr>
          <tr><td><strong>Graph (edgraph)</strong></td><td><strong>"How do these entities relate to each other?"</strong></td></tr>
        </tbody>
      </table>
    </div>
    <p>Graph memory is the right choice when your agent needs to reason about <em>structure</em> — org charts, customer relationships, investment portfolios, knowledge maps — rather than just recall past text.</p>

    <h2 id="edgraph">edgraph</h2>
    <p><strong>edgraph</strong> is a property graph database built on Cloudflare Durable Objects. One DO instance per graph. Multi-hop BFS/DFS traversal runs <em>inside</em> the DO using SQLite — zero per-hop network cost. It stores an adjacency index alongside the edges table so traversal cost is proportional to the local neighbourhood, not the total graph size.</p>
    <p>Deploy your own edgraph instance:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="cm"># Clone and deploy edgraph</span></span></div>
        <div class="line"><span class="ln">2</span><span><span class="kw">git</span> clone https://github.com/stukennedy/edgraph</span></div>
        <div class="line"><span class="ln">3</span><span><span class="kw">cd</span> edgraph && bun install</span></div>
        <div class="line"><span class="ln">4</span><span><span class="kw">wrangler</span> secret put EDGRAPH_API_KEY</span></div>
        <div class="line"><span class="ln">5</span><span><span class="kw">wrangler</span> deploy</span></div>
      </div>
    </div>

    <h2 id="setup">Setup</h2>
    <p>Add edgraph as a CF service binding in your <code>wrangler.toml</code> (preferred — zero latency, CF-internal network) or use an HTTP URL:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TOML</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="cm"># Option A: service binding (recommended — same CF account)</span></span></div>
        <div class="line"><span class="ln">2</span><span><span class="kw">[[services]]</span></span></div>
        <div class="line"><span class="ln">3</span><span><span class="pr">binding</span> <span class="op">=</span> <span class="str">"EDGRAPH"</span></span></div>
        <div class="line"><span class="ln">4</span><span><span class="pr">service</span> <span class="op">=</span> <span class="str">"edgraph"</span></span></div>
        <div class="line"><span class="ln">5</span><span></span></div>
        <div class="line"><span class="ln">6</span><span><span class="cm"># Option B: external HTTP</span></span></div>
        <div class="line"><span class="ln">7</span><span><span class="kw">[vars]</span></span></div>
        <div class="line"><span class="ln">8</span><span><span class="pr">EDGRAPH_URL</span> <span class="op">=</span> <span class="str">"https://edgraph.myapp.workers.dev"</span></span></div>
      </div>
    </div>
    <p>Set the API key as a Worker secret:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="kw">wrangler</span> secret put EDGRAPH_API_KEY</span></div>
      </div>
    </div>

    <h2 id="configure">Configure</h2>
    <p>Enable graph memory in <code>createAgent()</code>:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">export const</span> <span class="fn">agent</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}</span></div>
        <div class="line"><span class="ln"> 2</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'crm-agent'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 3</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-20250514'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 4</span><span>  <span class="pr">memory</span><span class="op">:</span> {'{'}</span></div>
        <div class="line"><span class="ln"> 5</span><span>    <span class="pr">enabled</span><span class="op">:</span> <span class="kw">true</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>    <span class="pr">graph</span><span class="op">:</span> {'{'}</span></div>
        <div class="line"><span class="ln"> 7</span><span>      <span class="pr">enabled</span><span class="op">:</span> <span class="kw">true</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 8</span><span>      <span class="pr">graphId</span><span class="op">:</span> <span class="str">'crm-knowledge-base'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 9</span><span>      <span class="pr">binding</span><span class="op">:</span> <span class="str">'EDGRAPH'</span><span class="op">,</span>          <span class="cm">{'// CF service binding'}</span></span></div>
        <div class="line"><span class="ln">10</span><span>      <span class="pr">apiKeyEnvVar</span><span class="op">:</span> <span class="str">'EDGRAPH_API_KEY'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">11</span><span>      <span class="pr">contextDepth</span><span class="op">:</span> <span class="kw">1</span><span class="op">,</span>              <span class="cm">{'// hop depth for context expansion'}</span></span></div>
        <div class="line"><span class="ln">12</span><span>    {'}'}<span class="op">,</span></span></div>
        <div class="line"><span class="ln">13</span><span>  {'}'}<span class="op">,</span></span></div>
        <div class="line"><span class="ln">14</span><span>{'}'})</span></div>
      </div>
    </div>
    <p>All options for <code>GraphConfig</code>:</p>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>enabled</code></td><td>boolean</td><td>—</td><td>Enable graph memory</td></tr>
          <tr><td><code>graphId</code></td><td>string</td><td>—</td><td>Graph identifier. Maps to one edgraph DO instance.</td></tr>
          <tr><td><code>binding</code></td><td>string</td><td>—</td><td>CF service binding name. Preferred over <code>urlEnvVar</code>.</td></tr>
          <tr><td><code>urlEnvVar</code></td><td>string</td><td>—</td><td>Env var name whose value is the edgraph HTTP URL.</td></tr>
          <tr><td><code>apiKeyEnvVar</code></td><td>string</td><td>—</td><td>Env var name for edgraph API key (required for writes).</td></tr>
          <tr><td><code>contextDepth</code></td><td>number</td><td>1</td><td>Hop depth for graph context expansion during retrieval.</td></tr>
          <tr><td><code>maxContextEntities</code></td><td>number</td><td>5</td><td>Max entities to expand per retrieval. Guards against large context blocks.</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="tool-context">Writing to the graph from tools</h2>
    <p>Tool handlers receive an optional second argument — <code>ctx</code> — which includes the live <code>GraphMemory</code> instance. Use it to write entities as your tool discovers them:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} tool, z {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="kw">const</span> <span class="fn">lookupCustomer</span> <span class="op">=</span> <span class="fn">tool</span>({'{'}</span></div>
        <div class="line"><span class="ln"> 4</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'lookup_customer'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 5</span><span>  <span class="pr">description</span><span class="op">:</span> <span class="str">'Look up a customer by ID'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="pr">input</span><span class="op">:</span> <span class="fn">z.object</span>({'{'} <span class="pr">id</span><span class="op">:</span> <span class="fn">z.string</span>() {'}'})<span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 7</span><span>  <span class="pr">handler</span><span class="op">:</span> <span class="kw">async</span> (input<span class="op">,</span> ctx) <span class="op">=&gt;</span> {'{'}</span></div>
        <div class="line"><span class="ln"> 8</span><span>    <span class="kw">const</span> customer <span class="op">=</span> <span class="kw">await</span> <span class="fn">db.getCustomer</span>(input.id)</span></div>
        <div class="line"><span class="ln"> 9</span><span></span></div>
        <div class="line"><span class="ln">10</span><span>    <span class="cm">{'// Write to graph as we discover entities'}</span></span></div>
        <div class="line"><span class="ln">11</span><span>    <span class="kw">if</span> (ctx?.graph <span class="op">&amp;&amp;</span> customer) {'{'}</span></div>
        <div class="line"><span class="ln">12</span><span>      <span class="kw">await</span> ctx.graph.<span class="fn">upsertNode</span>(customer.id<span class="op">,</span> <span class="str">'Customer'</span><span class="op">,</span> {'{'}</span></div>
        <div class="line"><span class="ln">13</span><span>        <span class="pr">name</span><span class="op">:</span> customer.name<span class="op">,</span> <span class="pr">plan</span><span class="op">:</span> customer.plan</span></div>
        <div class="line"><span class="ln">14</span><span>      {'}'})</span></div>
        <div class="line"><span class="ln">15</span><span>      <span class="kw">if</span> (customer.accountManagerId) {'{'}</span></div>
        <div class="line"><span class="ln">16</span><span>        <span class="kw">await</span> ctx.graph.<span class="fn">upsertEdge</span>(</span></div>
        <div class="line"><span class="ln">17</span><span>          customer.id<span class="op">,</span> customer.accountManagerId<span class="op">,</span> <span class="str">'managed_by'</span></span></div>
        <div class="line"><span class="ln">18</span><span>        )</span></div>
        <div class="line"><span class="ln">19</span><span>      {'}'}</span></div>
        <div class="line"><span class="ln">20</span><span>    {'}'}</span></div>
        <div class="line"><span class="ln">21</span><span></span></div>
        <div class="line"><span class="ln">22</span><span>    <span class="kw">return</span> customer</span></div>
        <div class="line"><span class="ln">23</span><span>  {'}'}<span class="op">,</span></span></div>
        <div class="line"><span class="ln">24</span><span>{'}'})</span></div>
      </div>
    </div>
    <p><code>ctx.graph</code> is the live <code>GraphMemory</code> instance bound to the current agent. Entities written here are immediately available for future context retrieval — and they persist durably across sessions.</p>

    <h2 id="hybrid-retrieval">Hybrid retrieval (Semantic + Graph)</h2>
    <p>When both semantic and graph memory are enabled, Honi performs a two-stage retrieval on every request:</p>
    <ol class="docs-list">
      <li><strong>Semantic search</strong> — embeds the user message and finds the top-K similar past episodes in Vectorize.</li>
      <li><strong>Entity extraction</strong> — collects any <code>entityId</code> values from the semantic result metadata.</li>
      <li><strong>Graph expansion</strong> — calls <code>toContext(entityIds, depth)</code> on those IDs, expanding each into its local neighbourhood.</li>
      <li><strong>Context injection</strong> — both the semantic results and the graph context are prepended to the system prompt before the LLM sees the message.</li>
    </ol>
    <p>The result: instead of "here are some similar past conversations", your agent gets the full structured picture of the entities involved — including relationships they've never been directly told about.</p>

    <h2 id="standalone">Using GraphMemory standalone</h2>
    <p><code>GraphMemory</code> can be used independently of <code>createAgent()</code> — as a shared knowledge base across multiple services:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} GraphMemory {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="kw">const</span> graph <span class="op">=</span> <span class="kw">new</span> <span class="fn">GraphMemory</span>({'{'}</span></div>
        <div class="line"><span class="ln"> 4</span><span>  <span class="pr">graphId</span><span class="op">:</span> <span class="str">'crm'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 5</span><span>  <span class="pr">url</span><span class="op">:</span> <span class="str">'https://edgraph.myapp.workers.dev'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="pr">apiKey</span><span class="op">:</span> process.env.EDGRAPH_API_KEY</span></div>
        <div class="line"><span class="ln"> 7</span><span>{'}'})</span></div>
        <div class="line"><span class="ln"> 8</span><span></span></div>
        <div class="line"><span class="ln"> 9</span><span><span class="cm">{'// Write entities'}</span></span></div>
        <div class="line"><span class="ln">10</span><span><span class="kw">await</span> graph.<span class="fn">upsertNode</span>(<span class="str">'alice'</span><span class="op">,</span> <span class="str">'Person'</span><span class="op">,</span> {'{'} <span class="pr">role</span><span class="op">:</span> <span class="str">'CTO'</span> {'}'})</span></div>
        <div class="line"><span class="ln">11</span><span><span class="kw">await</span> graph.<span class="fn">upsertNode</span>(<span class="str">'acme'</span><span class="op">,</span> <span class="str">'Company'</span><span class="op">,</span> {'{'} <span class="pr">industry</span><span class="op">:</span> <span class="str">'SaaS'</span> {'}'})</span></div>
        <div class="line"><span class="ln">12</span><span><span class="kw">await</span> graph.<span class="fn">upsertEdge</span>(<span class="str">'alice'</span><span class="op">,</span> <span class="str">'acme'</span><span class="op">,</span> <span class="str">'works_at'</span>)</span></div>
        <div class="line"><span class="ln">13</span><span></span></div>
        <div class="line"><span class="ln">14</span><span><span class="cm">{'// Traverse and generate LLM context'}</span></span></div>
        <div class="line"><span class="ln">15</span><span><span class="kw">const</span> context <span class="op">=</span> <span class="kw">await</span> graph.<span class="fn">toContext</span>([<span class="str">'alice'</span>]<span class="op">,</span> <span class="kw">2</span>)</span></div>
        <div class="line"><span class="ln">16</span><span><span class="cm">{'// → "[Knowledge graph context:]'}</span></span></div>
        <div class="line"><span class="ln">17</span><span><span class="cm">{'//    (Person:alice) {role="CTO"}'}</span></span></div>
        <div class="line"><span class="ln">18</span><span><span class="cm">{'//      → [works_at] → (Company:acme)"'}</span></span></div>
        <div class="line"><span class="ln">19</span><span></span></div>
        <div class="line"><span class="ln">20</span><span><span class="cm">{'// Traversal'}</span></span></div>
        <div class="line"><span class="ln">21</span><span><span class="kw">const</span> neighbours <span class="op">=</span> <span class="kw">await</span> graph.<span class="fn">getNeighbours</span>(<span class="str">'alice'</span><span class="op">,</span> <span class="str">'out'</span>)</span></div>
        <div class="line"><span class="ln">22</span><span><span class="kw">const</span> path <span class="op">=</span> <span class="kw">await</span> graph.<span class="fn">shortestPath</span>(<span class="str">'alice'</span><span class="op">,</span> <span class="str">'bob'</span>)</span></div>
      </div>
    </div>

    <h2 id="api">GraphMemory API</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr><th>Method</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>upsertNode(id, label, props)</code></td><td>Create or update a node</td></tr>
          <tr><td><code>upsertEdge(fromId, toId, type, props?)</code></td><td>Create or update a directed edge</td></tr>
          <tr><td><code>getNode(id)</code></td><td>Fetch a single node by ID</td></tr>
          <tr><td><code>listNodes(opts)</code></td><td>List nodes, optionally filtered by label</td></tr>
          <tr><td><code>getNeighbours(id, direction?, types?)</code></td><td>Direct neighbours (in/out/both, filter by edge type)</td></tr>
          <tr><td><code>traverse(from, opts)</code></td><td>BFS or DFS traversal with depth, edge type, and node label filters</td></tr>
          <tr><td><code>shortestPath(from, to)</code></td><td>Shortest path between two nodes</td></tr>
          <tr><td><code>subgraph(root, depth, direction)</code></td><td>Extract a local subgraph around a root node</td></tr>
          <tr><td><code>toContext(entityIds, depth?)</code></td><td>Render entity subgraphs as an LLM-injectable text block</td></tr>
          <tr><td><code>deleteNode(id)</code></td><td>Delete a node</td></tr>
          <tr><td><code>deleteEdge(id)</code></td><td>Delete an edge</td></tr>
          <tr><td><code>stats()</code></td><td>Node and edge counts</td></tr>
        </tbody>
      </table>
    </div>

    <h2 id="performance">Performance characteristics</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr><th>Operation</th><th>Complexity</th></tr>
        </thead>
        <tbody>
          <tr><td>Get node / edge</td><td>O(1) — primary key lookup</td></tr>
          <tr><td>Get neighbours</td><td>O(degree) — adjacency index</td></tr>
          <tr><td>k-hop traversal</td><td>O(k × avg_degree) — no full-table scan</td></tr>
          <tr><td>Shortest path (BFS)</td><td>O(V + E) over reachable subgraph</td></tr>
          <tr><td>Subgraph extraction</td><td>O(nodes + edges in subgraph)</td></tr>
        </tbody>
      </table>
    </div>
    <p>All traversal runs inside the Durable Object's SQLite — a single HTTP call regardless of hop count.</p>

    <div class="docs-next">
      <a href="/docs/workflows">Next: Workflows →</a>
    </div>
  </>
)
