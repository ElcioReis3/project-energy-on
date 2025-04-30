import { Header } from "@/components/header";
import { TableClientes } from "@/components/Tables/TableClientes";

export default function Page() {
  return (
    <div>
      <Header visibility={false} />
      <div className="w-full text-center font-semibold text-xl my-7">
        Clientes
      </div>
      <div className="w-full max-w-3xl m-auto">
        <TableClientes />
      </div>
    </div>
  );
}
