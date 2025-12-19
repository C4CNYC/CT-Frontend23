export const styles = {
  container: {
    borderTop: '1px solid #989ea7',
  },
  clickableRow: {
    p: '8px 0',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(21, 82, 117, 0.8)',
    },
  },
  rowContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    padding: '0 8px',
    width: '100%',
  },
  rowLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 2,
  },
  text: {
    color: 'white',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '1.5',
    maxWidth: '85%',
  },
  collapseWrapper: {
    backgroundColor: '#1f2937',
  },
  descriptionRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
  },
  descriptionText: {
    color: '#d1d5db',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '1.5',
  },
  errorBox: {
    mt: 1,
    p: 1,
    backgroundColor: 'rgba(127, 29, 29, 0.3)',
    border: '1px solid rgba(185, 28, 28, 0.5)',
    borderRadius: '8px',
  },
  errorTitle: {
    color: '#fca5a5',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  errorText: {
    color: '#fecaca',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '1.5',
  },
}

export const iconStyles = {
  base: { fontSize: '20px', width: '13px', height: '13px' },
  passed: { color: '#4ade80' },
  failed: { color: '#f87171' },
  warning: { color: '#facc15' },
  running: { color: '#60a5fa', animation: 'pulse 2s infinite' },
  default: { color: '#9ca3af' },
  question: { fontSize: '13px', color: '#60a5fa', cursor: 'help' },
  errorIcon: { fontSize: '12px', color: '#f87171', marginTop: '2px', flexShrink: 0 },
}
