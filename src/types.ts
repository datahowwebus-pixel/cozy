export type ProductCategory =
  | 'all'
  | 'dress-sets'
  | 'knitwear-blankets'
  | 'bonnets-embroidery';

export type BabySize = '0–3M' | '3–6M' | '6–12M' | '12–18M' | 'Custom';

export interface YarnSwatch {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  subtitle: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  availabilityLabel: string;
  piecesIncluded: string[];
  craftHours: number;
  yarnComposition: string;
  stitchStyle: string;
  description: string;
  swatches: YarnSwatch[];
  sizes: BabySize[];
  careNote: string;
}

export interface InquiryItem {
  inquiryKey: string;
  productId: string;
  sku: string;
  name: string;
  image: string;
  size: BabySize;
  quantity: number;
  customEmbroidery?: string;
  customPalette?: string;
}

export interface InquiryReceipt {
  referenceId: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  orderType: 'single' | 'gift' | 'boutique';
  notes?: string;
  items: InquiryItem[];
  submittedAt: string;
}
