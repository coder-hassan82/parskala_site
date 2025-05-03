"use client";

import { useEffect, useState } from "react";
import style from "@/app/_style/ProductDetail.module.css";
import {
  faHeart,
  faShareNodes,
  faCopy,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import PopupMessage from "../PopupMessage";
import { useUser } from "../context";

// کامپوننت انتخاب رنگ
function ColorSelector({ variants, selectedColor, setSelectedColor }) {
  const colors = [...new Set(variants.map((item) => item.color))];
  return (
    <div className={style.selectColor}>
      <h4 className={style.heading}>انتخاب رنگ</h4>
      <div className={style.btnGroups}>
        {colors.map((color, i) => (
          <button
            key={i}
            className={`${style.color} ${
              selectedColor === color ? style.selected : ""
            }`}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
          >
            <p
              className={style.code}
              style={{ backgroundColor: color.code }}
            ></p>
            <p style={style.name}>{color.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// کامپوننت انتخاب سایز
function SizeSelector({
  variants,
  selectedColor,
  selectedSize,
  setSelectedSize,
}) {
  const availableSizes = selectedColor
    ? variants
        .filter((item) => item.color === selectedColor)
        .map((item) => item.size)
    : [];
  return (
    selectedColor && (
      <div className={style.selectSize}>
        <h4 className={style.heading}>انتخاب سایز</h4>
        <div className={style.btnGroups}>
          {availableSizes.map((size) => (
            <button
              key={size}
              className={`${style.size} ${
                selectedSize === size ? style.selected : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    )
  );
}

// کامپوننت مدیریت تعداد محصول
function AddToCartForm({ selectedVariant, finalPrice, product, setMessage }) {
  const { handleShopCart, shopCart } = useUser();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      product_id: "",
      variant_id: "",
      quantity: 1,
      final_price: 0,
    },
  });

  useEffect(() => {
    if (selectedVariant) {
      setValue("product_id", product.id);
      setValue("variant_id", selectedVariant.id);
      setValue("final_price", finalPrice + selectedVariant.extra_price);
    }
  }, [selectedVariant, setValue, product.id, finalPrice]);

  const quantity = watch("quantity");

  const handleQuantityChange = (e) => {
    let value = Math.floor(e.target.value); // مقدار را به عدد صحیح تبدیل می‌کند
    if (value < 1) value = 1; // حداقل مقدار را 1 قرار می‌دهد
    if (selectedVariant && value > selectedVariant.stock)
      value = selectedVariant.stock; // حداکثر مقدار را تنظیم می‌کند
    setValue("quantity", value);
  };

  const onSubmit = (data) => {
    const cart = shopCart || [];

    // بررسی اینکه آیا این محصول قبلاً در سبد خرید وجود دارد
    const existingIndex = cart.findIndex(
      (item) => item.variant_id === data.variant_id
    );

    if (existingIndex !== -1) {
      // اگر محصول قبلاً اضافه شده باشد، پیام مناسب را نمایش بده
      setMessage("این محصول قبلاً به سبد خرید اضافه شده است!");
      return; // خروج از تابع بدون افزودن مجدد
    } else {
      // اگر محصول جدید باشد، آن را به سبد خرید اضافه می‌کنیم
      cart.push({ ...data, quantity: data.quantity });
    }

    // ذخیره در localStorage
    handleShopCart(cart);

    setMessage("محصول با موفقیت به سبد خرید اضافه شد!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.addToCart}>
      <div className={style.field}>
        <button
          type="button"
          className={style.btnIncres}
          disabled={!selectedVariant || quantity >= selectedVariant.stock}
          onClick={() => setValue("quantity", quantity + 1)}
        >
          +
        </button>
        <input
          type="number"
          step="1"
          {...register("quantity")}
          onChange={handleQuantityChange} // جلوگیری از ورود اعشار
          disabled={!selectedVariant}
        />

        <button
          type="button"
          disabled={!selectedVariant || quantity <= 1}
          className={style.btnDecres}
          onClick={() => setValue("quantity", quantity - 1)}
        >
          -
        </button>
      </div>
      <button
        type="submit"
        className={style.btnAdd}
        disabled={!selectedVariant}
      >
        افزودن به سبد خرید
      </button>
    </form>
  );
}

// کامپوننت اشتراک‌گذاری
function ShareBox({ productUrl, showShareBox, setShowShareBox }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowShareBox(false);
    }, 1000);
  };

  return (
    showShareBox && (
      <div className={style.shareBox}>
        <button onClick={handleCopy} className={style.copyBtn}>
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
        </button>
        <input type="text" value={productUrl} readOnly />
      </div>
    )
  );
}

export default function BuyProduct({ product, variants }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showShareBox, setShowShareBox] = useState(false);
  const [productUrl, setProductURL] = useState("");
  const [message, setMessage] = useState("");

  function convertToJalaliIntl(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  const finalPrice = product.price - (product.price * product.discount) / 100;

  const selectedVariant = variants.find(
    (item) => item.size === selectedSize && item.color === selectedColor
  );

  const totalPrice = selectedVariant
    ? finalPrice + selectedVariant.extra_price
    : finalPrice;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProductURL(window.location.href);
    }
  }, []);

  return (
    <div className={style.leftSubContainer}>
      <div className={style.productName}>
        <h2 className={style.titleProduct}>{product.name}</h2>
        <p className={style.lastUpadte}>
          بروزرسانی قیمت:
          {convertToJalaliIntl(product.updated_at)}
        </p>
      </div>
      <div className={style.pricesDeatail}>
        <div className={style.pricesBox}>
          <p className={style.valueDiscount}>{product.discount}%</p>
          <div>
            <p className={style.previousValue}>
              {product.price.toLocaleString()}
            </p>
            <p className={style.currentValue}>
              {totalPrice.toLocaleString()}
              تومان
            </p>
          </div>
        </div>
        <div className={style.likeButton}>
          <button className={style.likeBtn}>
            <FontAwesomeIcon icon={faHeart} beat />
          </button>
          <button
            className={style.shareBtn}
            onClick={() => setShowShareBox(!showShareBox)}
          >
            <FontAwesomeIcon icon={faShareNodes} />
            <span>دوستاتو باخبر کن</span>
          </button>
        </div>
      </div>
      <ColorSelector
        variants={variants}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <SizeSelector
        variants={variants}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <AddToCartForm
        selectedVariant={selectedVariant}
        finalPrice={finalPrice}
        product={product}
        setMessage={setMessage}
      />

      <ShareBox
        productUrl={productUrl}
        showShareBox={showShareBox}
        setShowShareBox={setShowShareBox}
      />

      {message && (
        <PopupMessage message={message} onClose={() => setMessage(null)} />
      )}
    </div>
  );
}
