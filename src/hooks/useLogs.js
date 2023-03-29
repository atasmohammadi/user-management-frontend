import { useQuery } from '@tanstack/react-query';
import { getLog, getLogs } from '../api/log';

export const useLogs = () => useQuery({ queryKey: ['logs'], queryFn: getLogs });

export const useLog = (id) => useQuery({ queryKey: ['log', id], queryFn: () => getLog(id) });
