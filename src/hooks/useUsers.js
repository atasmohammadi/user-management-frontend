import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser, getUsers, updateUser, deleteUser } from '../api/user';
import { useAuth } from './useAuth';
import { useSnackbar } from './useSnackbar';

export const useUsers = () => useQuery({ queryKey: ['users'], queryFn: getUsers });

export const useUser = (id) => useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) });

export const useCurrentUser = () => {
  const { user } = useAuth();
  return useQuery({ queryKey: ['user', user.id], queryFn: () => user });
};

export const useUsersMutation = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const update = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showSnackbar('User updated successfully', 'success');
    },
  });

  const remove = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showSnackbar('User deleted successfully', 'success');
    },
  });

  return { update, remove };
};
