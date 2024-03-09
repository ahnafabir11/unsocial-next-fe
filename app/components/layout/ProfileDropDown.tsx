'use client'

import {
  ExitIcon,
  HomeIcon,
  PersonIcon,
  HeartFilledIcon,
  HeartIcon,
} from '@radix-ui/react-icons'
import { Avatar, DropdownMenu, Text } from '@radix-ui/themes'
import Link from 'next/link'

export default function ProfileDropDown() {
  return (
    <DropdownMenu.Root dir="rtl">
      <DropdownMenu.Trigger>
        <button>
          <Avatar radius="full" fallback="AA" src="null" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <Link
            href="/"
            className="w-full flex items-center justify-between gap-3"
          >
            <Text>Home</Text> <HomeIcon />
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link
            href="/profile"
            className="w-full flex items-center justify-between gap-3"
          >
            <Text>Profile</Text> <PersonIcon />
          </Link>
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item>
          <Link
            href="/followers"
            className="w-full flex items-center justify-between gap-3"
          >
            <Text>Followers</Text> <HeartFilledIcon />
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link
            href="/followings"
            className="w-full flex items-center justify-between gap-3"
          >
            <Text>Followings</Text> <HeartIcon />
          </Link>
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item color="red">
          <button
            onClick={() => {
              /* HANDLE LOGOUT */
            }}
            className="w-full flex items-center justify-between gap-3"
          >
            <Text>Logout</Text> <ExitIcon />
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
