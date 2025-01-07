/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader } from "@/components/ui/card";

const FilterBox = ({
  cities,
  categories,
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Card className="h-full px-3">
      <CardHeader className="text-center">
        <h4>Filter Product</h4>
      </CardHeader>
      <Accordion collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg">Category</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleSubmit} className="space-y-6 px-3">
              {categories.map((item) => (
                <div className="flex items-center space-x-3" key={item}>
                  <Checkbox
                    value={formData[item]}
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <label htmlFor={item} className="text-sm font-medium ">
                    {item}
                  </label>
                </div>
              ))}
            </form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg">Location</AccordionTrigger>
          <AccordionContent>
            <form onSubmit={handleSubmit} className="space-y-6 px-3">
              {cities.map((item) => (
                <div className="flex items-center space-x-3" key={item}>
                  <Checkbox
                    value={formData[item]}
                    type="checkbox"
                    id={item}
                    onChange={handleChange}
                  />
                  <label htmlFor={item} className="text-sm font-medium ">
                    {item}
                  </label>
                </div>
              ))}
            </form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg">Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="relative p-1">
                <label
                  htmlFor="minPrice"
                  className="absolute flex items-center font-bold text-md justify-center h-10 w-10 bg-secondary "
                >
                  Rp
                </label>
                <Input
                  id="minPrice"
                  value={formData["minPrice"]}
                  className="h-10 pl-11 rounded-lg"
                  placeholder="minimum price"
                ></Input>
              </div>

              <div className="relative p-1 ">
                <label
                  htmlFor="maxPrice"
                  className="absolute flex items-center font-bold text-md justify-center h-10 w-10 bg-secondary "
                >
                  Rp
                </label>
                <Input
                  id="maxPrice"
                  value={formData["maxPrice"]}
                  className="h-10 pl-11 rounded-lg"
                  placeholder="maximum price"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default FilterBox;
