export const dynamic = 'force-dynamic'
import { db } from "../../lib/db";
import {NextResponse} from "next/server"

export async function GET () {
    try {
        const categories = await db.category.findMany()

        return NextResponse.json({
            message : "All categories",
            categories
        },{status : 200})

    } catch (error) {
        return NextResponse.json({
            message : "could'nt fetch categories",
            error : error.message
        },{status : 500})
    }
}
