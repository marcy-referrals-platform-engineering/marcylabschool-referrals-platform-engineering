import next from "next";
import Referral from "../models/Referral";
import { NextResponse } from 'next/server';

export default class ReferralController {
    static async create(data: any) {
        try {
            await Referral.create(data);
            return NextResponse.json({ message: 'Referral created successfully' }, { status: 200 });

        } catch (error: any) {
            console.error('Error creating Referrals:', error);
            return NextResponse.json({ message: 'Failed to create referral', details: error.message }, { status: 500 });
        }
    }
}