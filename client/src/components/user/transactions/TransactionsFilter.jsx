/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
const TransactionsFilter = ({ handleFilter, filter }) => {
  return (
    <div className="flex items-center justify-end gap-2 mb-2">
      <Button
        size="lg"
        onClick={() => handleFilter("")}
        variant={filter === "" ? "outline" : "primary"}
      >
        All transaction
      </Button>
      <Button
        size="lg"
        onClick={() => handleFilter("paid")}
        variant={filter === "paid" ? "outline" : "primary"}
      >
        paid
      </Button>
      <Button
        size="lg"
        onClick={() => handleFilter("pending")}
        variant={filter === "pending" ? "outline" : "primary"}
      >
        pending
      </Button>
      <Button
        size="lg"
        onClick={() => handleFilter("canceled")}
        variant={filter === "canceled" ? "outline" : "primary"}
      >
        canceled
      </Button>
      <Button
        size="lg"
        onClick={() => handleFilter("expired")}
        variant={filter === "expired" ? "outline" : "primary"}
      >
        expired
      </Button>
    </div>
  );
};

export default TransactionsFilter;
