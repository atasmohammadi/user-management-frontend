import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getEmployee,
  getEmployees,
  createEmployee,
  createEmployees,
  updateEmployee,
  deleteEmployee,
} from '../api/employee';
import { useSnackbar } from './useSnackbar';

export const useEmployees = () => useQuery({ queryKey: ['employees'], queryFn: getEmployees });

export const useEmployee = (id) => useQuery({ queryKey: ['employee', id], queryFn: () => getEmployee(id) });

export const useEmployeesMutation = () => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  const create = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      showSnackbar('Employee created successfully', 'success');
    },
  });

  const batchCreate = useMutation({
    mutationFn: createEmployees,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      showSnackbar('Employee created successfully', 'success');
    },
  });

  const update = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      showSnackbar('Employee updated successfully', 'success');
    },
  });

  const remove = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      showSnackbar('Employee deleted successfully', 'success');
    },
  });

  return { create, update, remove, batchCreate };
};
