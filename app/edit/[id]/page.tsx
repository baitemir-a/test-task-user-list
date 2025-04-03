import { getUserById } from '@/lib/db';
import UserForm from '@/components/UserForm';

export default async function EditUser({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);
  if (!user) return <div>User not found</div>;
  return <UserForm user={user} />;
}