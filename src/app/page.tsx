import { getFakeData } from "@/data";

export default async function Home() {
  const { categories } = await getFakeData();

  return (
    <div className=""> {/* padding top pour ne pas être caché par le header */}
      <div className="categoryfilter bg-red-50 h-12 w-full px-5 md:px-10 flex gap-3 items-center overflow-x-auto scrollbar-hide">
        {categories.map((categorie, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-4 py-1 rounded-full bg-white shadow-sm text-black cursor-pointer hover:bg-amber-100 transition"
          >
            {categorie.name}
          </div>
        ))}
      </div>
    </div>
  );
}
