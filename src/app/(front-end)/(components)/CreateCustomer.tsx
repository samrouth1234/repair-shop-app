import { Card, CardContent } from "@/components/ui/card";
import FormCreateCustomer from "./FormCreateCustomer";

const CreateCustomer = () => {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-xl py-5 px-4 shadow-xl">
        <CardContent>
          <FormCreateCustomer/>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateCustomer;
