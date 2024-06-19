'use client'

import { Header } from "@/ui/navigation/header"
import { Container } from "@/ui/container";
import { EducationalAndRecreationalFacilityType } from "@/ui/home/educationalAndRecreationalFacility";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Home() {

  const searchParam = useSearchParams()
  const from = searchParam.get('from')

  useEffect(() => {
    console.log(from)
    if (from == 'CreateReservation') toast.success("Reserva guardada correctamente")
  }, [from])

  return (
    <main className={`min-h-screen`}>
      <Header />
      <Container>
        <EducationalAndRecreationalFacilityType />
      </Container>
    </main>
  );
}
