/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/useProductStore";
import InputNumberComponent from "@/components/form/InputNumberComponent";
import MultipleCheckedComponent from "@/components/form/MultipleCheckedComponent";

const cityOptions = ["medan", "jakarta", "semarang", "bandung", "surabaya"];

const TestingFilter = ({ form, setSearchParams }) => {
  const { minPrice, maxPrice } = form.values;
  const { categories, getCategories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const updateSearchParams = () => {
    const newSearchParams = new URLSearchParams(window.location.search);

    if (minPrice) {
      newSearchParams.set("minPrice", minPrice);
    } else {
      newSearchParams.delete("minPrice");
    }

    if (maxPrice) {
      newSearchParams.set("maxPrice", maxPrice);
    } else {
      newSearchParams.delete("maxPrice");
    }

    setSearchParams(newSearchParams);
  };

  if (!categories) return null;

  return (
    <div className="h-full border rounded-lg py-3 px-4">
      <div className="space-y-2">
        <h3>Filter</h3>
        <Accordion type="multiple" collapsible>
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <MultipleCheckedComponent
                formik={form}
                name="category"
                options={categories}
                value={form.values.category}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="city">
            <AccordionTrigger>City</AccordionTrigger>
            <AccordionContent>
              <MultipleCheckedComponent
                name="city"
                formik={form}
                options={cityOptions}
                value={form.values.city}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent>
              <form
                className="space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSearchParams();
                }}
              >
                <InputNumberComponent
                  formik={form}
                  name="minPrice"
                  value={minPrice}
                  onBlur={updateSearchParams}
                  placeholder="Enter minimum price"
                />
                <InputNumberComponent
                  formik={form}
                  name="maxPrice"
                  value={maxPrice}
                  onBlur={updateSearchParams}
                  placeholder="Enter maximum price"
                />

                <Button size="lg" className="w-full" type="submit">
                  Apply Change
                </Button>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default TestingFilter;
