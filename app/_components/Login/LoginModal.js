"use client";

import { useState, useEffect } from "react";
import styles from "@/app/_style/LoginModal.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { checkOrCreateUser } from "@/app/_server/data-server";
import { useUser } from "../context";

export default function LoginModal() {
  const [step, setStep] = useState(1); // 1: دریافت شماره | 2: دریافت کد OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { handleLogin, isLoginOpen, setIsLoginOpen } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (isLoginOpen) {
      setErrorMessage("");
      clearErrors();
    }
  }, [isLoginOpen, clearErrors]);

  const sendOtp = async (data) => {
    if (/^09\d{9}$/.test(data.phone)) {
      setPhone(data.phone);
      try {
        const response = await axios.post("/api/sendOtp", {
          phone: data.phone,
        });

        if (response.status === 200) {
          setOtpCode(response.data.code);
          setStep(2);
        } else {
          setErrorMessage("ارسال کد OTP ناموفق بود");
        }
      } catch (error) {
        setErrorMessage("خطا در ارسال کد");
      }
    } else {
      setError("phone", {
        message: "شماره موبایل معتبر نیست (مثال: 09936545412)",
      });
    }
  };

  const verifyOtp = async () => {
    const enteredCode = otp.join("");
    if (enteredCode === otpCode) {
      try {
        const { user, error } = await checkOrCreateUser(phone);
        if (error) {
          setErrorMessage("خطا در بررسی یا ایجاد کاربر");
        } else {
          handleLogin(user); // به `Header` اطلاع می‌دهد که کاربر لاگین شده است
          handleClose();
        }
      } catch (err) {
        setErrorMessage("خطای غیرمنتظره در تأیید کاربر");
      }
    } else {
      setErrorMessage("کد وارد شده اشتباه است");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleClose = () => {
    setIsLoginOpen(false);
    reset();
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
    setErrorMessage("");
  };

  if (!isLoginOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose}>
          ×
        </button>
        <img src="./logo.png" className={styles.logo} />
        <div className={styles.feild}>
          <h3 className={styles.title}>ورود / ثبت نام</h3>
          {step === 1 ? (
            <>
              <p className={styles.descrip}>موبایل خود را وارد نمایید.</p>
              <form className={styles.form} onSubmit={handleSubmit(sendOtp)}>
                <div className={styles.inputBox}>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className={styles.userIcon}
                  />
                  <input
                    className={styles.input}
                    type="tel"
                    placeholder="09936545412"
                    {...register("phone", {
                      required: "شماره موبایل الزامی است",
                      pattern: {
                        value: /^09\d{9}$/,
                        message: "شماره موبایل معتبر نیست (مثال: 09936545412)",
                      },
                    })}
                    onInput={(e) => {
                      if (e.target.value.length > 11)
                        e.target.value = e.target.value.slice(0, 11);
                    }}
                    autoFocus
                  />
                </div>
                {errors.phone && (
                  <p className={styles.error}>
                    <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                    {errors.phone.message}
                  </p>
                )}
                <button className={styles.btnLogin} type="submit">
                  ارسال کد
                </button>
              </form>
            </>
          ) : (
            <>
              <p className={styles.descrip}>
                کد تأیید ارسال شده به شماره شما را وارد کنید
              </p>
              <div className={styles.formOtp}>
                <div className={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      className={styles.otpInput}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      dir="ltr"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {errorMessage && (
                  <p className={styles.error}>
                    <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                    {errorMessage}
                  </p>
                )}
              </div>

              <button className={styles.btnLogin} onClick={verifyOtp}>
                تایید کد
              </button>
            </>
          )}
          <p className={styles.footer}>
            با ورود و یا ثبت نام در سایت شما{" "}
            <Link href="" className={styles.p1}>
              شرایط و قوانین
            </Link>{" "}
            استفاده از سرویس های سایت و{" "}
            <Link href="#" className={styles.p2}>
              قوانین حریم خصوصی
            </Link>{" "}
            آن را می‌پذیرید.
          </p>
        </div>
      </div>
    </div>
  );
}
