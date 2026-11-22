import { BabySize, Product, YarnSwatch } from '../types';

export const BABY_SIZES: BabySize[] = ['0–3M', '3–6M', '6–12M', '12–18M', 'Custom'];

export const BACKDROPS = {
  nursery: '/src/assets/images/bg_pastel_nursery_daylight_1795337008526.jpg',
  yarnStudio: '/src/assets/images/bg_pastel_yarn_studio_1795337008592.jpg',
  embroidery: '/src/assets/images/bg_pastel_embroidery_sunlight_1795337007849.jpg',
};

export const CUSTOM_YARN_PALETTE: YarnSwatch[] = [
  { name: 'Blush Petal', hex: '#F3C6CE' },
  { name: 'Baby Sky', hex: '#A8D4EE' },
  { name: 'Lavender Mist', hex: '#C7B5E3' },
  { name: 'Mint Sage', hex: '#B4D3BA' },
  { name: 'Buttercream', hex: '#F8E7B9' },
  { name: 'Mulberry Rose', hex: '#9D4463' },
];

export interface ExtendedProduct extends Product {
  shortName: string;
  backdropImage: string;
  pastelSurface: string;
  pastelAccent: string;
}

export const PRODUCTS: ExtendedProduct[] = [
  {
    id: 'cce-blush-rose-garden',
    slug: 'blush-rose-garden-set',
    sku: 'CCE-01',
    shortName: 'Blush Rose',
    name: 'Blush Rose Garden 3-Piece Set',
    subtitle: 'Cable-pleated pastel pink frock, floral brim sun hat & cuffed booties',
    category: 'dress-sets',
    categoryLabel: '3-Piece Dress Sets',
    image: '/assets/aistudio/sfsfs_0ade04ac.jpeg',
    backdropImage: BACKDROPS.nursery,
    pastelSurface: '#FCECF0',
    pastelAccent: '#D97B93',
    imageAlt:
      'Hand-crocheted pastel blush pink and ivory baby dress with pink waist roses, white hem rose vine, matching floral sun hat, and Mary-Jane booties',
    availabilityLabel: 'Made to Order',
    piecesIncluded: [
      'Cable-ribbed blush & ivory frock',
      'Hand-embroidered floral brim sun hat',
      'Ivory-cuffed Mary-Jane booties',
    ],
    craftHours: 19,
    yarnComposition: '100% Mercerized Combed Baby Cotton',
    stitchStyle: 'Raised cable pleats with sculpted 3D rosebuds & embroidered leaf vine',
    description:
      'Woven from ultra-soft breathable cotton, this signature three-piece ensemble pairs an ivory square yoke with a sweeping pastel blush skirt. Five hand-stitched pink roses frame the waistline, echoed by a delicate white rose and sage leaf garland along the scalloped hem.',
    swatches: [
      { name: 'Blush Petal', hex: '#F3C6CE' },
      { name: 'Cream Ivory', hex: '#F7F3EA' },
      { name: 'Meadow Green', hex: '#8FBF7B' },
      { name: 'Berry Rose', hex: '#9D4463' },
    ],
    sizes: BABY_SIZES,
    careNote: 'Hand wash cold with mild baby soap; dry flat on a cotton towel to preserve rose petals.',
  },
  {
    id: 'cce-mulberry-heirloom',
    slug: 'mulberry-rose-heirloom-set',
    sku: 'CCE-02',
    shortName: 'Mulberry Rose',
    name: 'Mulberry Rose Heirloom 3-Piece Set',
    subtitle: 'Long-sleeve lacy plum frock, floral beret & pearl-accent booties',
    category: 'dress-sets',
    categoryLabel: '3-Piece Dress Sets',
    image: '/assets/aistudio/sfsf_d2887be9.jpeg',
    backdropImage: BACKDROPS.embroidery,
    pastelSurface: '#F7EBF0',
    pastelAccent: '#9D4463',
    imageAlt:
      'Deep mulberry plum long-sleeve crochet baby dress adorned with three coral-pink roses at the waist, matching floral beret hat, and booties',
    availabilityLabel: 'Signature Edition',
    piecesIncluded: [
      'Long-sleeve open-lace mulberry dress',
      'Pearl-bloom crochet beret beanie',
      'Matching floral strap booties',
    ],
    craftHours: 22,
    yarnComposition: 'Extra-Fine Merino Wool & Soft Cotton Blend',
    stitchStyle: 'Shell-lattice sleeves and eyelet skirt with layered coral rose appliqués',
    description:
      'Designed for milestone portraits and cool-season celebrations, the Mulberry Rose Heirloom Set features airy lace-stitch long sleeves, a full A-line eyelet skirt, and three dimensional pink roses anchored by hand-embroidered sage leaves.',
    swatches: [
      { name: 'Mulberry Wine', hex: '#6D2E46' },
      { name: 'Coral Rose', hex: '#F29EB0' },
      { name: 'Faux Pearl', hex: '#F5F2EC' },
      { name: 'Sage Leaf', hex: '#96B591' },
    ],
    sizes: BABY_SIZES,
    careNote: 'Gentle wool-safe hand wash in cool water; reshape beret and blossoms while damp.',
  },
  {
    id: 'cce-azure-blossom',
    slug: 'azure-blossom-summer-set',
    sku: 'CCE-03',
    shortName: 'Azure Blossom',
    name: 'Azure Blossom 3-Piece Summer Set',
    subtitle: 'Sky-blue braided pleat dress, daisy-ring sun hat & ruffled booties',
    category: 'dress-sets',
    categoryLabel: '3-Piece Dress Sets',
    image: '/assets/aistudio/dgdgd_8f4f2c07.jpeg',
    backdropImage: BACKDROPS.yarnStudio,
    pastelSurface: '#EAF4FB',
    pastelAccent: '#5C9EC9',
    imageAlt:
      'Sky blue and ocean teal crochet baby dress with white ruffled hem, three pearl-center daisies on the yoke, matching floral sun hat, and blue booties',
    availabilityLabel: 'Made to Order',
    piecesIncluded: [
      'Braided-rib sky blue & teal frock',
      'Two-tone daisy garland sun hat',
      'Pearl-flower ankle-strap booties',
    ],
    craftHours: 20,
    yarnComposition: '100% Organic Peruvian Pima Cotton',
    stitchStyle: 'Vertical cabled pleats, scalloped white ruffle trim & pearl-centered daisies',
    description:
      'Inspired by sunny coastal mornings, our Azure Blossom set layers powder sky blue and ocean teal beneath crisp white ruffled edges. Three hand-beaded pearl blossoms grace the bodice, mirrored in a full floral halo around the sun hat.',
    swatches: [
      { name: 'Powder Sky', hex: '#88C4E8' },
      { name: 'Ocean Teal', hex: '#3D8BB8' },
      { name: 'Chalk White', hex: '#FAFBFD' },
      { name: 'Blush Center', hex: '#F3B4C2' },
    ],
    sizes: BABY_SIZES,
    careNote: 'Hand wash cold; air dry flat away from direct heat to keep pearl centers lustrous.',
  },
  {
    id: 'cce-lavender-meadow',
    slug: 'lavender-meadow-set',
    sku: 'CCE-04',
    shortName: 'Lavender Meadow',
    name: 'Lavender Meadow 3-Piece Set',
    subtitle: 'Snow-white ribbed frock with violet rosebuds, sun hat & piped booties',
    category: 'dress-sets',
    categoryLabel: '3-Piece Dress Sets',
    image: '/assets/aistudio/sgsg_04352753.jpeg',
    backdropImage: BACKDROPS.embroidery,
    pastelSurface: '#F3EEFA',
    pastelAccent: '#8E6EC2',
    imageAlt:
      'White crochet baby dress accented with purple lavender rosebuds at the waist and hem trim, matching white and violet sun hat, and cuffed booties',
    availabilityLabel: 'Made to Order',
    piecesIncluded: [
      'Snow-white pleated dress with lavender trim',
      'Violet-crown scalloped sun hat',
      'Lavender-cuffed crochet booties',
    ],
    craftHours: 18,
    yarnComposition: '100% Combed Hypoallergenic Cotton',
    stitchStyle: 'Double-crochet flared panels with picot violet edging and 3D rosebuds',
    description:
      'Crisp snow-white yarn creates a timeless canvas for cheerful lavender rosebuds and fresh leaf embroidery. Finished with a delicate two-tone violet picot edge along the wide flared hem and a matching sun-shielding hat.',
    swatches: [
      { name: 'Snow White', hex: '#FDFCFA' },
      { name: 'Soft Lavender', hex: '#A98CD9' },
      { name: 'Meadow Green', hex: '#81B366' },
    ],
    sizes: BABY_SIZES,
    careNote: 'Spot clean or hand wash cold with color-safe gentle detergent; dry flat.',
  },
  {
    id: 'cce-ivory-shell-rosebud',
    slug: 'ivory-shell-rosebud-set',
    sku: 'CCE-05',
    shortName: 'Ivory Shell',
    name: 'Ivory Shell & Rosebud 3-Piece Set',
    subtitle: 'Lacy shell-stitch cream frock, rose garland headband & floral booties',
    category: 'dress-sets',
    categoryLabel: '3-Piece Dress Sets',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_1.14.37_PM_b5ad22d3.jpeg',
    backdropImage: BACKDROPS.nursery,
    pastelSurface: '#FEF7E6',
    pastelAccent: '#D98CA3',
    imageAlt:
      'Cream ivory shell-stitch crochet baby dress with pink rose waist garland, matching floral headband, and ivory crochet booties with pink roses',
    availabilityLabel: 'Ceremony Series',
    piecesIncluded: [
      'Airy shell-stitch ivory flared frock',
      'Stretch floral rosebud headband',
      'Rose-appliqué cream booties',
    ],
    craftHours: 17,
    yarnComposition: '100% Unbleached Soft Cotton Lace Yarn',
    stitchStyle: 'Open fan shell-stitch skirt with hand-sewn blush rose & leaf garland',
    description:
      'Delicate, airy, and luminous for naming ceremonies or spring gatherings. Crafted in warm ivory shell-stitch lace that drapes gracefully, finished with a gentle stretch rosebud headband and soft-soled floral booties.',
    swatches: [
      { name: 'Buttercream Ivory', hex: '#F9F3E3' },
      { name: 'Pastel Rose', hex: '#F5C2D0' },
      { name: 'Moss Leaf', hex: '#8EB36C' },
    ],
    sizes: BABY_SIZES,
    careNote: 'Hand wash gently in lukewarm water; steam lightly on low setting through a cloth.',
  },
  {
    id: 'cce-oatmeal-rose-cardigan',
    slug: 'oatmeal-rose-embroidered-cardigan',
    sku: 'CCE-06',
    shortName: 'Oatmeal Cardigan',
    name: 'Oatmeal Rose Embroidered Cardigan',
    subtitle: 'Button-front knit cardigan with bullion-stitch rosebud collar & pockets',
    category: 'knitwear-blankets',
    categoryLabel: 'Knitwear & Blankets',
    image: '/src/assets/images/product_cardigan_embroidery_1795336176304.jpg',
    backdropImage: BACKDROPS.yarnStudio,
    pastelSurface: '#FDF5EB',
    pastelAccent: '#C98A95',
    imageAlt:
      'Hand-crocheted oatmeal cream baby cardigan sweater with hand-embroidered dusty pink rosebuds and sage leaves on the yoke and pockets',
    availabilityLabel: 'Atelier Knitwear',
    piecesIncluded: [
      'Full-sleeve ribbed oatmeal cardigan',
      'Natural carved-wood button placket',
      'Hand-embroidered floral yoke & pockets',
    ],
    craftHours: 16,
    yarnComposition: '100% Brushed Organic Cotton & Bamboo Blend',
    stitchStyle: 'Ribbed cuff crochet body with French-knot & bullion floral embroidery',
    description:
      'An heirloom layering cardigan crafted in warm oatmeal cotton yarn. Fine bullion-stitch rosebuds and sage leaves are hand-embroidered directly across the neckline yoke and twin patch pockets.',
    swatches: [
      { name: 'Oatmeal Cream', hex: '#EFE6D5' },
      { name: 'Dusty Rose', hex: '#DF9EA9' },
      { name: 'Sage Stem', hex: '#98B393' },
    ],
    sizes: BABY_SIZES,
    careNote: 'Button closed before gentle cold soak; dry flat away from direct sunlight.',
  },
  {
    id: 'cce-daisy-heirloom-blanket',
    slug: 'ivory-daisy-heirloom-blanket',
    sku: 'CCE-07',
    shortName: 'Daisy Blanket',
    name: 'Ivory Daisy Heirloom Blanket',
    subtitle: 'Sculpted raised-daisy motif squares framed by a scalloped lace border',
    category: 'knitwear-blankets',
    categoryLabel: 'Knitwear & Blankets',
    image: '/src/assets/images/product_floral_blanket_1795336176371.jpg',
    backdropImage: BACKDROPS.nursery,
    pastelSurface: '#FEF8EC',
    pastelAccent: '#C79B68',
    imageAlt:
      'Folded ivory cream hand-crocheted heirloom baby blanket featuring raised floral daisy blocks and scalloped lace edging',
    availabilityLabel: 'Nursery Keepsake',
    piecesIncluded: [
      '36 × 36 inch hand-joined daisy blanket',
      'Double-scalloped lace perimeter border',
      'Linen dust bag for nursery storage',
    ],
    craftHours: 28,
    yarnComposition: '100% Double-Knit Combed Cotton',
    stitchStyle: 'Three-dimensional popcorn daisy medallions with shell-scallop trim',
    description:
      'Designed to drape across cribs, strollers, and milestone photo sessions. Each square is individually crocheted with a raised puff-stitch daisy center and seamlessly joined before adding a wide scalloped border.',
    swatches: [
      { name: 'Unbleached Ivory', hex: '#F5EFE3' },
      { name: 'Warm Ecru', hex: '#E8DCC8' },
      { name: 'Blush Accent', hex: '#F3C6CE' },
    ],
    sizes: ['Custom'],
    careNote: 'Gentle machine delicate cycle inside a mesh laundry bag or hand soak cold; dry flat.',
  },
  {
    id: 'cce-sage-pixie-bonnet-set',
    slug: 'sage-blossom-bonnet-booties-set',
    sku: 'CCE-08',
    shortName: 'Sage Bonnet',
    name: 'Sage Blossom Pixie Bonnet & Booties',
    subtitle: 'Embroidered sage-green pixie hood bonnet with wooden-button booties',
    category: 'bonnets-embroidery',
    categoryLabel: 'Bonnets & Embroidery',
    image: '/src/assets/images/product_booties_bonnet_1795336176815.jpg',
    backdropImage: BACKDROPS.yarnStudio,
    pastelSurface: '#EDF5EE',
    pastelAccent: '#6E9974',
    imageAlt:
      'Sage green and cream crochet baby pixie bonnet hat and matching Mary-Jane booties with embroidered white daisies and wooden buttons',
    availabilityLabel: 'Made to Order',
    piecesIncluded: [
      'Ribbed-trim sage pixie tie bonnet',
      'Cuffed wooden-button Mary-Jane booties',
      'Hand-stitched miniature daisy wreaths',
    ],
    craftHours: 11,
    yarnComposition: '100% Soft Combed Cotton Yarn',
    stitchStyle: 'Dense thermal crochet weave with delicate hand-embroidered chamomile blossoms',
    description:
      'A cozy woodland gift pairing our sculpted pixie bonnet and double-cuffed Mary-Jane booties. Both pieces feature miniature white daisy embroidery with golden centers and smooth natural wooden button closures.',
    swatches: [
      { name: 'Mint Sage', hex: '#9FB8A2' },
      { name: 'Soft Cream', hex: '#F8F4EB' },
      { name: 'Warm Oak', hex: '#BA8B60' },
    ],
    sizes: ['0–3M', '3–6M', '6–12M', 'Custom'],
    careNote: 'Hand wash cool water; fasten wooden buttons before soaking and dry flat.',
  },
  {
    id: 'cce-monogram-hoop-bib-set',
    slug: 'floral-monogram-hoop-bib-set',
    sku: 'CCE-09',
    shortName: 'Monogram Hoop',
    name: 'Floral Monogram Hoop & Crochet Bib',
    subtitle: 'Custom initial linen nursery hoop paired with a scalloped rosebud bib',
    category: 'bonnets-embroidery',
    categoryLabel: 'Bonnets & Embroidery',
    image: '/src/assets/images/product_embroidery_hoop_1795336176312.jpg',
    backdropImage: BACKDROPS.embroidery,
    pastelSurface: '#FCEFF2',
    pastelAccent: '#9D4463',
    imageAlt:
      'Hand-embroidered wooden hoop with floral wreath and initial E alongside a scalloped cream crochet baby bib with pink rose embroidery',
    availabilityLabel: 'Personalized Gift',
    piecesIncluded: [
      '8-inch walnut-finish embroidered nursery hoop',
      'Scalloped-edge cotton crochet baby bib',
      'Custom hand-stitched initial & rose wreath',
    ],
    craftHours: 14,
    yarnComposition: 'Belgian Linen Fabric & 100% Cotton Mercerized Thread',
    stitchStyle: 'Satin-stitch monogram calligraphy surrounded by woven wheel roses',
    description:
      'An unforgettable baby shower keepsake combining both crafts of our studio. Choose any baby initial for the linen nursery wall hoop, accompanied by a matching scalloped crochet bib embroidered with pastel rose garlands.',
    swatches: [
      { name: 'Natural Linen', hex: '#EFE7D8' },
      { name: 'Blush Silk', hex: '#E8A8B4' },
      { name: 'Eucalyptus', hex: '#96B294' },
    ],
    sizes: ['Custom'],
    careNote: 'Spot clean embroidery hoop with dry cloth; hand wash crochet bib gently in cold water.',
  },
];

export interface YarnSpecProfile {
  id: string;
  name: string;
  weightTag: string;
  pastelBg: string;
  summary: string;
  detailDescription: string;
  metrics: {
    softness: number;
    breathability: number;
    durability: number;
    stitchRelief: number;
  };
}

export const YARN_SPEC_PROFILES: YarnSpecProfile[] = [
  {
    id: 'mercerized-cotton',
    name: 'Mercerized Baby Cotton',
    weightTag: '220 GSM · 4-Ply Combed',
    pastelBg: '#FCECF0',
    summary: 'Lustrous, zero-lint weave for dresses & sun hats',
    detailDescription:
      'Signature combed baby cotton spun with tight mercerized twist for crisp petal edges, cool airflow, and zero fuzzing against sensitive infant skin.',
    metrics: {
      softness: 94,
      breathability: 96,
      durability: 92,
      stitchRelief: 95,
    },
  },
  {
    id: 'merino-cotton',
    name: 'Extra-Fine Merino Blend',
    weightTag: '280 GSM · Cool-Season',
    pastelBg: '#F3EEFA',
    summary: 'Warm lightweight drape for heirloom long sleeves',
    detailDescription:
      'Ultra-fine combed merino blended with organic cotton fibers to deliver cozy autumn warmth without itchiness or bulk.',
    metrics: {
      softness: 97,
      breathability: 89,
      durability: 90,
      stitchRelief: 93,
    },
  },
  {
    id: 'pima-lace',
    name: 'Peruvian Pima Lace Yarn',
    weightTag: '190 GSM · Open Shell',
    pastelBg: '#EAF4FB',
    summary: 'Extra-long staple fibers for airy summer frocks',
    detailDescription:
      'Silky extra-long staple Pima cotton ideal for ruffled hems, shell-stitch bodices, and warm-weather naming ceremony outfits.',
    metrics: {
      softness: 96,
      breathability: 98,
      durability: 91,
      stitchRelief: 92,
    },
  },
  {
    id: 'linen-silk',
    name: 'Belgian Linen & Silk Floss',
    weightTag: '240 GSM · Embroidery Base',
    pastelBg: '#EDF5EE',
    summary: 'Archival woven linen for monogram hoops & bibs',
    detailDescription:
      'Tightly woven natural Belgian linen paired with colorfast stranded silk-finish embroidery threads for heirloom bullion roses and calligraphy.',
    metrics: {
      softness: 88,
      breathability: 94,
      durability: 98,
      stitchRelief: 97,
    },
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'The Mulberry Rose set arrived wrapped in cedar tissue with our daughter’s initials embroidered on the keepsake tag. Every stitch looks gallery-grade.',
    author: 'Ayesha Siddiqui',
    detail: 'Mulberry Rose 3-Piece Set · Custom Commission',
    pastelBg: '#FCECF0',
  },
  {
    quote:
      'Incredibly soft against newborn skin. The Oatmeal Rose cardigan and Blush Rose hat held their shape effortlessly through outdoor family portraits.',
    author: 'Hannah Lindqvist',
    detail: 'Blush Rose & Knitwear Order · 0–3M',
    pastelBg: '#EAF4FB',
  },
  {
    quote:
      'Ordered custom lavender and sage pieces for a boutique baby gift box—Cozy Crochet & Embroidery matched our palette swatches seamlessly.',
    author: 'Meera Kapoor',
    detail: 'Bespoke Embroidery & Bonnet Set · Studio Order',
    pastelBg: '#EDF5EE',
  },
];
