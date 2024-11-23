
'use client';
import { useState, useEffect } from 'react';
import ReferralService from '../services/ReferralService';
import VerticalRewards from './components/vertical'
import HorizontalRewards from './components/horizontal'
import { useStore } from '../state/useStore';
import { useDraggable } from './hooks';
const RewardsContainer = () => {
  const { user } = useStore();
  const [points, setPoints] = useState<number>(0);
  
  useEffect(() => {
    if (!user || user.role === "ADMIN") return; // Skip fetching if user is an admin or is not logged in
    ReferralService.getReferralStats(user!.email).then((data) => {
      setPoints(data.totalPoints);
    });
  }, [user]);

    return (
        <div>
          <div className='lg:hidden'>
          <VerticalRewards points={points} user={user} />
          </div>
            
            <div className='hidden lg:block'>
            <HorizontalRewards points={points} user={user} />
            </div>
        </div>
    );
}

export default RewardsContainer;