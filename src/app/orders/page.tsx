'use client' // ต้องเป็น Client Component เพราะใช้ React Query Hook

import { useOrders } from '@/hooks/use-orders'
import { Order } from '@/types/order'

export default function OrdersPage() {
  // 1. ดึงข้อมูลและสถานะต่างๆ จาก Hook
  const { data, isLoading, isError, error, refetch } = useOrders()

  // 2. จัดการสถานะกำลังโหลด (Loading State)
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-500 animate-pulse">กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
        </div>
      </div>
    )
  }

  // 3. จัดการสถานะเมื่อเกิดข้อผิดพลาด (Error State)
  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">เกิดข้อผิดพลาดในการดึงข้อมูล</h2>
        <p className="text-slate-600 mb-6">{error instanceof Error ? error.message : 'ไม่สามารถติดต่อ Server ได้'}</p>
        <button 
          onClick={() => refetch()} 
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">จัดการคำสั่งซื้อ</h1>
          <p className="text-slate-500 text-sm">แสดงรายการสั่งซื้อทั้งหมดในระบบ</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-slate-500">ทั้งหมด</span>
          <div className="text-2xl font-bold text-blue-600">{data?.pagination.total || 0} รายการ</div>
        </div>
      </header>

      {/* 4. ส่วนตารางรายการสั่งซื้อ (Orders Table) */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">เลขที่สั่งซื้อ</th>
                <th className="px-6 py-4 font-semibold">วันที่สั่งซื้อ</th>
                <th className="px-6 py-4 font-semibold text-center">ช่องทางชำระ</th>
                <th className="px-6 py-4 font-semibold text-center">สถานะการชำระ</th>
                <th className="px-6 py-4 font-semibold text-right">ยอดรวม (บาท)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.data.map((order: Order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 font-bold text-blue-600">
                    #{order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {/* แปลง ISO Date เป็นรูปแบบไทย */}
                    {new Date(order.createdAt).toLocaleDateString('th-TH', {
                      day: '2-digit',
                      month: 'short',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 uppercase">
                      {order.paymentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {/* แสดง Badge ตามสถานะการชำระเงิน */}
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset 
                      ${order.paymentStatus === 'paid' 
                        ? 'bg-green-50 text-green-700 ring-green-600/20' 
                        : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'}`}>
                      {order.paymentStatus === 'paid' ? 'ชำระแล้ว' : 'รอชำระเงิน'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">
                    {/* แปลง String เป็น Number เพื่อทำ Format */}
                    {Number(order.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}