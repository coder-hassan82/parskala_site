import style from "@/app/_style/Spinner.module.css";

export default function Loading() {
  return (
    <div className={style.spinner}>
      <div className={style.square}></div>
    </div>
  );
}
