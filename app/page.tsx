import { Header } from "@/ui/navigation/header"
import { Container } from "@/ui/container";
import { EducationalAndRecreationalFacilityType } from "@/ui/home/educationalAndRecreationalFacility";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Container>
        <EducationalAndRecreationalFacilityType />
      </Container>
    </main>
  );
}
