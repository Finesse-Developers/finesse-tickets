import { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { createContext } from "react";
import {
  NotificationContextType,
  NotificationItem,
} from "../../types/discordServer.types";
import NotificationManager from "./NotificationManager";

const NotificationContext = createContext<NotificationContextType | null>(null);

let idCounter = 0;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const notify = useCallback(
    (
      message: string,
      severity: NotificationItem["severity"] = "info",
      duration = 3000
    ) => {
      const id = idCounter++;

      setNotifications((prev) => [...prev, { id, message, severity }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((note) => note.id !== id));
      }, duration);
    },
    []
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationManager
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};
