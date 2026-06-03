import { prisma } from '../../config/db.js';

export async function getDashboard() {
  const [users, content, reviews, lists] = await Promise.all([
    prisma.user.count(),
    prisma.content.count(),
    prisma.review.count(),
    prisma.list.count(),
  ]);
  return { users, content, reviews, lists };
}

export async function listUsers(page = 1) {
  const [users, total] = await Promise.all([
    prisma.user.findMany({ skip: (page - 1) * 10, take: 10, select: { id: true, username: true, email: true, role: true } }),
    prisma.user.count(),
  ]);
  return { users, total };
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
}

export async function updateUserRole(id: string, role: string) {
  return prisma.user.update({ where: { id }, data: { role: role as any } });
}

export async function listContent(page = 1) {
  const [content, total] = await Promise.all([
    prisma.content.findMany({ skip: (page - 1) * 10, take: 10, select: { id: true, title: true, type: true } }),
    prisma.content.count(),
  ]);
  return { content, total };
}

export async function deleteContent(id: string) {
  await prisma.content.delete({ where: { id } });
}
