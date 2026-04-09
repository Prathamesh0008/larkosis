export default function AnalyticsScripts() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id=GTM-KDK6TPVR'+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KDK6TPVR');`,
        }}
      />
      <meta
        name="google-site-verification"
        content="NvdAvixiqDarRLVDIjD1Hsze6JwhRLuGQ5aolxNDpoQ"
      />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-0GYC7EP0L2" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-0GYC7EP0L2');
    `,
        }}
      />
    </>
  );
}
