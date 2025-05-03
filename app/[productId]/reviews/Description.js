import style from "@/app/_style/CommentsPage.module.css";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Description() {
  return (
    <div className={style.header}>
      <FontAwesomeIcon icon={faCaretLeft} />
      <h3>نظرات کاربران</h3>
    </div>
  );
}
