import React from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "@/Firebase/firebase.config";
import NavBar from '@/components/navBar';
import SideBar from '@/components/sideBar';




const layout = ({children}: Readonly<{children: React.ReactNode}>) => {

  const verifedSingIn = () => {

    const auth = Auth;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }

  return (
    <main className='h-[100vh] w-full'>
      <div className='h-[10%] w-full bg-emerald-400'>
        <NavBar className='h-full'/>
      </div>
      <div className='h-[90%] w-full flex'>
        <div className='w-36 bg-red-500'>
          <SideBar/>
        </div>
        <div className='flex-1'>
          {children}
        </div>
      </div>
    </main>
  )
}

export default layout