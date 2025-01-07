/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ButtonAnimate from "./ButtonAnimate";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader } from "@/components/ui/card";

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

const FilterBox = ({
  cities,
  categories,
  formData,
  setFormData,
  handleChange,
}) => {
  return (
    <Card className="h-full px-3">
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
                    checked={formData.categories.includes(item)}
                    onChange={() =>
                      setFormData((prev) => {
                        const isCitySelected = prev.categories.includes(item);

                        return {
                          ...prev,
                          categories: isCitySelected
                            ? prev.categories.filter((city) => city !== item)
                            : [...prev.categories, item],
                        };
                      })
                    }
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
                    checked={formData.cities.includes(item)}
                    onChange={() =>
                      setFormData((prev) => {
                        const isCitySelected = prev.cities.includes(item);
                        return {
                          ...prev,
                          cities: isCitySelected
                            ? prev.cities.filter((city) => city !== item)
                            : [...prev.cities, item],
                        };
                      })
                    }
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
            <form onSubmit={handleSubmit} className="space-y-3">
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
                    onChange={handleChange}
                    className="h-10 pl-11 rounded-lg"
                    placeholder={item.placeholder}
                  ></Input>
                </div>
              ))}
              <ButtonAnimate
                title="filter price"
                style="w-full"
                type="submit"
              />
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default FilterBox;
