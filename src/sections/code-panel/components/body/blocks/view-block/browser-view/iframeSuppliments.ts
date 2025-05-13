export function iframeSuppliments() {
  return (
    ` 
  document.querySelector('[contenteditable]').addEventListener('paste', function(e) {
    // Get pasted text
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    // Give browser time to process the paste
    setTimeout(() => {
        const images = this.querySelectorAll('img');
        
        // Get the last image (most recently pasted)
        const img = images[images.length - 1];
        
        if (img) {
            // Set your maximum dimensions
            const maxWidth = 500;  // Adjust as needed
            const maxHeight = 400; // Adjust as needed
            
            // Calculate new dimensions maintaining aspect ratio
            let [w, h] = [img.naturalWidth, img.naturalHeight];
            if (w > maxWidth) [w, h] = [maxWidth, h * maxWidth / w];
            if (h > maxHeight) [w, h] = [w * maxHeight / h, maxHeight];
            
            // Apply the new dimensions
            img.style.maxWidth = \`\${w}px\`;
            img.style.maxHeight = \`\${h}px\`;
            img.style.width = 'auto';
            img.style.height = 'auto';
        }
    }, 0);
    
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
       document.execCommand('insertHTML', false, event.data.content)
  }
});


  `
  )
}
