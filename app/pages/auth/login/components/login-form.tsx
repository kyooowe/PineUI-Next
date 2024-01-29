"use client"

// #region Import
import { useState } from "react"
import { signIn } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
// #endregion

const LoginForm = () => {

    // #region UseState
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
    const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false)
    // #endregion

    return (
        <div className={cn("grid gap-1")}>
            <form>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="JuanCruz@example.com"
                            type="email"
                            disabled={isGoogleLoading || isGithubLoading}
                        />
                        <Input
                            id="password"
                            placeholder="Password Key"
                            type="password"
                            disabled={isGoogleLoading || isGithubLoading}
                        />
                    </div>
                    <Button disabled={isGoogleLoading || isGithubLoading}>
                        Login Account
                    </Button>
                </div>
            </form>
            <div className="relative mt-3">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="grid gap-2 mt-3">
                <Button className="w-full" variant="outline" type="button" disabled={isGoogleLoading || isGithubLoading} onClick={() => {
                    setIsGoogleLoading(true)
                    signIn("google")
                }}>
                    {
                        isGoogleLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Icons.google className="mr-2 h-3 w-3" />
                        )
                    }
                    Google
                </Button>
                <Button className="w-full" variant="outline" type="button" disabled={isGoogleLoading || isGithubLoading} onClick={() => {
                    setIsGithubLoading(true)
                    signIn("github", {
                        callbackUrl: '/pages/dashboard'
                    })
                }}>
                    {
                        isGithubLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Icons.gitHub className="mr-2 h-3 w-3" />
                        )
                    }
                    Github
                </Button>
            </div>
        </div>
    )
}

export default LoginForm