export const getDialogPaperProps = (isDark: boolean) => {
  return {
    sx: {
      minHeight: {
        xs: '50vh',
        sm: '50vh',
        md: '450px',
        lg: '450px',
      },
      background: isDark ? '#454F5B' : '',
    },
  }
}

export const DIALOG_TITLE_SX = {
  display: 'flex',
  alignItems: 'center',
}

export const DIALOG_TITLE_TYP_SX = {
  flexGrow: 1,
  ml: 1,
  alignSelf: 'flex-end',
}

export const ICON_BUTTON_SX = {
  selfAlign: 'flex-end',
  mr: '-10px',
}
