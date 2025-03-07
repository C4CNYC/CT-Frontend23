import { Button, Divider, Stack } from '@mui/material'
import { FaGoogle } from '@react-icons/all-files/fa/FaGoogle'
export default function AuthWithSocial(): React.ReactElement {
  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider>

      <Stack
        direction='row'
        justifyContent='center'
        spacing={2}
      >
        <Button
          variant='outlined'
          startIcon={
            <FaGoogle
              color='#DF3E30'
              style={{ marginRight: 2 }}
            />
          }
          sx={{
            width: '100%',
            borderRadius: '50px',
            border: '1px solid rgba(145, 158, 171, 0.32)',
            color: '#000',
          }}
        >
          Register with Google
        </Button>
      </Stack>
    </div>
  )
}
