export const MemoryPage = () => (
  <>
    <h1>Memory</h1>
    <p class="docs-lead">Honi provides three tiers of memory, each backed by a different Cloudflare primitive. Use one, two, or all three depending on your agent's needs.</p>

    <h2 id="overview">Overview</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Tier</th>
            <th>Backing</th>
            <th>Persistence</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Working</strong></td>
            <td>Durable Object</td>
            <td>Session-scoped</td>
            <td>Conversation history, scratch state</td>
          </tr>
          <tr>
            <td><strong>Episodic</strong></td>
            <td>D1 (SQLite)</td>
            <td>Permanent</td>
            <td>Past conversations, user facts, long-term context</td>
          </tr>
          <tr>
            <td><strong>Semantic</strong></td>
            <td>Vectorize + Workers AI</td>
            <td>Permanent</td>
            <td>Similarity search over knowledge, RAG</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="working-memory">Working Memory (Durable Object)</h2>
    <p>Working memory is always enabled — no configuration needed. It stores the current conversation messages in the Durable Object's transactional storage.</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="cm">// Working memory is automatic — just create an agent</span></span></div>
        <div class="line"><span class="ln">2</span><span><span class="kw">export const</span> <span class="fn">agent</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}
        </span></div>
        <div class="line"><span class="ln">3</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'my-agent'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">4</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-20250514'</span></span></div>
        <div class="line"><span class="ln">5</span><span>{'}'})</span></div>
      </div>
    </div>
    <p>Each session gets its own isolated working memory within the Durable Object. Messages are persisted across requests within a session and cleared on <code>DELETE /chat</code>.</p>

    <h2 id="episodic-memory">Episodic Memory (D1)</h2>
    <p>Episodic memory stores structured facts and past conversation summaries in a D1 database. This allows agents to recall information from previous sessions.</p>
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
        <div class="line"><span class="ln">4</span><span>  <span class="pr">memory</span><span class="op">:</span> {'{'}
        </span></div>
        <div class="line"><span class="ln">5</span><span>    <span class="pr">episodic</span><span class="op">:</span> {'{'} <span class="pr">binding</span><span class="op">:</span> <span class="str">'MEMORY_DB'</span> {'}'}</span></div>
        <div class="line"><span class="ln">6</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">7</span><span>{'}'})</span></div>
      </div>
    </div>

    <h2 id="semantic-memory">Semantic Memory (Vectorize + AI)</h2>
    <p>Semantic memory enables similarity-based retrieval over a knowledge base. Honi uses Cloudflare Vectorize for vector storage and Workers AI for embedding generation.</p>
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
        <div class="line"><span class="ln">4</span><span>  <span class="pr">memory</span><span class="op">:</span> {'{'}
        </span></div>
        <div class="line"><span class="ln">5</span><span>    <span class="pr">episodic</span><span class="op">:</span> {'{'} <span class="pr">binding</span><span class="op">:</span> <span class="str">'MEMORY_DB'</span> {'}'}<span class="op">,</span></span></div>
        <div class="line"><span class="ln">6</span><span>    <span class="pr">semantic</span><span class="op">:</span> {'{'} <span class="pr">vectorize</span><span class="op">:</span> <span class="str">'VECTORIZE'</span><span class="op">,</span> <span class="pr">ai</span><span class="op">:</span> <span class="str">'AI'</span> {'}'}</span></div>
        <div class="line"><span class="ln">7</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">8</span><span>{'}'})</span></div>
      </div>
    </div>

    <p>Or use the shorthand <code>'tiered'</code> to enable all three tiers with default bindings:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="pr">memory</span><span class="op">:</span> <span class="str">'tiered'</span>  <span class="cm">// equivalent to all three tiers with default bindings</span></span></div>
      </div>
    </div>

    <h2 id="wrangler-config">Full wrangler.toml</h2>
    <p>Here's a complete <code>wrangler.toml</code> with all three memory tiers configured:</p>
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
        <div class="line"><span class="ln"> 5</span><span><span class="cm"># Working memory — Durable Object</span></span></div>
        <div class="line"><span class="ln"> 6</span><span><span class="kw">[[durable_objects.bindings]]</span></span></div>
        <div class="line"><span class="ln"> 7</span><span><span class="pr">name</span> <span class="op">=</span> <span class="str">"AGENT"</span></span></div>
        <div class="line"><span class="ln"> 8</span><span><span class="pr">class_name</span> <span class="op">=</span> <span class="str">"AgentDO"</span></span></div>
        <div class="line"><span class="ln"> 9</span><span></span></div>
        <div class="line"><span class="ln">10</span><span><span class="kw">[[migrations]]</span></span></div>
        <div class="line"><span class="ln">11</span><span><span class="pr">tag</span> <span class="op">=</span> <span class="str">"v1"</span></span></div>
        <div class="line"><span class="ln">12</span><span><span class="pr">new_classes</span> <span class="op">=</span> [<span class="str">"AgentDO"</span>]</span></div>
        <div class="line"><span class="ln">13</span><span></span></div>
        <div class="line"><span class="ln">14</span><span><span class="cm"># Episodic memory — D1</span></span></div>
        <div class="line"><span class="ln">15</span><span><span class="kw">[[d1_databases]]</span></span></div>
        <div class="line"><span class="ln">16</span><span><span class="pr">binding</span> <span class="op">=</span> <span class="str">"MEMORY_DB"</span></span></div>
        <div class="line"><span class="ln">17</span><span><span class="pr">database_name</span> <span class="op">=</span> <span class="str">"agent-memory"</span></span></div>
        <div class="line"><span class="ln">18</span><span><span class="pr">database_id</span> <span class="op">=</span> <span class="str">"your-database-id"</span></span></div>
        <div class="line"><span class="ln">19</span><span></span></div>
        <div class="line"><span class="ln">20</span><span><span class="cm"># Semantic memory — Vectorize + Workers AI</span></span></div>
        <div class="line"><span class="ln">21</span><span><span class="kw">[[vectorize]]</span></span></div>
        <div class="line"><span class="ln">22</span><span><span class="pr">binding</span> <span class="op">=</span> <span class="str">"VECTORIZE"</span></span></div>
        <div class="line"><span class="ln">23</span><span><span class="pr">index_name</span> <span class="op">=</span> <span class="str">"agent-knowledge"</span></span></div>
        <div class="line"><span class="ln">24</span><span></span></div>
        <div class="line"><span class="ln">25</span><span><span class="kw">[ai]</span></span></div>
        <div class="line"><span class="ln">26</span><span><span class="pr">binding</span> <span class="op">=</span> <span class="str">"AI"</span></span></div>
      </div>
    </div>

    <div class="docs-next">
      <a href="/docs/workflows">Next: Workflows →</a>
    </div>
  </>
)
