import { apiClient } from './client';
import type { AuthUser, Language } from '@/types/auth';

// Profil güncelleme için girdi alanları
export interface UpdateMeInput {
  displayName?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  language?: Language;
  email?: string;
  username?: string;
}

// Şifre değiştirme için girdi alanları
export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Takip et/bırak işlemlerinin döndürdüğü güncel durum
export interface FollowState {
  following: boolean;
  followerCount: number;
}

// Takipçi/takip listesindeki bir kullanıcı satırı
export interface FollowUser {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  isFollowing: boolean; // izleyici bu kişiyi takip ediyor mu
  isSelf: boolean; // bu satır izleyicinin kendisi mi
}

// Kullanıcı profili ile ilgili tüm API çağrılarını içeren nesne
export const usersApi = {
  // Giriş yapan kullanıcının kendi profil bilgilerini getirir
  me: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>('/users/me');
    return data;
  },

  // Giriş yapan kullanıcının profil bilgilerini günceller
  updateMe: async (input: UpdateMeInput): Promise<AuthUser> => {
    const { data } = await apiClient.patch<AuthUser>('/users/me', input);
    return data;
  },


  // Kullanıcının şifresini değiştirir (mevcut şifre doğrulamasıyla)
  changePassword: async (input: ChangePasswordInput): Promise<void> => {
    await apiClient.post('/users/me/password', input);
  },

  // Kullanıcı hesabını kalıcı olarak siler
  deleteMe: async (): Promise<void> => {
    await apiClient.delete('/users/me');
  },

  // Belirtilen kullanıcıyı takip eder
  follow: async (username: string): Promise<FollowState> => {
    const { data } = await apiClient.post<FollowState>(`/users/${username}/follow`);
    return data;
  },

  // Belirtilen kullanıcının takibini bırakır
  unfollow: async (username: string): Promise<FollowState> => {
    const { data } = await apiClient.delete<FollowState>(`/users/${username}/follow`);
    return data;
  },

  // Bir kullanıcının takipçilerini getirir
  followers: async (username: string): Promise<FollowUser[]> => {
    const { data } = await apiClient.get<FollowUser[]>(`/users/${username}/followers`);
    return data;
  },

  // Bir kullanıcının takip ettiklerini getirir
  following: async (username: string): Promise<FollowUser[]> => {
    const { data } = await apiClient.get<FollowUser[]>(`/users/${username}/following`);
    return data;
  },
};
