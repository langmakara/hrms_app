// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { apiClient } from "@/lib/api-client";
//
// export const useUserProfile = () => {
//   return useQuery({
//     queryKey: ['user-profile'],
//     queryFn: () => apiClient.get('/iam/user-profile').then((response) => response.data),
//     staleTime: 5 * 60 * 1000, // Consider stale after 5 minutes
//     retry: false,             // Don't retry failed requests
//     throwOnError: false,      // Don't throw on error
//   });
// };
//
// export const useUpdateProfile = () => {
//   const queryClient = useQueryClient();
//
//   return useMutation({
//     mutationFn: (data: any) => apiClient.post('/user', data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['auth-user'] });
//     },
//   });
// }