import { vazirMatn } from "next-persian-fonts/vazirmatn";
import Header from "@/app/_components/Header/Header";
import "@/app/_style/global.css";
import FontAwesomeConfig from "./fontawesome";
import Footer from "./_components/Footer";
import { UserProvider } from "./_components/context";

export const metadata = {
  title: {
    template: "%s / parskala",
    default: "welcome / parskala",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <FontAwesomeConfig />
      </head>
      <body className={vazirMatn.className}>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}
