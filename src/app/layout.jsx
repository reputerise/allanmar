import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata() {
  return {
    title: "Futerman International Products",
    description:
      "Somos el único laboratorio sudamericano que diseña y elabora dispositivos médicos en base a ácido hialurónico reticulado e hidroxiapatita de calcio",
    alternates: {
      canonical: "https://blog.futerman.com.ar/",
    },
    openGraph: {
      title: "Futerman International Products",
      description:
        "Somos el único laboratorio sudamericano que diseña y elabora dispositivos médicos en base a ácido hialurónico reticulado e hidroxiapatita de calcio",
      url: "https://blog.futerman.com.ar/",
      type: "website",
      images: ["https://blog.futerman.com.ar/default-image.jpg"],
    },
    additionalMetaTags: [
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },
    ],
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2XSBR9TNS5" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2XSBR9TNS5');
        `}
      </Script>
      <body className={`${montserrat.className} montserrat relative`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
