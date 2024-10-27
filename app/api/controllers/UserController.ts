import User from '../models/User'
import { NextResponse } from 'next/server';

export class UserController {
  static async requestAuthorization(data: any) {
    try {
      await User.requestEmailAuthorization(data);
      return NextResponse.json({ message: 'Authorization request sent successfully' }, { status: 200 });
    } catch (error: any) {
      console.error('Error sending authorization request:', error);
      return NextResponse.json({ message: 'Failed to send authorization request', details: error.message }, { status: 500 });
    }
  }
}
