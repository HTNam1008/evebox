"use client"

import useSWR from "swr";
import { Category } from "@/types/model/frontDisplay";
import { getAllCategories } from "@/services/event.service";
import { BaseApiResponse } from "@/types/BaseApiResponse";

export const useCategories = () => {
  const fetcher = async (): Promise<BaseApiResponse<Category[]>> => {
    const res = await getAllCategories();
    return res;
  };

  const { data, error, isLoading, mutate } = useSWR<BaseApiResponse<Category[]>>(
    "categories", // Key cho SWR
    fetcher,
    {
      revalidateOnFocus: false, // Không tự động revalidate khi focus lại trang
    }
  );

  return {
    categories: data?.data ?? [], 
    isLoading,
    error,
    mutate,
  };
};