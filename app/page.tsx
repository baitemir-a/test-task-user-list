import { getUsers } from '@/lib/db';
import UserTable from '@/components/UserTable';

export default async function Home() {
  const users = await getUsers();
  return <UserTable initialUsers={users} />;
}