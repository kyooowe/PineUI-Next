"use client"

// #region Import
import { useState } from "react"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
// #endregion

const RegistrationForm = () => {

    // #region UseState
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // #endregion

    return (
        <div className={cn("grid gap-6")}>
            <form>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={true}>
                        {
                            isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )
                        }
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={true}>
                {
                    isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                    )
                }
                GitHub
            </Button>
        </div>
    )
}

export default RegistrationForm