import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';

export function AdminContent() {
  const [page, setPage] = useState(1);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['admin-content', page], queryFn: () => adminApi.content(page).then(r => r.data) });

  const del = useMutation({
    mutationFn: (id: string) => adminApi.deleteContent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-content'] }),
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">İçerik</h1>
      <table className="w-full text-sm border border-white/10">
        <thead className="bg-surface-raised">
          <tr>
            <th className="p-2 text-left">Başlık</th>
            <th className="p-2 text-left">Tür</th>
            <th className="p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {data?.content?.map((c: any) => (
            <tr key={c.id} className="border-t border-white/10">
              <td className="p-2 truncate">{c.title}</td>
              <td className="p-2 text-xs">{c.type}</td>
              <td className="p-2"><button onClick={() => del.mutate(c.id)} className="text-red-400 text-xs">Sil</button></td>
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
