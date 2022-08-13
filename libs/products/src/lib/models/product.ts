import {CategoryInterface} from "./category";

export interface ProductInterface {
  id?: string;
  name?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  price?: string;
  category?: CategoryInterface;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  dateCreated?: string;
}
