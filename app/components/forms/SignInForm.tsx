'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Text, Button, TextFieldInput } from '@radix-ui/themes'
import Link from 'next/link'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export const loginBodySchema = z.object({
  email: z.string().toLowerCase().email(),
  password: z.string().trim().min(6),
})

export type LoginBodyType = z.infer<typeof loginBodySchema>

export default function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(loginBodySchema),
  })

  const onSubmit: SubmitHandler<LoginBodyType> = async (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div>
          <Text as="label" weight="medium" color="gray">
            Email Address
          </Text>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextFieldInput
                type="email"
                color={errors.email ? 'red' : 'indigo'}
                {...field}
              />
            )}
          />
          {errors.email && (
            <Text as="span" size="2" color="red">
              {errors.email.message}
            </Text>
          )}
        </div>

        <div>
          <Text as="label" weight="medium" color="gray">
            Password
          </Text>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextFieldInput
                type="password"
                color={errors.password ? 'red' : 'indigo'}
                {...field}
              />
            )}
          />
          {errors.password && (
            <Text as="span" size="2" color="red">
              {errors.password.message}
            </Text>
          )}
        </div>

        <Text as="p" size="2" weight="medium" color="indigo" align="right">
          <Link href="/forgot-password">Forgot Password?</Link>
        </Text>
      </div>

      <Button variant="solid" mt="4" className="w-full">
        SIGN IN
      </Button>
    </form>
  )
}
