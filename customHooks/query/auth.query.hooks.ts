import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { RegistrationFunction } from "@/api/functions/register.api";
import { toast } from "sonner";



//custom quary

export const useSignUpMutation = () => {
    const cookies = new Cookies()
    const { queryClient } = useGlobalHooks()
    return useMutation({
        mutationFn: RegistrationFunction,
        onSuccess: (response) => {
            const { token, status, message } = response || {}
            if (status === true) {
                toast.success(message)
            }
            else {
                toast.error(message)
            }
            queryClient.invalidateQueries({ queryKey: ["REGISTER"] })
        },
        onError: (error) => {
            console.log("error")
        }
    })
}