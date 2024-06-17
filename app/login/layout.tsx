import { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: "Login",
    description: "Login",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <Suspense>
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
