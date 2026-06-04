import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-hot-toast";

const LoyaltyContext = createContext(null);

function loyaltyReducer(state, action) {
  switch (action.type) {
    case "ADD_ORDER": {
      const orderCount = state.totalOrders + 1;
      const orderTotal = action.orderTotal;

      // Only award points for orders over $10
      const pointsAwarded = orderTotal > 10 ? 5 : 0;

      return {
        ...state,
        points: state.points + pointsAwarded,
        totalEarned: state.totalEarned + pointsAwarded,
        totalOrders: orderCount,
        lastOrderDate: new Date().toISOString(),
        lastOrderAmount: orderTotal,
      };
    }
    case "REDEEM_POINTS": {
      if (state.points < action.points) return state;
      return { ...state, points: state.points - action.points };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const initialState = {
  points: 0,
  totalEarned: 0,
  totalOrders: 0,
  lastOrderDate: null,
  lastOrderAmount: 0,
};

const rewards = [
  { orders: 10, points: 0, reward: "$2 Off", description: "Free delivery on your next order", icon: "🚚" },
  { orders: 20, points: 0, reward: "$5 Off", description: "Discount on any meal", icon: "🍽️" },
  { orders: 35, points: 0, reward: "Free Drink", description: "Complimentary beverage", icon: "🥤" },
  { orders: 50, points: 0, reward: "Free Meal", description: "Any main course free", icon: "🎉" },
];

export function LoyaltyProvider({ children }) {
  const [state, dispatch] = useReducer(loyaltyReducer, initialState, () => {
    try {
      const stored = localStorage.getItem("kapoto_loyalty_v2");
      // Migration from old format if needed
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure new fields exist
        return { ...initialState, ...parsed };
      }
      return initialState;
    } catch {
      return initialState;
    }
  });

  // Persist
  useEffect(() => {
    localStorage.setItem("kapoto_loyalty_v2", JSON.stringify(state));
  }, [state]);

  const addPoints = (orderTotal = 0) => {
    if (orderTotal <= 10) {
      toast.info("Orders under $10 don't earn loyalty points", { duration: 3000 });
      dispatch({ type: "ADD_ORDER", orderTotal });
      return 0;
    }
    
    dispatch({ type: "ADD_ORDER", orderTotal });
    const pointsEarned = 5;
    const ordersAfter = state.totalOrders + 1;
    
    // Check for reward milestones
    const nextReward = rewards.find(r => r.orders === ordersAfter);
    if (nextReward) {
      toast.success(`🎉 Milestone reached: ${nextReward.reward}! ${nextReward.description}`, { duration: 5000 });
    } else {
      toast.success(`⭐ +${pointsEarned} loyalty points earned! (${ordersAfter} orders)`, { duration: 3000 });
    }
    
    return pointsEarned;
  };

  const getAvailableRewards = () => {
    return rewards.filter(r => state.totalOrders >= r.orders && !r.claimed);
  };

  const getNextReward = () => {
    return rewards.find(r => state.totalOrders < r.orders);
  };

  const value = {
    ...state,
    addPoints,
    rewards,
    getAvailableRewards,
    getNextReward,
    dispatch,
  };

  return (
    <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>
  );
}

export const useLoyalty = () => {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) throw new Error("useLoyalty must be used within a LoyaltyProvider");
  return ctx;
};