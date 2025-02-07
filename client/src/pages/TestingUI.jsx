import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Authentication from "../components/testing/Authentication";

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
        Change your password here.
      </TabsContent>
    </Tabs>
  );
};

export default TestingUI;
