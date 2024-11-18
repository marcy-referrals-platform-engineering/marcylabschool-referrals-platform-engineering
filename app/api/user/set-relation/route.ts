import { UserController } from "../../controllers/UserController";
import { NextResponse } from "next/server";


export async function PATCH(req: any) {
    try {
        const {email, relation} = await req.json();
        const response = await UserController.setRelation(email, relation);
        return response;
        
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}