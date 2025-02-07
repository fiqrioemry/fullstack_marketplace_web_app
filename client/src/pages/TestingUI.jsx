import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Authentication from "../components/testing/Authentication";
import ProductManagement from "../components/testing/ProductManagement";

const TestingUI = () => {
  return (
    <Tabs defaultValue="authentication">
      <TabsList>
        <TabsTrigger value="authentication">authentication</TabsTrigger>
        <TabsTrigger value="product management">product management</TabsTrigger>
      </TabsList>
      <TabsContent value="authentication">
        <Authentication />
      </TabsContent>
      <TabsContent value="product management">
        <ProductManagement />
      </TabsContent>
    </Tabs>
  );
};

export default TestingUI;
