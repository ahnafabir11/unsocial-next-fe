'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Text, Button, TextFieldInput } from '@radix-ui/themes'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export const signupBodySchema = z
  .object({
    fullName: z.string().trim().min(6),
    email: z.string().toLowerCase().email(),
    password: z.string().trim().min(6),
    confirmPassword: z.string().trim().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords didn't match!",
    path: ['confirmPassword'],
  })

export type SignupBodyType = z.infer<typeof signupBodySchema>

export default function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupBodyType>({
    resolver: zodResolver(signupBodySchema),
  })

  const onSubmit: SubmitHandler<SignupBodyType> = async (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div>
          <Text as="label" weight="medium" color="gray">
            Full Name
          </Text>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextFieldInput
                color={errors.fullName ? 'red' : 'indigo'}
                {...field}
              />
            )}
          />
          {errors.fullName && (
            <Text as="span" size="2" color="red">
              {errors.fullName.message}
            </Text>
          )}
        </div>

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

        <div>
          <Text as="label" weight="medium" color="gray">
            Confirm Password
          </Text>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextFieldInput
                type="password"
                color={errors.confirmPassword ? 'red' : 'indigo'}
                {...field}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text as="span" size="2" color="red">
              {errors.confirmPassword.message}
            </Text>
          )}
        </div>
      </div>

      <Button variant="solid" mt="4" className="w-full">
        SIGN UP
      </Button>
    </form>
  )
}
