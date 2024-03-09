import { Heading, Text } from '@radix-ui/themes'
import { Metadata } from 'next'
import Link from 'next/link'
import SignUpForm from '../components/forms/SignUpForm'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function page() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="max-w-sm w-full rounded p-4 m-2 shadow">
        <Heading>SIGN UP</Heading>
        <Text as="p" size="2" color="gray" weight="medium" mb="4">
          Already have an account?{' '}
          <Link href="/signin">
            <Text color="indigo">Sign In</Text>
          </Link>
        </Text>

        <SignUpForm />
      </div>
    </main>
  )
}
