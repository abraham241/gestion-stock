import React from "react";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="flex flex-col  items-center bg-slate-600 h-full w-full">
      {/* logo de la structure */}
      <div className="bg-slate-900 h-16 w-20 rounded-full my-10">
        {/* <img src="" alt="" /> */}
      </div>

      {/* les boutons de navigation */}
      <div className="w-[250px] flex flex-col justify-between gap-5 items-center">
        <div className="flex flex-col gap-5 justify-between items-center">
          <button className="bg-white h-14 w-32 rounded hover:bg-slate-950 hover:text-white">
            <Link href="/#">About</Link>
          </button>
          <button className="bg-white h-14 w-32 rounded hover:bg-slate-950 hover:text-white">
            <Link href="/#">About</Link>
          </button>
          <button className="bg-white h-14 w-32 rounded hover:bg-slate-950 hover:text-white">
            <Link href="/#">About</Link>
          </button>
        </div>
        <div>
          <button className="bg-white h-14 w-32 rounded hover:bg-slate-950 hover:text-white">
            <Link href="/#">About</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
