"use strict";(self.webpackChunk_pidoc_core=self.webpackChunk_pidoc_core||[]).push([[529],{529:(s,n,a)=>{a.r(n),a.d(n,{default:()=>l});var t=a(4041),o=a(189),p={title:"Configuration",description:"Details on the configuration.",audience:"Everyone",level:"Beginner",section:"Getting Started"};const l=function(){return t.createElement(o.ContentPage,null,t.createElement(o.PageLayout,{name:"default",meta:p},t.createElement(o.PageContent,{meta:p},t.createElement(o.Markdown,{content:'\n<h1 id="configuration">Configuration</h1>\n<p>The main piece for running <code>pidoc</code> is the <em>docs.config.json</em> file. It should be placed in your main directory, where you\'d run <code>piral-docs</code> (the command line utility for debugging and building the documentation).</p>\n<h2 id="example-configuration">Example Configuration</h2>\n<p>Below you\'ll find an example configuration. Feel free to use this as a boilerplate.</p>\n<pre><code class="hljs language-json"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Your title&quot;</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;description&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Description for metadata.&quot;</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;author&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Your name&quot;</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;branch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;main&quot;</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;repositoryUrl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://github.com/your-orga/your-repo&quot;</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;docsDirName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;docs&quot;</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;rootDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.&quot;</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;outputDir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./dist&quot;</span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;skipEditLabel&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>\n  <span class="hljs-attr">&quot;sitemap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;basics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Basics&quot;</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-attr">&quot;sections&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n        <span class="hljs-punctuation">{</span>\n          <span class="hljs-attr">&quot;generator&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;markdown&quot;</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;segment&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;dir&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;basics&quot;</span>\n        <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">]</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span>\n</code></pre>\n<p>This configuration ends up with a single top-level section (called &quot;chapter&quot;) named &quot;basis&quot; (written on the page as &quot;Basics&quot;). It contains the content from a single section - everything in <code>docs/basics</code> will be consumed by the <code>markdown</code> generator. This is the most &quot;standard&quot; (or from a documentation-perspective &quot;expected&quot;) generator. It is capable of transforming Markdown files (<code>*.md</code>) to pages.</p>\n<p>More about generators can be found in the <a href="/basics/01-overview">generators section</a>.</p>\n<p>For more knowledge about the supported Markdown dialect look at <a href="/basics/03-markdown#basic-features">the basic features</a>.</p>\n<h2 id="configuration-typings">Configuration Typings</h2>\n<p>The configuration is also fully typed. You\'ll find it exported from the types of <code>@pidoc/core</code> (name <code>PiralDocsFullConfig</code>).</p>\n<h2 id="advanced-scenarios">Advanced Scenarios</h2>\n<p>(tbd)</p>\n',link:"https://github.com/smapiot/pidoc/tree/develop/packages/example-app/docs/basics/01-config.md",editLabel:"Edit on GitHub"}))))}}}]);
//# sourceMappingURL=ea3b3c.js.map