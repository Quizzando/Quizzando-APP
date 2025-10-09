import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

interface FormCardProps {
    formTitle : string
    children : ReactNode
}

export function FormCard({formTitle, children} : FormCardProps) {
    return (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    {formTitle}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}