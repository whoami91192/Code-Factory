export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  active: boolean;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  address?: string;
  phone?: string;
  postalCode?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'PIZZA' | 'BURGER' | 'SALAD' | 'APPETIZER' | 'SIDE' | 'DESSERT' | 'BEVERAGE';
  imageUrl: string;
  available: boolean;
  averageRating?: number | null;
  stockQuantity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  deliveryAddress: string;
  deliveryNotes?: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthRequest {
  username: string;
  email?: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  expiresAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

export interface ContactStatistics {
  totalContacts: number;
  pendingContacts: number;
  resolvedContacts: number;
  todayContacts: number;
} 