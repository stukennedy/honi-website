export const WorkflowsPage = () => (
  <>
    <h1>Workflows</h1>
    <p class="docs-lead">Build multi-step, durable pipelines with automatic retries and checkpointing, powered by Cloudflare Workflows.</p>

    <h2 id="workflow-api">workflow() API</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="kw">import</span> {'{'} <span class="fn">workflow</span><span class="op">,</span> <span class="fn">step</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln">2</span><span></span></div>
        <div class="line"><span class="ln">3</span><span><span class="kw">function</span> <span class="fn">workflow</span>(<span class="pr">config</span><span class="op">:</span> <span class="ty">WorkflowConfig</span>)<span class="op">:</span> <span class="ty">Workflow</span></span></div>
        <div class="line"><span class="ln">4</span><span><span class="kw">function</span> <span class="fn">step</span>(<span class="pr">name</span><span class="op">:</span> <span class="ty">string</span><span class="op">,</span> <span class="pr">config</span><span class="op">:</span> <span class="ty">StepConfig</span>)<span class="op">:</span> <span class="ty">Step</span></span></div>
      </div>
    </div>

    <h2 id="step-config">StepConfig</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>retries</code></td>
            <td><code>number</code></td>
            <td><code>3</code></td>
            <td>Number of retry attempts on failure</td>
          </tr>
          <tr>
            <td><code>timeout</code></td>
            <td><code>string</code></td>
            <td><code>'30s'</code></td>
            <td>Max duration per attempt (e.g. '30s', '5m')</td>
          </tr>
          <tr>
            <td><code>backoff</code></td>
            <td><code>'linear' | 'exponential'</code></td>
            <td><code>'exponential'</code></td>
            <td>Retry backoff strategy</td>
          </tr>
          <tr>
            <td><code>run</code></td>
            <td><code>(input, ctx) =&gt; Promise&lt;any&gt;</code></td>
            <td>-</td>
            <td>Step execution handler</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="callbacks">Callbacks</h2>
    <div class="docs-table-wrap">
      <table class="docs-table">
        <thead>
          <tr>
            <th>Callback</th>
            <th>When</th>
            <th>Arguments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>onComplete</code></td>
            <td>All steps finish successfully</td>
            <td><code>(results: StepResult[]) =&gt; void</code></td>
          </tr>
          <tr>
            <td><code>onError</code></td>
            <td>A step exhausts all retries</td>
            <td><code>(error: Error, stepName: string) =&gt; void</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="example">Example: Research Pipeline</h2>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TypeScript</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln"> 1</span><span><span class="kw">import</span> {'{'} <span class="fn">workflow</span><span class="op">,</span> <span class="fn">step</span> {'}'} <span class="kw">from</span> <span class="str">'honidev'</span></span></div>
        <div class="line"><span class="ln"> 2</span><span></span></div>
        <div class="line"><span class="ln"> 3</span><span><span class="kw">export const</span> <span class="fn">researchPipeline</span> <span class="op">=</span> <span class="fn">workflow</span>({'{'}
        </span></div>
        <div class="line"><span class="ln"> 4</span><span>  <span class="pr">name</span><span class="op">:</span> <span class="str">'research'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 5</span><span></span></div>
        <div class="line"><span class="ln"> 6</span><span>  <span class="pr">steps</span><span class="op">:</span> [</span></div>
        <div class="line"><span class="ln"> 7</span><span>    <span class="fn">step</span>(<span class="str">'gather'</span><span class="op">,</span> {'{'}
        </span></div>
        <div class="line"><span class="ln"> 8</span><span>      <span class="pr">timeout</span><span class="op">:</span> <span class="str">'2m'</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln"> 9</span><span>      <span class="kw">async</span> <span class="fn">run</span>(<span class="pr">input</span><span class="op">,</span> <span class="pr">ctx</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln">10</span><span>        <span class="cm">// Fetch data from multiple sources</span></span></div>
        <div class="line"><span class="ln">11</span><span>        <span class="kw">const</span> <span class="pr">sources</span> <span class="op">=</span> <span class="kw">await</span> <span class="fn">fetchSources</span>(<span class="pr">input</span>.<span class="pr">topic</span>)</span></div>
        <div class="line"><span class="ln">12</span><span>        <span class="kw">return</span> {'{'} <span class="pr">sources</span> {'}'}</span></div>
        <div class="line"><span class="ln">13</span><span>      {'}'}</span></div>
        <div class="line"><span class="ln">14</span><span>    {'}'})<span class="op">,</span></span></div>
        <div class="line"><span class="ln">15</span><span></span></div>
        <div class="line"><span class="ln">16</span><span>    <span class="fn">step</span>(<span class="str">'analyze'</span><span class="op">,</span> {'{'}
        </span></div>
        <div class="line"><span class="ln">17</span><span>      <span class="pr">retries</span><span class="op">:</span> <span class="str">2</span><span class="op">,</span></span></div>
        <div class="line"><span class="ln">18</span><span>      <span class="kw">async</span> <span class="fn">run</span>(<span class="pr">input</span><span class="op">,</span> <span class="pr">ctx</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln">19</span><span>        <span class="cm">// Use LLM to analyze gathered data</span></span></div>
        <div class="line"><span class="ln">20</span><span>        <span class="kw">const</span> <span class="pr">analysis</span> <span class="op">=</span> <span class="kw">await</span> <span class="pr">ctx</span>.<span class="fn">llm</span>(<span class="str">'Analyze these sources...'</span><span class="op">,</span> <span class="pr">input</span>.<span class="pr">sources</span>)</span></div>
        <div class="line"><span class="ln">21</span><span>        <span class="kw">return</span> {'{'} <span class="pr">analysis</span> {'}'}</span></div>
        <div class="line"><span class="ln">22</span><span>      {'}'}</span></div>
        <div class="line"><span class="ln">23</span><span>    {'}'})<span class="op">,</span></span></div>
        <div class="line"><span class="ln">24</span><span></span></div>
        <div class="line"><span class="ln">25</span><span>    <span class="fn">step</span>(<span class="str">'summarize'</span><span class="op">,</span> {'{'}
        </span></div>
        <div class="line"><span class="ln">26</span><span>      <span class="kw">async</span> <span class="fn">run</span>(<span class="pr">input</span><span class="op">,</span> <span class="pr">ctx</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln">27</span><span>        <span class="kw">const</span> <span class="pr">summary</span> <span class="op">=</span> <span class="kw">await</span> <span class="pr">ctx</span>.<span class="fn">llm</span>(<span class="str">'Summarize the analysis...'</span><span class="op">,</span> <span class="pr">input</span>.<span class="pr">analysis</span>)</span></div>
        <div class="line"><span class="ln">28</span><span>        <span class="kw">return</span> {'{'} <span class="pr">summary</span> {'}'}</span></div>
        <div class="line"><span class="ln">29</span><span>      {'}'}</span></div>
        <div class="line"><span class="ln">30</span><span>    {'}'})</span></div>
        <div class="line"><span class="ln">31</span><span>  ]<span class="op">,</span></span></div>
        <div class="line"><span class="ln">32</span><span></span></div>
        <div class="line"><span class="ln">33</span><span>  <span class="fn">onComplete</span>(<span class="pr">results</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln">34</span><span>    <span class="pr">console</span>.<span class="fn">log</span>(<span class="str">'Research complete!'</span><span class="op">,</span> <span class="pr">results</span>)</span></div>
        <div class="line"><span class="ln">35</span><span>  {'}'}<span class="op">,</span></span></div>
        <div class="line"><span class="ln">36</span><span></span></div>
        <div class="line"><span class="ln">37</span><span>  <span class="fn">onError</span>(<span class="pr">error</span><span class="op">,</span> <span class="pr">stepName</span>) {'{'}
        </span></div>
        <div class="line"><span class="ln">38</span><span>    <span class="pr">console</span>.<span class="fn">error</span>(<span class="str">`Step ${'{'}stepName{'}'} failed:`</span><span class="op">,</span> <span class="pr">error</span>)</span></div>
        <div class="line"><span class="ln">39</span><span>  {'}'}</span></div>
        <div class="line"><span class="ln">40</span><span>{'}'})</span></div>
      </div>
    </div>

    <h2 id="wrangler">wrangler.toml Binding</h2>
    <p>Workflows require a binding in your <code>wrangler.toml</code>:</p>
    <div class="code-window docs-code">
      <div class="code-header">
        <div class="code-dots"><span /><span /><span /></div>
        <span class="code-lang">TOML</span>
      </div>
      <div class="code-body">
        <div class="line"><span class="ln">1</span><span><span class="kw">[[workflows]]</span></span></div>
        <div class="line"><span class="ln">2</span><span><span class="pr">name</span> <span class="op">=</span> <span class="str">"research"</span></span></div>
        <div class="line"><span class="ln">3</span><span><span class="pr">binding</span> <span class="op">=</span> <span class="str">"RESEARCH_WORKFLOW"</span></span></div>
        <div class="line"><span class="ln">4</span><span><span class="pr">class_name</span> <span class="op">=</span> <span class="str">"ResearchPipeline"</span></span></div>
      </div>
    </div>

    <div class="docs-next">
      <a href="/docs/observability">Next: Observability →</a>
    </div>
  </>
)
