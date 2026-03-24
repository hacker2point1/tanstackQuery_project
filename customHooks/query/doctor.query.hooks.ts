import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { DoctorListFunction } from "@/api/functions/doctorList.api";
import { DoctorAppoinmentFunction } from "@/api/functions/doctorAppoinment.api";
import { DoctorSlotsFunction } from "@/api/functions/doctorSlots.api";


export const useDoctorListMutation = () => {
  const { queryClient } = useGlobalHooks();
  const cookies = new Cookies();
  return useMutation({
    mutationFn: DoctorListFunction,
    onSuccess: (response) => {
      console.log(response);
      const status = (response as any)?.status;
      const message = (response as any)?.message;

      if (status === true) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      queryClient.invalidateQueries({ queryKey: ["DOCTORLIST"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// Query-based doctor list (reactive to filters)
export const useDoctorList = (params: {
  search?: string;
  department?: string;
  page?: number;
  limit?: number;
}) => {
  const key = [
    "DOCTOR_LIST",
    params.search || "",
    params.department || "",
    params.page || 1,
    params.limit || 10,
  ];

  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const payload = {
        search: params.search || "",
        department: params.department || "",
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      };
      const res = await (DoctorListFunction as any)(payload as any);
      return res;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 minute
  } as any);
};


export const useDoctorAppoinment=()=>{
  const {queryClient} = useGlobalHooks()
  return useMutation({
    mutationFn:DoctorAppoinmentFunction,
    onSuccess:(response)=>{
      console.log(response)
      const { message, status } = response || {};
      if (status === true) {
        toast.success(message || "Appointment booked");
      } else {
        toast.error(message || "Failed to book appointment");
      }
      queryClient.invalidateQueries({ queryKey: ["DOCTORLIST"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error?.message || "Booking failed");
    }
  })
}


export const useDoctorSlots = (doctorId?: string | null, date?: string | null) => {
  return useQuery({
    queryKey: ["DOCTOR_SLOTS", doctorId, date],
    queryFn: async () => {
      if (!doctorId || !date) return { status: false, data: [] } as any;
      const res = await DoctorSlotsFunction({ doctorId: doctorId as string, date: date as string });
      return res;
    },
    enabled: !!doctorId && !!date,
    staleTime: 1000 * 60, 
  });
};
