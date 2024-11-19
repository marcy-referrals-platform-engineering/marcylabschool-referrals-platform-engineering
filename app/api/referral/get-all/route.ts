import ReferralController from "../../controllers/ReferralController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get('email');
        const fetchForAll = req.nextUrl.searchParams.get('fetchForAll') !== 'false';
        const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
        const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') || '5', 10);

        if (!email) {
            return new Response('Email is required', { status: 400 });
        }

        const response = await ReferralController.fetchAll(email, page, pageSize, fetchForAll);
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
