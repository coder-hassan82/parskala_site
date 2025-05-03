"use client";

import { useUser } from "@/app/_components/context";
import { getUserData } from "@/app/_server/data-server";
import style from "@/app/_style/DashBord.module.css";
import { faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateUserField } from "@/app/_server/data-server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await getUserData(user.id);
        setUserInfo(data);
      }
    };
    fetchData();
  }, [user]);

  if (!userInfo) {
    return (
      <div className={style.profileLoading}>در حال بارگذاری اطلاعات...</div>
    );
  }

  return (
    <div className={style.profilePage}>
      <div className={style.headerPage}>
        <span>مشخصات</span>
      </div>
      <div className={style.forms}>
        <ProfileField
          label="نام و نام خانوادگی"
          value={userInfo.full_name}
          fieldKey="full_name"
          userId={user.id}
          onUpdate={(key, val) =>
            setUserInfo((prev) => ({ ...prev, [key]: val }))
          }
        />
        <ProfileField
          label="پست الکترونیکی"
          value={userInfo.email}
          fieldKey="email"
          userId={user.id}
          onUpdate={(key, val) =>
            setUserInfo((prev) => ({ ...prev, [key]: val }))
          }
        />
        <ProfileField
          label="شماره موبایل"
          value={userInfo.phone}
          fieldKey="phone"
          userId={user.id}
          onUpdate={(key, val) =>
            setUserInfo((prev) => ({ ...prev, [key]: val }))
          }
        />
        <ProfileField
          label="کد ملی"
          value={userInfo.national_code}
          fieldKey="national_code"
          userId={user.id}
          onUpdate={(key, val) =>
            setUserInfo((prev) => ({ ...prev, [key]: val }))
          }
        />
        <ProfileField
          label="تاریخ تولد"
          value={userInfo.birthday}
          fieldKey="birthday"
          userId={user.id}
          onUpdate={(key, val) =>
            setUserInfo((prev) => ({ ...prev, [key]: val }))
          }
        />
        <ProfileField
          label="شغل"
          value={userInfo.job}
          fieldKey="job"
          userId={user.id}
          onUpdate={(key, val) =>
            setUserInfo((prev) => ({ ...prev, [key]: val }))
          }
        />
      </div>
    </div>
  );
}

function ProfileField({ label, value, fieldKey, userId, onUpdate }) {
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleEdit = async () => {
    if (editable) {
      setLoading(true);
      const success = await updateUserField(userId, fieldKey, inputValue);
      setLoading(false);
      if (success) {
        setEditable(false);
        const updatedUser = await getUserData(userId);
        if (onUpdate) {
          onUpdate(fieldKey, updatedUser[fieldKey]);
        }
      }
    } else {
      setEditable(true);
    }
  };

  useEffect(() => {
    if (editable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editable]);

  const formatDateInput = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 8); // فقط عدد و حداکثر ۸ رقم
    const parts = [];

    if (digits.length >= 4) {
      parts.push(digits.slice(0, 4)); // سال
      if (digits.length >= 6) {
        parts.push(digits.slice(4, 6)); // ماه
        if (digits.length >= 8) {
          parts.push(digits.slice(6, 8)); // روز
        } else {
          parts.push(digits.slice(6)); // هرچقدر روز هست
        }
      } else {
        parts.push(digits.slice(4)); // فقط ماه
      }
    } else {
      parts.push(digits); // فقط سال یا کمتر
    }

    return parts.join("/");
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (fieldKey === "birthday") {
      setInputValue(formatDateInput(val));
    } else {
      setInputValue(val);
    }
  };

  return (
    <form className={style.feildInputs} onSubmit={(e) => e.preventDefault()}>
      <div className={style.part1form}>
        <label className={style.Label}>{label}</label>
        <input
          type="text"
          className={style.Input}
          value={inputValue}
          readOnly={!editable}
          ref={inputRef}
          onChange={handleInputChange}
          inputMode={fieldKey === "birthday" ? "numeric" : undefined}
          placeholder={fieldKey === "birthday" ? "yyyy/mm/dd" : ""}
        />
      </div>
      <button
        type="button"
        className={style.feildBtn}
        onClick={handleEdit}
        disabled={loading}
      >
        <FontAwesomeIcon icon={editable ? faCheck : faPencil} />
      </button>
    </form>
  );
}
