import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useAuth } from '@/features/auth';
import { listsApi } from '@/api/lists.api';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { SortableListItem } from './SortableListItem';
import { ListOwnerCard } from './ListOwnerCard';
import { ListHeader } from './ListHeader';

export function ListDetailPage() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState(false);

  // Liste detayını getir
  const { data: list, isLoading, error } = useQuery({
    queryKey: ['list', listId],
    queryFn: () => listsApi.getListDetail(listId!),
    enabled: !!listId,
  });

  // Liste sırasını güncelle
  const reorderMutation = useMutation({
    mutationFn: (items: { id: string; position: number }[]) =>
      listsApi.reorderListItems(listId!, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  // Listeyi beğen/beğeniyi kaldır
  const toggleLikeMutation = useMutation({
    mutationFn: () => listsApi.toggleListLike(listId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list', listId] });
    },
  });

  // dnd-kit sensörleri
  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !list) return;

    const oldIndex = list.items.findIndex((item) => item.id === active.id);
    const newIndex = list.items.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Yeni sıralama
    const newItems = arrayMove(list.items, oldIndex, newIndex);
    
    // Positions'ları güncelle
    const reorderedItems = newItems.map((item, index) => ({
      id: item.id,
      position: index,
    }));

    reorderMutation.mutate(reorderedItems);
    setIsDragging(false);
  };

  if (!listId) {
    return <ErrorMessage message="Liste ID'si bulunamadı" />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Liste yüklenemedi" />;
  }

  if (!list) {
    return <ErrorMessage message="Liste bulunamadı" />;
  }

  const canEdit = list.isOwner;
  const canShare = list.visibility === 'PUBLIC';

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <ListHeader 
        list={list}
        onToggleLike={() => toggleLikeMutation.mutate()}
        isLiking={toggleLikeMutation.isPending}
        canShare={canShare}
      />

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Liste Sahibi Kartı */}
        <div className="mb-8">
          <ListOwnerCard user={list.user} />
        </div>

        {/* Açıklama */}
        {list.description && (
          <div className="mb-8">
            <p className="text-ink-muted leading-relaxed">{list.description}</p>
          </div>
        )}

        {/* Sürükle-Bırak Liste */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-ink">
            İçerikler ({list.items.length})
          </h2>

          {list.items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-white/10 bg-surface-raised p-8 text-center">
              <p className="text-ink-muted">Bu liste henüz boş</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={() => setIsDragging(true)}
            >
              <SortableContext
                items={list.items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
                disabled={!canEdit || reorderMutation.isPending}
              >
                <div className="space-y-3">
                  {list.items.map((item, index) => (
                    <SortableListItem
                      key={item.id}
                      item={item}
                      index={index}
                      isDragging={isDragging}
                      canDrag={canEdit && !reorderMutation.isPending}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Loading Durumu */}
        {reorderMutation.isPending && (
          <div className="mt-4 text-center text-sm text-ink-muted">
            Sıralama güncelleniyor...
          </div>
        )}
      </div>
    </div>
  );
}
