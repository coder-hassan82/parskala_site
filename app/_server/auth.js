import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { supabase } from "./supabase";

// کلید مخفی برای JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function checkOrCreateUser(phone) {
  // بررسی اینکه آیا کاربر قبلاً وجود دارد یا خیر
  let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("phone", phone)
    .single();

  if (error && error.code !== "PGRST116") return { error }; // خطاهای دیگر

  // اگر کاربر وجود نداشت، یک کاربر جدید بساز
  if (!user) {
    let { data, error: insertError } = await supabase
      .from("users")
      .insert([{ phone, full_name: "کاربر جدید" }])
      .select()
      .single();

    if (insertError) return { error: insertError };

    user = data;
  }

  return { user };
}

export function generateJWT(user) {
  return jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function setAuthCookie(res, token) {
  const cookie = serialize("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 روز
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
}
