const zipCache = new Map();

let fflate;
try {
    importScripts('https://cdn.jsdelivr.net/npm/fflate@0.8.0/umd/index.js');
    fflate = self.fflate;
} catch (error) {
    console.error('Failed to import fflate:', error);
}

self.addEventListener('message', event => {
    if (event.data.type === 'LOAD_ZIP') {
        const { zipUrl, scopePath } = event.data;
        const port = event.ports[0];
        
        downloadAndExtractZip(zipUrl, scopePath)
            .then(() => {
                console.log('sw Success:', zipUrl);
                port.postMessage({ success: true });
            })
            .catch(error => {
                console.error('sw Error:', error);
                port.postMessage({ success: false, error: error.message });
            });
    }
});

async function downloadAndExtractZip(zipUrl, scopePath) {
    try {
        if (!fflate) {
            throw new Error('fflate library not available');
        }
        
        const response = await fetch(zipUrl);
        if (!response.ok) {
            throw new Error(`Failed to download ZIP: ${response.status} ${response.statusText}`);
        }
        
        const zipData = await response.arrayBuffer();
        
        const extractedFiles = fflate.unzipSync(new Uint8Array(zipData));
        
        const fileMap = new Map();
        
        for (const [filename, fileData] of Object.entries(extractedFiles)) {
            let filenameRemovedPrefix = filename.split('/').slice(1).join('/');
            const filePath = scopePath + '/' + filenameRemovedPrefix;
            fileMap.set(filePath, fileData);
        }
        
        zipCache.set(scopePath, fileMap);
        console.log(`sw Extracted ${fileMap.size} files for scope: ${scopePath}`, zipCache.entries());
        return true;
    } catch (error) {
        console.error('Error downloading and extracting ZIP:', error);
        throw error;
    }
}

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    console.log('sw:', url.pathname);
    for (const [scopePath, fileMap] of zipCache.entries()) {
        if (url.pathname.startsWith(scopePath)) {
            const fileData = fileMap.get(url.pathname);
            
            if (fileData) {
                const response = new Response(fileData, {
                    headers: {
                        'Content-Type': getContentType(url.pathname)
                    }
                });
                
                event.respondWith(response);
                return;
            }
        }
    }
    
    return;
});
const contentTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
  eot: 'application/vnd.ms-fontobject'
};

function getContentType(filePath) {
  return contentTypes[filePath.split('.').pop().toLowerCase()] || 'text/plain';
}
