import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา',
  description: 'เรียนรู้เกี่ยวกับทีมงานและเทคโนโลยีที่เราใช้ในการพัฒนาเว็บแอปพลิเคชัน',
  openGraph: {
    title: 'เกี่ยวกับเรา | My Next.js App',
    description: 'เรียนรู้เกี่ยวกับทีมงานและเทคโนโลยีที่เราใช้',
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">เกี่ยวกับเรา</h1>

          {/* 1. ส่วนเนื้อหาหลักและภารกิจ */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>ภารกิจของเรา</CardTitle>
              <CardDescription>สร้างสรรค์เว็บแอปพลิเคชันที่ทันสมัยและมีคุณภาพ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-600 leading-relaxed">
              <p>เราเชื่อว่าเว็บแอปพลิเคชันที่ดีต้องมีทั้งประสิทธิภาพและการออกแบบที่ดี ด้วย Next.js 16 เราสามารถสร้างเว็บไซต์ที่โหลดเร็ว และให้ประสบการณ์ที่ดีแก่ผู้ใช้งาน</p>
              <p>การใช้ Tailwind CSS และ shadcn/ui ช่วยให้เราสร้าง UI ที่สวยงามและปรับแต่งได้ง่าย</p>
            </CardContent>
          </Card>

          {/* 2. ส่วนแสดงรูปภาพจาก Remote URL (Unsplash) */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">มุมมองเทคโนโลยีของเรา</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* รูปภาพที่ 1: ใส่ priority เพราะอยู่ส่วนบนของหน้าจอ */}
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg border">
                <Image
                  src="https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a"
                  alt="Laptop on desk"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority // บอก Next.js ให้โหลดทันที (LCP Optimization)
                />
              </div>
              
              {/* รูปภาพที่ 2: ใช้ Lazy Load ปกติ */}
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg border">
                <Image
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                  alt="Modern technology"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* 3. ส่วน Grid ข้อมูลเทคนิค */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>เทคโนโลยีที่ใช้</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-blue-500">▪</span> Next.js 16</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">▪</span> React Server Components</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">▪</span> Tailwind CSS</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>จุดเด่น</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> ประสิทธิภาพสูง</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> SEO-friendly</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Responsive Design</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}