import { useMutation } from "@tanstack/react-query";
import { useAPI } from "../lib/axios";

export const useAuthCallback = () => {
  const api = useAPI();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/auth/callback");
      console.log(data);
      return data;
    },
  });
};
