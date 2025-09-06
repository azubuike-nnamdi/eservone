import { useMemo } from 'react';

interface AppointmentStats {
  completed: number;
  canceled: number;
  pending: number;
  total: number;
}

/**
 * Custom hook to calculate appointment statistics from appointment count data
 */
export const useAppointmentStats = (appointmentCount: any): AppointmentStats => {
  return useMemo(() => {
    if (!appointmentCount?.data) {
      return {
        completed: 0,
        canceled: 0,
        pending: 0,
        total: 0
      };
    }

    // Extract counts from appointmentCount data
    const pending = appointmentCount.data.find((item: any) => item.statusCount === 'PENDING')?.serviceStatus || 0;
    const completed = appointmentCount.data.find((item: any) => item.statusCount === 'COMPLETED')?.serviceStatus || 0;
    const canceled = appointmentCount.data.find((item: any) => item.statusCount === 'CANCELED')?.serviceStatus || 0;

    const total = Number(pending) + Number(completed) + Number(canceled);

    return { completed, canceled, pending, total };
  }, [appointmentCount?.data]);
};

export default useAppointmentStats;
