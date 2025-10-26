// src/app/page.tsx (Server Component)
import Menu from "@/components/menu"; // Client Component
import { getMenu } from "@/lib/dataProvider";

export default async function Home() {
  const data = await getMenu();
  return <Menu data={data} />;
}
