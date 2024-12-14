export const styles = {
  WRAPPER_STACK_SX: {
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    background: 'rgba(118, 142, 171, .5)',
    borderBottom: '2px solid #ECECEC',
    pl: 6,
    minWidth: '100%',
  },
  TABS: {
    padding: 0,
    marginBottom: '-2px',
    minHeight: '32px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    '& .MuiTabs-indicator': {
      background: 'rgba(219, 199, 166, 0.3)',
      height: '100%',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
    },
  },
  TAB: {
    marginRight: '0px !important',
    padding: '0px 10px',
    textTransform: 'none',
    fontSize: '12px',
    minHeight: '32px',
    background: 'rgba(236, 236, 236, 0.1)',
    color: '#abb2bf!important',
    zIndex: 29,
    '&[aria-selected=true]': {
      color: 'white !important',
    },
  },
  DEV_ICON: {
    marginRight: '8px',
  },
}
