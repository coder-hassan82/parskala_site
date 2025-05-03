"use client";
import { useState, useEffect } from "react";
import styles from "@/app/_style/Header.module.css";
import LoginModal from "../Login/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DashBoard from "../Login/DashBoard";
import { useUser } from "../context";

export default function Header() {
  const [dashBoard, setDashBoard] = useState(false);

  useEffect(() => {
    const handlePage = () => {
      setDashBoard(false);
    };

    document.addEventListener("click", handlePage);

    return () => {
      document.removeEventListener("click", handlePage);
    };
  }, [dashBoard]);

  const { user, setIsLoginOpen } = useUser();

  return (
    <>
      {!user ? (
        <button onClick={() => setIsLoginOpen(true)} className={styles.btn}>
          ورود / ثبت نام
        </button>
      ) : (
        <div className={styles.btnContainer}>
          <button
            className={styles.userIcon}
            onClick={() => setDashBoard(!dashBoard)}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
          {dashBoard && <DashBoard />}
        </div>
      )}
      <LoginModal />
    </>
  );
}
