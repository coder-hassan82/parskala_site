import { getProductFeature } from "@/app/_server/data-server";
import style from "@/app/_style/SubPageDetails.module.css";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";
import Loading from "../reviews/loading";


const attributeNames = {
  material: "جنس پارچه",
  fit_type: "نوع فیت",
  sleeve_type: "نوع آستین",
  neck_type: "مدل یقه",
  pattern: "طرح پارچه",
  closure_type: "نحوه بسته شدن",
  season: "مناسب برای فصل",
  wash_instruction: "نحوه شستشو",
  lining: "آستر",
  pockets: "تعداد جیب‌ها",
  dimensions: "ابعاد",
  clause: "بند",
  weight: "وزن محصول",
  extra_info: "توضیحات اضافی",
};

export default async function Page({ params }) {
  const productDetails = await getProductFeature(params.productId);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <FontAwesomeIcon icon={faCaretLeft} />
        <h3>مشخصات دیگر</h3>
      </div>
      <Suspense fallback={<Loading />}>
        <div className={style.detail}>
          <ul className={style.listDetail}>
            {Object.entries(productDetails).map(([key, value]) =>
              value ? (
                <li key={key} className={style.itemDetail}>
                  <p className={style.nameDetail}>
                    {attributeNames[key] || key}
                  </p>
                  {Array.isArray(value) ? (
                    <div className={style.valueDetail}>
                      <ul className={style.subList}>
                        {value.map((item, index) => (
                          <li key={index} className={style.subItem}>
                            {item.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className={style.valueDetail}>
                      {typeof value === "boolean"
                        ? value
                          ? "بله"
                          : "خیر"
                        : value.value || value}
                    </p>
                  )}
                </li>
              ) : null
            )}
          </ul>
        </div>
      </Suspense>
    </div>
  );
}
