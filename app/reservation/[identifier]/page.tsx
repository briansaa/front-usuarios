'use client'

import { SchedulerComponent } from "@/app/src/ui/calendar/schedule"
import { SelectInput } from "@/app/src/ui/form/select"
import { Container } from "@/ui/container"
import { Header } from "@/ui/navigation/header"
import Link from "next/link"

export default function Home({ params }: { params: { identifier: string } }) {

  const handleChange = (change: any) => {
    console.log(change)
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Container>
        <div className="w-full px-4">
          <div className="w-full flex">
            <div className="w-1/3">
              <SelectInput nameLabel='Data' id={params.identifier} values={[]} isLoading={false} handleEvent={handleChange} />
            </div>
            <div className="w-2/3 flex justify-end gap-x-4">
              <Link href={`/reservation/${params.identifier}/edit`}
                className="bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded text-white">Reservar</Link>
              <Link href={`/reservation/${params.identifier}/delete`}
                className="bg-purple-500 hover:bg-purple-600 font-semibold py-2 px-4 rounded text-white">Atrás</Link>
            </div>
          </div>
          <div className="w-full">
            <SchedulerComponent data={[]} startHour={9} endHour={23} locale="es-ES" height={600} />
          </div>
        </div>
      </Container>
    </main>
  )
}