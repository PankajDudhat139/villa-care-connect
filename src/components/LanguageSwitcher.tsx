"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (locale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <select
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="border p-2 rounded text-sm"
      defaultValue="ar"
    >
      <option value="ar">🇸🇦 العربية</option>
      <option value="en">🇬🇧 English</option>
    </select>
  );
};

export default LanguageSwitcher;