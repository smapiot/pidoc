"use strict";(self.webpackChunk_pidoc_core=self.webpackChunk_pidoc_core||[]).push([[518],{5518:(s,n,a)=>{a.r(n),a.d(n,{"default":()=>p});var t=a(2784),e=a(6408),o={title:"HTML",description:"Information about the HTML generator.",audience:"Everyone",level:"Beginner",section:"Generators"};const p=function(){return t.createElement(e.ContentPage,null,t.createElement(e.PageLayout,{name:"default",meta:o},t.createElement(e.PageContent,{meta:o},t.createElement(e.Markdown,{content:'\n<h1 id="html-generator">HTML Generator</h1>\n<p>The Markdown generator transforms single HTML files into documentation pages.</p>\n<p>(tbd)</p>\n<p>Let\'s say you have a folder structure like this:</p>\n<pre><code class="hljs language-plain">docs/\ndocs/foo/content.html\ndocs.config.json\n</code></pre>\n<p>A sitemap section in <em>docs.config.json</em> to cover this would be:</p>\n<pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>\n  <span class="hljs-comment">// ...</span>\n  <span class="hljs-attr">&quot;sitemap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;example&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Example&quot;</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;sections&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n        <span class="hljs-punctuation">{</span>\n          <span class="hljs-attr">&quot;generator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;html&quot;</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;segment&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;dir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;foo&quot;</span>\n        <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">]</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span>\n</code></pre>\n<p>This will look up the <em>.html</em> files in the <code>foo</code> directory below the <code>docs</code> documentation root directory.</p>\n',link:"https://github.com/smapiot/pidoc/tree/develop/packages/example-app/docs/generators/04-html.md",editLabel:"Edit on GitHub"}))))}}}]);
//# sourceMappingURL=5bc59d.js.map