/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
const TransactionsFilter = ({ handleFilter, filter }) => {
  return (
    <div className="flex items-center justify-end gap-2 mb-2">
      <Button
        onClick={() => handleFilter("")}
        variant={filter === "" ? "outline" : "primary"}
      >
        All transaction
      </Button>
      <Button
        onClick={() => handleFilter("paid")}
        variant={filter === "paid" ? "outline" : "primary"}
      >
        paid
      </Button>
      <Button
        onClick={() => handleFilter("pending")}
        variant={filter === "pending" ? "outline" : "primary"}
      >
        pending
      </Button>
      <Button
        onClick={() => handleFilter("canceled")}
        variant={filter === "canceled" ? "outline" : "primary"}
      >
        canceled
      </Button>
      <Button
        onClick={() => handleFilter("expired")}
        variant={filter === "expired" ? "outline" : "primary"}
      >
        expired
      </Button>
    </div>
  );
};

export default TransactionsFilter;
