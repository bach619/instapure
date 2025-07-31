import { useTranslations } from "next-intl";
import { CheckCircle, Shield, TvMinimalPlay, Zap } from "lucide-react";
import { homeSections } from "@/lib/constants";

export function Features() {
  const t = useTranslations("pages.home.features");

  return (
    <section
      id={homeSections.features}
      className="w-full scroll-mt-12 bg-gradient-to-b from-background to-blue-50 py-12 md:py-24 dark:from-background dark:to-blue-900/20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="mb-2 inline-block rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 px-3 py-1 text-sm font-bold text-white shadow-md">
              {t("badge")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              {t("title")}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
              {t("description")}
            </p>
          </div>
          <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <div className="group relative flex flex-col items-center space-y-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl sm:p-6 dark:from-gray-800 dark:to-blue-900/30 dark:border-blue-900/50">
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full rotate-6 group-hover:animate-bounce">
                🎉
              </div>
              <div className="rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-3 shadow-md">
                <Shield className="h-6 w-6 text-white sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl">
                {t("cards.free.title")}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                {t("cards.free.description")}
              </p>
            </div>
            <div className="group flex flex-col items-center space-y-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl sm:p-6 dark:from-gray-800 dark:to-blue-900/30 dark:border-blue-900/50">
              <div className="rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-3 shadow-md">
                <CheckCircle className="h-6 w-6 text-white sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl">
                {t("cards.noRegistration.title")}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                {t("cards.noRegistration.description")}
              </p>
            </div>
            <div className="group flex flex-col items-center space-y-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl sm:p-6 dark:from-gray-800 dark:to-blue-900/30 dark:border-blue-900/50">
              <div className="rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-3 shadow-md">
                <Zap className="h-6 w-6 text-white sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl">
                {t("cards.fast.title")}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                {t("cards.fast.description")}
              </p>
            </div>
            <div className="group flex flex-col items-center space-y-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl sm:p-6 dark:from-gray-800 dark:to-blue-900/30 dark:border-blue-900/50">
              <div className="rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-3 shadow-md">
                <TvMinimalPlay className="h-6 w-6 text-white sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl">
                {t("cards.hdQuality.title")}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                {t("cards.hdQuality.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
