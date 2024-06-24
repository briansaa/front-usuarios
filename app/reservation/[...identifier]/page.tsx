'use client'

import { fetchEducationalAndFacilityByIdentifier, fetchEducationalAndFacilityByTypeIdentifier, saveReservation } from "@/lib/reservation/facilities"
import { SchedulerComponent } from "@/app/src/ui/calendar/schedule"
import { SelectInput } from "@/app/src/ui/form/select"
import { Loading } from "@/app/src/ui/loading"
import { Container } from "@/ui/container"
import { Header } from "@/ui/navigation/header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { TReservationModel } from "@/app/src/models/facility"
import { redirectClient } from "@/app/src/lib/utils/redirectManage"


const parseHourFromTimeString = (timeString: string) => {
  const [hour, minute] = timeString.split(':')
  return parseInt(hour, 10);
}

const parseDateToViewUser = (object: any) => {
  const { startDate, endDate }: { startDate: Date, endDate: Date } = object
  const date = new Date(startDate)
  const startTime = startDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })
  const endTime = endDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })
  return `${date.toLocaleDateString()} de ${startTime} hasta ${endTime}`
}

export default function Home({ params }: { params: { identifier: string[] } }) {

  const [loadingMain, setLoadingMain] = useState(true)
  const [loadingSchedule, setLoadingSchedule] = useState(true)
  const [educationalAndRecreationalFacilityByType, setEducationalAndRecreationalFacilityByType] = useState<any>()
  const [educationalAndRecreationalFacility, setEducationalAndRecreationalFacility] = useState<any>()
  const [schedule, setSchedule] = useState<any>()
  const [scheduleStartEndHour, setScheduleStartEndHour] = useState<any>()
  const [selectedDate, setSelectedDate] = useState<any>()

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
    setSelectedDate(undefined)

    if (!change.target.value) {
      setSchedule([])
      setScheduleStartEndHour(undefined)
      setLoadingSchedule(false)
      return
    }

    setLoadingSchedule(true)

    await fetchEducationalAndFacilityByIdentifier(change.target.value)
      .then((response) => {
        const data = response.data.reservations.map((x, index) => {
          const date = new Date(x.reservationDate)
          const startDate = date.setHours(parseHourFromTimeString(x.startTime))
          const endDate = date.setHours(parseHourFromTimeString(x.endTime))
          return {
            title: 'Reservado',
            startDate: startDate,
            endDate: endDate,
            id: index + 1,
            date: date
          }
        })

        setSchedule(data)

        response.data.recreationalHours = response.data.recreationalHours.sort((a, b) => a.startTime.localeCompare(b.startTime))

        const startHour = response.data.recreationalHours.length > 0 ? parseHourFromTimeString(response.data.recreationalHours[0].startTime) : 9
        let endHour = response.data.recreationalHours.length > 0 ? parseHourFromTimeString(response.data.recreationalHours[response.data.recreationalHours.length - 1].endTime) : 13

        if (response.data.recreationalHours.length === 0) toast.error(`El ${params.identifier[1]} no tiene horarios para reservar`)

        setScheduleStartEndHour({ startHour: startHour, endHour: endHour })
        setLoadingSchedule(false)
      })
    // .catch(() => toast.error("Error al obtener los datos de reservas"))
  }

  const handleReservation = async () => {

    // validate If Date Not Contain Reservation
    const isDateNotContainReservation = schedule.filter((x: any) => {
      const { startDate, endDate }: { startDate: number, endDate: number } = x
      const { startDate: selectedDateStartDate, endDate: selectedDateEndDate }: { startDate: Date, endDate: Date } = selectedDate
      return startDate === selectedDateStartDate.getTime() || endDate === selectedDateEndDate.getTime()
    })

    if (isDateNotContainReservation.length > 0) return toast.error("La fecha seleccionada ya está reservada")

    setLoadingSchedule(true)
    setSelectedDate(undefined)

    const { startDate, endDate } = selectedDate
    const date = new Date(startDate)
    date.setHours(0, 0, 0)

    const reservation = {
      reservationDate: date.toISOString(),
      startTime: startDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }),
      endTime: endDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }),
      educationalAndRecreationalFacility: educationalAndRecreationalFacility
    } as TReservationModel

    await saveReservation(reservation)
      .then(async (response) => {
        toast.success("Reserva guardada correctamente")

        await new Promise((resolve) => setTimeout(resolve, 2500))

        redirectClient('/?from=CreateReservation')
      })
      .catch((err) => {
        setLoadingSchedule(false)
        console.log(err)
        toast.error("Error al guardar la reserva")
      })
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
              <span className="mx-auto flex items-center rounded-md border border-blue-400 p-2">Reserva: {selectedDate ? `${parseDateToViewUser(selectedDate)}` : loadingSchedule ? 'Cargando...' : 'Seleccione una fecha'}</span>
              <button
                className={`bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded text-white ${selectedDate ? '' : 'cursor-not-allowed'}`}
                disabled={!selectedDate} onClick={handleReservation}>Reservar</button>
              <Link href={`/`}
                className={`bg-purple-500 hover:bg-purple-600 font-semibold py-2 px-4 rounded text-white ${loadingSchedule ? 'cursor-not-allowed' : ''}`}>Atrás</Link>
            </div>
          </div>
          <div className={`w-full ${educationalAndRecreationalFacility ? '' : 'cursor-not-allowed select-none'}`}>
            {loadingSchedule
              ? <Loading />
              : <SchedulerComponent data={schedule || []}
                startHour={scheduleStartEndHour ? scheduleStartEndHour.startHour : 9}
                endHour={scheduleStartEndHour ? scheduleStartEndHour.endHour : 13}
                setValue={setSelectedDate}
                cellDuration={60} locale="es-ES" height={600} />}
          </div>
        </div>
      </Container>
    </main>
  )
}