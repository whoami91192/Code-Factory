import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  discount: number;
  type: 'percentage' | 'fixed';
  available: boolean;
  used: boolean;
}

interface LoyaltyData {
  totalPoints: number;
  level: number;
  pointsToNextLevel: number;
  achievements: Achievement[];
  rewards: Reward[];
  totalSpent: number;
  ordersCount: number;
  streakDays: number;
  lastOrderDate?: Date;
}

interface LoyaltyContextType {
  loyaltyData: LoyaltyData;
  addPoints: (points: number, reason: string) => void;
  claimReward: (rewardId: string) => boolean;
  checkAchievements: () => void;
  getAvailableRewards: () => Reward[];
  getUnlockedAchievements: () => Achievement[];
  refreshData: () => void;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

const ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  {
    id: 'first_order',
    name: 'First Order',
    description: 'Place your first order',
    icon: '🎉',
    points: 50,
    maxProgress: 1
  },
  {
    id: 'order_streak_3',
    name: 'Order Streak',
    description: 'Order 3 days in a row',
    icon: '🔥',
    points: 100,
    maxProgress: 3
  },
  {
    id: 'order_streak_7',
    name: 'Weekly Warrior',
    description: 'Order 7 days in a row',
    icon: '⚡',
    points: 250,
    maxProgress: 7
  },
  {
    id: 'total_orders_10',
    name: 'Regular Customer',
    description: 'Place 10 orders',
    icon: '👑',
    points: 200,
    maxProgress: 10
  },
  {
    id: 'total_orders_50',
    name: 'Loyal Customer',
    description: 'Place 50 orders',
    icon: '💎',
    points: 500,
    maxProgress: 50
  },
  {
    id: 'total_spent_100',
    name: 'Big Spender',
    description: 'Spend €100 total',
    icon: '💰',
    points: 150,
    maxProgress: 100
  },
  {
    id: 'total_spent_500',
    name: 'VIP Customer',
    description: 'Spend €500 total',
    icon: '🏆',
    points: 750,
    maxProgress: 500
  },
  {
    id: 'favorites_5',
    name: 'Food Explorer',
    description: 'Add 5 items to favorites',
    icon: '❤️',
    points: 75,
    maxProgress: 5
  },
  {
    id: 'reviews_3',
    name: 'Reviewer',
    description: 'Write 3 reviews',
    icon: '✍️',
    points: 100,
    maxProgress: 3
  }
];

const REWARDS: Omit<Reward, 'used'>[] = [
  {
    id: 'discount_5',
    name: '5% Discount',
    description: 'Get 5% off your next order',
    pointsCost: 100,
    discount: 5,
    type: 'percentage',
    available: true
  },
  {
    id: 'discount_10',
    name: '10% Discount',
    description: 'Get 10% off your next order',
    pointsCost: 200,
    discount: 10,
    type: 'percentage',
    available: true
  },
  {
    id: 'free_delivery',
    name: 'Free Delivery',
    description: 'Free delivery on your next order',
    pointsCost: 150,
    discount: 3,
    type: 'fixed',
    available: true
  },
  {
    id: 'free_dessert',
    name: 'Free Dessert',
    description: 'Get a free dessert with your order',
    pointsCost: 300,
    discount: 8,
    type: 'fixed',
    available: true
  }
];

export const LoyaltyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData>({
    totalPoints: 0,
    level: 1,
    pointsToNextLevel: 100,
    achievements: ACHIEVEMENTS.map(achievement => ({
      ...achievement,
      unlocked: false,
      progress: 0
    })),
    rewards: REWARDS.map(reward => ({
      ...reward,
      used: false
    })),
    totalSpent: 0,
    ordersCount: 0,
    streakDays: 0
  });

  // Load loyalty data from localStorage
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`loyalty_${user.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLoyaltyData(prev => ({
            ...prev,
            ...parsed,
            achievements: prev.achievements.map(achievement => {
              const savedAchievement = parsed.achievements?.find((a: any) => a.id === achievement.id);
              return savedAchievement ? { ...achievement, ...savedAchievement } : achievement;
            }),
            rewards: prev.rewards.map(reward => {
              const savedReward = parsed.rewards?.find((r: any) => r.id === reward.id);
              return savedReward ? { ...reward, ...savedReward } : reward;
            })
          }));
        } catch (error) {
          console.error('Error loading loyalty data:', error);
        }
      }
    }
  }, [user]);

  // Save loyalty data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`loyalty_${user.id}`, JSON.stringify(loyaltyData));
    }
  }, [loyaltyData, user]);

  const calculateLevel = (points: number): { level: number; pointsToNextLevel: number } => {
    const level = Math.floor(points / 100) + 1;
    const pointsToNextLevel = (level * 100) - points;
    return { level, pointsToNextLevel };
  };

  const addPoints = (points: number, reason: string) => {
    setLoyaltyData(prev => {
      const newTotalPoints = prev.totalPoints + points;
      const { level, pointsToNextLevel } = calculateLevel(newTotalPoints);
      
      return {
        ...prev,
        totalPoints: newTotalPoints,
        level,
        pointsToNextLevel
      };
    });

    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Points Earned!', {
        body: `You earned ${points} points for ${reason}`,
        icon: '/images/logo.png'
      });
    }
  };

  const claimReward = (rewardId: string): boolean => {
    const reward = loyaltyData.rewards.find(r => r.id === rewardId);
    if (!reward || reward.used || loyaltyData.totalPoints < reward.pointsCost) {
      return false;
    }

    setLoyaltyData(prev => ({
      ...prev,
      totalPoints: prev.totalPoints - reward.pointsCost,
      rewards: prev.rewards.map(r => 
        r.id === rewardId ? { ...r, used: true } : r
      )
    }));

    return true;
  };

  const checkAchievements = () => {
    setLoyaltyData(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        let progress = 0;
        let unlocked = achievement.unlocked;

        switch (achievement.id) {
          case 'first_order':
            progress = prev.ordersCount;
            break;
          case 'order_streak_3':
            progress = Math.min(prev.streakDays, 3);
            break;
          case 'order_streak_7':
            progress = Math.min(prev.streakDays, 7);
            break;
          case 'total_orders_10':
            progress = Math.min(prev.ordersCount, 10);
            break;
          case 'total_orders_50':
            progress = Math.min(prev.ordersCount, 50);
            break;
          case 'total_spent_100':
            progress = Math.min(prev.totalSpent, 100);
            break;
          case 'total_spent_500':
            progress = Math.min(prev.totalSpent, 500);
            break;
          case 'favorites_5':
            // This would need to be updated from FavoritesContext
            progress = 0;
            break;
          case 'reviews_3':
            // This would need to be updated from reviews data
            progress = 0;
            break;
        }

        if (progress >= achievement.maxProgress && !unlocked) {
          unlocked = true;
          addPoints(achievement.points, `Achievement: ${achievement.name}`);
        }

        return {
          ...achievement,
          progress,
          unlocked,
          unlockedAt: unlocked && !achievement.unlockedAt ? new Date() : achievement.unlockedAt
        };
      });

      return {
        ...prev,
        achievements: updatedAchievements
      };
    });
  };

  const getAvailableRewards = (): Reward[] => {
    return loyaltyData.rewards.filter(reward => 
      !reward.used && loyaltyData.totalPoints >= reward.pointsCost
    );
  };

  const getUnlockedAchievements = (): Achievement[] => {
    return loyaltyData.achievements.filter(achievement => achievement.unlocked);
  };

  const refreshData = () => {
    checkAchievements();
  };

  const value: LoyaltyContextType = {
    loyaltyData,
    addPoints,
    claimReward,
    checkAchievements,
    getAvailableRewards,
    getUnlockedAchievements,
    refreshData
  };

  return (
    <LoyaltyContext.Provider value={value}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = (): LoyaltyContextType => {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
}; 