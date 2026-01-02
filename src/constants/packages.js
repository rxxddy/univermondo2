export const PACKAGES = [
  { key: "admission",  title: "Help with admission", price: 1600 },
  { key: "scholar",    title: "Help with scholarship", price: 2600 },
  { key: "visa_full",  title: "Full visa support", price: 1500 },
  { key: "foundation", title: "Foundation", price: 1500 },
  { key: "vip",        title: "VIP", price: 4000 },
];

export const PACKAGE_MAP = Object.fromEntries(PACKAGES.map(p => [p.key, p]));