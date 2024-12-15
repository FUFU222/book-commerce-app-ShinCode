import { getDetailBook } from "@/app/lib/next-auth/microcms/client";
import Image from "next/image";
import React from "react";

interface DetailBookProps {
  params: {
    id: string
  }
}

const DetailBook = async ({ params }: DetailBookProps) => {
  const book = await getDetailBook(params.id);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={book.thumbnail.url}
          className="w-full h-80 object-cover object-center"
          width={700}
          height={700}
          alt="image"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <div
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              作成日：{new Date(book.createdAt).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              最終更新：{new Date(book.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;