import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import type { NextPage } from 'next';
import {useRouter} from "next/router"
import { firebaseConfig } from 'settings/firebaseConfig';

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const Logout: NextPage = () => {
    const router = useRouter();
    const logout = async function () {
        const auth = getAuth();
        await signOut(auth);
        if (typeof window !== "undefined") { alert("已登出")}
        //window.alert("已登出");
        router.push('/');
      };
      logout()
    return(<div></div>)
}


export default Logout;