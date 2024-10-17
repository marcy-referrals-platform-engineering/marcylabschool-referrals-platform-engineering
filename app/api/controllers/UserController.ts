import User from '../models/User'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
export class UserController {

    
    static async requestAuthorization(req: any) {
        try {
          const { email, name, img } = req.body;
    
          await User.requestEmailAuthorization(email, name, img);
    
          return NextResponse.json({ message: 'Authorization request sent successfully' }, { status: 200 });
        } catch (error) {
          console.error('Error sending authorization request:', error);
          return NextResponse.json({ message: 'Failed to send authorization request' }, { status: 500 });
        }
      }
    }
