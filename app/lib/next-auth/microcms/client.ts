import { BookType } from '@/app/types/types';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICRO_CMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICRO_CMS_API_KEY!
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "bookcommerce",
    customRequestInit: {
      next: {
        revalidate: 3600
      }
    },
  });
  return allBooks;
}

export const getDetailBook = async (contentId: string): Promise<BookType> => {
  const detailBook = await client.getListDetail<BookType> ({
    endpoint: "bookcommerce",
    contentId,
    customRequestInit: {
      cache: "no-store"
    },
  });
  return detailBook;
}