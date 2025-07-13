class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.init();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async init() {
    if ('Notification' in window) {
      this.permission = Notification.permission;
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }

    if (this.permission === 'granted') {
      return true;
    }

    if (this.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission === 'granted';
  }

  async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (!('Notification' in window)) {
      return;
    }

    if (this.permission !== 'granted') {
      const granted = await this.requestPermission();
      if (!granted) {
        return;
      }
    }

    const defaultOptions: NotificationOptions = {
      icon: '/images/logo.png',
      badge: '/images/logo.png',
      requireInteraction: false,
      ...options,
    };

    new Notification(title, defaultOptions);
  }

  async showOrderNotification(orderId: string, status: string): Promise<void> {
    const title = `Order #${orderId} Update`;
    const body = `Your order status has been updated to: ${status}`;
    
    await this.showNotification(title, {
      body,
      tag: `order-${orderId}`,
      data: { orderId, status },
    });
  }

  async showCartNotification(productName: string): Promise<void> {
    const title = 'Product Added to Cart';
    const body = `${productName} has been added to your cart`;
    
    await this.showNotification(title, {
      body,
      tag: 'cart-update',
      data: { productName },
    });
  }

  async showFavoriteNotification(productName: string, added: boolean): Promise<void> {
    const title = added ? 'Added to Favorites' : 'Removed from Favorites';
    const body = `${productName} has been ${added ? 'added to' : 'removed from'} your favorites`;
    
    await this.showNotification(title, {
      body,
      tag: 'favorite-update',
      data: { productName, added },
    });
  }

  isSupported(): boolean {
    return 'Notification' in window;
  }

  getPermission(): NotificationPermission {
    return this.permission;
  }
}

export default NotificationService; 