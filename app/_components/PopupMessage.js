"use client";
import { useEffect } from "react";
import styles from "@/app/_style/PopupMessage.module.css"; // استایل را ایجاد کن

export default function PopupMessage({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // بعد از ۳ ثانیه، پیام بسته می‌شود
    }, 3000);

    return () => clearTimeout(timer); // پاکسازی تایمر هنگام خروج
  }, [onClose]);

  return (
    <div className={styles.popup}>
      <p>{message}</p>
    </div>
  );
}
