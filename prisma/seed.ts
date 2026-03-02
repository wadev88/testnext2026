// prisma/seed.ts
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '../generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)

const prisma = new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
})


const users = [
    { email: 'admin@example.com', name: 'ผู้ดูแลระบบ', role: 'admin', isActive: true, plainPassword: 'Admin1234!' },
    { email: 'john@example.com', name: 'จอห์น โด', role: 'user', isActive: true, plainPassword: 'User1234!' },
    { email: 'jane@example.com', name: 'เจน สมิธ', role: 'user', isActive: true, plainPassword: 'User1234!' },
    { email: 'moderator@example.com', name: 'ผู้ดูแลเนื้อหา', role: 'moderator', isActive: true, plainPassword: 'Mod1234!' },
]



async function main() {
    console.log('Start database seeding ...')

    try {

        // เพิ่ม: ลบ users เดิม(ถ้ามี)
        await prisma.user.deleteMany()
        console.log('Cleared existing users.')

        // เพิ่ม: สร้าง users ใหม่ พร้อม brypt hash รหัสผ่าน
        const saltRounds = 10
        const usersWithHashed = await Promise.all(
            users.map(async (u) => ({
                email: u.email,
                name: u.name,
                role: u.role,
                isActive: u.isActive,
                password: await bcrypt.hash(u.plainPassword, saltRounds),
            })),
        )

        const createdUsers = await prisma.user.createMany({
            data: usersWithHashed,
            // ถ้าคุณมี unique ที่ email และไม่ให้ซ้ำกัน
            skipDuplicates: true,
        })
        console.log(`Created ${createdUsers.count} users.`)

        console.log(`Database seeding completed.`)

    } catch (error) {
        console.error('Error during seeding:', error)
        throw error
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
