'use client'

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Header } from "@/ui/navigation/header"
import { Container } from "@/ui/container";
import { EducationalAndRecreationalFacilityType } from "@/ui/home/educationalAndRecreationalFacility";

// Muestra el aviso de "reserva guardada" cuando se vuelve desde el formulario de reserva.
function ReservationToast() {
  const from = useSearchParams().get('from')

  useEffect(() => {
    if (from === 'CreateReservation') toast.success("Reserva guardada correctamente")
  }, [from])

  return null
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={null}>
        <ReservationToast />
      </Suspense>
      <Header />
      <Container>
        <EducationalAndRecreationalFacilityType />
      </Container>
    </main>
  );
}
