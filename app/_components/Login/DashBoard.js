import styles from "@/app/_style/Header.module.css";
import {
  faAngleLeft,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useUser } from "../context";

export default function DashBoard() {
  const { handleLogout } = useUser();
  return (
    <div className={styles.dashBoardContainer}>
      <ui className={styles.listDashBoard}>
        <Link href="/dashbord/profile" className={styles.ItemDashBoard}>
          <div className={styles.titleItemDashBoard}>حساب کاربری</div>
          <div className={styles.angleLeft}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        </Link>
        <Link href="#" className={styles.ItemDashBoard}>
          <div className={styles.titleItemDashBoard}>ویرایش مشخصات فردی</div>
          <div className={styles.angleLeft}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        </Link>
        <Link href="#" className={styles.ItemDashBoard}>
          <div className={styles.titleItemDashBoard}>سفارش های من</div>
          <div className={styles.angleLeft}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
        </Link>
        <li className={styles.ItemDashBoard} onClick={handleLogout}>
          <div className={styles.titleItemDashBoard}>
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            خروج از حساب کاربری
          </div>
        </li>
      </ui>
    </div>
  );
}
