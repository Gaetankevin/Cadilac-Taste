import { getFakeData } from "@/data";

export default async function Home() {
  const { users, categories } = await getFakeData();

  return (
    <div className="">

    </div>
  );
}
