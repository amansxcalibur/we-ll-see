"use client";

import { usePathname } from "next/navigation";
import NavBar from "./nav";

export default function NavWrapper() {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return <NavBar />;
}
