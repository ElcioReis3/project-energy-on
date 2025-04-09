import { Banner } from "@/components/banner";
import { CardItens } from "@/components/cardItens";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header visibility={true} />
      <Banner />
      <CardItens />
      <Footer />
    </div>
  );
}
