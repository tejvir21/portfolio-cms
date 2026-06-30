import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {keywords && <meta name="keywords" content={keywords} />}

      {ogImage && (
        <link
          rel="icon"
          type="image/svg+xml"
          href={ogImage || "/favicon.svg"}
        />
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
    </Helmet>
  );
}
