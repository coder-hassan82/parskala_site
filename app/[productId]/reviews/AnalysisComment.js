"use client";

import { useEffect, useState } from "react";
import style from "@/app/_style/CommentsPage.module.css";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddComments from "./AddComments";
import { useUser } from "@/app/_components/context";

export default function AnalysisComment({ comments, productId }) {
  const [average, setAverage] = useState(0);
  const [ratings, setRatings] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [isActive, setIsActive] = useState(false);

  const { user, setIsLoginOpen } = useUser();

  useEffect(() => {
    function fetchComments() {
      if (comments.length > 0) {
        const allRatings = comments.map((c) => c.rating);
        setAverage(
          (
            allRatings.reduce((acc, cur) => acc + cur, 0) / allRatings.length
          ).toFixed(1)
        );
        setRatings({
          5:
            (allRatings.filter((r) => r === 5).length / allRatings.length) *
            100,
          4:
            (allRatings.filter((r) => r === 4).length / allRatings.length) *
            100,
          3:
            (allRatings.filter((r) => r === 3).length / allRatings.length) *
            100,
          2:
            (allRatings.filter((r) => r === 2).length / allRatings.length) *
            100,
          1:
            (allRatings.filter((r) => r === 1).length / allRatings.length) *
            100,
        });
      }
    }
    fetchComments();
  }, [comments]);

  return (
    <div className={style.createComment}>
      {comments.length > 0 ? (
        <div className={style.card}>
          <div className={style.contentRating}>
            <div className={style.ratingSection}>
              <div className={style.ratingBox}>
                <h2>{average}</h2>
                <p>{comments.length} نظر</p>
              </div>
              <div className={style.starBox}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={
                      i + 1 <= Math.round(average)
                        ? style.starActive
                        : style.starInactive
                    }
                  />
                ))}
              </div>
            </div>

            <div className={style.progressBar}>
              {[5, 4, 3, 2, 1].map((num) => (
                <div className={style.progressBox} key={num}>
                  <progress
                    max={100}
                    value={ratings[num] || 0}
                    className={style.progress}
                  ></progress>
                  <span className={style.label}>{num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.card}>
        <div className={style.addComment}>
          {user ? (
            <>
              <div className={style.caption}>
                <p>نظر خود را در مورد این محصول بنویسید...</p>
              </div>
              <button
                className={style.addCommentBtn}
                onClick={() => setIsActive(true)}
              >
                افزودن نظر
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </>
          ) : (
            <>
              <div className={style.caption}>
                <p>برای ثبت نظر باید وارد حساب خود شوید.</p>
              </div>
              <button
                className={style.addCommentBtn}
                onClick={() => setIsLoginOpen(true)}
              >
                ورود به حساب
              </button>
            </>
          )}
        </div>
      </div>

      {isActive && (
        <AddComments
          isActive={isActive}
          setIsActive={setIsActive}
          productId={productId}
        />
      )}
    </div>
  );
}
