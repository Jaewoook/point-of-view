/**
 * External modules
 */
import React, { useMemo } from "react";

/**
 * Internal modules
 */
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

interface SEOProps {
  path: string;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  type?: "website" | "article";
  section?: string | null;
  publishedTime?: string | null;
  tags?: readonly (string | null)[] | null;
}

export const SEO = (props: React.PropsWithChildren<SEOProps>) => {
  const { children, title, description, image, path, type = "website", section, publishedTime, tags } = props;
  const siteMetadata = useSiteMetadata();
  const pageTitle = useMemo(() => {
    if (title) {
      return `${title} - ${siteMetadata?.title}`;
    } else {
      return siteMetadata?.title ?? "";
    }
  }, [title, siteMetadata?.title]);
  const pageUrl = useMemo(() => siteMetadata?.siteUrl + path, [siteMetadata, path]);
  const pageDescription = useMemo(() => description ?? siteMetadata?.description, [siteMetadata, description]);
  const pageTags = useMemo(() => (tags?.filter((tag) => !!tag) ?? []) as string[], [tags]);

  return (
    <>
      <html lang="ko" />
      <meta name="twitter:card" content="summary" />
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />
      {siteMetadata?.title ? <meta property="og:site_name" content={siteMetadata?.title} /> : null}
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:url" content={pageUrl} />
      {siteMetadata?.author ? <meta name="author" content={siteMetadata?.author} /> : null}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ko_KR" />
      {pageDescription ? (
        <>
          <meta name="description" content={pageDescription} />
          <meta property="og:description" content={pageDescription} />
          <meta name="twitter:description" content={pageDescription} />
        </>
      ) : null}
      {type === "article" ? (
        <>
          {siteMetadata?.author ? <meta property="og:article:author" content={siteMetadata?.author} /> : null}
          {publishedTime ? <meta property="og:article:published_time" content={publishedTime} /> : null}
          {section ? <meta property="og:article:section" content={section} /> : null}
          {pageTags.map((tag) => (
            <meta key={tag} property="og:article:tag" content={tag} />
          ))}
        </>
      ) : null}
      {image ? (
        <>
          <meta name="image" content={`${siteMetadata?.siteUrl}${image}`} />
          <meta property="og:image" content={`${siteMetadata?.siteUrl}${image}`} />
          <meta name="twitter:image" content={`${siteMetadata?.siteUrl}${image}`} />
        </>
      ) : null}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      {children}
    </>
  );
};
