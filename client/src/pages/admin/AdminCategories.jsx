import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import PageLoading from "@/components/loading/PageLoading";
import UpdateCategory from "@/components/admin/categories/UpdateCategory";
import DeleteCategory from "@/components/admin/categories/DeleteCategory";
import AddCategory from "@/components/admin/categories/AddCategory";

const AdminUsers = () => {
  const { getCategories, categories } = useAdminStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (!categories) return <PageLoading />;

  return (
    <div>
      <div className="flex items-center py-2 justify-end">
        <AddCategory />
      </div>
      <div className="p-2 bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>
                name <ArrowUpDown className="inline ml-1 w-4 h-4" />
              </TableHead>
              <TableHead>
                image
                <ArrowUpDown className="inline ml-1 w-4 h-4" />
              </TableHead>
              <TableHead>
                createdAt <ArrowUpDown className="inline ml-1 w-4 h-4" />
              </TableHead>
              <TableHead>
                updatedAt
                <ArrowUpDown className="inline ml-1 w-4 h-4" />
              </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <img
                    className="h-10 w-10 border object-cover"
                    src={category.image}
                    alt={category.name}
                  />
                </TableCell>
                <TableCell>{format(category.createdAt, "PPP")}</TableCell>
                <TableCell>{format(category.updatedAt, "PPP")}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col">
                      <UpdateCategory category={category} />
                      <DeleteCategory category={category} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
