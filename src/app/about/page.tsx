import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ListType = {
  description: string;
  urlImage: string;
};

export default function About() {
  const companyName: string = "ENERGY ON";

  const List: ListType[] = [
    {
      description:
        "Energia confiável: Garantimos fornecimento contínuo com alta performance e estabilidade.",
      urlImage:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvbHQiPjxwb2x5bGluZSBwb2ludHM9IjEzIDIgMyAxMiA5IDEyIDExIDIyIDIxIDEyIDE1IDEyIDEzIDIiLz48L3N2Zz4=",
    },
    {
      description:
        "Tecnologia de ponta: Investimos em infraestrutura moderna para gerar e distribuir energia com eficiência.",
      urlImage:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXR2Ij48cGF0aCBkPSJNMTkgMTlhMiAyIDAgMCAxIDItMnYtNGEyIDIgMCAwIDAtMi0ySDlMNiA0SDRjLTEuMSAwLTEuOS44LTIgMnYxMmMwIDEuMS44IDIgMiAyaDE0eiIvPjxwYXRoIGQ9Ik0xNSAxNS41IDEzIDEyVjloLTJ2M2wtMiAyLjUiLz48L3N2Zz4=",
    },
    {
      description:
        "Atendimento humanizado: Suporte eficiente para clientes residenciais, comerciais e industriais.",
      urlImage:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItY2lyY2xlIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48cGF0aCBkPSJNNSAxOGEuNzUuNzUgMCAwIDEgMCAwYzAgLTIuNzUgNC41LTUgNy01czcgMi4yNSA3IDVhLjc1Ljc1IDAgMCAxIDAgMCIvPjwvc3ZnPg==",
    },
  ];

  return (
    <>
      <Header visibility={false} />

      <div className="w-full max-w-2xl m-auto p-3">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-500">Quem Somos</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm">
                Somos uma empresa de energia elétrica comprometida com a
                inovação, sustentabilidade e o desenvolvimento do país. Nossa
                missão é fornecer energia com segurança, qualidade e
                responsabilidade social, contribuindo para o progresso das
                comunidades onde atuamos.
              </span>
            </CardContent>
          </Card>
        </div>
        <div className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle>
                Por que Escolher{" "}
                <span className="text-orange-500">{companyName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col">
                {List.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-7 hover:bg-gray-100 px-3 py-2"
                  >
                    <img
                      src={`${item.urlImage}`}
                      alt=""
                      className="text-orange-500"
                    />
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-3 my-3 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Nossa Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm">
                Fornecer energia com excelência, promovendo soluções
                sustentáveis que impulsionem o crescimento econômico,
                respeitando o meio ambiente e as necessidades da sociedade.
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Nossa Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm">
                Ser referência em geração, distribuição e inovação no setor
                elétrico, com foco na sustentabilidade, eficiência e satisfação
                do cliente.
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
