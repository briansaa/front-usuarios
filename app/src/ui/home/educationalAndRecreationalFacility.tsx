'use client'

import { TEducationalAndRecreationalFacilityTypeModel } from "@/models/home"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllEducationalAndRecreationalFacilityType } from "@/lib/home/home"
import { ApiResponse } from "@/models/api"

const EducationalAndRecreationalFacilityType = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [educationalTypeData, setEducationalTypeData] = useState <ApiResponse<TEducationalAndRecreationalFacilityTypeModel[]>>()

    useEffect(() => {

        getAllEducationalAndRecreationalFacilityType()
            .then((data) => {
                setEducationalTypeData(data)
                setIsLoading(false)
            })

    }, [])

    return (
        <>
            {
                isLoading
                    ? "Loading ..."
                    : educationalTypeData?.data.map((educationalType) => (
                        <div key={educationalType.identifier} className="w-2/3 min-h-40 flex rounded-md shadow-md hover:shadow-lg
                        hover:bg-slate-100 hover:cursor-pointer border-slate-200">
                            <div className={`w-4/6 flex justify-center items-center bg-no-repeat bg-cover bg-center text-white rounded-l-md`}
                                style={{ backgroundImage: `url('data:image/png;base64,${educationalType.imagePublic}')` }}>
                                <p>{educationalType.description}</p>
                            </div>
                            <div className="w-2/6 flex flex-col justify-center items-center gap-y-8">
                                <h3 className="text-xl font-semibold">{educationalType.name}</h3>
                                <Link href={`/reservation/${educationalType.identifier}`}
                                    className="bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded text-white">Reservar</Link>
                            </div>
                        </div>
                    ))
            }
        </>
    )
}

export { EducationalAndRecreationalFacilityType }