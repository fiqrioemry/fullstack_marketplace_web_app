import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import NotificationsLoading from "@/components/loading/NotificationsLoading";
import NotificationCard from "@/components/dashboard/notifications/NotificationCard";
const Notifications = () => {
  const { getStoreNotifications, notifications } = useShopStore();

  console.log(notifications);

  useEffect(() => {
    getStoreNotifications();
  }, [getStoreNotifications]);

  if (!notifications) return <NotificationsLoading />;

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationCard notification={notification} key={notification.id} />
      ))}
    </div>
  );
};

export default Notifications;
