"use client";

import { useQuery } from "@tanstack/react-query";
import getHistory from "@/api/functions/history.api";
import getProfile from "@/api/functions/profile.api";

export function useUserHistory(doctorId?: string) {
	return useQuery({
		queryKey: ["user", "history", doctorId || "all"],
		queryFn: async () => {
			// determine userId: prefer localStorage, fall back to profile API
			let userId: string | undefined;
			if (typeof window !== "undefined") {
				userId = localStorage.getItem("userId") || undefined;
			}

			if (!userId) {
				try {
					const profileRes = await getProfile();
					const profile = profileRes?.data ?? profileRes;
					userId = profile?._id || profile?.id || undefined;
					if (userId && typeof window !== "undefined") {
						localStorage.setItem("userId", userId);
					}
				} catch (e) {
					// ignore — call history without userId
				}
			}

			const res = await getHistory({ userId, doctorId });
			return res;
		},
	});
}

export default useUserHistory;
