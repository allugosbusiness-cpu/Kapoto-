import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-hot-toast";

const OrdersContext = createContext(null);

function ordersReducer(state, action) {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        ),
      };
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

const initialState = {
  orders: [],
  selectedBranch: "Avondale", // Default branch
};

const branches = [
  {
    id: "avondale",
    name: "Avondale",
    address: "No.2 Chelmsford Road, Avondale",
    coordinates: { lat: -17.8224, lng: 31.0406 },
  },
  {
    id: "belvedere",
    name: "Belvedere",
    address: "Shop D129, Long chen Plaza, Belvedere",
    coordinates: { lat: -17.8100, lng: 31.0200 },
  },
  {
    id: "mutare",
    name: "Mutare",
    address: "Mutare, Zimbabwe",
    coordinates: { lat: -18.9784, lng: 32.6795 },
  },
];

export function OrdersProvider({ children }) {
  const [state, dispatch] = useReducer(ordersReducer, initialState, () => {
    try {
      const stored = localStorage.getItem("kapoto_orders");
      return stored ? JSON.parse(stored) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem("kapoto_orders", JSON.stringify(state));
  }, [state]);

  const createOrder = (items, orderDetails) => {
    const order = {
      id: `ORD-${Date.now()}`,
      items,
      ...orderDetails,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_ORDER", payload: order });
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      dispatch({
        type: "UPDATE_ORDER",
        payload: { ...order, status },
      });
    }
  };

  const setBranch = (branchId) => {
    state.selectedBranch = branchId;
  };

  const getSelectedBranch = () => {
    return branches.find(b => b.id === state.selectedBranch.toLowerCase());
  };

  return (
    <OrdersContext.Provider
      value={{
        ...state,
        createOrder,
        updateOrderStatus,
        setBranch,
        getSelectedBranch,
        branches,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
}
