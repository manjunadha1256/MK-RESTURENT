/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { MENU_ITEMS, Order, MenuItem, Worker, WORKERS, INITIAL_ORDERS, Feedback, INITIAL_FEEDBACK } from '../data/mockData';

interface AppState {
  items: MenuItem[];
  orders: Order[];
  workers: Worker[];
  cart: { itemId: string; quantity: number }[];
  wishlist: string[];
  feedback: Feedback[];
  user: { id: string; role: 'admin' | 'user' } | null;
  isLoading: boolean;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  placeOrder: (paymentMethod: Order['paymentMethod']) => void;
  login: (role: 'admin' | 'user') => void;
  logout: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  toggleWishlist: (itemId: string) => void;
  submitFeedback: (rating: number, comment: string) => void;
  setLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [workers] = useState<Worker[]>(WORKERS);
  const [cart, setCart] = useState<{ itemId: string; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>(INITIAL_FEEDBACK);
  const [user, setUser] = useState<{ id: string; role: 'admin' | 'user' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const addToCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.itemId === itemId);
      if (existing) {
        return prev.map(i => i.itemId === itemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { itemId, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.itemId === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.itemId === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.itemId !== itemId);
    });
  };

  const clearCart = () => setCart([]);

  const placeOrder = (paymentMethod: Order['paymentMethod']) => {
    if (cart.length === 0 || !user) return;

    const orderItems = cart.map(c => {
      const item = items.find(i => i.id === c.itemId)!;
      return { itemId: c.itemId, quantity: c.quantity, price: item.price };
    });

    const total = orderItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const gst = total * 0.18;
    const finalTotal = total + gst;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      items: orderItems,
      total: finalTotal,
      status: 'Pending',
      paymentStatus: 'Paid',
      paymentMethod,
      timestamp: new Date(),
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Update stock and sales count
    setItems(prev => prev.map(item => {
      const cartItem = cart.find(c => c.itemId === item.id);
      if (cartItem) {
        return {
          ...item,
          stock: Math.max(0, item.stock - cartItem.quantity),
          salesCount: item.salesCount + cartItem.quantity
        };
      }
      return item;
    }));

    clearCart();
  };

  const login = (role: 'admin' | 'user') => {
    setUser({ id: role === 'admin' ? 'ADMIN-1' : 'USER-1', role });
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const toggleWishlist = (itemId: string) => {
    setWishlist(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const submitFeedback = (rating: number, comment: string) => {
    if (!user) return;
    const newFeedback: Feedback = {
      id: `FB-${Date.now()}`,
      userId: user.id,
      rating,
      comment,
      timestamp: new Date(),
    };
    setFeedback(prev => [newFeedback, ...prev]);
  };

  const value = useMemo(() => ({
    items,
    orders,
    workers,
    cart,
    wishlist,
    feedback,
    user,
    isLoading,
    addToCart,
    removeFromCart,
    clearCart,
    placeOrder,
    login,
    logout,
    updateOrderStatus,
    toggleWishlist,
    submitFeedback,
    setLoading
  }), [items, orders, workers, cart, wishlist, feedback, user, isLoading]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
