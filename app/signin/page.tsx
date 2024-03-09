import { Heading, Text } from '@radix-ui/themes'
import { Metadata } from 'next'
import Link from 'next/link'
import SignInForm from '../components/forms/SignInForm'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function page() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="max-w-sm w-full rounded p-4 shadow">
        <Heading>SIGN IN</Heading>
        <Text as="p" size="2" color="gray" weight="medium" mb="4">
          Don't have an account?{' '}
          <Link href="/signup">
            <Text color="indigo">Sign Up</Text>
          </Link>
        </Text>

        <SignInForm />
      </div>
    </main>
  )
}
