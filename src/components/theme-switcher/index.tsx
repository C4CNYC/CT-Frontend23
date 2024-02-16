import { IconButton } from '@mui/material'
import { MdOutlineDarkMode } from '@react-icons/all-files/md/MdOutlineDarkMode'
import { MdOutlineLightMode } from '@react-icons/all-files/md/MdOutlineLightMode'

import { useSettingsContext } from '../settings'

enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

const ThemeSwitcher = (): React.ReactElement => {
  const { themeMode, onToggleMode } = useSettingsContext()

  return (
    <IconButton onClick={onToggleMode}>
      {themeMode !== ThemeMode.LIGHT ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
    </IconButton>
  )
}

export default ThemeSwitcher
