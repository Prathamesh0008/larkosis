import { companyProfile } from "@/data/companyProfile";

export const SITE_URL = (companyProfile.website || "https://www.larksoispharma.com").replace(
  /\/+$/,
  "",
);

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) {
    return `${SITE_URL}/${path}`;
  }

  return `${SITE_URL}${path}`;
}

