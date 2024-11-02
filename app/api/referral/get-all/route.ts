import ReferralController from "../../controllers/ReferralController";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {

        const email = req.nextUrl.searchParams.get('email');

        if (!email) {
            return new Response('Email is required', { status: 400 });
        }
        const response = await ReferralController.fetchAll(email as string);
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}