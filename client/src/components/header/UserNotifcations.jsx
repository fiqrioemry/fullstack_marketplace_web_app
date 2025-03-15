import { useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Bell, CheckCircle } from "lucide-react";
import { useUserStore } from "../../store/useUserStore";
const UserNotifications = () => {
  const { notifications, getUserNotifications } = useUserStore();
  useEffect(() => {
    getUserNotifications();
  }, [getUserNotifications]);

  if (!notifications) return null;

  if (notifications.length === 0) {
    return (
      <div className="min-h-24 flex items-center justify-center">
        <div className="text-center text-gray-500 text-sm">
          No notifications
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h5>Store notifications</h5>
        <Link className="btn-accent text-xs">see all</Link>
      </div>
      <div className="space-y-2 h-30 overflow-y-auto">
        {notifications.slice(0, 5).map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-2 p-2 rounded-md ${
              notification.status === "unread"
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "bg-white"
            }`}
          >
            {notification.status === "unread" ? (
              <Bell className="text-blue-500" size={18} />
            ) : (
              <CheckCircle className="text-green-500" size={18} />
            )}
            <div>
              <p className="text-sm text-gray-700 font-medium">
                {notification.message}
              </p>
              {notification.metadata?.orderNumber && (
                <p className="text-xs text-gray-500">
                  Order No: {notification.metadata.orderNumber}
                </p>
              )}
              <span className="text-xs text-gray-400">
                {format(new Date(notification.createdAt), "PPP")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotifications;
