import { NextResponse } from 'next/server'

import { PATH_AUTH } from '@/routes/paths'

export async function middleware(req: any) {
  const url = req.nextUrl.clone()

  if (url.pathname === PATH_AUTH.onBoardingTeacher.root) {
    const domain = req.nextUrl.hostname === 'localhost' ? 'codetribe' : req.nextUrl.hostname

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenant/${domain}`, {
      cache: 'no-store',
    })

    const tenant = await res.json()

    if (tenant?.meta?.is_enabled_teacher_register_feature === false) {
      const url = req.nextUrl.clone()

      url.pathname = PATH_AUTH.onBoardingStudent
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}
