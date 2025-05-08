import { Theme } from '@mui/system'

export const SaveEditContentStyles = `
.SaveEditContent {
  position: relative;
  width: 100%;
  height: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row-reverse;
  & > div {
      position: absolute;
      top: 1.3rem;
    margin-right: 1.2rem;
    & > div {
      border-radius: 35px;
      background: rgba(1, 152, 237, 0.1);
      padding: 2px;
      align-items: center;
      text-decoration: none;
      pointer-events: all;
      flex-direction: row;
      display: flex;
      
    & > div {
      display: flex;}
    }
  }
  & a{
    color: #36495466;
      margin: auto 4px;
    line-height: 16px;
    &:hover{
          color: #364954;
    }
  }
    & a.editableLink  {
    color :#0198ED;
    &:hover {    color:rgb(4, 67, 104)  }
    & svg { vertical-align: middle; margin-bottom: 1px }
  }
    & .editableText {
    color :#0198ED;
    margin-right: 8px; 
    & svg { vertical-align: middle; margin-bottom: 1px }
  }
& .SECDiv {
width: 2px;
background: #0198ED;
height: 20px;
margin: 2px 10px;
}
}
`

export const STACK_STYLES = {
  borderRadius: '35px',
  background: 'rgba(1, 152, 237, 0.1)',
  p: '2px',
  alignItems: 'center',
  textDecoration: 'none',
  pointerEvents: 'all',
  flexDirection: 'row',
}

export const OVERLAY_WRAPPER_SX = {
  display: 'flex',
  alignItems: 'center',
  bgcolor: '#EE467A',
  borderRadius: '35px',
  px: 1,
  py: '2px',
  gap: 1,
}

export const GROUP_TITLE_STYLES = {
  color: '#A6A6A6',
  mb: -0.5,
  textTransform: 'uppercase',
  fontSize: 8,
}

export const OVERLAY_AVATAR_SX = {
  border: '2px solid #FBDD3F',
  background: '#0198ED',
  width: '24px',
  height: '24px',
}

export const AVATAR_STYLES = {
  border: '2px solid #FBDD3F',
  background: '#0198ED',
  width: '24px',
  height: '24px',
}

export const STACK_GROUP_STYLES = {
  pl: 2,
  width: { md: '150px', lg: '200px' },
}

export const OVERLAY_GROUP_TITLE_SX = {
  color: '#fff',
  textTransform: 'uppercase',
  fontSize: 10,
  mb: -0.5,
}

export const TRIBE_NAME_STYLES = {
  color: '#0198ED',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}

export const ButtonStyle = (theme: Theme) => ({
  color: theme.palette.secondary.main,
  fontWeight: 200,
  '&:hover': {
    fontWeight: 700,
    // color: theme.palette.secondary.contrastText,
    background: '#99f1',
  },
})
