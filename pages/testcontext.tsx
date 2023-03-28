import { useContext } from 'react';
import { UserContext } from '@/components/context/UserContext';
import { firebaseConfig } from '../settings/firebaseConfig';
export default function Home() {
  const user = useContext(UserContext);
  console.log('user', user)
  console.log("firebase", firebaseConfig )

  return (
    <div>Hello, {user && user.displayName}</div>
  )
}