"use client";

import { useQuery } from "@tanstack/react-query";
import getProfile from "@/api/functions/profile.api";

export function useUserProfile() {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const res = await getProfile();
      // expect backend shape { status: true, data: profile }
      return res.data || res;
    },
  });
}

export default useUserProfile;
