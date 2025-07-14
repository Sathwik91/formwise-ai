'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase-client'

export function useAuthRedirect(targetRoute = '/get-started') {
const [checking, setChecking] = useState(true)
const router = useRouter()

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (user) => {
if (user) {
router.push(targetRoute)
} else {
setChecking(false) // allow page to show if not logged in
}
})
return () => unsubscribe()
}, [router, targetRoute])

return checking // returns true while auth status is pending
}