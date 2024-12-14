// form
import { CSSProperties } from 'react'

import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

interface Props {
  children: React.ReactNode
  methods: UseFormReturn<any>
  onSubmit?: VoidFunction
  style?: CSSProperties
}

export function FormProvider({
  children,
  onSubmit,
  methods,
  style,
}: Props): React.ReactElement | null {
  return (
    <Form {...methods}>
      <form
        style={style}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </Form>
  )
}
