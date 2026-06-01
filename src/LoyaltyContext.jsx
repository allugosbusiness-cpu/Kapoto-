import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-hot-toast";

const LoyaltyContext = createContext(null);

function loyaltyReducer(state, action) {
  switch (action.type) {
    case "ADD_POINTS": {
      const newPoints = state.points + action.points;
      const newTotal = state.totalEarned + action.points;
      // Check for level up
      let newLevel = state.level;
      if (newTotal >= 100 && state.level === "Bronze") newLevel = "Silver";
      else if (newTotal >= 250 && state.level === "Silver") newLevel = "Gold";
      else if (newTotal >= 500 && state.level === "Gold") newLevel = "Platinum";

      const ordersCount = state.totalOrders + 1;

      return {
        ...state,
        points: newPoints,
        totalEarned: newTotal,
        level: newLevel,
        totalOrders: ordersCount,
        lastOrderDate: new Date().toISOString(),
      };
    }
    case "REDEEM_POINTS": {
      if (state.points < action.points) return state;
      return { ...state, points: state.points - action.points };
    }
    case "SET_CUSTOMER": {
      return { ...state, name: action.name, phone: action.phone };
    }
    case "LOAD_STATE": {
      return action.payload;
    }
    default:
      return state;
  }
}

const initialState = {
  points: 0,
  totalEarned: 0,
  level: "Bronze",
  totalOrders: 0,
  name: "",
  phone: "",
  lastOrderDate: null,
};

const levelBenefits = {
  Bronze: { color: "from-amber-700 to-amber-500", discount: 0, icon: "🥉" },
  Silver: { color: "from-gray-400 to-gray-300", discount: 5, icon: "🥈" },
  Gold: { color: "from-yellow-500 to-yellow-400", discount: 10, icon: "🥇" },
  Platinum: { color: "from-purple-500 to-purple-400", discount: 15, icon: "💎" },
};

export function LoyaltyProvider({ children }) {
  const [state, dispatch] = useReducer(loyaltyReducer, initialState, () => {
    try {
      const stored = localStorage.getItem("kapoto_loyalty");
      return stored ? JSON.parse(stored) : initialState;
    } catch {
      return initialState;
    }
  });

  // Persist
  useEffect(() => {
    localStorage.setItem("kapoto_loyalty", JSON.stringify(state));
  }, [state]);

  const addPoints = (points = 5) => {
    dispatch({ type: "ADD_POINTS", points });
    const newLevel = getLevel(state.totalEarned + points);
    if (newLevel !== state.level) {
      toast.success(`🎉 Level Up! You're now ${newLevel}!`, { duration: 4000 });
    } else {
      toast.success(`⭐ +${points} loyalty points earned!`, { duration: 3000 });
    }
  };

  const getLevel = (total) => {
    if (total >= 500) return "Platinum";
    if (total >= 250) return "Gold";
    if (total >= 100) return "Silver";
    return "Bronze";
  };

  const getPointsProgress = () => {
    const thresholds = { Bronze: 100, Silver: 250, Gold: 500, Platinum: 500 };
    const currentThreshold = thresholds[state.level] || 100;
    const nextThreshold = state.level === "Bronze" ? 100 : state.level === "Silver" ? 250 : state.level === "Gold" ? 500 : 500;
    return Math.min((state.totalEarned / nextThreshold) * 100, 100);
  };

  const value = {
    ...state,
    addPoints,
    dispatch,
    levelInfo: levelBenefits[state.level] || levelBenefits.Bronze,
    getPointsProgress,
    nextLevelAt: state.level === "Bronze" ? 100 : state.level === "Silver" ? 250 : state.level === "Gold" ? 500 : null,
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