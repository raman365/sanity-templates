import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { placeholderSettings } from "@/lib/placeholder";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings =
    (await sanityFetch<SiteSettings>(siteSettingsQuery)) ??
    placeholderSettings;

  return (
    <div className="flex min-h-svh flex-col">
      <Nav name={settings.name ?? "Portfolio"} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
