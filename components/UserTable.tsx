'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers, deleteUser, setUsers } from '@/store/userSlice';
import { useRouter } from 'next/navigation';
import styles from './UserTable.module.scss'
export default function UserTable({ initialUsers }: { initialUsers: any[] }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const users = useAppSelector((state: any) => state.users.users);

  useEffect(() => {
    if (initialUsers) {
      dispatch(setUsers(initialUsers));
    }
    dispatch(fetchUsers());
  }, [initialUsers, dispatch]);

  return (
    <div className={styles.userTable}>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => router.push(`/edit/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => {() => dispatch(deleteUser(user.id))}}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className={styles.addButton}
        onClick={() => router.push('/create')}
      >
        Add User
      </button>
    </div>
  );
}