"use client";

import { submitAddress } from "@/app/_server/data-server";
import style from "@/app/_style/AddNewAddres.module.css";
import {
  faChevronDown,
  faChevronUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddNewAddres({ user, setAddAddres }) {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [openStateList, setOpenStateList] = useState(false);
  const [openCityList, setOpenCityList] = useState(false);

  const selectedState = watch("state");
  const selectedCity = watch("city");
  const address = watch("address");
  const pelak = watch("pelak");
  const vahed = watch("vahed");
  const postal_code = watch("postal_code");
  const full_name = watch("full_name");
  const phone = watch("phone");
  const national_code = watch("national_code");
  const isReceiverMyself = watch("checkbox");

  // گرفتن لیست استان‌ها
  useEffect(() => {
    fetch("https://iran-locations-api.vercel.app/api/v1/fa/states")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error("خطا در دریافت استان‌ها:", err));
  }, []);

  // گرفتن لیست شهرها بر اساس استان انتخاب شده
  useEffect(() => {
    if (selectedState) {
      setValue("city", ""); // پاک کردن شهر
      setCities([]);
      setLoadingCities(true);
      const encodedState = encodeURIComponent(selectedState);
      fetch(
        `https://iran-locations-api.vercel.app/api/v1/fa/cities?state=${encodedState}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data[0]?.cities) {
            setCities(data[0].cities);
          }
        })
        .catch((err) => console.error("خطا در دریافت شهرها:", err))
        .finally(() => setLoadingCities(false));
    }
  }, [selectedState, setValue]);

  useEffect(() => {
    if (isReceiverMyself) {
      setValue("full_name", user.full_name);
      setValue("phone", user.phone);
      setValue("national_code", user.national_code);
    } else {
      setValue("full_name", "");
      setValue("phone", "");
      setValue("national_code", "");
    }
  }, [isReceiverMyself, setValue]);

  const onSubmit = async (formData) => {
    const { error } = await submitAddress(formData, user.id);
    if (error) {
      console.error("❌ خطا در ثبت آدرس:", error.message);
    } else {
      console.log("✅ آدرس با موفقیت ثبت شد");
      reset(); // اگر از useForm استفاده می‌کنی
      setAddAddres(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.header}>
          <h3>افزودن آدرس</h3>
          <button onClick={() => setAddAddres(false)}>&times;</button>
        </div>

        <div className={style.section}>
          <p className={style.title}>جزئیات آدرس را وارد کنید</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.div}>
              {/* استان */}
              <div className={style.inputContainer}>
                <label
                  htmlFor="state"
                  className={`${
                    selectedState || openStateList ? style.changLabel : ""
                  }`}
                >
                  استان
                </label>
                <input
                  id="state"
                  {...register("state", { required: true })}
                  value={selectedState || ""}
                  readOnly
                  onFocus={() => setOpenStateList(true)}
                  onBlur={() => setTimeout(() => setOpenStateList(false), 200)}
                />
                <FontAwesomeIcon
                  icon={openStateList ? faChevronUp : faChevronDown}
                  className={`${style.icon} ${openStateList && style.rotate}`}
                  onClick={() => setOpenStateList((prev) => !prev)}
                />
                {openStateList && (
                  <div className={style.listOption}>
                    {provinces.map((province) => (
                      <p
                        key={province.id}
                        className={`${style.options} ${
                          selectedState === province.name ? style.selected : ""
                        }`}
                        onClick={() => {
                          setValue("state", province.name);
                          setOpenStateList(false);
                        }}
                      >
                        {selectedState === province.name && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={style.tick}
                          />
                        )}
                        {province.name}
                      </p>
                    ))}
                  </div>
                )}
                {errors.state && (
                  <span className={style.errorText}>استان الزامی است</span>
                )}
              </div>

              {/* شهر */}
              <div className={style.inputContainer}>
                <label
                  htmlFor="city"
                  className={`${
                    selectedCity || openCityList ? style.changLabel : ""
                  }`}
                >
                  شهر
                </label>
                <input
                  id="city"
                  {...register("city", { required: true })}
                  value={selectedCity || ""}
                  readOnly
                  disabled={!selectedState}
                  onFocus={() => setOpenCityList(true)}
                  onBlur={() => setTimeout(() => setOpenCityList(false), 200)}
                />
                <FontAwesomeIcon
                  icon={openCityList ? faChevronUp : faChevronDown}
                  style={{ display: selectedState ? "block" : "none" }}
                  className={`${style.icon} ${openCityList && style.rotate}`}
                  onClick={() => setOpenCityList((prev) => !prev)}
                />
                {openCityList && (
                  <div className={style.listOption}>
                    {cities.map((city) => (
                      <p
                        key={city.id}
                        className={`${style.options} ${
                          selectedCity === city.name ? style.selected : ""
                        }`}
                        onClick={() => {
                          setValue("city", city.name);
                          setOpenCityList(false);
                        }}
                      >
                        {selectedCity === city.name && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={style.tick}
                          />
                        )}
                        {city.name}
                      </p>
                    ))}
                  </div>
                )}
                {errors.city && (
                  <span className={style.errorText}>شهر الزامی است</span>
                )}
              </div>
            </div>

            <div className={style.div}>
              <div className={style.div}>
                <div className={style.inputContainer}>
                  <label
                    htmlFor="pelak"
                    className={`${pelak ? style.changLabel : ""}`}
                  >
                    پلاک
                  </label>
                  <input
                    type="text"
                    id="pelak"
                    {...register("pelak", { required: true })}
                  />
                  {errors.pelak && (
                    <span className={style.errorText}>پلاک الزامی است</span>
                  )}
                </div>
                <div className={style.inputContainer}>
                  <label
                    htmlFor="vahed"
                    className={`${vahed ? style.changLabel : ""}`}
                  >
                    واحد
                  </label>
                  <input type="text" id="vahed" {...register("vahed")} />
                </div>
              </div>
              <div className={style.inputContainer}>
                <label
                  htmlFor="postal_code"
                  className={`${postal_code ? style.changLabel : ""}`}
                >
                  کد پستی
                </label>
                <input
                  type="text"
                  id="postal_code"
                  {...register("postal_code", { required: true })}
                />
                {errors.postal_code && (
                  <span className={style.errorText}>کد پستی الزامی است</span>
                )}
              </div>
            </div>

            <div className={style.inputContainer}>
              <label
                htmlFor="address"
                className={`${address ? style.changLabel : ""}`}
              >
                آدرس
              </label>
              <input
                type="text"
                id="address"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <span className={style.errorText}>آدرس الزامی است</span>
              )}
            </div>

            <div className={style.checkboxContainer}>
              <input type="checkbox" {...register("checkbox")} />
              <label>گیرنده سفارش خودم هستم.</label>
            </div>

            <div className={style.inputContainer}>
              <label
                htmlFor="full_name"
                className={`${full_name ? style.changLabel : ""}`}
              >
                نام گیرنده
              </label>
              <input
                type="text"
                id="full_name"
                {...register("full_name", { required: true })}
              />
              {errors.full_name && (
                <span className={style.errorText}>نام گیرنده الزامی است</span>
              )}
            </div>

            <div className={style.div}>
              <div className={style.inputContainer}>
                <label
                  htmlFor="phone"
                  className={`${phone ? style.changLabel : ""}`}
                >
                  شماره گیرنده
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span className={style.errorText}>
                    شماره گیرنده الزامی است
                  </span>
                )}
              </div>

              <div className={style.inputContainer}>
                <label
                  htmlFor="national_code"
                  className={`${national_code ? style.changLabel : ""}`}
                >
                  کد ملی گیرنده
                </label>
                <input
                  type="text"
                  id="national_code"
                  {...register("national_code", { required: true })}
                />
                {errors.national_code && (
                  <span className={style.errorText}>
                    کد ملی گیرنده الزامی است
                  </span>
                )}
              </div>
            </div>

            <button type="submit" className={style.submitBtn}>
              ذخیره آدرس
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
