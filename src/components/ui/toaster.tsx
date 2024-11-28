"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { CircleAlert, CircleCheck } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="rounded-lg shadow-xl ">
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-xl font-bold flex gap-1 items-center">
                  {title === "Game collected" && <CircleCheck className="text-green h-5" />}
                  {title === "Game removed" && <CircleAlert className="text-red h-5" />}
                  {title}
                </ToastTitle>
              )}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
