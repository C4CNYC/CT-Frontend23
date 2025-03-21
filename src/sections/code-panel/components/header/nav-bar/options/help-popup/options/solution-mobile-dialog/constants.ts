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
  py: 1,
}

export const DIALOG_TITLE_TYP_SX = {
  display: 'flex',
  flexGrow: 1,
  gap: 1,
  alignSelf: 'center',
}

export const ICON_BUTTON_SX = {
  mr: '-10px',
}
