-- CreateTable
CREATE TABLE "WhatsAppLead" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'whatsapp',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhatsAppLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormLead" (
    "id" TEXT NOT NULL,
    "requestId" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "serviceType" TEXT NOT NULL,
    "city" TEXT,
    "message" TEXT,
    "source" TEXT NOT NULL DEFAULT 'form',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppLead_requestId_key" ON "WhatsAppLead"("requestId");

-- CreateIndex
CREATE INDEX "WhatsAppLead_requestId_idx" ON "WhatsAppLead"("requestId");

-- CreateIndex
CREATE INDEX "FormLead_phone_idx" ON "FormLead"("phone");

-- CreateIndex
CREATE INDEX "FormLead_requestId_idx" ON "FormLead"("requestId");
