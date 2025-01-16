import React from 'react'

import { Dialog } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'

import { useBoolean } from '@root/src/hooks/useBoolean'
import { useSelfAccess } from '@root/src/hooks/useSelfAccess'

import { PricingView } from './view'

type Props = {
  feature: string
  children: React.ReactElement
  allowedChildren: React.ReactElement | string
}

export function PricingDialog({ feature, children, allowedChildren }: Props) {
  const accessFeature = useSelfAccess(feature)
  const router = useRouter()

  const [open, openDialogIfNoAccess, closeDialog] = useBoolean(false)
  function openDialog() {
    if (accessFeature) {
      if (typeof allowedChildren == 'string') router.push(allowedChildren)
    }
    openDialogIfNoAccess()
  }

  if (!open) return <Box onClick={openDialog}>{children}</Box>
  if (accessFeature) return allowedChildren

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      maxWidth='xl'
    >
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            overflow: 'auto',
            height: '100vh',
          }}
        >
          <PricingView />
        </div>
      </div>
    </Dialog>
  )
}
