"use client";

import { useState } from "react";
import style from "@/app/_style/CommentsPage.module.css";
import { faCircleUser, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function convertToJalaliIntl(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function CommentsList({ comments }) {
  const pageSize = 6; // تعداد کامنت‌ها در هر صفحه
  const [page, setPage] = useState(1);

  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(comments.length / pageSize);

  // برش دادن کامنت‌ها بر اساس صفحه فعلی
  const paginatedComments = comments.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className={style.commentSlider}>
      {paginatedComments.length > 0 &&
        paginatedComments.map((comment, index) => (
          <div className={style.comment} key={index}>
            <div className={style.part}>
              <div className={style.avatar}>
                <FontAwesomeIcon icon={faCircleUser} />
              </div>
              <div className={style.part2}>
                <div className={style.part3}>
                  <h3 className={style.userName}>{comment.users.full_name}</h3>
                  <div className={style.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={
                          i + 1 <= comment.rating ? style.full : style.empty
                        }
                      />
                    ))}
                  </div>
                </div>
                <span className={style.date}>
                  {convertToJalaliIntl(comment.created_at)}
                </span>
              </div>
            </div>
            <p className={style.textComment}>{comment.comment}</p>
          </div>
        ))}

      {/* دکمه‌های Pagination */}
      {totalPages > 1 && (
        <div className={style.pagination}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            قبلی
          </button>
          <span>
            صفحه {page} از {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
}
