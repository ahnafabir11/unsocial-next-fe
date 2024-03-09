import { Container } from '@radix-ui/themes'
import UserList from './components/UserList'

export default function Home() {
  return (
    <main>
      <Container>
        <UserList />
      </Container>
    </main>
  )
}
