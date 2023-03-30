import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser, getUsers, updateUser, deleteUser } from '../api/user';
import { useAuth } from './useAuth';

export const useUsers = () => useQuery({ queryKey: ['users'], queryFn: getUsers });

export const useUser = (id) => useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) });

export const useCurrentUser = () => {
  const { user } = useAuth();
  return useQuery({ queryKey: ['user', user.id], queryFn: () => getUser(user.id), enabled: !!user.id });
};

export const useUsersMutation = () => {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const remove = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { update, remove };
};
