import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";

import "highlight.js/styles/monokai-sublime.css";

// ----------------------------------------------------------------------

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);

declare global {
  interface Window {
    hljs: any;
  }
}

// hljs.configure({
//   languages: ["javascript", "jsx", "sh", "bash", "html", "scss", "css", "json"],
// });

if (typeof window !== "undefined") {
  window.hljs = hljs;
}
