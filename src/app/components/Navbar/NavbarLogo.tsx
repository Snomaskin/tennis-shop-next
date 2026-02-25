import Link from "next/link";
import Image from "next/image";
import ballIcon from "@/assets/ball-colored.png";

export default function NavbarLogo() {
  return (
    <>
      {/* small screen */}
      <Link
        href="/"
        className="relative flex h-10 w-10 items-center justify-center duration-200 hover:scale-120 sm:hidden"
      >
        <Image
          src={ballIcon}
          alt="ball"
          width={20}
          height={20}
          className="rotate-20"
        />
      </Link>

      {/* big screen */}
      <Link
        href="/"
        className="group relative hidden h-15 w-20 items-center justify-center rounded-3xl border-3 border-yellow-200 bg-linear-to-br from-green-100 to-green-500 duration-300 sm:flex"
      >
        <div className="absolute h-full w-px bg-white" />
        <Image
          src={ballIcon}
          alt="ball"
          width={20}
          height={20}
          className="ml-3 rotate-20 duration-200 group-hover:-translate-x-4 group-hover:scale-80"
        />
      </Link>
    </>
  );
}
