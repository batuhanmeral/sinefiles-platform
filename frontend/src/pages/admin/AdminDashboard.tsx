import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';

export function AdminDashboard() {
  const { data } = useQuery({ queryKey: ['admin-dash'], queryFn: () => adminApi.dashboard().then(r => r.data) });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-surface-raised rounded">
          <p className="text-sm text-ink-muted">Kullanıcı</p>
          <p className="text-2xl font-bold">{data?.users || 0}</p>
        </div>
        <div className="p-4 bg-surface-raised rounded">
          <p className="text-sm text-ink-muted">İçerik</p>
          <p className="text-2xl font-bold">{data?.content || 0}</p>
        </div>
        <div className="p-4 bg-surface-raised rounded">
          <p className="text-sm text-ink-muted">İnceleme</p>
          <p className="text-2xl font-bold">{data?.reviews || 0}</p>
        </div>
        <div className="p-4 bg-surface-raised rounded">
          <p className="text-sm text-ink-muted">Liste</p>
          <p className="text-2xl font-bold">{data?.lists || 0}</p>
        </div>
      </div>
    </div>
  );
}
