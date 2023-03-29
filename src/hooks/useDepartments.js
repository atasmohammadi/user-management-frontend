import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDepartment, getDepartments, createDepartment, updateDepartment } from '../api/department';

export const useDepartments = () => useQuery({ queryKey: ['departments'], queryFn: getDepartments });

export const useDepartment = (id) => useQuery({ queryKey: ['department', id], queryFn: () => getDepartment(id) });

export const useDepartmentsMutation = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const update = useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  return [create, update];
};
