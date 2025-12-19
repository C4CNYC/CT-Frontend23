export function sendValidationMessageToIframes(checkerId: string, valid: boolean) {
  document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.contentWindow?.postMessage(
      {
        type: 'checker-validation',
        checkerId,
        valid,
      },
      '*'
    )
  })
}
