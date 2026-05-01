export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'desayuno' | 'box' | 'premium';
}

export const products: Product[] = [
  {
    id: 1,
    name: "Desayuno Mamá Real",
    price: 150,
    description: "Incluye jugo natural, sándwich gourmet, ensalada de frutas y una rosa.",
    image: "/images/desayuno-1.jpg", // Luego pondremos las fotos en public/images
    category: "desayuno"
  },
  {
    id: 2,
    name: "Box Delulu Premium",
    price: 280,
    description: "Box de madera con espumante, chocolates importados y arreglo floral.",
    image: "/images/box-premium.jpg",
    category: "premium"
  }
];