import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import Logo from "@/components/ui/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { loginControl, loginState } from "@/config";
import { useFormHandler } from "@/hooks/useFormHandler";
import { Card, CardContent } from "@/components/ui/card";

const Testing = () => {
  const { login, loading } = useAuthStore();
  const { form, handleSubmit } = useFormHandler(
    login,
    loginState,
    loginControl
  );

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="p-4">
          <div className="py-4 text-center">
            <Logo />
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {loginControl.map((control) => (
                <FormField
                  key={control.name}
                  name={control.name}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{control.label}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={control.type}
                          placeholder={control.placeholder}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Testing;
