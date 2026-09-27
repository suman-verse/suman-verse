import { useEffect } from 'react';

export interface MetaOptions {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'profile';
  image?: string;
}

export function useDocumentMetadata({
  title,
  description,
  canonical,
  keywords,
  ogType = 'website',
  image = 'https://sumanverse.com/logo.png',
}: MetaOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(nameAttr, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    if (image) {
      setMeta('property', 'og:image', image);
    }
    if (canonical) {
      setMeta('property', 'og:url', canonical);
    }

    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    if (image) {
      setMeta('name', 'twitter:image', image);
    }

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }
  }, [title, description, canonical, keywords, ogType, image]);
}

export default useDocumentMetadata;
