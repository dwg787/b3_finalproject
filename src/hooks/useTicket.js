import { useMutation, useQueryClient } from "react-query";

const useTicket = () => {
  const queryClient = useQueryClient();

  const mutationAdd = useMutation(createTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries("reservations");
      queryClient.invalidateQueries("myreservations");
    },
  });

  return [mutationAdd.mutate];
};

export default useTicket;
