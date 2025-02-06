/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { filterControl } from "@/config";
import InputForm from "@/components/form/InputForm";
import { Card, CardContent } from "@/components/ui/card";

const FilterBox = ({ searchForm }) => {
  return (
    <Card className="h-full py-4 px-3">
      <CardContent>
        <div className="text-center mb-2 md:mb-4">
          <h5 className="text-md md:text-lg font-semibold">Filter Product</h5>
        </div>
        <Accordion type="multiple" className="w-full">
          {filterControl.map((item) => (
            <AccordionItem value={item.name} key={item.name}>
              <AccordionTrigger className="text-sm md:text-lg font-medium">
                {item.label}
              </AccordionTrigger>
              <AccordionContent>
                <InputForm formik={searchForm} formControl={[item]} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FilterBox;

{
  /* <AccordionItem value="category">
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
                    type="text"
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
                    type="text"
                    value={formData.maxPrice}
                    onBlur={handleFilterChange}
                    onChange={handleChange}
                    className="h-10 pl-11 rounded-lg"
                    placeholder="Maximum Price"
                    defaultValue="1"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem> */
}
