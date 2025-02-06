import { Skeleton } from "@/components/ui/skeleton";

const ProductListLoading = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <tr key={index} className="border-b border-gray-200">
            <td className="px-4 py-3">
              <Skeleton className="h-6 w-8" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-6 w-48" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-6 w-16" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-6 w-24" />
            </td>
            <td className="px-4 py-3">
              <Skeleton className="h-6 w-32" />
            </td>
            <td className="px-4 py-3 text-center">
              <Skeleton className="h-6 w-16" />
            </td>
          </tr>
        ))}
    </>
  );
};

export default ProductListLoading;
