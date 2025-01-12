/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import FormControls from "./form/FormControl";
import { Card, CardContent } from "@/components/ui/card";
import { controlFilterCategory, controlFilterCity } from "../config";

const FilterBox = ({ formData, handleChange, handleFilterChange }) => {
  return (
    <Card className="h-full py-4 px-3">
      <CardContent>
        <div className="text-center mb-2 md:mb-4">
          <h5 className="text-md md:text-lg">Filter Product</h5>
        </div>
        <Accordion collapsible className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger className="text-sm md:text-lg">
              Category
            </AccordionTrigger>
            <AccordionContent>
              <FormControls
                formData={formData}
                handleChange={handleFilterChange}
                formControls={controlFilterCategory}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="city">
            <AccordionTrigger className="text-sm md:text-lg">
              City
            </AccordionTrigger>
            <AccordionContent>
              <FormControls
                formData={formData}
                formControls={controlFilterCity}
                handleChange={handleFilterChange}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger className="text-sm md:text-lg">
              Price
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="relative p-1">
                  <label htmlFor="minPrice" className="input_label ">
                    Rp
                  </label>
                  <Input
                    id="minPrice"
                    name="minPrice"
                    value={formData.minPrice}
                    onBlur={handleFilterChange}
                    onChange={handleChange}
                    className="h-10 pl-11 rounded-lg"
                    placeholder="Minimum Price"
                  />
                </div>
                <div className="relative p-1">
                  <label htmlFor="maxPrice" className="input_label">
                    Rp
                  </label>
                  <Input
                    id="maxPrice"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onBlur={handleFilterChange}
                    onChange={handleChange}
                    className="h-10 pl-11 rounded-lg"
                    placeholder="Maximum Price"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FilterBox;
