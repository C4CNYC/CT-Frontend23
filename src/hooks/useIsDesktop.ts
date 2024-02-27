import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const useIsDesktop = () => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up(1000))
}

export default useIsDesktop
