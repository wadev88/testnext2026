// hooks/use-orders.ts
'use client'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Order } from '@/types/order' // นำ Interface ที่เราสร้างไว้มาใช้

// นิยามโครงสร้างของ Response ที่ได้รับจาก API (มักจะมีข้อมูลการแบ่งหน้ามาด้วย)
interface OrdersResponse {
  data: Order[] // ข้อมูล Order เป็น Array ของ Interface Order
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export function useOrders() {
  return useQuery({
    // queryKey: เปรียบเสมือนรหัสผ่านหรือชื่อตู้เซฟใน Cache
    queryKey: ['orders'], 
    
    // queryFn: ฟังก์ชันหลักที่ใช้ดึงข้อมูลจริงผ่าน Axios
    queryFn: async () => {
      // ใช้ Axios Instance (api) ที่เราตั้งค่า baseURL ไว้แล้ว
      const res = await api.get<OrdersResponse>(
        '/orders?page=1&limit=10&search=&sortBy=createdAt&sortOrder=desc&paginate=true'
      )
      // ส่งข้อมูลในรูปแบบ JavaScript Object กลับไป (Axios แปลง JSON ให้แล้ว)
      return res.data 
    },
  })
}