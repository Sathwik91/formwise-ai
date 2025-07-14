'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth } from 'firebase/auth'
import { getUserRole } from '@/lib/firebaseUser'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const user = getAuth().currentUser
      if (!user) {
        router.push('/auth')
        return
      }

      const role = await getUserRole(user.uid)
      if (role !== 'admin') {
        router.push('/')
      }
    }

    checkAdmin()
  }, [])

  return <div>Welcome Admin 👑</div>
}
