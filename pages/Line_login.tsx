import React, {useState} from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button} from '@mui/material';

export const Header = () => {
    const { data: session, status } = useSession();
    if (session && session.user) {
      return (
        <>
          Signed in as {session.user.name} <br />
          <Button onClick={() => signOut() }>Sign out</Button>
        </>
      )
    }
    else {
        return (
            <>
              Not signed in <br />
              <Button onClick={() => signIn()}>Sign in</Button>
            </>
          )
    }

  }