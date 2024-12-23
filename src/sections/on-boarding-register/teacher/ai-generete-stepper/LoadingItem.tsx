import { useEffect, useRef, useState } from 'react'

import { CircularProgress, Stack, Typography } from '@mui/material'
import { CgCheckO } from '@react-icons/all-files/cg/CgCheckO'

import { useTranslate } from '@root/src/utils/translateHelper'

import { LOADING_STEPS } from './constants'

interface ILoadingItem {
  isLoading?: boolean
  text: string
  multiply: number
}
const LoadingItem = ({ isLoading, text, multiply }: ILoadingItem) => {
  const translate = useTranslate()

  const [loading, setLoading] = useState(true)
  const timer = useRef<any | null>(null)

  function getRandomArbitrary() {
    return Math.random() * (LOADING_STEPS.length - multiply) + multiply
  }

  useEffect(() => {
    if (!isLoading) {
      timer.current = setTimeout(
        () => {
          setLoading(false)
        },
        multiply ? getRandomArbitrary() * 700 * multiply : 700
      )
    }

    ;() => clearTimeout(timer.current)
  }, [])

  useEffect(() => {
    if (isLoading) {
      setLoading(isLoading)
    }
  }, [isLoading])

  return (
    <>
      <Stack
        flexDirection='row'
        gap={2}
        alignItems='center'
      >
        {isLoading || loading ? (
          <CircularProgress
            size='20px'
            sx={{
              color: '#75CF6D',
            }}
            thickness={6}
          />
        ) : (
          <CgCheckO
            color='#75CF6D'
            size={25}
            stroke-width='1'
          />
        )}
        <Typography
          variant='h5'
          sx={{ color: '#616161' }}
        >
          {translate(text)}
        </Typography>
      </Stack>
    </>
  )
}
export default LoadingItem
