'use server'
import { ClientNavigation } from "@/types/site";

export async function getSite() {
    const clientNavigations: ClientNavigation[] = [
        {
            name:'Home',
            href:'home',
            icon:'uygyugy',
        },
        {
            name:'Category',
            href:'category',
            icon:'uygyugy',
        },
        {
            name:'All Menus',
            href:'allmenus',
            icon:'uygyugy',
        }
    ]

    return{
        clientNavigations
    }
}