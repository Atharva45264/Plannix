"use client";

import { useStoreUser } from "@/hooks/use-store-user";

export default function UserSync() {
  useStoreUser();
  return null;
}