import type { Metadata } from "next";
import InLayout from "./_layout/in";

import Navigation from './_layout/navbar'
import "./globals.css";
import Footer from "./_layout/footer";
import { Providers } from "./providers";
import { Box, Container } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "ProjectMate",
  description: "ProjectMate is a project management tool that helps you manage your projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <InLayout>
            <Navigation />
              <Box minHeight="calc(100vh - 60px)">
                {children}
              </Box>
            <Footer />
          </InLayout>
        </Providers>
      </body>
    </html>
  );
}
