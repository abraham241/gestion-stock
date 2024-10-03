import Image from "next/image";
import NavBar from "@/components/navBar";
import SideBar from "@/components/sideBar";

export default function Home() {
  return (
    <div className="flex ">
      <SideBar />
      <NavBar />
    </div>
  );
}
