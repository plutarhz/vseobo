const baseUrl = process.env.WORDPRESS_URL;
import { gql, GraphQLClient } from 'graphql-request';
import { Category, Post, PageInfo } from '@/lib/types'; // new example

const client = new GraphQLClient(`${baseUrl}/graphql`);

export async function getCategories(): Promise<Category[]> {
  const query = gql`
  query getCategories {
    categories(first: 100) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
  `;

  const data: { categories: { nodes: Category[] } } = await client.request(query);
  return data.categories.nodes;
}


export async function getAllPosts(
  searchTerm: string = '',
  category: string = '',
  params: { before?: string | null; after?: string | null } = {}
): Promise<{
  posts: Post[],
  pageInfo: {
    startCursor: string | null,
    endCursor: string | null,
    hasNextPage: boolean,
    hasPreviousPage: boolean
  }
}> {
  const hasSearchTerm = searchTerm && searchTerm.trim() !== '';
  const hasCategoryTerm = category && category.trim() !== '';
  const isPrevious = !!params.before;

  // Definition
  const variableDefinitions = [
    '$perPage: Int!',
    isPrevious ? '$before: String' : '$after: String',
    hasSearchTerm ? '$search: String' : '',
    hasCategoryTerm ? '$categorySlug: String' : '',
  ].filter(Boolean).join(', ');

  // Where Clause
  const whereConditions = [
    hasSearchTerm ? 'search: $search' : '',
    hasCategoryTerm ? 'categoryName: $categorySlug' : ''
  ].filter(Boolean);

  const whereClause = whereConditions.length > 0
    ? `where: { ${whereConditions.join(', ')}}`
    : '';

  const query = gql`
    query GetPosts(${variableDefinitions}) {
      posts(
        ${isPrevious ? 'last: $perPage' : 'first: $perPage'},
        ${isPrevious ? 'before: $before' : 'after: $after'},
        ${whereClause}
      ) {
        nodes {
          id
          title
          excerpt
          date
          slug
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
          node {
            sourceUrl(size: MEDIUM)
            altText
          }
        }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `

  interface Variables {
    perPage: number;
    before?: string | null;
    after?: string | null;
    search?: string;
    categorySlug?: string;
  }

  const variables: Variables = {
    perPage: 10,
    ...(isPrevious
      ? { before: params.before }
      : { after: params.after }
    )
  };

  if (hasSearchTerm) {
    variables.search = searchTerm;
  }

  if (hasCategoryTerm) {
    variables.categorySlug = category;
  }

  const data: {
    posts: {
      nodes: Post[],
      pageInfo: {
        startCursor: string | null,
        endCursor: string | null,
        hasNextPage: boolean,
        hasPreviousPage: boolean
      }
    }
  } = await client.request(query, variables);

  return {
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
    ...(searchTerm && { searchTerm }),
    ...(category && { category })
  }

}


export async function getPostsBySlug(slug: string): Promise<Post | null> {
  const query = gql`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        date
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  `;

  const variables = { slug };
  const data: { post: Post } = await client.request(query, variables);
  return data.post;
}


/// new example with after
export async function getPostsByCategorySlug(
  slug: string,
  first: number = 10,
  after: string | null = null
): Promise<{ posts: Post[]; pageInfo: PageInfo }> {
  const query = gql`
    query GetPostsByCategory($categorySlug: String!, $first: Int!, $after: String) {
      posts(first: $first, after: $after, where: { categoryName: $categorySlug }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          categories {
            nodes {
              name
              slug
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `

  type Response = {
    posts: {
      nodes: Omit<Post, 'content' | 'author' | 'tags'>[];
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string | null;
        endCursor: string | null;
      };
    };
  };

  const data = await client.request<Response>(query, {
    categorySlug: slug,
    first,
    after,
  })

  return {
    posts: data.posts.nodes.map((post) => ({
      ...post,
      content: undefined,
      author: undefined,
      tags: undefined,
    })),
    pageInfo: data.posts.pageInfo,
  };
}

export async function getAllPostSlugsAndDates(): Promise<{ slug: string; date: string }[]> {
  const query = gql`
    query GetAllPostSlugsAndDates {
      posts(first: 100) {
        nodes {
          slug
          date
        }
      }
    }
  `

  type Response = {
    posts: {
      nodes: { slug: string; date: string }[]
    }
  }

  const data = await client.request<Response>(query)
  return data.posts.nodes.map(post => ({
    slug: post.slug,
    date: post.date // уже в формате ISO
  }))
}

// --- Получение всех слагов категорий ---
export async function getAllCategoriesSlugs(): Promise<string[]> {
  const categories = await getCategories();
  return categories.map(cat => cat.slug);
}