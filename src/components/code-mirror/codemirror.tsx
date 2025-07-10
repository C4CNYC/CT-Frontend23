import dynamic from 'next/dynamic'

const CodeMirror = dynamic(() => import('./code-mirror-wrapper'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
})

export default CodeMirror
