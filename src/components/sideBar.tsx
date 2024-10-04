import React from "react";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center w-52 bg-slate-600">
          {/* logo de la structure */}
          <div className="bg-slate-900 h-16 w-20 rounded-full my-10">
            {/* <img src="" alt="" /> */}
          </div>

          {/* les boutons de navigation */}
          <div className="h-screen w-[250px] flex flex-col justify-between items-center">
            <div className="flex flex-col justify-between items-center h-52">
              <button className="bg-white h-14 w-48 rounded hover:bg-slate-950 hover:text-white">
                <Link href="/#">About</Link>
              </button>
              <button className="bg-white h-14 w-48 rounded hover:bg-slate-950 hover:text-white">
                <Link href="/#">About</Link>
              </button>
              <button className="bg-white h-14 w-48 rounded hover:bg-slate-950 hover:text-white">
                <Link href="/#">About</Link>
              </button>
            </div>
            <div>
              <button className="bg-white h-14 w-48 rounded hover:bg-slate-950 hover:text-white">
                <Link href="/#">About</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
