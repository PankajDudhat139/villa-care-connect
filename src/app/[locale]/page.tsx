"use client";

import { useAuth } from "../../context/auth-context";
import { useTranslations } from "next-intl";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const t = useTranslations();
  // Don't render anything if not authenticated or still loading
  if (!isAuthenticated || isLoading) {
    return null; // The auth provider will handle redirecting
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">{t("welcomeMessage")}</h1>
      <p className="mb-4">{t("loginSuccessMessage")}</p>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-2">{t("quickTips")}</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("todoLinkTip")}</li>
          <li>{t("logoutTip")}</li>
          <li>{t("protectedRoutesTip")}</li>
          <li>{t("additionalTip")}</li>
        </ul>
      </div>
    </div>
  );
}
