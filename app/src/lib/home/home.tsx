'use server'

import { ApiResponse } from "@/models/api"
import { TEducationalAndRecreationalFacilityTypeModel } from "@/models/home"
import { buildHeader } from "@/lib/utils/fetchUtil"

const getAllEducationalAndRecreationalFacilityType = async () => {

    const response = await fetch(`${process.env.baseUrl}/educational/recreational/facilities/type`, {
        headers: await buildHeader(),
        method: 'GET'
    })

    const data = await response.json()

    return data as ApiResponse<TEducationalAndRecreationalFacilityTypeModel[]>
}

export { getAllEducationalAndRecreationalFacilityType }