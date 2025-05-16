import type { Metadata } from "next";
import InLayout from "./_layout/in";
import Header from './_layout/header';
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
            <Header />
            <Box
              ml="250px"
              pt="60px"
              minHeight="calc(100vh - 58px)"
              bg="gray.50"
            >
              <Container maxW="container.xl" py={8}>
                {children}
              </Container>
            </Box>
            <Footer />
          </InLayout>
        </Providers>
      </body>
    </html>
  );
}
