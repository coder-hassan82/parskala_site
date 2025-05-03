import style from "@/app/_style/ShopCart.module.css";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useUser } from "../_components/context";
import Link from "next/link";

export default function ShopCartItem({ cartItems, setCartItems }) {
  const { shopCart: itemID, handleShopCart } = useUser();

  // حذف محصول از سبد خرید
  const handleRemoveItem = (variant_id) => {
    const updatedCart = itemID.filter((item) => item.variant_id !== variant_id);
    handleShopCart(updatedCart); // ذخیره در localStorage
    setCartItems(updatedCart); // آپدیت UI
  };

  const handleQuantityChange = (index, value) => {
    let newQuantity = Math.floor(value); // حذف اعشار
    if (newQuantity < 1) newQuantity = 1;

    // محدود کردن مقدار به حداکثر موجودی کالا
    if (
      cartItems[index]?.variant?.stock &&
      newQuantity > cartItems[index].variant.stock
    ) {
      newQuantity = cartItems[index].variant.stock;
    }

    // ایجاد نسخه جدید از سبد خرید
    const updatedCart = [...itemID];
    updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };

    handleShopCart(updatedCart); // ذخیره در context و localStorage
  };

  return (
    <div className={style.rigthSide}>
      <h2 className={style.header}>سبد خرید شما</h2>
      {cartItems.length > 0 ? (
        <div className={style.listShopCart}>
          {cartItems.map((item, index) => (
            <div className={style.shopCartItem} key={index}>
              <Link href={item?.product.id} className={style.itemImg}>
                <img
                  src={item.images?.[0]?.image_url || "/placeholder.png"}
                  alt="product"
                />
              </Link>
              <div className={style.variants}>
                <h3 className={style.title}>{item.product?.name}</h3>
                <div className={style.sizeAndColor}>
                  <span>رنگ:</span>
                  <span>{item.variant?.color?.name}</span>
                </div>
                <div className={style.sizeAndColor}>
                  <span>سایز:</span>
                  <span>{item.variant?.size}</span>
                </div>
              </div>
              <div className={style.quantity}>
                <button
                  className={`${style.btnQuantity} ${
                    item.quantity >= item.variant?.stock
                      ? style.disabledBtn
                      : ""
                  }`}
                  onClick={() => handleQuantityChange(index, item.quantity + 1)}
                  disabled={item.quantity >= item.variant?.stock}
                >
                  +
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  className={style.filed}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
                <button
                  className={`${style.btnQuantity} ${
                    item.quantity <= 1 ? style.disabledBtn : ""
                  }`}
                  onClick={() => handleQuantityChange(index, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
              </div>
              <div className={style.price}>
                <span>قیمت واحد:</span>
                <span>{item?.final_price?.toLocaleString()} تومان</span>
              </div>
              <div
                className={style.deleteBtn}
                onClick={() => handleRemoveItem(item.variant.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.empty}>
          <img src="./empty-cart.svg" alt="empty cart" />
          <p>هیچ محصولی در سبد خرید نیست.</p>
        </div>
      )}
    </div>
  );
}
