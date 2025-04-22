"use client";

/* Packagae system */
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

/* Package application */
import createApiClient from "@/services/apiClient";
import { UserInfo } from "@/types/model/userInfo";

export default function useProfile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserInfo | null>(null);

  const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/api/user/me");
      setProfile(response.data.data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    } 
  };

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchProfile();
    } 
  }, [session]);

  const updateProfile = async (updatedData: Partial<UserInfo>) => {
    try {
      const response = await apiClient.patch("/api/user/me", updatedData);
      setProfile(prev => ({ ...prev, ...response.data.data }));
      return { success: true };
    } catch (err) {
      console.error("Profile update error:", err);
      return { success: false };
    } 
  };

  return {
    // profile,
    updateProfile,
    refresh: fetchProfile,
  };
}