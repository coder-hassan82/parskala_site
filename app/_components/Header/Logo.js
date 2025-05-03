import style from "@/app/_style/Header.module.css";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
function Logo() {
  return (
    <div className={style.logoContainer}>
      <Link href="/">
        <Image src={logo} alt="logo" className={style.logo} />
      </Link>
    </div>
  );
}

export default Logo;
