import AuthRequestController from "@/app/api/controllers/AuthRequestController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { requestId, shouldAccept } = await req.json();
        const response = await AuthRequestController.handleRequest(requestId, shouldAccept);
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}