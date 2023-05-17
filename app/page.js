import Image from "next/image";
import Link from "next/link";
import Greet from "@/components/Greet";
import Yaml from "@/components/Yaml";
import Test from "@/components/Test";

export default function Home() {

  return (
    <div className="min-h-screen flex bg-white  pt-16 ">
    
    <Yaml comp={"component1"}/>
      <br></br>
      <Yaml comp={"component2"}/>
    </div>
  );
}
