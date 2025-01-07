import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "../components/ProductCard";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductPagination } from "../components/ProductPagination";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const items = [
  {
    id: "jakarta",
    label: "Jakarta",
  },
  {
    id: "bandung",
    label: "Bandung",
  },
  {
    id: "surabaya",
    label: "Surabaya",
  },
  {
    id: "medan",
    label: "Medan",
  },
  {
    id: "yogyakarta",
    label: "Yogyakarta",
  },
  {
    id: "palembang",
    label: "Palembang",
  },
];

const SearchResult = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Checked items:", checkedItems);
  };
  return (
    <section className="container mx-auto">
      <div className="px-2 md:px-6 py-6 md:py-12">
        <div className="grid grid-cols-12 gap-4">
          {/* filter */}
          <div className="col-span-3">
            <Card className="h-full px-3">
              <CardHeader className="text-center">
                <h4>Filter Product</h4>
              </CardHeader>
              <Accordion collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">
                    Category
                  </AccordionTrigger>
                  <AccordionContent>
                    <form onSubmit={handleSubmit} className="space-y-6 px-3">
                      {items.map((item) => (
                        <div
                          className="flex items-center space-x-3"
                          key={item.id}
                        >
                          <Checkbox
                            type="checkbox"
                            id={item.id}
                            checked={checkedItems[item.id] || false}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor={item.id}
                            className="text-sm font-medium "
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </form>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg">
                    Location
                  </AccordionTrigger>
                  <AccordionContent>
                    <form onSubmit={handleSubmit} className="space-y-6 px-3">
                      {items.map((item) => (
                        <div
                          className="flex items-center space-x-3"
                          key={item.id}
                        >
                          <Checkbox
                            type="checkbox"
                            id={item.id}
                            checked={checkedItems[item.id] || false}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor={item.id}
                            className="text-sm font-medium "
                          >
                            {item.label}
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
                          className="h-10 pl-11 rounded-lg"
                          placeholder="minimum price"
                        ></Input>
                      </div>

                      <div className="relative p-1">
                        <label
                          htmlFor="maxPrice"
                          className="absolute flex items-center font-bold text-md justify-center h-10 w-10 bg-secondary "
                        >
                          Rp
                        </label>
                        <Input
                          id="maxPrice"
                          className="h-10 pl-11 rounded-lg"
                          placeholder="maximum price"
                        ></Input>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>

          {/* display */}
          <div className="col-span-9">
            <div className="flex items-center justify-between py-4">
              <div>
                <p>Menampilkan hasil pencarian untuk : Laptop Lenovo M4</p>
              </div>
              <div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="minimum">Minimum Price</SelectItem>
                      <SelectItem value="maximum">Maximum Price</SelectItem>
                      <SelectItem value="asc">From A to Z</SelectItem>
                      <SelectItem value="desc">From Z to A</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <ProductCard product={index} key={index} />
                ))}
              </div>
              <ProductPagination />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
