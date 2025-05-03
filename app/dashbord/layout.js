import Navigation from "./Navigation";
import style from "@/app/_style/DashBord.module.css";
export default function layout({ children }) {
  return (
    <div className={style.parent}>
      <Navigation />
      <div className={style.div1}>{children}</div>
    </div>
  );
}
