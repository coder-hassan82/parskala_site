"use client";

import style from "@/app/_style/CommentsPage.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitComment } from "@/app/_server/data-server";
import { useUser } from "@/app/_components/context";
import PopupMessage from "@/app/_components/PopupMessage";

export default function AddComments({ isActive, setIsActive, productId }) {
  const { user } = useUser();
  const { register, handleSubmit, watch, reset } = useForm();
  const [lengthCount, setLengthCount] = useState(500);
  const [rating, setRating] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  const onSubmit = async (data) => {
    if (!user) {
      setPopupMessage("لطفاً ابتدا وارد شوید.");
      return;
    }

    try {
      const { error } = await submitComment(
        user.id,
        productId,
        rating,
        data.comment,
        data.anonymous
      );

      if (error) {
        setPopupMessage("خطا در ثبت نظر: " + error.message);
      } else {
        setPopupMessage("نظر شما با موفقیت ثبت شد!");
        reset();
        setRating(null);
        setIsActive(false);
      }
    } catch (err) {
      setPopupMessage("یک خطای غیرمنتظره رخ داد.");
    
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.pageForAddComment}>
        <div className={style.headerSection}>
          <h3>افزودن نظر</h3>
          <button onClick={() => setIsActive(false)}>x</button>
        </div>
        <p className={style.text}>به این کالا امتیاز دهید :)</p>
        <div className={style.btnGroup}>
          {[5, 4, 3, 2, 1].map((value) => (
            <button
              key={value}
              className={`${style.selectRate} ${
                rating === value ? style[`rating${value}`] : ""
              }`}
              onClick={() => setRating(value)}
            >
              <img src={`../rating-${value}.png`} alt={`rating-${value}`} />
              <span>{["عالی", "خوب", "معمولی", "ضعیف", "بد"][5 - value]}</span>
            </button>
          ))}
        </div>
        <p className={style.text}>نظر خود را در مورد این محصول بنویسید.</p>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.textareaBox}>
            <textarea
              placeholder="*توضیحات"
              rows={5}
              maxLength={500}
              className={style.textarea}
              {...register("comment", { required: true })}
              onChange={(e) => setLengthCount(500 - e.target.value.length)}
            ></textarea>
            <span className={style.capacity}>{lengthCount}</span>
          </div>
          <div className={style.checkBox}>
            <input
              type="checkbox"
              id="checkbox"
              className={style.filed}
              {...register("anonymous")}
            />
            <label htmlFor="checkbox">کاربر ناشناس</label>
          </div>
          <p className={style.policy}>
            با “ثبت نظر” موافقت خود را با <a href="#">قوانین انتشار نظرات</a> در
            پارس کالا اعلام می‌کنم
          </p>
          <button className={style.btnForm} type="submit">
            ثبت نظر
          </button>
        </form>
      </div>

      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
        />
      )}
    </div>
  );
}
