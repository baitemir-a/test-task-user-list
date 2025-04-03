import { getUserById } from '@/lib/db';

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);
  if (!user) return <div>User not found</div>;
  return (
    <div className="p-4">
      <h1 className="text-2xl">{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}