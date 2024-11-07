import AuthRequest from "../models/AuthRequest";
import { NextResponse } from "next/server";


export default class AuthRequestController {

    static async getAll() {
        try {
            const requests = await AuthRequest.getAll();
            return NextResponse.json(requests, { status: 200 });
        } catch (error: any) {
            console.error('Error fetching Auth Requests:', error);
            return NextResponse.json({ message: 'Failed to fetch auth requests', details: error.message }, { status: 500 });
        }
    }
    static async handleRequest(requestId: number, shouldAccept: boolean) {
        try {
            await AuthRequest.handleRequest(requestId, shouldAccept);
            return NextResponse.json({ message: 'Auth Request handled successfully' }, { status: 200 });
        } catch (error: any) {
            console.error('Error handling Auth Request:', error);
            return NextResponse.json({ message: 'Failed to handle auth request', details: error.message }, { status: 500 });
        }
    }
}