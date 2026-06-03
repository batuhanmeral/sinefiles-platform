import { apiClient } from './client';

export const adminApi = {
  dashboard: () => apiClient.get('/admin/dashboard'),
  users: (page = 1) => apiClient.get('/admin/users', { params: { page } }),
  deleteUser: (id: string) => apiClient.delete(`/admin/users/${id}`),
  updateRole: (id: string, role: string) => apiClient.patch(`/admin/users/${id}/role`, { role }),
  content: (page = 1) => apiClient.get('/admin/content', { params: { page } }),
  deleteContent: (id: string) => apiClient.delete(`/admin/content/${id}`),
};
