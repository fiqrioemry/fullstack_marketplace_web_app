import { filterControl } from "@/config";
import FormInput from "@/components/form/FormInput";
import { Card, CardContent } from "@/components/ui/card";

// eslint-disable-next-line react/prop-types
const FilterBox = ({ searchForm }) => {
  return (
    <Card className="h-full py-4 px-3">
      <CardContent className="space-y-4">
        <h4>Filter Product</h4>
        <FormInput formik={searchForm} formControl={filterControl} />
      </CardContent>
    </Card>
  );
};

export default FilterBox;
