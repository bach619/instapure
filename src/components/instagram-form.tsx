"use client";

import React from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Download, Loader2, X } from "lucide-react";

import { cn, getPostShortcode, isShortcodePresent } from "@/lib/utils";
import { useGetInstagramPostMutation } from "@/features/react-query/mutations/instagram";
import { HTTP_CODE_ENUM } from "@/features/api/http-codes";

// 5 minutes
const CACHE_TIME = 5 * 60 * 1000;

const useFormSchema = () => {
  const t = useTranslations("components.instagramForm.inputs");

  return z.object({
    url: z
      .string({ required_error: t("url.validation.required") })
      .trim()
      .min(1, { message: t("url.validation.required") })
      .startsWith("https://www.instagram.com", t("url.validation.invalid"))
      .refine((value) => isShortcodePresent(value), {
        message: t("url.validation.invalid"),
      }),
  });
};

function triggerDownload(videoUrl: string) {
  if (typeof window === "undefined") return;

  const randomTime = new Date().getTime().toString().slice(-8);
  const filename = `IG-Loader-${randomTime}.mp4`;

  const proxyUrl = new URL("/api/download-proxy", window.location.origin);
  proxyUrl.searchParams.append("url", videoUrl);
  proxyUrl.searchParams.append("filename", filename);

  const link = document.createElement("a");
  link.href = proxyUrl.toString();
  link.target = "_blank";
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function downloadWithBlob(videoUrl: string) {
  try {
    const response = await fetch(videoUrl);
    if (!response.ok) throw new Error("Failed to fetch video");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "IG-Loader-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    toast.error("Download gagal via blob. Silakan coba beberapa saat lagi.", {
      id: "toast-blob-error",
      position: "top-center",
    });
  }
}

type CachedUrl = {
  videoUrl?: string;
  expiresAt: number;
  invalid?: {
    messageKey: string;
  };
};

export function InstagramForm({ className }: { className?: string }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const cachedUrls = React.useRef(new Map<string, CachedUrl>());

  const t = useTranslations("components.instagramForm");

  const {
    isError,
    isPending,
    mutateAsync: getInstagramPost,
  } = useGetInstagramPostMutation();

  const formSchema = useFormSchema();

  const form = useForm<z.infer<ReturnType<typeof useFormSchema>>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const errorMessage = form.formState.errors.url?.message;
  const isDisabled = isPending || !form.formState.isDirty;
  const isShowClearButton = form.watch("url").length > 0;

  function clearUrlField() {
    form.setValue("url", "");
    form.clearErrors("url");
    inputRef.current?.focus();
  }

  function setCachedUrl(
    shortcode: string,
    videoUrl?: string,
    invalid?: CachedUrl["invalid"]
  ) {
    cachedUrls.current.set(shortcode, {
      videoUrl,
      expiresAt: Date.now() + CACHE_TIME,
      invalid,
    });
  }

  function getCachedUrl(shortcode: string) {
    const cached = cachedUrls.current.get(shortcode);
    if (!cached || cached.expiresAt < Date.now()) {
      cachedUrls.current.delete(shortcode);
      return null;
    }
    return cached;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isError) toast.dismiss("toast-error");

    const shortcode = getPostShortcode(values.url);
    if (!shortcode) {
      form.setError("url", { message: t("inputs.url.validation.invalid") });
      return;
    }

    const cached = getCachedUrl(shortcode);
    if (cached?.invalid) {
      form.setError("url", { message: t(cached.invalid.messageKey) });
      return;
    }
    if (cached?.videoUrl) {
      triggerDownload(cached.videoUrl);
      return;
    }

    try {
      const response = await getInstagramPost({ shortcode });

      if (response.status === HTTP_CODE_ENUM.OK) {
        const downloadUrl =
          response.data.data.xdt_shortcode_media.video_url;
        if (downloadUrl) {
          triggerDownload(downloadUrl);
          setCachedUrl(shortcode, downloadUrl);
          toast.success(t("toasts.success"), {
            id: "toast-success",
            position: "top-center",
            duration: 1500,
          });
        } else {
          throw new Error("Video URL not found");
        }
      } else {
        const errorData = response.data as { error: string };
        const errorMessageKey = `serverErrors.${errorData.error}`;
        form.setError("url", { message: t(errorMessageKey) });

        if (
          response.status === HTTP_CODE_ENUM.BAD_REQUEST ||
          response.status === HTTP_CODE_ENUM.NOT_FOUND
        ) {
          setCachedUrl(shortcode, undefined, { messageKey: errorMessageKey });
        }

        if (response.status === HTTP_CODE_ENUM.TOO_MANY_REQUESTS) {
          const cachedAgain = getCachedUrl(shortcode);
          if (cachedAgain?.videoUrl) {
            await downloadWithBlob(cachedAgain.videoUrl);
          } else {
            toast.error(t("toasts.error"), {
              id: "toast-blob-unavailable",
              position: "top-center",
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(t("toasts.error"), {
        dismissible: true,
        id: "toast-error",
        position: "top-center",
      });
    }
  }

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={cn("w-full space-y-2", className)}>
      {errorMessage ? (
        <p className="h-4 text-sm text-red-500 sm:text-start">{errorMessage}</p>
      ) : (
        <div className="h-4"></div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2 sm:flex-row sm:items-end"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">
                  {t("inputs.url.label")}
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      {...field}
                      type="url"
                      ref={inputRef}
                      minLength={1}
                      maxLength={255}
                      placeholder={t("inputs.url.placeholder")}
                    />
                    {isShowClearButton && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={clearUrlField}
                        className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                      >
                        <X className="text-red-500" />
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={isDisabled}
            type="submit"
            className="bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-600"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {t("submit")}
          </Button>
        </form>
      </Form>
      <p className="text-muted-foreground text-center text-xs">{t("hint")}</p>
    </div>
  );
}
