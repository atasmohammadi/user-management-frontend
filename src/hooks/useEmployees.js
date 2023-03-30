import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployee, getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employee';

export const useEmployees = () => useQuery({ queryKey: ['employees'], queryFn: getEmployees });

export const useEmployee = (id) => useQuery({ queryKey: ['employee', id], queryFn: () => getEmployee(id) });

export const useEmployeesMutation = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  const update = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  const remove = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  return { create, update, remove };
};
