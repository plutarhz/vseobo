export type Category = {
  id?: string;
  name: string;
  slug: string;
  count?: number;
};

export type Tag = {
  name: string;
};

export type Author = {
  node: {
    name: string;
  };
};

export type FeaturedImage = {
  node?: {
    sourceUrl: string;
    altText: string;
  };
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content?: string | null; // Может отсутствовать (например, в списке постов)
  excerpt?: string | null;
  author?: Author | null;
  categories?: {
    nodes: Category[];
  } | null;
  tags?: {
    nodes: Tag[];
  } | null;
  featuredImage?: FeaturedImage | null;
};


/// cat pagin with after
export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string | null
  endCursor: string | null
}

