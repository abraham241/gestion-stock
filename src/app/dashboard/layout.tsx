import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "@/Firebase/firebase.config";
import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
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
  };

  return (
    <main className="h-[100vh] w-full p-8 flex gap-x-8">
      <div className="h-full w-[180px] flex">
        <SideBar />
      </div>
      <div className="h-full flex-1">
        <NavBar className="" />
        <div className="flex-1">{children}</div>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
};

export default layout;
