export const CONSOLE_CONT_SX = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
}
export const CONSOLE_HEADER_SX = {
  flexDirection: 'row',
  alignItems: 'center',
  pl: 1,
  '&:hover': { cursor: 'pointer' },
}

export const COLLAPSE_BOX_SX = ({ height = 200 }: { height: number }) => ({
  width: '100%',
  height: `${height}px`,
  background: '#333',
  color: '#DDD',
  whiteSpace: 'pre-wrap',
  overflowY: 'auto',
  padding: '0px 10px',
})
