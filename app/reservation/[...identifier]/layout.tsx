import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
    title: "Reservar",
    description: "Reservar Facilidad Educativa y Recreativa",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <ToastContainer />
                {children}
            </body>
        </html>
    );
}
