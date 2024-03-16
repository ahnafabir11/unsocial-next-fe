import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { success } from "@/constant/success";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { AxiosResponse } from "axios";

interface FormSuccessAlert {
  data?: AxiosResponse<{
    message: string;
    data: unknown;
  }>;
}

export default function FormSuccessAlert({ data }: FormSuccessAlert) {
  if (!data) return null;

  const selectedSuccess = success.find(
    ({ code }) => data.data.message === code
  );

  if (!selectedSuccess) return null;

  return (
    <Alert>
      <CheckCircledIcon className="h-4 w-4" />
      <AlertTitle>{selectedSuccess.title}</AlertTitle>
      <AlertDescription>{selectedSuccess.message}</AlertDescription>
    </Alert>
  );
}
