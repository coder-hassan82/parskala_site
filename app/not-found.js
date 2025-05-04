import { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>صفحه یافت نشد</div>
    </Suspense>
  );
}
