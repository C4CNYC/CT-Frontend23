console.log('ServiceWorker Page script started');
if (!globalThis.LessonLoader) {
    class LessonLoader {
        async #getSwResponse() {
            return new Promise((resolve, reject) => {
                const timeout = setTimeout(() => reject(new Error('Timeout')), 30000);
                this.channel.port1.onmessage = e => {
                    clearTimeout(timeout);
                    e.data.success ? resolve(e.data) : reject(new Error(e.data.error));
                };
            });
        }

        async loadZip(zipUrl, frameId) {
            try {
                //agreement between SW and page
                const scopePath = `/student/code-panel/iframe`;
                this.channel = new MessageChannel();
                navigator.serviceWorker.controller.postMessage({
                    type: 'LOAD_ZIP',
                    zipUrl,
                    scopePath
                }, [this.channel.port2]);
                await this.#getSwResponse();
                document.getElementById(frameId).src = `${scopePath}/index.html`;
                console.log('Loaded!', 'success');
            } catch (e) {
                console.error(`Error: ${e.message}`, e);
            }
        }

    }
    globalThis.LessonLoader = new LessonLoader();
}
console.log('ServiceWorker Page script loaded');
globalThis.LessonLoader.loadZip(
    'https://devnest.s3.us-east-1.amazonaws.com/lessons/py4kidsgame-1.zip', 'lessonFrame');
