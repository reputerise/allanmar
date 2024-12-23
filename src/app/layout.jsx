import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer"
import Navbar from "../components/Header";
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title:  'Allanmar',
  description: "COMPLETAR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-GHPS101LNJ"
      />

      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GHPS101LNJ');
        `}
      </Script>

      <Script id="reb2b-script" strategy="afterInteractive">
        {`
          !function () {
            var reb2b = window.reb2b = window.reb2b || [];
            if (reb2b.invoked) return;
            reb2b.invoked = true;
            reb2b.methods = ["identify", "collect"];
            reb2b.factory = function (method) {
              return function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(method);
                reb2b.push(args);
                return reb2b;
              };
            };
            for (var i = 0; i < reb2b.methods.length; i++) {
              var key = reb2b.methods[i];
              reb2b[key] = reb2b.factory(key);
            }
            reb2b.load = function (key) {
              var script = document.createElement("script");
              script.type = "text/javascript";
              script.async = true;
              script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";
              var first = document.getElementsByTagName("script")[0];
              first.parentNode.insertBefore(script, first);
            };
            reb2b.SNIPPET_VERSION = "1.0.1";
            reb2b.load("G4N210H4GM6Z");
          }();
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
