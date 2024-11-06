import ReferralController from "../../controllers/ReferralController";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {
    try {
        const { referralId } = await req.json();
        const response = await ReferralController.updateReviewStatus(referralId);
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}


export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}