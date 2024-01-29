"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
    return (
        <Button onClick={() => signOut({ callbackUrl: '/pages/auth/login'})}>Sign out</Button>
    )
};

export default DashboardPage;
