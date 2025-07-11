'use client'

import Link from "next/link";
import '../header.css'; 
import '../../app/globals.css'
import { MdMenu } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
    



export default function Header (){

const currentPath = usePathname();
const[drawer,setDrawer] = useState(false);
const[title,setTitle] = useState("futebol");

useEffect(()=>{
    setTitle(document.title);
    setDrawer(false)
},[currentPath]);

return(
<nav  className="flex items-center gap-6 justify-start md:justify-center -color-background py-2 sm:py-4 px-6 bg-black" >

    <button className="sm:hidden" aria-label="Abrir menu" onClick={()=> setDrawer(true)}>
        <MdMenu size={24}/>
    </button>
    
    <ul className="flex gap-4 items-center">
  <li className="my-2">
    <Link href='/' className="border-2 rounded-md py-2 px-1 font-bold">Food</Link>
  </li>
  <li className="hidden sm:block">
    <Link href='/' data-active={currentPath === '/'} className="data-[active=true]:underline"></Link>
  </li>
  <li className="hidden sm:block">
    <Link href='/' data-active={currentPath === '/'} className="data-[active=true]:underline"></Link>
        </li>
        <li className="hidden sm:block">
    <Link href='' className="flex gap-1 items-center" target="_blank">Github
  <FaGithub /></Link>
   </li>
         <li className="hidden sm:block">
    <Link href='' className="flex gap-1 items-center" target="_blank">Linkedin
  <FaLinkedin /></Link>
        </li>
    </ul>

<div data-open={drawer}
tabIndex={drawer ? undefined: -1}
onClick={()=>setDrawer(false)}
className="bg-gradient-to-r from-background fixed top-0 left-0 bottom-0 right-0 transition-transform data-[open=false]:-translate-x-full">
<ul className=" flex gap-4 flex-col p-4 w-60 h-full bg-black " onClick={e => e.stopPropagation()}>

        <li className="border-b-2 border-white  ">
    <Link href='/' data-active={currentPath === '/'} className="data-[active=true]:underline">Times</Link>
        </li>
        <li className="border-b-2 border-white ">
  <Link href='/' data-active={currentPath === '/'} className="data-[active=true]:underline">Jogadores</Link>
        </li>
        <li className="">
    <Link href='' className="flex gap-1 items-center" target="_blank">Github
  <FaGithub /></Link>
   </li>
         <li className="">
    <Link href='' className="flex gap-1 items-center" target="_blank">Linkedin
  <FaLinkedin /></Link>
        </li>
    </ul>
</div>
    <h1 className="sm:hidden">{title}</h1>
</nav>
);
}