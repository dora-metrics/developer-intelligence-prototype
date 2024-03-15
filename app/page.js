import Link from 'next/link'
import ButtonSignInGithub from '@/components/button-signin-github'
import ButtonSignInGoogle from '@/components/button-signin-google'
import ButtonSignInKeyCloak from '@/components/button-signin-keycloak'
import ButtonSignInOpenShift from '@/components/button-signin-openshift'
import SignInPhoto from '@/public/images/image--sign-in.jpg'
import BlurImage from '@/components/blur-image'
import { AppLogo } from '@/components/app-logo'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'
import { buttonVariants } from "@/components/ui/button"
import { CheckCircle2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"

export const metadata = {
  title: 'Dashboard - Red Hat Developer Intelligence'
}

function getInitials(name) {
  const nameArray = name.split(" ")
  const firstName = nameArray[0].charAt(0).toUpperCase()
  const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase()
  return firstName + lastName
}

export default async function AuthenticationPage() {

  const session = await getServerSession(options)

  return (
    <>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-5 lg:px-0">

        <div className="relative h-full flex flex-col justify-center lg:p-8 lg:col-span-2 bg-background pattern-background">
          <div className="absolute top-16 left-16 h-10 flex z-20 flex items-center text-lg font-medium">
            <AppLogo />
            <h1 className="visually-hidden">Red Hat Developer Intelligence</h1>
          </div>
          <div className="mx-auto flex w-full flex-col items-center space-y-6 w-3/4 2xl:w-2/4 px-8 xl:px-0">
            {session && (
              <div className="flex items-center justify-center w-96 h-96 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-full">
                <div className="flex items-center justify-center w-64 h-64 border border-neutral-200 dark:border-neutral-700 rounded-full">
                  <Link className="relative w-32 h-32 flex gap-2 items-center text-center justify-center text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full px-8 py-7 bg-primary text-primary-foreground hover:bg-primary/90" href="/dashboard">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={session.user.image} alt={`${session.user.name} avatar`} />
                      <AvatarFallback className="bg-violet-700 text-white">{getInitials(session.user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute top-[calc(100%+16px)] flex items-center gap-2 pl-2 pr-3 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full whitespace-nowrap">
                      <CheckCircle2 className="h-6 w-6 fill-orange-500 stroke-neutral-100 dark:stroke-neutral-800" />
                      <span className="text-sm text-foreground">{session.user.name}</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {!session && (
              <>
                <div className="flex flex-col mb-4 space-y-2 text-center">
                  <h2 className="text-3xl	font-bold tracking-tight dark:text-white">Sign in</h2>
                </div>
                <ButtonSignInGithub />
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>
                <ButtonSignInGoogle />
                <ButtonSignInKeyCloak />
                <ButtonSignInOpenShift />
                <p className="px-8 text-center text-sm text-muted-foreground">By signing in, you agree to our <Link href="https://www.redhat.com/en/about/terms-use">terms of service</Link> and <Link href="https://www.redhat.com/en/about/privacy-policy">privacy policy</Link>.</p>
              </>
            )}
          </div>
        </div>

        <div className="relative hidden h-full flex-col bg-zinc-900 p-32 text-white dark:border-r lg:flex lg:col-span-3">
          <div className="relative z-30 mt-auto text-white border-l-4 border-red-600 pl-8">
            <div className="font-bold text-base">Red Hat Developer Intelligence&trade;</div>
            <div className="font-semibold text-3xl tracking-tight mt-1">Redefine development and unlock your potential</div>
            <p className="mt-4">Elevate your development game with Red Hat Developer Intelligence and witness how this game-changing product unlocks new levels of efficiency, collaboration, and excellence in software development. Embrace the future of coding with confidence, precision, and intelligence at your fingertips.</p>
          </div>
          <div className="absolute z-20 inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          <BlurImage className="absolute top-0 left-0" image={SignInPhoto} alt={'Developer looking at their laptop while they work'} />
        </div>

      </div>
    </>
  )
}