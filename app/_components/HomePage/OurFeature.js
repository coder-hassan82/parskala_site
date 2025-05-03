import style from "@/app/_style/HomePage.module.css";
import {
  faCalendarDays,
  faLifeRing,
  faTruckFast,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const list = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faTruckFast} />,
    desctiption: "ارسال به کل کشور",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faWallet} />,
    desctiption: "تضمین قیمت کالا",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    desctiption: "6 روز گارانتی کالا",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faLifeRing} />,
    desctiption: "پشتیبانی 24 / 7",
  },
];

export default function OurFeature() {
  return (
    <div className={style.ourFeature}>
      {list.map((item,i) => (
        <div className={style.featureBox} key={i+1}>
          <div className={style.icons}>{item.icon}</div>
          <div className={style.desctiptions}>
            <p>پارس</p>
            <p>{item.desctiption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
