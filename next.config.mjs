/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["hlwzkqxingaysobvysci.supabase.co"],
  },
  // حذف experimental.missingSuspenseWithCSRBailout
  // output: 'export', // اگر نیاز به استاتیک اکسپورت دارید
};

export default nextConfig;