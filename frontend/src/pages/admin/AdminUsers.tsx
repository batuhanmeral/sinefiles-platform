import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';

export function AdminUsers() {
  const [page, setPage] = useState(1);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['admin-users', page], queryFn: () => adminApi.users(page).then(r => r.data) });

  const del = useMutation({
    mutationFn: (id: string) => adminApi.deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const upd = useMutation({
    mutationFn: (d: { id: string; role: string }) => adminApi.updateRole(d.id, d.role),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kullanıcılar</h1>
      <table className="w-full text-sm border border-white/10">
        <thead className="bg-surface-raised">
          <tr>
            <th className="p-2 text-left">Kullanıcı</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2">Rol</th>
            <th className="p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((u: any) => (
            <tr key={u.id} className="border-t border-white/10">
              <td className="p-2">{u.username}</td>
              <td className="p-2 text-xs text-ink-muted">{u.email}</td>
              <td className="p-2">
                <select value={u.role} onChange={e => upd.mutate({ id: u.id, role: e.target.value })} className="text-xs p-1 bg-surface border border-white/10 rounded">
                  <option>USER</option>
                  <option>ADMIN</option>
                </select>
              </td>
              <td className="p-2"><button onClick={() => del.mutate(u.id)} className="text-red-400 text-xs">Sil</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 bg-white/10 rounded text-sm">←</button>
        <span className="py-1">{page}</span>
        <button onClick={() => setPage(p => p + 1)} className="px-3 py-1 bg-white/10 rounded text-sm">→</button>
      </div>
    </div>
  );
}
