import "./globals.css";
import Providers from "@/store/Providers";

export const metadata = {
  title: "Dynamic CMS Platform",
  description: "CMS powered website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
