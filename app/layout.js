
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import QueryProviders from "@/provider/query-provider";
import { ContextProvider } from "@/provider/context-provider";


const dinNext = localFont({
  src: [
    {
      path: "./fonts/DINNextW1G-Light.otf",
      weight: '300'
    },
    {
      path: "./fonts/DINNextW1G-Regular.otf",
      weight: '400'
    },
    {
      path: "./fonts/DINNextW1G-Medium.otf",
      weight: '500'
    },
    {
      path: "./fonts/DINNextW1G-Heavy.otf",
      weight: '600'
    },
    {
      path: "./fonts/DINNextW1G-Bold.otf",
      weight: '700'
    },
    {
      path: "./fonts/DINNextW1G-Black.otf",
      weight: '800'
    },
  ],
  variable: '--font-dinNext'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${dinNext.variable} font-dinNext antialiased bg-white`}
      >
        <Suspense>
          <QueryProviders>
            <ContextProvider>
              {children}
            </ContextProvider>
          </QueryProviders>
        </Suspense>
      </body>
    </html>
  );
}
