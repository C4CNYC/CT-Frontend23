
/**
 * Processes messaging events.
 * @param event 
 * @param cb 
 */
enum MessageTypes { 'checker-relay', 'checker-validation', 'checker-update' }

export function messaging(
  event: MessageEvent,
  type: MessageTypes,
  cb: (data: any) => any): void {
  const data = event.data
  if (data?.type === type) {
    cb(data)
  }
}
