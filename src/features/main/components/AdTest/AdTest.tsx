import { useEffect } from "react";

interface AdsConfig {
  google_ad_client?: string;
  enable_page_level_ads?: boolean;
  google_ad_slot?: string;
  google_ad_width?: number;
  google_ad_height?: number;
  overlays?: { bottom: boolean };
}

interface WindowWithAds extends Window {
  adsbygoogle?: Array<AdsConfig>;
}

export const AdsBanner = () => {
  useEffect(() => {
    try {
      const win = window as WindowWithAds;

      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
    } catch (error) {
      console.error("Error al cargar el anuncio de AdSense:", error);
    }
  }, []);

  return (
    <div className="cmp-ads-banner">
      <div className="logo">
        <img src="/assets/logo/imagotipo.png" alt="Ads Banner" />
      </div>
      <ins
        className="adsbygoogle"
        data-ad-client={"ca-pub-9609372132229710"}
        data-ad-slot={"1803288403"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
