import Script from "next/script";

import * as gtag from "@/common/utils";

export const GTagScript = () => {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
      <Script id="gtag-init">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "${gtag.GA_TRACKING_ID}", {
          page_path: window.location.pathname,
        });
        `}
      </Script>
    </>
  );
};

export const GoogleTagManagerScript = () => {
  return (
    <Script id="google-tag-manager">
      {`
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "${process.env.NEXT_PUBLIC_GTM_ID}");
      `}
    </Script>
  );
};
