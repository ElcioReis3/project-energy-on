import { Banner } from "@/components/banner";
import { CardItens } from "@/components/cardItens";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <CardItens />
      <Footer />
    </div>
  );
}
