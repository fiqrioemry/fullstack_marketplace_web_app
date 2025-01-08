/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";
import { useProductStore } from "../store/useProductStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import FilterBoxSkeleton from "./loading/FilterBoxSkeleton";

const initialPriceForm = [
  {
    name: "minPrice",
    placeholder: "minimum price",
    label: "Rp",
  },
  {
    name: "maxPrice",
    placeholder: "maximum price",
    label: "Rp",
  },
];

const FilterBox = ({ formData, handleFilterChange }) => {
  const { categories, getCities, getCategories, cities } = useProductStore();

  useEffect(() => {
    getCities();
    getCategories();
  }, [getCategories, getCities]);
  return (
    <Card className="h-full px-3">
      {!categories && !cities ? (
        <FilterBoxSkeleton />
      ) : (
        <CardContent>
          <CardHeader className="text-center">
            <h4 className="text-md md:text-lg">Filter Product</h4>
          </CardHeader>
          <Accordion collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm md:text-lg">
                Category
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 px-3">
                  {categories.map((item) => (
                    <div className="flex items-center space-x-3" key={item}>
                      <Checkbox
                        id={item}
                        name="categories"
                        value={item}
                        checked={formData.categories.includes(item)}
                        onChange={handleFilterChange}
                      />

                      <label htmlFor={item} className="text-sm font-medium">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm md:text-lg">
                Location
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 px-3">
                  {cities.map((item) => (
                    <div className="flex items-center space-x-3" key={item}>
                      <Checkbox
                        id={item}
                        name="cities"
                        value={item}
                        checked={formData.cities.includes(item)}
                        onChange={handleFilterChange}
                      />

                      <label htmlFor={item} className="text-sm font-medium">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm md:text-lg">
                Price
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {initialPriceForm.map((item) => (
                    <div className="relative p-1" key={item.name}>
                      <label
                        htmlFor={item.name}
                        className="absolute flex items-center font-bold text-xs md:text-md justify-center h-10 w-10 bg-secondary "
                      >
                        {item.label}
                      </label>
                      <Input
                        id={item.name}
                        name={item.name}
                        value={formData[item.name]}
                        onChange={handleFilterChange}
                        className="h-10 pl-11 rounded-lg"
                        placeholder={item.placeholder}
                      ></Input>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      )}
    </Card>
  );
};

export default FilterBox;
