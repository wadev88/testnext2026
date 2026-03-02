// types/order.ts

// โครงสร้างหลักของใบสั่งซื้อ (Order)
export interface Order {
  id: number
  orderNumber: string      // เลขที่ใบสั่งซื้อ
  totalAmount: string      // ยอดรวมทั้งหมด (ระวัง: API ส่งมาเป็น String)
  totalCost: string        // ต้นทุนรวม
  paymentType: string      // ประเภทการชำระเงิน (เช่น Cash, Transfer)
  paymentStatus: string    // สถานะ (เช่น paid, pending)
  notes: string | null     // หมายเหตุ
  createdAt: string        // วันที่สร้างรายการ
  updatedAt: string
  orderItems?: OrderItem[] // รายการสินค้าภายในใบสั่งซื้อนี้ (เป็น Array)
}

// โครงสร้างของรายการสินค้าในแต่ละ Order
interface OrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number         // จำนวนที่สั่ง
  unitPrice: string        // ราคาต่อหน่วย
  unitCost: string         // ต้นทุนต่อหน่วย
  totalPrice: string       // ราคารวมของรายการนี้
  product: {               // ข้อมูลสินค้าที่เชื่อมโยงมา (Relation)
    id: number
    name: string
    barcode: string
  }
}