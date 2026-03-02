// app/users/page.tsx
import { Suspense } from 'react'
import UsersListSkeleton, { UsersList } from './users-list' 

export default function UsersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ส่วนหัวของหน้าจอ (Header) */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Users Management
        </h1>
        <p className="text-gray-600">
          Manage and view all registered users
        </p>
      </div>
      
      {/* ใช้ Suspense เพื่อหุ้มส่วนที่ดึงข้อมูล (Async Component) */}
      {/* ขณะที่รอข้อมูลจาก UsersList ระบบจะแสดง UsersListSkeleton แทน */}
      <Suspense fallback={<UsersListSkeleton />}>
        <UsersList />
      </Suspense>
    </div>
  )
}