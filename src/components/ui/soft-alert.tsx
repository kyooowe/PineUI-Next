"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "flex items-center p-4 mb-4 text-sm rounded-lg [&>svg]:flex-shrink-0 [&>svg]:inline [&>svg]:w-4 [&>svg]:h-4 [&>svg]:me-3",
  {
    variants: {
      variant: {
        default: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
        destructive: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
        warning: "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400",
        success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
        dark: "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const SoftAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
SoftAlert.displayName = "SoftAlert"

const SoftAlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-sm font-medium", className)}
    {...props}
  />
))
SoftAlertTitle.displayName = "SoftAlertTitle"

const SoftAlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-sm ml-1", className)}
    {...props}
  />
))
SoftAlertDescription.displayName = "SoftAlertDescription"

export { SoftAlert, SoftAlertTitle, SoftAlertDescription }