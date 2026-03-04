export const McpPage = () => (
  <>
    <h1>MCP Server</h1>
    <p class="docs-lead">Expose your agent's tools as a Model Context Protocol (MCP) endpoint — connect from Claude Desktop, Cursor, or any MCP-compatible client.</p>

    <h2 id="how-it-works">How it works</h2>
    <p>Honi agents automatically expose a <code>/mcp</code> route when tools are defined. The endpoint speaks JSON-RPC 2.0 and implements the MCP 2024-11-05 protocol spec. No extra config needed — tools you define with <code>tool()</code> are automatically available over MCP.</p>

    <h2 id="endpoints">Endpoints</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr><th>Endpoint</th><th>Method</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>/mcp</code></td>
            <td><code>POST</code></td>
            <td>JSON-RPC 2.0 MCP endpoint (initialize, tools/list, tools/call)</td>
          </tr>
          <tr>
            <td><code>/mcp/tools</code></td>
            <td><code>GET</code></td>
            <td>Convenience endpoint — lists available tools as JSON</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="claude-desktop">Connect from Claude Desktop</h2>
    <p>Add your deployed agent to Claude Desktop's MCP config:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">JSON — claude_desktop_config.json</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span>{'{'}</span></div>
        <div class="line"><span class="ln"> 2</span><span>  <span class="str">"mcpServers"</span><span class="op">:</span> {'{'}</span></div>
        <div class="line"><span class="ln"> 3</span><span>    <span class="str">"my-honi-agent"</span><span class="op">:</span> {'{'}</span></div>
        <div class="line"><span class="ln"> 4</span><span>      <span class="str">"url"</span><span class="op">:</span> <span class="str">"https://my-agent.workers.dev/mcp"</span></span></div>
        <div class="line"><span class="ln"> 5</span><span>    {'}'}</span></div>
        <div class="line"><span class="ln"> 6</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln"> 7</span><span>{'}'}</span></div>
      </div>
    </div>

    <h2 id="cursor">Connect from Cursor</h2>
    <p>In Cursor settings → MCP, add a new server with the <code>/mcp</code> URL of your deployed worker.</p>

    <h2 id="standalone">Standalone MCP Server</h2>
    <p>You can also use <code>createMcpServer</code> directly without <code>createAgent</code> — useful for exposing a set of tools without a chat interface:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">createMcpServer</span><span class="op">,</span> <span class="fn">tool</span><span class="op">,</span> <span class="fn">z</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="kw">const</span> <span class="fn">searchDocs</span> <span class="op">=</span> <span class="fn">tool</span>({'{'}</span></div>
        <div class="line"><span class="ln"> 4</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'search_docs'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 5</span><span>  <span class="pr">description</span><span class="op">:</span> <span class="str">'Search internal documentation'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="pr">input</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">object</span>({'{'} <span class="pr">query</span><span class="op">:</span> <span class="fn">z</span>.<span class="fn">string</span>() {'}'})<span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 7</span><span>  <span class="pr">handler</span><span class="op">:</span> <span class="kw">async</span> ({'{'} <span class="pr">query</span> {'}'}) <span class="op">=&gt;</span> <span class="fn">searchIndex</span>(<span class="pr">query</span>)</span></div>
        <div class="line"><span class="ln"> 8</span><span>{'}'})</span></div>
        <div class="line"><span class="ln"> 9</span><span></span></div>
        <div class="line"><span class="ln">10</span><span><span class="kw">const</span> <span class="fn">mcp</span> <span class="op">=</span> <span class="fn">createMcpServer</span>([<span class="fn">searchDocs</span>])</span></div>
        <div class="line"><span class="ln">11</span><span></span></div>
        <div class="line"><span class="ln">12</span><span><span class="kw">export default</span> {'{'}</span></div>
        <div class="line"><span class="ln">13</span><span>  <span class="kw">async</span> <span class="fn">fetch</span>(<span class="pr">req</span><span class="op">:</span> <span class="ty">Request</span>) {'{'}</span></div>
        <div class="line"><span class="ln">14</span><span>    <span class="kw">return</span> <span class="fn">mcp</span>.<span class="fn">handleHttp</span>(<span class="pr">req</span>)</span></div>
        <div class="line"><span class="ln">15</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">16</span><span>{'}'}</span></div>
      </div>
    </div>

    <h2 id="api">API Reference</h2>

    <h3>createMcpServer(tools)</h3>
    <p>Creates an MCP server from an array of tool definitions. Returns an object with:</p>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr><th>Property</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>handleHttp</code></td>
            <td><code>(req: Request) =&gt; Promise&lt;Response&gt;</code></td>
            <td>HTTP handler — wire directly to your Worker's fetch</td>
          </tr>
          <tr>
            <td><code>handleRequest</code></td>
            <td><code>(req: McpRequest) =&gt; Promise&lt;McpResponse&gt;</code></td>
            <td>Low-level JSON-RPC handler</td>
          </tr>
          <tr>
            <td><code>tools</code></td>
            <td><code>McpToolInfo[]</code></td>
            <td>Tool definitions in MCP format</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>toolsToMcp(tools)</h3>
    <p>Converts an array of Honi <code>ToolDefinition</code> objects to MCP tool format (with JSON Schema). Useful if you need the tool list for other purposes.</p>

    <h2 id="supported-methods">Supported MCP Methods</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr><th>Method</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>initialize</code></td><td>Handshake — returns protocol version and capabilities</td></tr>
          <tr><td><code>tools/list</code></td><td>Returns all tools with their JSON Schema definitions</td></tr>
          <tr><td><code>tools/call</code></td><td>Executes a tool by name with validated arguments</td></tr>
          <tr><td><code>ping</code></td><td>Health check</td></tr>
        </tbody>
      </table>
    </div>

    <div class="docs-next">
      <a href="/docs/multiagent">Multi-Agent Orchestration →</a>
    </div>
  </>
)
