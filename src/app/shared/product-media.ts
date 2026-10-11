import { SITE_URL } from '../services/seo.service';

export const WHATSAPP_PHONE = '21699809804';

export interface ResponsiveImage {
  src: string;
  srcset: string;
}

// Product photos have 480w and 960w variants next to the original:
// assets/img/product/7.webp -> assets/img/product/480/7.webp, assets/img/product/960/7.webp
export function responsiveImage(image: string): ResponsiveImage {
  const variant = (width: number) => image.replace(/\/([^/]+)$/, `/${width}/$1`);
  return { src: variant(960), srcset: `${variant(480)} 480w, ${variant(960)} 960w` };
}

// "Ask for the price" message with the product photo, as on the product page.
export function whatsappProductLink(productName: string, imagePath: string): string {
  const imageUrl = imagePath.startsWith('assets/') ? `${SITE_URL}/${imagePath}` : imagePath;
  const text = encodeURIComponent(
    `${imageUrl}\nBonjour, je suis intéressé par ce produit : ${productName}\nPouvez-vous m'indiquer le prix ?`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

export const WHATSAPP_QUOTE_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  'Bonjour Sweet Lodge, je souhaite un devis pour une cabine de douche sur mesure.'
)}`;
