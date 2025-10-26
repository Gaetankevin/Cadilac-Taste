import Image from "next/image";
import { getMenuItemById } from "@/lib/dataProvider";
import { MenuItem } from "@/generated/prisma";

export default async function MenuItemPage({ params }: { params: { menuid: string } }) {
  const { menuid } = params;
  const menuItem = await getMenuItemById(Number(menuid));

  if (!menuItem) {
    return <div className="p-10 text-center">patientez...</div>;
  }

  return (
    <div className="pt-20 px-5 md:px-10 max-w-4xl mx-auto">
      <Image
        src={(menuItem as MenuItem).imageUrl || "/images/placeholder.png"}
        alt={(menuItem as MenuItem).name}
        width={800}
        height={400}
        className="w-full h-80 object-cover rounded-lg shadow-md"
      />
      <h1 className="mt-5 text-3xl font-bold text-gray-800 dark:text-gray-100">
        {(menuItem as MenuItem).name}
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">{(menuItem as MenuItem).description}</p>
  <p className="mt-3 font-bold text-amber-600 text-xl">{String((menuItem as MenuItem).price)} FCFA</p>
      <button className="mt-5 bg-amber-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-700 transition">
        Ajouter
      </button>
    </div>
  );
}
