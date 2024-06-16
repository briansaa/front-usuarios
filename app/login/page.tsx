'use client'

import Image from "next/image";
import imgLoginHeader from "@/public/img/img_login_header.png"
import { useEffect, useState } from "react";
import { useField, InputForm } from "@/ui/form/input";
import { login } from "@/lib/auth/authentication";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie, removeCookie, setCookie } from "@/lib/utils/cookiesManage";
import { redirectClient } from "@/lib/utils/redirectManage";

const useCustomStatus = () => {
    const [isStatus, setIsStatus] = useState(false)

    const handleStatus = (value: boolean) => setIsStatus(value)

    return ({ isStatus, handleStatus })
}

export default function Login() {

    const router = useRouter()
    const searchParams = useSearchParams()

    const loading = useCustomStatus()
    const error = useCustomStatus()

    const usernameInput = useField()
    const passwordInput = useField()

    const handleLogin = async () => {
        loading.handleStatus(true)
        error.handleStatus(false)

        const authData = await login(usernameInput.value, passwordInput.value)

        if (!authData) {
            loading.handleStatus(false)
            error.handleStatus(true)
            return
        }

        setCookie('jwt-token', authData.accessToken, { path: '/', secure: true, expires: new Date(authData.expirationTime) })

        redirectClient(searchParams.get('returnUrl') || '/')
    }

    useEffect(() => {
        const jwt_token = getCookie('jwt-token')
        if (jwt_token) removeCookie('jwt-token')
    }, [])

    return (
        <div className="w-screen h-screen bg-slate-200">
            <div className="h-full flex justify-center items-center">
                <div className="w-10/12 md:w-1/2 xl:w 2xl:w-1/3 h-auto bg-white/95 shadow-md rounded pt-10">
                    <div className="h-full flex flex-col justify-center items-center">
                        <div className="h-auto">
                            <Image src={imgLoginHeader} alt="Logo" width={200} height={150} />
                        </div>
                        <div className="flex flex-col gap-y-4">
                            <div className="font-bold text-xl text-center py-8">Iniciar Sesión</div>
                            <div className="flex items-center">
                                <label htmlFor="username" className="w-6/12 pe-5 font-semibold">Usuario:</label>
                                <InputForm type="text" id="username" placeholder="Usuario" handleEvent={usernameInput.handleChange} />
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="password" className="w-6/12 pe-5 font-semibold">Contraseña:</label>
                                <InputForm type="password" id="password" placeholder="Contraseña" handleEvent={passwordInput.handleChange} />
                            </div>
                        </div>
                        <div className={`${error.isStatus ? 'block mt-8 text-red-500 font-semibold' : 'hidden'}`}>
                            <span>Usuario o contraseña incorrectos</span>
                        </div>
                        <div className={`flex justify-center ${error.isStatus ? 'pt-8 pb-12' : 'py-16'}`}>
                            <button className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4
                            rounded inline-flex items-center ${loading.isStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleLogin} disabled={loading.isStatus}>
                                {
                                    loading.isStatus
                                        ? <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Iniciando ...
                                        </>
                                        : 'Iniciar Sesión'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}