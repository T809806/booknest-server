export interface Book {

  title: string;

  shortDescription: string;

  fullDescription: string;

  author: string;

  category: string;

  price: number;

  image?: string;

  rating: number;

  createdAt: Date;

  userEmail: string;
}