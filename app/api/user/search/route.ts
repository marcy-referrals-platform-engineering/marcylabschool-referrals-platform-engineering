import { UserController } from "../../controllers/UserController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) { 
    try {
        const query = req.nextUrl.searchParams.get('query') || '';
        const response = await UserController.search(query);
        return response;


    } catch (error) {
        console.error('Error processing request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
