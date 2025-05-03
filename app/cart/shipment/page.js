import style from "@/app/_style/Shipment.module.css";
import MyAddress from "./MyAddress";
import ShipMent from "./Shipment";

export default function Page() {
  return (
    <div className={style.container}>
      <MyAddress />
      <ShipMent />
    </div>
  );
}
