import Referral from "../models/Referral";
import { NextResponse } from 'next/server';

export default class ReferralController {
    static async create(data: any) {
        try {
            await Referral!.create(data);
            return NextResponse.json({ message: 'Referral created successfully' }, { status: 200 });

        } catch (error: any) {
            console.error('Error creating Referrals:', error);
            return NextResponse.json({ message: 'Failed to create referral', details: error.message }, { status: 500 });
        }
    }

    static async fetchAll(email: string, page: number = 1, pageSize: number = 5) {
        try {
            const referrals = await Referral.fetchAll(email, page, pageSize);
            return NextResponse.json(referrals, { status: 200 });
        } catch (error: any) {
            console.error('Error fetching Referrals:', error);
            return NextResponse.json({ message: 'Failed to fetch referrals', details: error.message }, { status: 500 });
        }
    }

    static async search(email: string, query: string, page: number, pageSize: number) {
        try {
            const results = await Referral.searchReferrals(email, query, page, pageSize);
            return NextResponse.json(results, { status: 200 });
        } catch (error: any) {
            console.error('Error searching referrals:', error);
            return NextResponse.json({ message: 'Failed to search referrals', details: error.message }, { status: 500 });
        }
    }

    static async updateMileStoneStatus(data: { referralId: number, milestone: string }) {
        try {
            const { referralId, milestone } = data
            const updatedReferral = await Referral.updateMilestoneStatus(referralId, milestone)
            return NextResponse.json(updatedReferral, { status: 200 })
        } catch (error: any) {
            console.error('Error Occured:', error)
            return NextResponse.json({ message: 'Failed to update milestone status', details: error.message }, { status: 500 })
        }
    }

    static async updateReviewStatus(referralId: number) {
        try {
            const updatedReferral = await Referral.updateReviewStatus(referralId)
            return NextResponse.json(updatedReferral, { status: 200 })
        } catch (error: any) {
            console.error('Error Occured:', error)
            return NextResponse.json({ message: 'Failed to update review status', details: error.message }, { status: 500 })
        }
    }
}