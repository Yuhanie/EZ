import { useContext } from 'react';
import { UserContext } from '@/components/context/UserContext';
export default function Home() {
  const user = useContext(UserContext);
  console.log('user', user)

  return (
    <div>Hello, {user && user.displayName}</div>
  )
}