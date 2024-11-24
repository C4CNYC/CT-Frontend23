interface SaveIconTyniMceProps {
  size?: number
  color?: string
}
const SaveIconTyniMce = ({ size = 24, color = '#000' }: SaveIconTyniMceProps) => (
  <svg
    width={size}
    height={size}
    focusable='false'
    fill={color}
    viewBox='0 0 24 24'
    preserveAspectRatio='xMidYMid meet'
  >
    <path
      d='M5 16h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2Zm0 2v2h14v-2H5Zm10 0h2v2h-2v-2Zm-4-6.4L8.7 9.3a1 1 0 1 0-1.4 1.4l4 4c.4.4 1 .4 1.4 0l4-4a1 1 0 1 0-1.4-1.4L13 11.6V4a1 1 0 0 0-2 0v7.6Z'
      fill-rule='nonzero'
    />
  </svg>
)
export default SaveIconTyniMce
