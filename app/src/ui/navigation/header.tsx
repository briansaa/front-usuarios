'use client'

import Image from "next/image"
import LogoSaditec from "@/public/img/img_logo_saditec.png"
import { redirectClient } from "@/lib/utils/redirectManage"

const Header = () => {

    const handleClick = () => redirectClient("/")

    return (
        <header className="w-full h-32 bg-transparent flex justify-center items-center hover:cursor-pointer" onClick={handleClick}>
            <Image src={LogoSaditec} alt="Logo" width={80} height={80} priority/>
        </header>
    )
}

export { Header }