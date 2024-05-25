import Swap from "@/components/Swap";
import Image from "next/image";
import bg from "../../public/bg.jpg";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center p-24"
    >
      <h1 className="text-3xl font-semibold text-[#fc72ff] mb-20">Crypto Swap</h1>
      <Swap />
    </main>
  );
}
