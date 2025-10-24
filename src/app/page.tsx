// src/app/page.tsx (Server Component)
import { getFakeData } from "@/data";
import Menu from "@/components/menu"; // Client Component

export default async function Home() {
  const data = await getFakeData();
  return <Menu data={data} />;
}
