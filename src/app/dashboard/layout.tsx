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

  return <div>layout</div>;
};

export default layout;
