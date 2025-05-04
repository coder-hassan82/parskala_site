/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["hlwzkqxingaysobvysci.supabase.co"],
  },
  // اضافه کردن این تنظیمات جدید
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // برای صفحاتی که از useSearchParams استفاده می‌کنند
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
};

export default nextConfig;
