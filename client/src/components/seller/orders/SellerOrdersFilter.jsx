/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
const SellerOrdersFilter = ({ handleFilter, filter }) => {
  return (
    <div className="flex items-center justify-end gap-2 mb-2">
      <Button
        onClick={() => handleFilter("")}
        variant={filter === "" ? "outline" : "primary"}
      >
        All
      </Button>
      <Button
        onClick={() => handleFilter("pending")}
        variant={filter === "pending" ? "outline" : "primary"}
      >
        pending
      </Button>
      <Button
        onClick={() => handleFilter("process")}
        variant={filter === "process" ? "outline" : "primary"}
      >
        process
      </Button>
      <Button
        onClick={() => handleFilter("canceled")}
        variant={filter === "canceled" ? "outline" : "primary"}
      >
        canceled
      </Button>
      <Button
        onClick={() => handleFilter("success")}
        variant={filter === "success" ? "outline" : "primary"}
      >
        success
      </Button>
    </div>
  );
};

export default SellerOrdersFilter;
