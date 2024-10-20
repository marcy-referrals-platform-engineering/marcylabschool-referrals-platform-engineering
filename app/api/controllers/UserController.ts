import User from '../models/User'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
export class UserController {

    
    static async requestAuthorization(data: any) {

        try {
    
          // Log incoming request data to ensure it is correct
          console.log('Request data:', data);
    
          const request = await User.requestEmailAuthorization(data);
          return NextResponse.json({ message: 'Authorization request sent successfully' }, { status: 200 });
        } catch (error : any) {
          // Log the error message in more detail
          console.error('Error sending authorization request:', error);
          return NextResponse.json({ message: 'Failed to send authorization request', details: error.message }, { status: 500 });
        }
      }
    }
