export const CreateAgentPage = () => (
  <>
    <h1>createAgent</h1>
    <p class="docs-lead">The core factory function that creates an AI agent backed by a Cloudflare Durable Object.</p>

    <h2 id="signature">Signature</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="kw">function</span> <span class="fn">createAgent</span>(<span class="pr">config</span><span class="op">:</span> <span class="ty">AgentConfig</span>)<span class="op">:</span> <span class="ty">DurableObject</span></span></div>
      </div>
    </div>

    <h2 id="agent-config">AgentConfig</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>name</code></td>
            <td><code>string</code></td>
            <td>Yes</td>
            <td>Unique identifier for this agent type</td>
          </tr>
          <tr>
            <td><code>model</code></td>
            <td><code>string</code></td>
            <td>Yes</td>
            <td>LLM model identifier (see supported models below)</td>
          </tr>
          <tr>
            <td><code>system</code></td>
            <td><code>string</code></td>
            <td>No</td>
            <td>System prompt / instructions for the agent</td>
          </tr>
          <tr>
            <td><code>tools</code></td>
            <td><code>Record&lt;string, Tool&gt;</code></td>
            <td>No</td>
            <td>Named tools the agent can invoke</td>
          </tr>
          <tr>
            <td><code>memory</code></td>
            <td><code>MemoryConfig | 'tiered'</code></td>
            <td>No</td>
            <td>Memory tier configuration</td>
          </tr>
          <tr>
            <td><code>observability</code></td>
            <td><code>ObservabilityConfig</code></td>
            <td>No</td>
            <td>Logging and tracing configuration</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="models">Supported Models</h2>
    <p>Honi routes to the right provider automatically based on the model ID prefix. All non-core providers use optional peer deps — zero bundle cost unless installed.</p>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Prefix</th>
            <th>Example model</th>
            <th>Env var</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anthropic</td>
            <td><code>claude-*</code></td>
            <td><code>claude-sonnet-4-5</code></td>
            <td><code>ANTHROPIC_API_KEY</code></td>
          </tr>
          <tr>
            <td>OpenAI</td>
            <td><code>gpt-*</code>, <code>o1</code>, <code>o3-*</code></td>
            <td><code>gpt-4o</code>, <code>o3-mini</code></td>
            <td><code>OPENAI_API_KEY</code></td>
          </tr>
          <tr>
            <td>Google</td>
            <td><code>gemini-*</code></td>
            <td><code>gemini-2.5-flash-preview</code></td>
            <td><code>GOOGLE_AI_API_KEY</code></td>
          </tr>
          <tr>
            <td>Groq</td>
            <td><code>groq/*</code></td>
            <td><code>groq/llama-3.3-70b-versatile</code></td>
            <td><code>GROQ_API_KEY</code></td>
          </tr>
          <tr>
            <td>DeepSeek</td>
            <td><code>deepseek-*</code></td>
            <td><code>deepseek-chat</code>, <code>deepseek-reasoner</code></td>
            <td><code>DEEPSEEK_API_KEY</code></td>
          </tr>
          <tr>
            <td>Mistral</td>
            <td><code>mistral-*</code>, <code>codestral-*</code></td>
            <td><code>mistral-large-latest</code></td>
            <td><code>MISTRAL_API_KEY</code></td>
          </tr>
          <tr>
            <td>xAI</td>
            <td><code>grok-*</code></td>
            <td><code>grok-3</code>, <code>grok-3-mini</code></td>
            <td><code>XAI_API_KEY</code></td>
          </tr>
          <tr>
            <td>Perplexity</td>
            <td><code>sonar*</code></td>
            <td><code>sonar-pro</code>, <code>sonar-reasoning</code></td>
            <td><code>PERPLEXITY_API_KEY</code></td>
          </tr>
          <tr>
            <td>Together AI</td>
            <td><code>together/*</code></td>
            <td><code>together/meta-llama/Llama-3.3-70B-Instruct-Turbo</code></td>
            <td><code>TOGETHER_API_KEY</code></td>
          </tr>
          <tr>
            <td>Cohere</td>
            <td><code>command-*</code></td>
            <td><code>command-r-plus</code>, <code>command-a-03-2025</code></td>
            <td><code>COHERE_API_KEY</code></td>
          </tr>
          <tr>
            <td>Azure OpenAI</td>
            <td><code>azure/*</code></td>
            <td><code>azure/gpt-4o</code></td>
            <td><code>AZURE_OPENAI_API_KEY</code> + <code>AZURE_OPENAI_ENDPOINT</code></td>
          </tr>
          <tr>
            <td>Workers AI</td>
            <td><code>@cf/*</code></td>
            <td><code>@cf/meta/llama-3.1-8b-instruct</code></td>
            <td><code>AI</code> binding (wrangler.toml)</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>Non-core providers require their AI SDK package:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/google      <span class="cm"># Google Gemini</span></span></div>
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/groq        <span class="cm"># Groq</span></span></div>
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/deepseek    <span class="cm"># DeepSeek</span></span></div>
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/mistral     <span class="cm"># Mistral</span></span></div>
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/xai         <span class="cm"># xAI</span></span></div>
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/perplexity  <span class="cm"># Perplexity</span></span></div>
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/togetherai  <span class="cm"># Together AI</span></span></div>
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/cohere      <span class="cm"># Cohere</span></span></div>
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/azure       <span class="cm"># Azure OpenAI</span></span></div>
        <div class="line"><span class="ln">$</span><span>npm install @ai-sdk/cloudflare  <span class="cm"># Workers AI</span></span></div>
      </div>
    </div>

    <h2 id="endpoints">HTTP Endpoints</h2>
    <p>A Honi agent automatically exposes the following HTTP endpoints:</p>

    <h3>POST /chat</h3>
    <p>Send a message to the agent and receive a response.</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">JSON</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> </span><span><span class="cm">// Request</span></span></div>
        <div class="line"><span class="ln"> </span><span>{'{'}</span></div>
        <div class="line"><span class="ln"> </span><span>  <span class="pr">"message"</span><span class="op">:</span> <span class="str">"What's the weather today?"</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> </span><span>  <span class="pr">"sessionId"</span><span class="op">:</span> <span class="str">"user-123"</span>  <span class="cm">// optional</span></span></div>
        <div class="line"><span class="ln"> </span><span>{'}'}</span></div>
        <div class="line"><span class="ln"> </span><span></span></div>
        <div class="line"><span class="ln"> </span><span><span class="cm">// Response</span></span></div>
        <div class="line"><span class="ln"> </span><span>{'{'}</span></div>
        <div class="line"><span class="ln"> </span><span>  <span class="pr">"response"</span><span class="op">:</span> <span class="str">"I don't have access to weather data..."</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> </span><span>  <span class="pr">"sessionId"</span><span class="op">:</span> <span class="str">"user-123"</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> </span><span>  <span class="pr">"toolCalls"</span><span class="op">:</span> []</span></div>
        <div class="line"><span class="ln"> </span><span>{'}'}</span></div>
      </div>
    </div>

    <h3>DELETE /chat</h3>
    <p>Reset the agent's conversation history for a given session.</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">JSON</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> </span><span>{'{'} <span class="pr">"sessionId"</span><span class="op">:</span> <span class="str">"user-123"</span> {'}'}</span></div>
      </div>
    </div>

    <h2 id="streaming">Streaming (SSE)</h2>
    <p>Add <code>Accept: text/event-stream</code> to your POST /chat request to receive Server-Sent Events. Tokens are streamed as they are generated by the LLM:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">Shell</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">$</span><span>curl -N -X POST http://localhost:8787/chat \</span></div>
        <div class="line"><span class="ln"> </span><span>  -H <span class="str">"Content-Type: application/json"</span> \</span></div>
        <div class="line"><span class="ln"> </span><span>  -H <span class="str">"Accept: text/event-stream"</span> \</span></div>
        <div class="line"><span class="ln"> </span><span>  -d <span class="str">{'\'{"message": "Hello"}\''}</span></span></div>
      </div>
    </div>
    <p>Each SSE event has a <code>type</code> field: <code>token</code>, <code>tool_call</code>, <code>tool_result</code>, or <code>done</code>.</p>

    <h2 id="full-example">Full Example</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">createAgent</span><span class="op">,</span> <span class="fn">tool</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span><span class="kw">import</span> {'{'} <span class="fn">z</span> {'}'} <span class="kw">from</span> <span class="str">'zod'</span></span></div>
        <div class="line"><span class="ln"> 3</span><span></span></div>
        <div class="line"><span class="ln"> 4</span><span><span class="kw">export const</span> <span class="fn">agent</span> <span class="op">=</span> <span class="fn">createAgent</span>({'{'}
        </span></div>
        <div class="line"><span class="ln"> 5</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'support-bot'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="pr">model</span><span class="op">:</span> <span class="str">'claude-sonnet-4-20250514'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 7</span><span>  <span class="pr">system</span><span class="op">:</span> <span class="str">'You are a customer support agent.'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 8</span><span>  <span class="pr">memory</span><span class="op">:</span> <span class="str">'tiered'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 9</span><span></span></div>
        <div class="line"><span class="ln">10</span><span>  <span class="pr">tools</span><span class="op">:</span> {'{'}
        </span></div>
        <div class="line"><span class="ln">11</span><span>    <span class="fn">lookupOrder</span><span class="op">:</span> <span class="fn">tool</span>({'{'}
        </span></div>
        <div class="line"><span class="ln">12</span><span>      <span class="pr">description</span><span class="op">:</span> <span class="str">'Look up a customer order'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">13</span><span>      <span class="pr">input</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">object</span>({'{'} <span class="pr">orderId</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>() {'}'})<span class="op">,</span></span></div>
        <div class="line"><span class="ln">14</span><span>      <span class="kw">async</span> <span class="fn">run</span>({'{'} <span class="pr">orderId</span> {'}'}<span class="op">,</span> <span class="pr">ctx</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln">15</span><span>        <span class="kw">return</span> <span class="pr">ctx</span>.<span class="pr">env</span>.<span class="fn">DB</span>.<span class="fn">prepare</span>(<span class="str">'SELECT * FROM orders WHERE id = ?'</span>)</span></div>
        <div class="line"><span class="ln">16</span><span>          .<span class="fn">bind</span>(<span class="pr">orderId</span>).<span class="fn">first</span>()</span></div>
        <div class="line"><span class="ln">17</span><span>      {'}'}
        </span></div>
        <div class="line"><span class="ln">18</span><span>    {'}'})<span class="op">,</span></span></div>
        <div class="line"><span class="ln">19</span><span>  {'}'}<span class="op">,</span></span></div>
        <div class="line"><span class="ln">20</span><span></span></div>
        <div class="line"><span class="ln">21</span><span>  <span class="pr">observability</span><span class="op">:</span> {'{'}
        </span></div>
        <div class="line"><span class="ln">22</span><span>    <span class="pr">logLevel</span><span class="op">:</span> <span class="str">'info'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">23</span><span>    <span class="pr">aiGateway</span><span class="op">:</span> {'{'} <span class="pr">accountId</span><span class="op">:</span> <span class="str">'...'</span><span class="op">,</span> <span class="pr">gatewayId</span><span class="op">:</span> <span class="str">'my-gw'</span> {'}'}</span></div>
        <div class="line"><span class="ln">24</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">25</span><span>{'}'})</span></div>
      </div>
    </div>

    <div class="docs-next">
      <a href="/docs/tools">Next: Tools →</a>
    </div>
  </>
)
