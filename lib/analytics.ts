import { AnalyticsData } from './types';
import { getAllUsers } from './auth';
import { getConversations } from './conversations';

// compute simple analytics from mock data
export async function getAnalyticsData(): Promise<AnalyticsData> {
  const users = await getAllUsers();
  const convs = await getConversations();

  return {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === 'active').length,
    totalStudents: users.filter((u) => u.role === 'student').length,
    totalLecturers: users.filter((u) => u.role === 'lecturer').length,
    totalAdmins: users.filter((u) => u.role === 'admin').length,
    chatVolume: convs.length,
    activeChats: convs.length, // in a real app you'd determine what constitutes "active"
  };
}
