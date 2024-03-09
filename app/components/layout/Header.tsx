import { Container, Flex, Heading } from '@radix-ui/themes'
import ProfileDropDown from './ProfileDropDown'

export default function Header() {
  return (
    <Container py="3" px="2" className="bg-gray-100">
      <Flex align="center" justify="between">
        <Heading>UNSOCIAL</Heading>

        <ProfileDropDown />
      </Flex>
    </Container>
  )
}
