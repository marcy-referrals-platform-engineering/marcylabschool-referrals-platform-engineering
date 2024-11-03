import User from '../models/User'
import { NextResponse } from 'next/server';

export class UserController {

  static async getUserRole(email: string) {
    try {
      const userRole = await User.getUserRole(email);
      return NextResponse.json(userRole, { status: 200 });
    } catch (error: any) {
      console.error('Error fetching user role:', error);
      return NextResponse.json({ message: 'Failed to fetch user role', details: error.message }, { status: 500 });
    }
  }
  static async requestAuthorization(data: any) {
    try {
      await User.requestEmailAuthorization(data);
      return NextResponse.json({ message: 'Authorization request sent successfully' }, { status: 200 });
    } catch (error: any) {
      console.error('Error sending authorization request:', error);
      return NextResponse.json({ message: 'Failed to send authorization request', details: error.message }, { status: 500 });
    }
  }

  static async getReferralStats(email: string) {
    try {
      const stats = await User.getReferralStats(email);
      return NextResponse.json(stats, { status: 200 });
    } catch (error: any) {
      console.error('Error fetching referral stats:', error);
      return NextResponse.json({ message: 'Failed to fetch referral stats', details: error.message }, { status: 500 });
    }
  }
}
