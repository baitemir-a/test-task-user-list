'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/schemas';
import { useAppDispatch } from '../store/hooks';
import { createUser, updateUser } from '@/store/userSlice';
import { useRouter } from 'next/navigation';
import styles from './UserForm.module.scss';

export default function UserForm({ user }: { user?: any }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: user || {},
  });

  const onSubmit = async (data: any) => {
    if (user) {
      dispatch(updateUser({ id: user.id, userData: data }));
    } else {
      dispatch(createUser(data));
    }
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.userForm}>
      <div className={styles.formGroup}>
        <label>Name</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name?.message && <p className={styles.error}>{String(errors.name.message)}</p>}
      </div>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input {...register('email', { required: 'Email is required' })} />
        {errors.email && <p className={styles.error}>{String(errors.email.message)}</p>}
      </div>
      <div className={styles.formGroup}>
        <label>Age</label>
        <input type="number" {...register('age', { required: 'Age is required' })} />
        {errors.age && <p className={styles.error}>{String(errors.age.message)}</p>}
      </div>
      <button type="submit" className={styles.submitButton}>
        {user ? 'Update' : 'Create'}
      </button>
    </form>
  );
}