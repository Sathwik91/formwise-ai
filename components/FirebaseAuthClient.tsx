'use client'

import { useEffect } from 'react'
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { app } from '@/lib/firebase'

type Props = {
  mode?: 'signUp' | 'signIn'
}

const FirebaseAuthClient = ({ mode = 'signIn' }: Props) => {
  useEffect(() => {
    const auth = getAuth(app)
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

    ui.start('#firebaseui-auth-container', {
      signInFlow: 'popup',
      signInOptions: [
        {
          provider: 'password',
          requireDisplayName: mode === 'signUp', // ask for name if signing up
        },
        GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          window.location.href = '/get-started'
          return false
        },
      },
    })
  }, [mode])

  return <div id="firebaseui-auth-container" />
}

export default FirebaseAuthClient
// This component initializes FirebaseUI for authentication.
// It supports both sign-up and sign-in modes, using Firebase Authentication.