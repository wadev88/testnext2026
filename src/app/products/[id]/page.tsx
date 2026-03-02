// app/products/[id]/page.tsx
import AddToCartButton from '@/components/add-to-cart-button'
import { Metadata } from 'next'
import Image from 'next/image'

// 1. นิยามโครงสร้างข้อมูล (Interface)
interface Product {
  id: number
  name: string
  price: string // ปรับเป็น string ตาม JSON จริงที่ตรวจเจอ
  description?: string
  barcode?: string
  image?: string
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

// 2. ฟังก์ชันดึงข้อมูลสินค้าตาม ID (Server-side)
async function getProductById(id: string) {
  const res = await fetch(`https://backend.codingthailand.com/v2/products/${id}`)
  if (!res.ok) return null
  const data = await res.json()
  return data as Product
}

// 3. การทำ Dynamic SEO (Metadata)
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) return { title: 'ไม่พบสินค้า' }

  return {
    title: product.name,
    description: product.description || product.name,
    openGraph: {
      title: product.name,
      images: product.image || `https://picsum.photos/seed/${id}/600/600`, // Fallback รูปพรีวิว
    },
  }
}

// 4. ส่วนแสดงผลหลัก (Main Page Component)
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = await getProductById(id)

  // กรณีหาข้อมูลไม่เจอ
  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 text-center">
        <h1 className="mb-2 text-2xl font-bold">ไม่พบสินค้า</h1>
        <p className="text-slate-600">ขออภัย ไม่พบสินค้าที่คุณกำลังมองหา</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Layout แบบ Grid 2 คอลัมน์ (รูปซ้าย รายละเอียดขวา) */}
      <div className="grid gap-8 md:grid-cols-2">
        
        {/* ฝั่งรูปภาพ */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
          <Image
            // Logic: ถ้า API ไม่มีรูป ให้ดึงจาก Picsum ทันที
            src={product.image || `https://picsum.photos/seed/${product.id}/600/600`}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority // โหลดรูปนี้เป็นอันดับแรกของหน้า
          />
        </div>

        {/* ฝั่งข้อมูลสินค้า */}
        <div>
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
          
          {product.barcode && (
            <p className="mb-2 text-sm text-slate-500">รหัสสินค้า: {product.barcode}</p>
          )}

          <div className="mb-6 rounded-lg bg-slate-50 p-6">
            <p className="text-3xl font-bold text-blue-600">
              {/* แปลง String เป็น Number ก่อนทำ Format */}
              ฿{Number(product.price).toLocaleString() || 'ไม่ระบุราคา'}
            </p>
          </div>

          {product.description && (
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold">รายละเอียดสินค้า</h2>
              <p className="leading-relaxed text-slate-700">{product.description}</p>
            </div>
          )}

          <AddToCartButton 
            productId={product.id}
            productName={product.name}
            productPrice={Number(product.price) || 0}
          />
        </div>
      </div>
    </main>
  )
}