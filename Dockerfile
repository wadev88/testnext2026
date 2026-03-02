# --- Stage 1: Dependencies ---
# ติดตั้ง Library ที่จำเป็น (npm modules)
FROM node:24-alpine AS deps
WORKDIR /app

# ติดตั้ง libc6-compat สำหรับเคสที่ต้องใช้ Native Modules ของ Node.js
RUN apk add --no-cache libc6-compat

# Copy ไฟล์ระบุเวอร์ชัน Library
COPY package.json package-lock.json ./

# ใช้ npm ci แทน install เพื่อความเสถียรและแม่นยำตาม lockfile
RUN npm ci && npm cache clean --force

# --- Stage 2: Builder ---
# ทำการ Compile และ Build โปรเจกต์
FROM node:24-alpine AS builder
WORKDIR /app

# ดึง node_modules จาก Stage แรกมาใช้
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client (v7 ใช้ driver adapter)
RUN npx prisma generate

# ปิดการส่งข้อมูลสถิติ และตั้งค่าเป็น Production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# สั่ง Build โปรเจกต์ (ผลลัพธ์จะได้โฟลเดอร์ .next/standalone)
RUN npm run build

# --- Stage 3: Runner ---
# Stage สุดท้ายที่จะนำไปรันจริง (เน้นความเบาและปลอดภัย)
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# สร้าง User ใหม่ (non-root) เพื่อไม่ให้รันแอปด้วยสิทธิ์สูงสุด (ป้องกันการเจาะระบบ)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# คัดลอกเฉพาะไฟล์ที่จำเป็นต้องใช้ตอนรัน (ตัด Source Code และ Cache ทิ้ง)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# คัดลอกPrisma v7 generated client และschema
COPY --from=builder --chown=nextjs:nodejs /app/generated ./generated
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# เปลี่ยนไปใช้ User ที่สร้างขึ้น
USER nextjs

# กำหนด Port และ Host
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# รันแอปผ่าน server.js ที่ได้จาก standalone mode (ประสิทธิภาพดีกว่า npm start)
CMD ["node", "server.js"]