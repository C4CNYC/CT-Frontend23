import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
type DialogTypes = 'Empty Slide' | 'HTML Template' | 'Normal Template' | 'With AI'

type CloneExistingSlideProps = {
  open: boolean
  handleClose: () => void
  lessonId: string
  openDialog: (dialog: DialogTypes) => void
  anchorEl: HTMLElement | null
}

const CloneExistingSlide = (props: CloneExistingSlideProps) => {
  const handleClick = (dialog: DialogTypes) => () => {
    props.openDialog(dialog)
    props.handleClose()
  }
  if (!props.open) return null
  return (
    <Menu
      id='CloneExistingSlide'
      aria-labelledby='Opens the menu to clone an existing slide'
      open={props.open}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      anchorEl={props.anchorEl}
    >
      <MenuItem onClick={handleClick('Empty Slide')}> Empty Slide </MenuItem>
      <MenuItem onClick={handleClick('HTML Template')}>HTML Template</MenuItem>
      <MenuItem onClick={handleClick('Normal Template')}>Normal Template</MenuItem>
      <MenuItem onClick={handleClick('With AI')}>With AI</MenuItem>
    </Menu>
  )
}
export default CloneExistingSlide
