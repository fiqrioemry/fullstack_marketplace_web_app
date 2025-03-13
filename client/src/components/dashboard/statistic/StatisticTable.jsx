import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const recentOrders = []; // Jika kosong, akan menampilkan teks default

const StatisticTable = () => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
      <CardContent>
        {recentOrders.length === 0 ? (
          <p className="text-center text-gray-500">
            Store don’t have any recent orders
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Order Number</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={order.gallery.image}
                      alt={order.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.category.name}</TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticTable;
