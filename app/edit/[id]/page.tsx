"use client"
import { getUserById } from "@/lib/db";
import UserForm from "@/components/UserForm";
import { useParams } from "next/navigation";


export default async function EditUser() {
  const { id } = useParams();
  const user = await getUserById(String(id));
  if (!user) return <div>User not found</div>;
  return <UserForm user={user} />;
}

export const dynamicParams = true;
