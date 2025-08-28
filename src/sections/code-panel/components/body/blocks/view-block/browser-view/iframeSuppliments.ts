export function iframeSuppliments3() {
  return (
    ` 
  document.querySelector('[contenteditable]')?.addEventListener('paste', function(e) {
    // Get pasted text
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    // Give browser time to process the paste
    // setTimeout(() => {
    //     const images = this.querySelectorAll('img');
        
    //     // Get the last image (most recently pasted)
    //     const img = images[images.length - 1];
        
    //     if (img) {
    //         // Set your maximum dimensions
    //         const maxWidth = 500;  // Adjust as needed
    //         const maxHeight = 400; // Adjust as needed
            
    //         // Calculate new dimensions maintaining aspect ratio
    //         let [w, h] = [img.naturalWidth, img.naturalHeight];
    //         if (w > maxWidth) [w, h] = [maxWidth, h * maxWidth / w];
    //         if (h > maxHeight) [w, h] = [w * maxHeight / h, maxHeight];
            
    //         // Apply the new dimensions
    //         img.style.maxWidth = \`\${w}px\`;
    //         img.style.maxHeight = \`\${h}px\`;
    //         img.style.width = 'auto';
    //         img.style.height = 'auto';
    //     }
    // }, 0);
    
    // Check if it's a YouTube URL
    const youtubeRegex = ` +
    '/(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com|youtu\\.be)\\/(?:watch\\?v=|embed\\/|v\\/|shorts\\/)?([a-zA-Z0-9_-]{11})/' +
    `;
    const match = pastedText.match(youtubeRegex);
    
    if (match && match[1]) {
        e.preventDefault();
        const videoId = match[1];
        
        // Create responsive YouTube embed
        const embedHtml = \`
        <div class="youtube-embed" style="
            position: relative;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0;
            overflow: hidden;
            max-width: 100%;
            margin: 10px 0;
        ">
            <iframe 
                src="https://www.youtube.com/embed/\${videoId}" 
                style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                " 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        \`;
        
        // Insert at cursor position
        document.execCommand('insertHTML', false, embedHtml);
    }
});

window.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'simulatePaste') { 

  console.log("event.data.content", event.data.content )
      // Check if it's a YouTube URL
    const youtubeRegex = ` +
    '/(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com|youtu\\.be)\\/(?:watch\\?v=|embed\\/|v\\/|shorts\\/)?([a-zA-Z0-9_-]{11})/' +
    `;
    const match = event.data.content.match(youtubeRegex);
    
    if (match && match[1]) {
        event.preventDefault();
        const videoId = match[1];
        
        // Create responsive YouTube embed
        const embedHtml = \`
        <div class="youtube-embed" style="
            position: relative;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0;
            overflow: hidden;
            max-width: 100%;
            margin: 10px 0;
        ">
            <iframe 
                src="https://www.youtube.com/embed/\${videoId}" 
                style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                " 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        \`;

        // Insert at cursor position
        document.execCommand('insertHTML', false, embedHtml);
      }

       document.execCommand('insertHTML', false, event.data.content)
  }
});


  `
  )
}

export function iframeSuppliments() {
  return `
(function () {
  if (window.__iframeSupplementsInstalled) return;
  window.__iframeSupplementsInstalled = true;

  function isString(x) {
    return typeof x === 'string';
  }

  // Escaping arbitrary text (to avoid executing HTML)
  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function insertControlledHTML(html) {
    document.execCommand('insertHTML', false, html);
  }

  function insertPlainText(text) {
    if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text);
    } else {
      insertControlledHTML(escapeHtml(text));
    }
  }

  // YouTube
  var YOUTUBE_REGEX = /(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com|youtu\\.be)\\/(?:watch\\?v=|embed\\/|v\\/|shorts\\/)?([a-zA-Z0-9_-]{11})/;

  function tryInsertYoutubeFromText(text) {
    var match = isString(text) ? text.match(YOUTUBE_REGEX) : null;
    if (!match || !match[1]) return false;

    var videoId = match[1];
    var embedHtml =
      '<div class="youtube-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin:10px 0;">' +
      '  <iframe ' +
      '    src="https://www.youtube.com/embed/' + videoId + '" ' +
      '    style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" ' +
      '    frameborder="0" ' +
      '    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      '    allowfullscreen>' +
      '  </iframe>' +
      '</div>';

    insertControlledHTML(embedHtml);
    return true;
  }

  // Дістаємо активний contenteditable (на випадок, якщо їх кілька)
  function getActiveEditable() {
    var sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount > 0) {
      var node = sel.anchorNode;
      while (node) {
        if (node.nodeType === 1 && node.getAttribute && node.getAttribute('contenteditable') === 'true') {
          return node;
        }
        node = node.parentNode;
      }
    }
    // fallback: перший contenteditable
    return document.querySelector('[contenteditable="true"], [contenteditable]');
  }

  // --- Paste handler ---
  var editableOnLoad = getActiveEditable();
  if (editableOnLoad) {
    editableOnLoad.addEventListener('paste', function (e) {
      try {
        var text = (e.clipboardData || window.clipboardData).getData('text');
        if (!isString(text)) return;

        if (YOUTUBE_REGEX.test(text)) {
          e.preventDefault();
          tryInsertYoutubeFromText(text);
          return;
        }
        
        e.preventDefault();
        insertPlainText(text);
      } catch (_) {}
    }, false);
  }

  // --- PostMessage simulatePaste handler ---
  window.addEventListener('message', function (event) {
    try {
      if (!event || !event.data) return;
      if (event.data.type !== 'simulatePaste') return;

      var content = event.data.content;
      if (!isString(content)) return;

      // Працюємо тільки якщо є куди вставляти
      var editable = getActiveEditable();
      if (!editable) return;

      // Якщо YouTube — вставляємо embed і на цьому все
      if (tryInsertYoutubeFromText(content)) {
        return;
      }

      insertPlainText(content);
    } catch (_) {}
  }, false);
})();
  `
}
