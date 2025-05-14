import { ReactNode } from 'react'

import { Typography } from '@mui/material'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import ReactHtmlParser from 'react-html-parser'

import GuestGuard from '@/auth/GuestGuard'
import { IGallery } from '@root/src/redux/interfaces/gallery.interface'

interface Props {
  data?: IGallery
  error?: string
}

export default function GallaryPublic({ data, error }: Props): React.ReactElement {
  const commentsRemove = (code: ReactNode[]): ReactNode[] => {
    return code.filter((el) => !(typeof el === 'string'))
  }

  if (error) {
    return (
      <GuestGuard>
        <Typography
          variant='h4'
          sx={{ textAlign: 'center', mt: 4 }}
        >
          {error}
        </Typography>
      </GuestGuard>
    )
  }
  return (
    <GuestGuard>
      {data && data.language === 'html' ? (
        commentsRemove(ReactHtmlParser(JSON.parse(data.body).body.code))
      ) : (
        <Typography
          variant='h4'
          sx={{ textAlign: 'center', mt: 4 }}
        >
          Language is not supported
        </Typography>
      )}
    </GuestGuard>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/student/public/project/${params?.id}`,
      {
        headers: { 'X-Tenant-Id': 'codetribe', 'x-school-id': localStorage.getItem('x-school-id') },
      }
    )
    return { props: { data } }
  } catch (error: any) {
    return {
      props: {
        error,
      },
    }
  }
}
