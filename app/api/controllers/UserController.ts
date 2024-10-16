import User from '../models/User'
import { NextApiRequest, NextApiResponse } from 'next';

class UserController {

    
    static async requestAuthorization(req: NextApiRequest, res: NextApiResponse) {
        try {
          const { email, name, img } = req.body;
          await User.requestEmailAuthorization(email, name, img);
          return res.status(200).json({ message: 'Authorization request sent successfully' });
        } catch (error) {
          console.error('Error sending authorization request:', error);
          return res.status(500).json({ message: 'Failed to send authorization request' });
        }
      }


}
