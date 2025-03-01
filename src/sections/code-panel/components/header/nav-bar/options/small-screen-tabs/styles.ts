export const styles = {
  Box: {
    position: 'fixed',
    top: 0,
    left: 'calc(50% - 76px)',
    zIndex: 400,
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0 0 10px 10px',
  },
  Tabs: {
    backgroundColor: 'rgba(21, 82, 117, 0.8)',
    borderRadius: '0 0 10px 10px',
    height: 25,
    minHeight: 0,

    '& .MuiTab-root': {
      minWidth: '0px',
    },
    '& .MuiTab-labelIcon .MuiTab-wrapper > *:first-of-type': {
      marginBottom: '0px',
    },
    '& .MuiTabs-flexContainer': {
      height: 25,
    },
  },
  Tab: {
    cursor: 'pointer',
    color: '#43D4DD !important',
    '&.MuiTab-root': {
      minHeight: 0,
      padding: '0px 6px',
      margin: '0 !important',
    },
  },
  activeTab: {
    background: '#0000004D',
    borderRadius: '0px 0px 10px 10px',
    minHeight: '0px',
    minWidth: '90px !important',
    color: '#43D4DD !important',
    padding: '0px',
    margin: '0 !important',
    '& .MuiTab-wrapper': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    '& .PrivateTabIndicator-colorPrimary-125': {
      backgroundColor: 'transparent',
    },
    '@media (min-width:530px)': {
      minWidth: '160px !important',
    },
  },
  slides: {
    fontSize: 12,
  },
}
