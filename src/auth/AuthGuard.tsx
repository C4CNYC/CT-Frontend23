import { useEffect } from 'react'

import { useRouter } from 'next/router'

// import Login from "@pages/auth/signIn";

import { LoadingScreen } from '@/components'

import { useAuthContext } from './useAuthContext'

interface AuthGuardProps {
  children: React.ReactNode
}

/*
TODO: This is no-bueno because it's importing a nextjs page. Functionality disabled for now, meaning no redirect after login.
 */
export default function AuthGuard({ children }: AuthGuardProps): React.ReactElement | null {
  const { isAuthenticated, isInitialized } = useAuthContext()

  const { pathname, push } = useRouter()

  // const [requestedLocation, setRequestedLocation] = useState<string | null>(
  //   null
  // );
  //
  // useEffect(() => {
  //   if (requestedLocation && pathname !== requestedLocation) {
  //     push(requestedLocation);
  //   }
  //   if (isAuthenticated) {
  //     setRequestedLocation(null);
  //   }
  // }, [isAuthenticated, pathname, push, requestedLocation]);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      push('/auth/signIn')
    }
  }, [isAuthenticated, isInitialized])

  if (!isInitialized) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return null
    // if (pathname !== requestedLocation) {
    //   setRequestedLocation(pathname);
    // }
    // return <Login />;
  }

  return <> {children} </>
}
