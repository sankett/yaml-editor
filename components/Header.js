import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white z-50 shadow 
    bg-gradient-to-r from-indigo-500 to-indigo-900">
      
      <div className="text-sm 
       sm:text-lg 
       md:text-2xl
       lg:text-2xl
       xl:text-2xl
       2xl:text-2xl
      font-semibold text-white">YAML Editor </div>        
     
      
      <div className="flex items-center space-x-4 text-xs text-white">
       &nbsp;
        
      </div>
     
    </header>
  );
}

export default Header;