import Image from "next/image";
import Link from "next/link";

export const LogoMarca = () => {
  return (
    <Link href={"/"}>
      <Image
        src="/assets/images/logomarca.png"
        width={130}
        height={130}
        alt="logomarca"
      />
    </Link>
  );
};
