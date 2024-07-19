import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  message: string;
  id: string; // A unique ID for each notification
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      message,
      id: `id-${notifications.length}` // Simple counter approach; ensure uniqueness in a real app
    };
    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
