import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, type CreateObj, type Createuser, type URes, type User } from "../../api/usersApi";
import { USERS_QUERY_KEY } from "./usersQuery";

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: CreateObj) => usersApi.createUser(user.data),
    onMutate: async (req) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      const previousData = queryClient.getQueryData<URes>([...USERS_QUERY_KEY, req.page]);
      const previousUsers = previousData?.data
      const total = previousData ? +previousData.total + 1 : 1

      queryClient.setQueryData([...USERS_QUERY_KEY, req.page], (oldData: URes) => {

        return {
          data: [ req.data, ...oldData.data, ],
          total
        }
      });

      return { previousUsers, page: req.page, total };
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData([...USERS_QUERY_KEY, context?.page], {data: [data, ...(context?.previousUsers || [])], total: context?.total});
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(USERS_QUERY_KEY, context?.previousUsers);
    }
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({page, id}: {page: number, id: string}) => usersApi.deleteUser(id),
    onSuccess: (_, {id: idParam, page}) => {
      queryClient.setQueryData([...USERS_QUERY_KEY, page], (oldData: URes) => {
        const newData = oldData.data.filter((user) => user.id !== idParam)
        return {data: newData, total: oldData.total - 1}
      });
    },
    onError: () => {
      console.log("User deletion failed");
    },
    onSettled: () => {
      console.log("User deletion settled");
    },
  });
}