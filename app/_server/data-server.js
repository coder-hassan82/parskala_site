import { supabase } from "./supabase";

export async function getProducts() {
  let { data: products, error } = await supabase.from("products").select("*");

  return { products, error };
}

export async function getImage(id) {
  let { data: product_images, error } = await supabase
    .from("product_images")
    .select("*") // یا ستون‌های مورد نظر به جای *
    .eq("product_id", id); // فیلتر بر اساس product_id

  return { product_images, error };
}
export async function getProductsWithImages() {
  // دریافت محصولات به همراه تصاویر و نام دسته‌بندی از دیتابیس
  let { data: products, error: productsError } = await supabase
    .from("products")
    .select("*, product_images(*), categories(name)");

  if (productsError) {
    console.error("خطا در دریافت محصولات:", productsError);
    return { products: [], error: productsError };
  }

  // تبدیل ساختار داده به شکل استاندارد
  const formattedProducts = products.map((product) => ({
    ...product,
    product_images: product.product_images || [],
    category_name: product.categories?.name || null, // استخراج نام دسته‌بندی
  }));

  return { products: formattedProducts, error: null };
}

export async function getProductDetails(productId) {
  // دریافت اطلاعات اصلی محصول
  let { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  // دریافت تصاویر محصول
  let { data: images, error: imagesError } = await supabase
    .from("product_images")
    .select("image_url")
    .eq("product_id", productId);

  // دریافت رنگ‌ها و سایزهای محصول
  let { data: variants, error: variantsError } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId);

  return {
    product,
    images,
    variants,
    errors: { productError, imagesError, variantsError },
  };
}
export async function getShopCartItem(variantId) {
  // دریافت اطلاعات واریانت مشخص‌شده
  let { data: variant, error: variantError } = await supabase
    .from("product_variants")
    .select("*")
    .eq("id", variantId)
    .single();

  if (!variant) {
    return {
      variant: null,
      product: null,
      images: [],
      errors: { variantError },
    };
  }

  // دریافت اطلاعات اصلی محصول
  let { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", variant.product_id)
    .single();

  // دریافت تصاویر محصول
  let { data: images, error: imagesError } = await supabase
    .from("product_images")
    .select("image_url")
    .eq("product_id", variant.product_id);

  return {
    variant,
    product,
    images,
    errors: { variantError, productError, imagesError },
  };
}

export async function getProductFeature(productId) {
  const { data, error } = await supabase
    .from("products")
    .select(
      "material, fit_type, sleeve_type, neck_type, pattern, closure_type, season, wash_instruction, lining, pockets, dimensions,clause, weight,extra_info"
    )
    .eq("id", productId)
    .single();

  return data;
}

export async function getProductComments(productId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*,users(full_name)")
    .eq("product_id", productId);

  return data;
}

export async function getRelatedProducts(productId) {
  // دریافت اطلاعات محصول فعلی
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("category_id")
    .eq("id", productId)
    .single();

  if (productError || !product) {
    console.error("خطا در دریافت محصول:", productError);
    return;
  }

  const { category_id } = product;

  // دریافت محصولات مرتبط با همان `category_id`
  const { data: related, error: relatedError } = await supabase
    .from("products")
    .select("*,product_images(image_url)")
    .eq("category_id", category_id)
    .neq("id", productId)
    .limit(6); // محدود کردن تعداد به ۶ محصول

  if (relatedError) {
    console.error("خطا در دریافت محصولات مرتبط:", relatedError);
    return;
  }

  return { related, relatedError };
}

export async function getUserByPhone(phone) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("phone", phone)
    .single();

  return { user: data, error };
}

// ایجاد کاربر جدید
export async function createUser(phone) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ phone }])
    .select()
    .single();

  return { user: data, error };
}

// بررسی و ایجاد کاربر در صورت عدم وجود
export async function checkOrCreateUser(phone) {
  let { user, error } = await getUserByPhone(phone);

  if (!user) {
    ({ user, error } = await createUser(phone));
  }

  return { user, error };
}

export async function submitComment(
  userId,
  productId,
  rating,
  comment,
  anonymous = false
) {
  const { error } = await supabase.from("reviews").insert([
    {
      product_id: productId,
      user_id: userId,
      rating,
      comment,
      created_at: new Date().toISOString(),
    },
  ]);

  return { error };
}

export async function getCategoryItem() {
  let { data: products } = await supabase.from("products").select("*");

  let { data: product_images } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", products.id);

  return { products, product_images };
}

//
export async function getUserData(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("خطا در گرفتن اطلاعات کاربر:", error.message);
    return null;
  }

  return data;
}

export async function updateUserField(userId, fieldKey, value) {
  const { error } = await supabase
    .from("users")
    .update({ [fieldKey]: value })
    .eq("id", userId);

  if (error) {
    console.error("خطا در آپدیت", error.message);
    return false;
  }

  return true;
}

export async function submitAddress(formData, userId) {
  const {
    state,
    city,
    pelak,
    vahed,
    postal_code,
    address,
    full_name,
    national_code,
    phone,
  } = formData;

  const { error } = await supabase.from("address").insert([
    {
      user_id: userId,
      state,
      city,
      pelak: Number(pelak),
      vahed: Number(vahed),
      postal_code: Number(postal_code),
      address,
      full_name,
      national_code,
      phone,
      created_at: new Date().toISOString(),
    },
  ]);

  return { error };
}

export async function getAddress(userId) {
  let { data: address, error } = await supabase
    .from("address")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("خطا در گرفتن اطلاعات کاربر:", error.message);
    return null;
  }

  return address;
}

export async function submitOrders(userID, orderData) {
  // 1. ثبت سفارش
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userID,
      address_id: orderData.address_id,
      total_price: orderData.items.reduce(
        (acc, item) => acc + item.final_price * item.quantity,
        0
      ),
      status: "processing",
    })
    .select()
    .single();

  if (orderError) return { orderError };

  console.log(orderData);

  // 2. ثبت آیتم‌های سفارش
  const itemsToInsert = orderData.items.map((item) => ({
    order_id: order.id,
    product_variant_id: item.variant.id,
    quantity: item.quantity,
    price: item.final_price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsToInsert);

  console.log(itemsToInsert);

  if (itemsError) return { itemsError };

  return { success: true };
}

export async function getProcessingOrders(user) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user)
    .eq("status", "processing");

  return { error, data };
}
