import React from "react";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  return (
    <>
      <div>
        <div>
          {/* logo de la structure */}
          <div className="bg-slate-900 h-12 w-20 rounded-full">
            {/* <img src="" alt="" /> */}
          </div>

          {/* les boutons de navigation */}
          <div>
            <button>
              <Link href="/#">About</Link>
            </button>
            <button>
              <Link href="/#">About</Link>
            </button>
            <button>
              <Link href="/#">About</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
