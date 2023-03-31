import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDepartment,
  getDepartments,
  createDepartment,
  createDepartments,
  updateDepartment,
  deleteDepartment,
} from '../api/department';
import { useSnackbar } from './useSnackbar';

export const useDepartments = () => useQuery({ queryKey: ['departments'], queryFn: getDepartments });

export const useDepartment = (id) => useQuery({ queryKey: ['department', id], queryFn: () => getDepartment(id) });

export const useDepartmentsMutation = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const create = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      showSnackbar('Department created successfully', 'success');
    },
  });

  const batchCreate = useMutation({
    mutationFn: createDepartments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      showSnackbar('Departments created successfully', 'success');
    },
  });

  const update = useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      showSnackbar('Department updated successfully', 'success');
    },
  });

  const remove = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      showSnackbar('Department deleted successfully', 'success');
    },
  });

  return { create, update, remove, batchCreate };
};
