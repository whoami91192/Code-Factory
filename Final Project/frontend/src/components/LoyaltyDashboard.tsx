import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Badge,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Tooltip
} from '@mui/material';
import {
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  CardGiftcard as GiftIcon,
  LocalOffer as OfferIcon,
  TrendingUp as TrendingIcon,
  History as HistoryIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Lock as LockIcon,
  Euro as EuroIcon,
  Timer as TimerIcon,
  Restaurant as RestaurantIcon,
  LocalPizza as PizzaIcon,
  LunchDining as BurgerIcon,
  RestaurantMenu as SaladIcon,
  LocalCafe as DrinkIcon,
  RestaurantMenu as DessertIcon,
  Diamond as DiamondIcon,
  WorkspacePremium as PremiumIcon,
  Celebration as CelebrationIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useLoyalty } from '../context/LoyaltyContext';
import { useNavigate } from 'react-router-dom';

interface LoyaltyTier {
  name: string;
  minPoints: number;
  maxPoints?: number;
  color: string;
  icon: React.ReactNode;
  benefits: string[];
  discount: number;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: string;
  isAvailable: boolean;
  expiresAt?: Date;
  icon: React.ReactNode;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  pointsReward: number;
}

interface LoyaltyDashboardProps {
  userPoints: number;
  userTier: string;
  orderHistory: any[];
  onRedeemReward: (reward: Reward) => void;
}

const LoyaltyDashboard: React.FC<LoyaltyDashboardProps> = ({
  userPoints,
  userTier,
  orderHistory,
  onRedeemReward
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { loyaltyData } = useLoyalty();
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [showRewardDialog, setShowRewardDialog] = useState(false);

  // Use rewards from context
  const rewards = loyaltyData.rewards;

  const loyaltyTiers: LoyaltyTier[] = [
    {
      name: 'Bronze',
      minPoints: 0,
      maxPoints: 999,
      color: '#CD7F32',
      icon: <RestaurantIcon />,
      benefits: ['5% discount on orders', 'Free delivery on orders over €30'],
      discount: 5
    },
    {
      name: 'Silver',
      minPoints: 1000,
      maxPoints: 2499,
      color: '#C0C0C0',
      icon: <StarIcon />,
      benefits: ['10% discount on orders', 'Free delivery on orders over €25', 'Priority customer support'],
      discount: 10
    },
    {
      name: 'Gold',
      minPoints: 2500,
      maxPoints: 4999,
      color: '#FFD700',
      icon: <TrophyIcon />,
      benefits: ['15% discount on orders', 'Free delivery on all orders', 'Priority customer support', 'Exclusive offers'],
      discount: 15
    },
    {
      name: 'Platinum',
      minPoints: 5000,
      maxPoints: 9999,
      color: '#E5E4E2',
      icon: <DiamondIcon />,
      benefits: ['20% discount on orders', 'Free delivery on all orders', 'Priority customer support', 'Exclusive offers', 'Birthday bonus'],
      discount: 20
    },
    {
      name: 'Diamond',
      minPoints: 10000,
      color: '#B9F2FF',
      icon: <PremiumIcon />,
      benefits: ['25% discount on orders', 'Free delivery on all orders', 'Priority customer support', 'Exclusive offers', 'Birthday bonus', 'VIP events'],
      discount: 25
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Order',
      description: 'Place your first order',
      icon: <RestaurantIcon />,
      isUnlocked: orderHistory.length > 0,
      progress: Math.min(orderHistory.length, 1),
      maxProgress: 1,
      pointsReward: 50
    },
    {
      id: '2',
      name: 'Regular Customer',
      description: 'Place 10 orders',
      icon: <StarIcon />,
      isUnlocked: orderHistory.length >= 10,
      progress: Math.min(orderHistory.length, 10),
      maxProgress: 10,
      pointsReward: 200
    },
    {
      id: '3',
      name: 'Pizza Lover',
      description: 'Order 5 pizzas',
      icon: <PizzaIcon />,
      isUnlocked: orderHistory.filter(o => o.items.some((i: any) => i.category === 'Pizza')).length >= 5,
      progress: Math.min(orderHistory.filter(o => o.items.some((i: any) => i.category === 'Pizza')).length, 5),
      maxProgress: 5,
      pointsReward: 150
    },
    {
      id: '4',
      name: 'Big Spender',
      description: 'Spend €100 in total',
      icon: <EuroIcon />,
      isUnlocked: orderHistory.reduce((sum, o) => sum + o.total, 0) >= 100,
      progress: Math.min(orderHistory.reduce((sum, o) => sum + o.total, 0), 100),
      maxProgress: 100,
      pointsReward: 300
    },
    {
      id: '5',
      name: 'Loyal Customer',
      description: 'Order for 30 consecutive days',
      icon: <TrophyIcon />,
      isUnlocked: false,
      progress: 5,
      maxProgress: 30,
      pointsReward: 500
    }
  ];

  const currentTier = loyaltyTiers.find(tier => tier.name === userTier) || loyaltyTiers[0];
  const nextTier = loyaltyTiers.find(tier => tier.minPoints > userPoints);
  const progressToNextTier = nextTier 
    ? ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const totalAchievementPoints = unlockedAchievements.reduce((sum, a) => sum + a.pointsReward, 0);

  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.pointsCost) {
      setSelectedReward(reward);
      setShowRewardDialog(true);
    }
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      onRedeemReward(selectedReward);
      setShowRewardDialog(false);
      setSelectedReward(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'pizza': return <PizzaIcon />;
      case 'burger': return <BurgerIcon />;
      case 'salad': return <SaladIcon />;
      case 'drink': return <DrinkIcon />;
      case 'dessert': return <DessertIcon />;
      default: return <RestaurantIcon />;
    }
  };

  const rewardMeta: Record<string, { name: string; description: string; icon: React.ReactNode; category: string }> = {
    discount_5: {
      name: '5% Discount',
      description: 'Get 5% off your next order',
      icon: <StarIcon />,
      category: 'discount',
    },
    discount_10: {
      name: '10% Discount',
      description: 'Get 10% off your next order',
      icon: <TrophyIcon />,
      category: 'discount',
    },
    free_delivery: {
      name: 'Free Delivery',
      description: 'Free delivery on your next order',
      icon: <RestaurantIcon />,
      category: 'delivery',
    },
    free_dessert: {
      name: 'Free Dessert',
      description: 'Get a free dessert with your order',
      icon: <DessertIcon />,
      category: 'food',
    },
  };

  return (
    <Box>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, background: `linear-gradient(135deg, ${currentTier.color}20, ${currentTier.color}40)` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: currentTier.color, mr: 2 }}>
              {currentTier.icon}
            </Avatar>
            <Box>
              <Typography variant="h5" gutterBottom>
                {currentTier.name} Member
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userPoints} points earned
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {userPoints}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Points
            </Typography>
          </Box>
        </Box>

        {nextTier && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                Progress to {nextTier.name}
              </Typography>
              <Typography variant="body2" color="primary">
                {Math.round(progressToNextTier)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progressToNextTier}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary">
              {nextTier.minPoints - userPoints} more points needed
            </Typography>
          </Box>
        )}
      </Paper>

      <Grid container spacing={3}>
        {/* Current Tier Benefits */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <GiftIcon sx={{ mr: 1, color: currentTier.color }} />
                Your Benefits
              </Typography>
              <List dense>
                {currentTier.benefits.map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'success.main', width: 24, height: 24 }}>
                        <CheckIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  You get a <strong>{currentTier.discount}% discount</strong> on all orders!
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TrophyIcon sx={{ mr: 1, color: 'warning.main' }} />
                Achievements ({unlockedAchievements.length}/{achievements.length})
              </Typography>
              <List dense>
                {achievements.slice(0, 3).map((achievement) => (
                  <ListItem key={achievement.id}>
                    <ListItemAvatar>
                      <Badge
                        badgeContent={achievement.isUnlocked ? <CheckIcon sx={{ fontSize: 12 }} /> : 0}
                        color="success"
                      >
                        <Avatar sx={{ bgcolor: achievement.isUnlocked ? 'success.main' : 'grey.300' }}>
                          {achievement.icon}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={achievement.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {achievement.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <LinearProgress
                              variant="determinate"
                              value={(achievement.progress / achievement.maxProgress) * 100}
                              sx={{ flexGrow: 1, mr: 1, height: 4 }}
                            />
                            <Typography variant="caption">
                              {achievement.progress}/{achievement.maxProgress}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={`+${achievement.pointsReward}`}
                        size="small"
                        color={achievement.isUnlocked ? 'success' : 'default'}
                        variant={achievement.isUnlocked ? 'filled' : 'outlined'}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={<TrophyIcon />}
              >
                View All Achievements
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Available Rewards */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <OfferIcon sx={{ mr: 1, color: 'primary.main' }} />
                Available Rewards
              </Typography>
              <Grid container spacing={2}>
                {rewards.map((reward) => {
                  const hasEnoughPoints = userPoints >= reward.pointsCost;
                  const isUsed = reward.used;
                  const meta = rewardMeta[reward.id] || { name: reward.name, description: reward.description, icon: <GiftIcon />, category: 'other' };
                  return (
                    <Grid item xs={12} sm={6} md={4} key={reward.id}>
                      <Card 
                        variant="outlined"
                        sx={{ 
                          cursor: !isUsed && hasEnoughPoints ? 'pointer' : 'default',
                          opacity: isUsed ? 0.5 : hasEnoughPoints ? 1 : 0.6,
                          filter: isUsed ? 'grayscale(1)' : 'none',
                          '&:hover': !isUsed && hasEnoughPoints ? {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[4]
                          } : {}
                        }}
                        onClick={() => !isUsed && hasEnoughPoints && handleRedeemReward({ ...reward, ...meta, isAvailable: reward.available })}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                              {meta.icon}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {meta.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {meta.description}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Chip
                              label={`${reward.pointsCost} points`}
                              color={hasEnoughPoints && !isUsed ? 'primary' : 'default'}
                              variant={hasEnoughPoints && !isUsed ? 'filled' : 'outlined'}
                            />
                            {isUsed && (
                              <Chip label="Used" size="small" color="success" />
                            )}
                            {!reward.available && (
                              <Chip label="Coming Soon" size="small" color="warning" icon={<LockIcon />} />
                            )}
                          </Box>
                          {!isUsed && !hasEnoughPoints && reward.available && (
                            <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
                              Need {reward.pointsCost - userPoints} more points
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <HistoryIcon sx={{ mr: 1 }} />
                Recent Activity
              </Typography>
              <List dense>
                {orderHistory.slice(0, 5).map((order, index) => (
                  <ListItem key={index} button onClick={() => navigate(`/orders/${order.id}`)} sx={{ cursor: 'pointer' }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {getCategoryIcon(order.items[0]?.category || 'food')}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Order #${order.id}`}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {order.items.map((item: any) => item.name).join(', ')}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order.createdAt || order.orderDate ? new Date(order.createdAt || order.orderDate).toLocaleDateString('el-GR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''} • +{order.totalAmount ? Math.floor(order.totalAmount * 10) : order.total ? Math.floor(order.total * 10) : 0} πόντοι
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        €{order.totalAmount ? order.totalAmount.toFixed(2) : order.total ? order.total.toFixed(2) : '0.00'}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Reward Redemption Dialog */}
      <Dialog open={showRewardDialog} onClose={() => setShowRewardDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Redeem Reward
            </Typography>
            <IconButton onClick={() => setShowRewardDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedReward && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {selectedReward.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedReward.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedReward.description}
                  </Typography>
                </Box>
              </Box>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  This will cost <strong>{selectedReward.pointsCost} points</strong>. 
                  You currently have <strong>{userPoints} points</strong>.
                </Typography>
              </Alert>

              <Typography variant="body2" color="text.secondary">
                After redemption, you'll have {userPoints - selectedReward.pointsCost} points remaining.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRewardDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={confirmRedeem}
            disabled={!selectedReward || userPoints < selectedReward.pointsCost}
          >
            Redeem for {selectedReward?.pointsCost} Points
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoyaltyDashboard; 