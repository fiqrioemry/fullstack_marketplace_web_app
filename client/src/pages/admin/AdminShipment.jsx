import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import PageLoading from "@/components/loading/PageLoading";
import UpdateStatus from "../../components/admin/shipments/UpdateStatus";

const AdminUsers = () => {
  const { getAllShipments, shipments } = useAdminStore();

  useEffect(() => {
    getAllShipments();
  }, [getAllShipments]);

  if (!shipments) return <PageLoading />;

  return (
    <section className="p-2 bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>
              Name <ArrowUpDown className="inline ml-1 w-4 h-4" />
            </TableHead>
            <TableHead>
              shipment number
              <ArrowUpDown className="inline ml-1 w-4 h-4" />
            </TableHead>
            <TableHead>
              status
              <ArrowUpDown className="inline ml-1 w-4 h-4" />
            </TableHead>
            <TableHead>
              last updated <ArrowUpDown className="inline ml-1 w-4 h-4" />
            </TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((shipment, index) => (
            <TableRow key={shipment.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{shipment.name}</TableCell>
              <TableCell>{shipment.number}</TableCell>
              <TableCell>{shipment.status}</TableCell>
              <TableCell>{format(shipment.updatedAt, "PPP")}</TableCell>
              <TableCell className="text-center">
                <UpdateStatus />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default AdminUsers;
