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
      padding: 2px 10px;
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
    cursor: pointer;
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


.top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 18px 5px 16px 24px;
  gap: 5px;
  position: absolute;
  top: 0;
  // right: -100%;
  right: 10px;
  width: 100%;
  z-index: 10;
  transition: right 0.3s ease;
}
.icon-button {
  width: 33px;
  height: 33px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.3);
}

.icon-button.active {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.context-menu {
          position: absolute;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .context-button {
          width: 25px;
          height: 25px;
          border: none;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .context-button:hover {
          transform: scale(1.1);
        }

        .image-btn {
          color: #1976d2;
        }

        .image-btn:hover {
          background: rgba(25, 118, 210, 0.1);
        }

        .video-btn {
          color: #d32f2f;
        }

        .video-btn:hover {
          background: rgba(211, 47, 47, 0.1);
        }

        .emoji-btn {
          color: #ff9800;
        }

        .emoji-btn:hover {
          background: rgba(255, 152, 0, 0.1);
        }

        .divider {
          width: 1px;
          height: 20px;
          background: rgba(0, 0, 0, 0.12);
          margin: 0 4px;
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
