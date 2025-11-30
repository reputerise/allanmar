import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://blog.futerman.com.ar"),
  title: {
    default: "Futerman International Products",
    template: "%s | Futerman Blog",
  },
  description:
    "Somos el único laboratorio sudamericano que diseña y elabora dispositivos médicos en base a ácido hialurónico reticulado e hidroxiapatita de calcio.",
  openGraph: {
    title: "Futerman International Products",
    description:
      "Somos el único laboratorio sudamericano que diseña y elabora dispositivos médicos en base a ácido hialurónico reticulado e hidroxiapatita de calcio.",
    url: "https://blog.futerman.com.ar/",
    type: "website",
    images: ["https://blog.futerman.com.ar/default-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="tKXmRMa8uv6zpTGC9ePkQDP-GePiqUnSyUi8x2flSIk" />
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
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M3KP2PXJ');
        `}
      </Script>
      <body className={`${montserrat.className} montserrat relative`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3KP2PXJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
