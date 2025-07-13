import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

export interface ShoppingListItem {
  id: string;
  product: Product;
  quantity: number;
  completed: boolean;
  addedAt: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  createdAt: string;
  updatedAt: string;
}

type ShoppingListContextType = {
  lists: ShoppingList[];
  currentList: ShoppingList | null;
  addList: (name: string) => void;
  removeList: (listId: string) => void;
  selectList: (listId: string) => void;
  addItemToList: (listId: string, product: Product, quantity?: number) => void;
  removeItemFromList: (listId: string, itemId: string) => void;
  updateItemQuantity: (listId: string, itemId: string, quantity: number) => void;
  toggleItemCompleted: (listId: string, itemId: string) => void;
  clearCompletedItems: (listId: string) => void;
  addAllToList: (listId: string) => void;
};

const ShoppingListContext = createContext<ShoppingListContextType>({
  lists: [],
  currentList: null,
  addList: () => {},
  removeList: () => {},
  selectList: () => {},
  addItemToList: () => {},
  removeItemFromList: () => {},
  updateItemQuantity: () => {},
  toggleItemCompleted: () => {},
  clearCompletedItems: () => {},
  addAllToList: () => {},
});

export const ShoppingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<ShoppingList[]>(() => {
    const saved = localStorage.getItem('shoppingLists');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentList, setCurrentList] = useState<ShoppingList | null>(null);

  useEffect(() => {
    localStorage.setItem('shoppingLists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    if (lists.length > 0 && !currentList) {
      setCurrentList(lists[0]);
    }
  }, [lists, currentList]);

  const addList = (name: string) => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      name,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLists(prev => [...prev, newList]);
    setCurrentList(newList);
  };

  const removeList = (listId: string) => {
    setLists(prev => prev.filter(list => list.id !== listId));
    if (currentList?.id === listId) {
      setCurrentList(lists.find(list => list.id !== listId) || null);
    }
  };

  const selectList = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    if (list) {
      setCurrentList(list);
    }
  };

  const addItemToList = (listId: string, product: Product, quantity: number = 1) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        const existingItem = list.items.find(item => item.product.id === product.id);
        if (existingItem) {
          // Update quantity if item already exists
          return {
            ...list,
            items: list.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            updatedAt: new Date().toISOString(),
          };
        } else {
          // Add new item
          const newItem: ShoppingListItem = {
            id: Date.now().toString(),
            product,
            quantity,
            completed: false,
            addedAt: new Date().toISOString(),
          };
          return {
            ...list,
            items: [...list.items, newItem],
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return list;
    }));
  };

  const removeItemFromList = (listId: string, itemId: string) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter(item => item.id !== itemId),
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    }));
  };

  const updateItemQuantity = (listId: string, itemId: string, quantity: number) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          ),
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    }));
  };

  const toggleItemCompleted = (listId: string, itemId: string) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    }));
  };

  const clearCompletedItems = (listId: string) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter(item => !item.completed),
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    }));
  };

  const addAllToList = (listId: string) => {
    // This would be used to add all items from a list to cart
    const list = lists.find(l => l.id === listId);
    if (list) {
      // This would integrate with CartContext
      console.log('Adding all items from list to cart:', list.items);
    }
  };

  return (
    <ShoppingListContext.Provider value={{
      lists,
      currentList,
      addList,
      removeList,
      selectList,
      addItemToList,
      removeItemFromList,
      updateItemQuantity,
      toggleItemCompleted,
      clearCompletedItems,
      addAllToList,
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => useContext(ShoppingListContext); 