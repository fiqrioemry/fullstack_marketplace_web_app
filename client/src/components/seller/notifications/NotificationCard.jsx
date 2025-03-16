/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { Bell, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const NotificationCard = ({ notification }) => {
  return (
    <Card
      className={`border ${
        notification.status === "unread"
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300"
      } shadow-md p-4 rounded-lg`}
    >
      <CardContent className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {notification.status === "unread" ? (
              <Bell className="text-blue-500" size={20} />
            ) : (
              <CheckCircle className="text-green-500" size={20} />
            )}
            <span className="text-sm text-gray-500">
              {format(new Date(notification.createdAt), "PPP")}
            </span>
          </div>
        </div>

        <div>
          <p className="font-semibold">{notification.message}</p>
          {notification.metadata?.orderNumber && (
            <p className="text-gray-600 text-sm">
              Order No:
              <span className="font-medium">
                {notification.metadata.orderNumber}
              </span>
            </p>
          )}
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Type: {notification.type}</span>
          <span className="capitalize">Status: {notification.status}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
