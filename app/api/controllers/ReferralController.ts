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

    static async fetchAll(email: string) {
        try {
            const referrals = await Referral.fetchAll(email);
            return NextResponse.json(referrals, { status: 200 });

        } catch (error: any) {
            console.error('Error fetching Referrals:', error);
            return NextResponse.json({ message: 'Failed to fetch referrals', details: error.message }, { status: 500 });
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
}