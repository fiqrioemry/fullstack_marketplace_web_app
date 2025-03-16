import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import NotificationsLoading from "@/components/loading/NotificationsLoading";
import NotificationCard from "@/components/seller/notifications/NotificationCard";

const SellerNotifications = () => {
  const { getStoreNotifications, notifications } = useShopStore();

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

export default SellerNotifications;
