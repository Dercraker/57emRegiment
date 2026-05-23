-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "stock";

-- CreateEnum
CREATE TYPE "stock"."Category" AS ENUM ('SMALL_ARMS', 'HEAVY_ARMS', 'HEAVY_AMMUNITION', 'UTILITY', 'MEDICAL', 'RESSOURCE', 'UNIFORM', 'VEHICLE', 'SHIPPABLE');

-- CreateEnum
CREATE TYPE "stock"."SuperClass" AS ENUM ('MATERIAL', 'MAGAZINE');

-- CreateEnum
CREATE TYPE "stock"."Class" AS ENUM ('REFINED_MATERIAL', 'RIFLE_AMMO');

-- CreateEnum
CREATE TYPE "stock"."Faction" AS ENUM ('WARDEN', 'COLONIAL', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "stock"."LocationType" AS ENUM ('STORAGE_DEPOT', 'SEAPORT');

-- CreateEnum
CREATE TYPE "stock"."TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSFER', 'PRODUCTION', 'LOSS');

-- CreateTable
CREATE TABLE "auth"."account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMPTZ(3),
    "refreshTokenExpiresAt" TIMESTAMPTZ(3),
    "scope" TEXT,
    "idToken" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "roles" TEXT[],
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "disabledAt" TIMESTAMPTZ(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock"."Inventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accessCode" TEXT,
    "locationId" TEXT NOT NULL,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock"."Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "category" "stock"."Category" NOT NULL,
    "superClass" "stock"."SuperClass" NOT NULL,
    "class" "stock"."Class" NOT NULL,
    "faction" "stock"."Faction" NOT NULL DEFAULT 'NEUTRAL',
    "nbByCrate" INTEGER NOT NULL,
    "maxQuantity" INTEGER NOT NULL,
    "icon" TEXT,
    "attributes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock"."Location" (
    "id" TEXT NOT NULL,
    "type" "stock"."LocationType" NOT NULL,
    "townId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock"."Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock"."Stock" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "itemId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock"."Town" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,

    CONSTRAINT "Town_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock"."Transaction" (
    "id" TEXT NOT NULL,
    "type" "stock"."TransactionType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "note" TEXT,
    "itemId" TEXT NOT NULL,
    "fromInventoryId" TEXT,
    "toInventoryId" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "auth"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "auth"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "stock"."Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_townId_type_key" ON "stock"."Location"("townId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "stock"."Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_itemId_inventoryId_key" ON "stock"."Stock"("itemId", "inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Town_name_key" ON "stock"."Town"("name");

-- AddForeignKey
ALTER TABLE "auth"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Inventory" ADD CONSTRAINT "Inventory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "stock"."Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Inventory" ADD CONSTRAINT "Inventory_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Location" ADD CONSTRAINT "Location_townId_fkey" FOREIGN KEY ("townId") REFERENCES "stock"."Town"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Stock" ADD CONSTRAINT "Stock_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "stock"."Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Stock" ADD CONSTRAINT "Stock_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "stock"."Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Town" ADD CONSTRAINT "Town_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "stock"."Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Transaction" ADD CONSTRAINT "Transaction_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "stock"."Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Transaction" ADD CONSTRAINT "Transaction_fromInventoryId_fkey" FOREIGN KEY ("fromInventoryId") REFERENCES "stock"."Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Transaction" ADD CONSTRAINT "Transaction_toInventoryId_fkey" FOREIGN KEY ("toInventoryId") REFERENCES "stock"."Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock"."Transaction" ADD CONSTRAINT "Transaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "auth"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
