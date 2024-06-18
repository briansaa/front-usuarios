'use client'

import { fetchEducationalAndFacilityByIdentifier, fetchEducationalAndFacilityByTypeIdentifier } from "@/lib/reservation/facilities"
import { SchedulerComponent } from "@/app/src/ui/calendar/schedule"
import { SelectInput } from "@/app/src/ui/form/select"
import { Loading } from "@/app/src/ui/loading"
import { Container } from "@/ui/container"
import { Header } from "@/ui/navigation/header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Home({ params }: { params: { identifier: string[] } }) {

  const [loadingMain, setLoadingMain] = useState(true)
  const [loadingSchedule, setLoadingSchedule] = useState(true)
  const [educationalAndRecreationalFacilityByType, setEducationalAndRecreationalFacilityByType] = useState<any>()
  const [educationalAndRecreationalFacility, setEducationalAndRecreationalFacility] = useState<any>()

  useEffect(() => {

    fetchEducationalAndFacilityByTypeIdentifier(params.identifier[0])
      .then((response) => {

        const dataToMap = response.data.map((x, index) => {
          return { id: index + 1, key: x.identifier, description: x.description }
        })

        setEducationalAndRecreationalFacilityByType(dataToMap)
      })
      .catch(() => toast.error("Error al obtener los datos"))
      .finally(() => {
        setLoadingMain(false)
        setLoadingSchedule(false)
      })

  }, [params.identifier])

  const handleChange = async (change: any) => {
    setEducationalAndRecreationalFacility(change.target.value)
    if (!change.target.value) return

  }

  return (
    <main className="min-h-screen">
      <Header />
      <Container>
        <div className="w-full px-4">
          <div className="w-full flex">
            <div className="w-1/3">
              <SelectInput nameLabel={params.identifier[1]} id={params.identifier[0]} values={educationalAndRecreationalFacilityByType || []} isLoading={loadingMain} handleEvent={handleChange} />
            </div>
            <div className="w-2/3 flex justify-end gap-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded text-white">Reservar</button>
              <Link href={`/`}
                className="bg-purple-500 hover:bg-purple-600 font-semibold py-2 px-4 rounded text-white">Atrás</Link>
            </div>
          </div>
          <div className={`w-full ${educationalAndRecreationalFacility ? '' : 'cursor-not-allowed select-none'}`}>
            {loadingSchedule
              ? <Loading />
              : <SchedulerComponent data={[]} startHour={9} endHour={23} locale="es-ES" height={600} cellDuration={30} />}
          </div>
        </div>
      </Container>
    </main>
  )
}