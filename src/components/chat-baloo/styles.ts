export const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // background: 'rgba(0, 0, 0, 0.2)',
    // backdropFilter: 'blur(8px)',
    zIndex: 1300,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // padding: '24px',
  },

  chatContainer: {
    background:
      'linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(30, 64, 175, 0.95) 50%, rgba(67, 56, 202, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    width: '384px',
    height: '600px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
  },

  chatContainerMinimized: {
    height: '64px',
  },

  header: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px 16px 0 0',
    padding: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },

  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  botAvatar: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 700,
    margin: 0,
  },

  headerSubtitle: {
    color: '#c4b5fd',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    margin: 0,
  },

  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  controlButton: {
    width: '32px',
    height: '32px',
    maxWidth: '32px',
    maxHeight: '32px',
    minWidth: '0',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
  },

  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    height: 'calc(100% - 180px)',
    display: 'flex',
    flexDirection: 'column',
  },

  messageGroup: {
    marginBottom: '16px',
  },

  messageRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '12px',
  },

  messageRowReverse: {
    flexDirection: 'row-reverse',
  },

  messageAvatar: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  botMessageAvatar: {
    background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
    borderRadius: '8px',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userMessageAvatar: {
    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    borderRadius: '50%',
  },

  messageBubble: {
    maxWidth: '240px',
    padding: '12px 16px',
    borderRadius: '16px',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },

  botMessageBubble: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },

  userMessageBubble: {
    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    color: 'white',
  },

  messageText: {
    fontSize: '14px',
    lineHeight: '1.4',
    margin: 0,
  },

  messageTimestamp: {
    fontSize: '12px',
    opacity: 0.7,
    marginTop: '4px',
    display: 'block',
  },

  hoverButtons: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    display: 'flex',
    gap: '4px',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },

  hoverButtonsVisible: {
    opacity: 1,
  },

  hoverButton: {
    width: '24px',
    height: '24px',
    minWidth: '0',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    padding: '5px',
  },

  hoverButtonDefault: {
    background: '#374151',
    color: 'white',
    '&:hover': { background: '#4b5563' },
  },

  hoverButtonDelete: {
    background: '#dc2626',
    color: 'white',
    '&:hover': { background: '#b91c1c' },
  },

  typingIndicator: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },

  typingBubble: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '12px 16px',
    borderRadius: '16px',
  },

  typingDots: {
    display: 'flex',
    gap: '4px',
  },

  typingDot: {
    width: '6px',
    height: '6px',
    background: 'white',
    borderRadius: '50%',
    animation: 'bounce 1.4s ease-in-out infinite both',
  },

  recommendationsSection: {
    padding: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },

  recommendationsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },

  recommendationChip: {
    background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
    color: '#bfdbfe',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    backdropFilter: 'blur(8px)',
    fontSize: '12px',
    height: '28px',
    borderRadius: '14px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },

  inputSection: {
    padding: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0 0 16px 16px',
  },

  inputContainer: {
    display: 'flex',
    gap: '12px',
  },

  textInput: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease',
    maxHeight: '40px',
  },

  sendButton: {
    background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 100%)',
    minWidth: '40px',
    height: '40px',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
  },

  floatingButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1300,
  },
}

export const skeletonStyles = {
  messageSkeleton: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '16px',
  },
  messageSkeletonReverse: {
    flexDirection: 'row-reverse',
  },
  avatarSkeleton: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    flexShrink: 0,
  },
  userAvatarSkeleton: {
    borderRadius: '50%',
  },
  messageBubbleSkeleton: {
    maxWidth: '240px',
    padding: '12px 16px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
  },
  recommendationsSkeleton: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  inputSkeleton: {
    padding: '16px',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0 0 16px 16px',
  },
}

// Constants
const TYPING_ANIMATION_CSS = `
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-8px); }
  }
  
  .typing-dot-1 { animation-delay: -0.32s; }
  .typing-dot-2 { animation-delay: -0.16s; }
  .typing-dot-3 { animation-delay: 0s; }

  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }

  .skeleton-shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite linear;
  }
`
