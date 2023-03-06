import '../styles/globals.css'
import type { AppProps } from 'next/app'

// import { SessionProvider } from "next-auth/react";
import { UserProvider } from '@/components/context/UserContext';


function MyApp({ Component, pageProps }: AppProps) {
  //const [status, setStatus] = useState<AUTH_STATUS>(AUTH_STATUS.LOGOUT);
  return (
    // <SessionProvider session={pageProps.session}>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
    // </SessionProvider>

  )

}

export default MyApp
