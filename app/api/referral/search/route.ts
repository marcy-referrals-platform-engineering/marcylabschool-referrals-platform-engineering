import { NextRequest } from 'next/server';
import ReferralController from '../../controllers/ReferralController';

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email');
    const query = req.nextUrl.searchParams.get('query') || '';
    const fetchForAll = req.nextUrl.searchParams.get('fetchForAll') !== 'false' ;
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') || '5', 10);

    if (!email) {
        return new Response('Email is required', { status: 400 });
    }

    return ReferralController.search(email, query, page, pageSize, fetchForAll);
}