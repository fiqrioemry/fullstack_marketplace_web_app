/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useProductStore } from "../store/useProductStore";
import FilterBoxSkeleton from "./loading/FilterBoxSkeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const FilterBox = ({ formData, setFormData, handleFilterChange }) => {
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
                      <input
                        id={item}
                        type="checkbox"
                        name="category"
                        value={item}
                        checked={formData.category.includes(item)}
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
                      <input
                        id={item}
                        type="checkbox"
                        name="city"
                        value={item}
                        checked={formData.city.includes(item)}
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
                  <div className="relative p-1">
                    <label htmlFor="minPrice" className="input_label ">
                      Rp
                    </label>
                    <Input
                      id="minPrice"
                      name="minPrice"
                      value={formData.minPrice}
                      onBlur={handleFilterChange}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="h-10 pl-11 rounded-lg"
                      placeholder="Maximum Price"
                    />
                  </div>
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
