'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import LogoOpenShift from '@/public/logos/openshift-logo.svg'
import { Loader2 } from "lucide-react"

export default function ButtonSignInOpenShift() {

  const [loading, setLoading] = useState(false)

  function handleClick() {
    setLoading(loading => !loading)
    signIn('openshift', { callbackUrl: '/dashboard' })
  }

  return (
    <Button className="w-full" variant="outline" size="lg" type="button" onClick={handleClick}>
      {loading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
      {!loading && (
        <>
          <span className="mr-2 w-4 h-4">
            <LogoOpenShift />
          </span>
          <span>Sign in with OpenShift</span>
        </>
      )}
    </Button>
  )
}
