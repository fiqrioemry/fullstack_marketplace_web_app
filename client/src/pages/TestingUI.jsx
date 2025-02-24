import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Authentication from "../components/testing/Authentication";
import ProductManagement from "../components/testing/ProductManagement";
import ProductForm from "../components/testing/ProductForm";

const TestingUI = () => {
  return (
    <Tabs defaultValue="authentication">
      <TabsList>
        <TabsTrigger value="authentication">authentication</TabsTrigger>
        <TabsTrigger value="product management">product management</TabsTrigger>
        <TabsTrigger value="product form">product form</TabsTrigger>
      </TabsList>
      <TabsContent value="authentication">
        <Authentication />
      </TabsContent>
      <TabsContent value="product management">
        <ProductManagement />
      </TabsContent>
      <TabsContent value="product form">
        <ProductForm />
      </TabsContent>
    </Tabs>
  );
};

export default TestingUI;
