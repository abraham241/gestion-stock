import React from "react";
import { AiFillBell } from "react-icons/ai";
import Image from "next/image";
// import profil from "../public/images/profil.jpg";

const NavBar = () => {
  return (
    <div>
      <div className="navbar bg-base-100 flex justify-around items-center h-20 w-[1000px] bg-slate-500">
        <div className="">
          <a className="btn btn-ghost text-3xl font-bold ">Dashboard</a>
        </div>
        <div>
          <input
            type="text"
            placeholder="Recherche"
            className="input  w-96 h-10 border-gray-400 rounded border-2 outline-none"
          />
        </div>
        <div className="flex gap-5">
          <div className="text-2xl">
            <AiFillBell />
          </div>
          <div className="h-12 w-14 bg-black rounded-full">
            {/* <Image src={profil} alt="" height={100} width={100} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
