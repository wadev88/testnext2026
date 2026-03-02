'use client'
import { useEffect } from 'react'

export default function Error({
  error, // วัตถุที่เก็บรายละเอียดว่าพังเพราะอะไร
  reset, // ฟังก์ชันสำหรับกดปุ่มเพื่อลองดึงข้อมูลใหม่
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // ในฐานะโปรแกรมเมอร์ เรามักจะพิมพ์ error ออกมาดูใน Console เพื่อแก้บั๊ก
    console.error(error)
  }, [error])

  return (
    <div className="text-center">
      <h2>เกิดข้อผิดพลาด</h2>
      <p>ขออภัย ไม่สามารถโหลดข้อมูลได้...</p>
      {/* เมื่อ user กดปุ่มนี้ Next.js จะพยายามไป Fetch ข้อมูลมาใหม่อีกครั้ง */}
      <button onClick={reset}>ลองใหม่อีกครั้ง</button>
    </div>
  )
}