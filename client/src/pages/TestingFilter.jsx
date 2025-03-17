/* eslint-disable react/prop-types */

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import MultipleCheckedComponent from "@/components/form/MultipleCheckedComponent";

const cityOptions = ["medan", "jakarta", "semarang", "bandung", "surabaya"];

const TestingFilter = ({ form }) => {
  const { categories, getCategories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (!categories) return null;
  return (
    <div>
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
            <input
              name="minPrice"
              className="py-2 px-4 border w-full"
              placeholder="Minimum price"
            />

            <input
              name="maxPrice"
              value={form.values.maxPrice}
              className="py-2 px-4 border w-full"
              placeholder="Maximum price"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TestingFilter;
