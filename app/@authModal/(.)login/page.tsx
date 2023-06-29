import AuthForm from '@/components/forms/AuthForm'
import CloseModal from '@/components/CloseModal'
import Link from 'next/link'

import { FC } from 'react'

// https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes

const page: FC = () => {
  return (
    <div className='fixed inset-0 bg-zinc-900/20 z-10'>
      <div className='container flex items-center h-full max-w-lg mx-auto'>
          <div className="relative bg-white mt-4 w-full mx-auto rounded-xl border border-gray-200 p-4 md:p-6">
            <div className='absolute top-4 right-4'>
              <CloseModal />
            </div>
            <div className="my-4">
              <h1 className="text-4xl text-center font-bold mt-4 blue_gradient">Login</h1>
              <p className="text-gray-500 my-4 text-sm text-center">Sign in to your account.</p>
            </div>
            <AuthForm variant="Login"/>
            <div className="flex gap-2 justify-center text-sm mt-4 åpx-2 text-gray-500">
              <div>New to PenPal?</div>
              <Link href={"/register"} className="underline cursor-pointer">Create an account</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default page