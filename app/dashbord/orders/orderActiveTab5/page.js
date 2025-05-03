import style from "@/app/_style/DashBord.module.css";

export default function Page() {
  return (
    <div className={style.noOreder}>
      <h4>سفارش فعالی در این صفحه وجود ندارد</h4>
      <img src="/order.webp" />
    </div>
  );
}
