/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Veg' | 'Non-Veg' | 'Snacks' | 'Tea' | 'Coffee' | 'North India' | 'South India';
  description: string;
  image: string;
  stock: number;
  rating: number;
  salesCount: number;
}

const generateItems = (category: MenuItem['category'], count: number, startId: number): MenuItem[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${category.toLowerCase().replace(' ', '-')}-${startId + i}`,
    name: `${category} Special ${startId + i}`,
    price: Math.floor(Math.random() * 400) + 50,
    category,
    description: `Delicious ${category} treat prepared with traditional spices and fresh ingredients.`,
    image: `https://picsum.photos/seed/${category}-${startId + i}/400/300`,
    stock: Math.floor(Math.random() * 100) + 20,
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
    salesCount: Math.floor(Math.random() * 500),
  }));
};

export const MENU_ITEMS: MenuItem[] = [
  ...generateItems('Veg', 16, 1),
  ...generateItems('Non-Veg', 16, 1),
  ...generateItems('Snacks', 16, 1),
  ...generateItems('Tea', 6, 1),
  ...generateItems('Coffee', 6, 1),
  ...generateItems('North India', 16, 1),
  ...generateItems('South India', 16, 1),
  // Adding more to reach 200+
  ...generateItems('Veg', 30, 17),
  ...generateItems('Non-Veg', 30, 17),
  ...generateItems('Snacks', 30, 17),
  ...generateItems('North India', 30, 17),
  ...generateItems('South India', 30, 17),
];

export interface Order {
  id: string;
  userId: string;
  items: { itemId: string; quantity: number; price: number }[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid';
  paymentMethod: 'UPI' | 'Card' | 'Cash';
  timestamp: Date;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  salary: number;
  status: 'Paid' | 'Pending';
}

export const WORKERS: Worker[] = [
  { id: 'w1', name: 'Rahul Sharma', role: 'Head Chef', salary: 45000, status: 'Paid' },
  { id: 'w2', name: 'Priya Singh', role: 'Sous Chef', salary: 35000, status: 'Paid' },
  { id: 'w3', name: 'Amit Kumar', role: 'Server', salary: 15000, status: 'Pending' },
  { id: 'w4', name: 'Suresh Raina', role: 'Server', salary: 15000, status: 'Paid' },
  { id: 'w5', name: 'Deepak Chahar', role: 'Delivery Boy', salary: 18000, status: 'Pending' },
  { id: 'w6', name: 'Ishant Sharma', role: 'Cleaner', salary: 12000, status: 'Paid' },
];

export interface Feedback {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  timestamp: Date;
}

export const INITIAL_FEEDBACK: Feedback[] = [
  { id: 'f1', userId: 'USER-1', rating: 5, comment: 'Amazing food!', timestamp: new Date() },
  { id: 'f2', userId: 'USER-2', rating: 4, comment: 'Good service.', timestamp: new Date() },
];

export const INITIAL_ORDERS: Order[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `ORD-${1000 + i}`,
  userId: `USER-${Math.floor(Math.random() * 100)}`,
  items: [
    { itemId: MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)].id, quantity: 1, price: 100 }
  ],
  total: Math.floor(Math.random() * 1000) + 200,
  status: 'Delivered',
  paymentStatus: 'Paid',
  paymentMethod: ['UPI', 'Card', 'Cash'][Math.floor(Math.random() * 3)] as any,
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
}));
