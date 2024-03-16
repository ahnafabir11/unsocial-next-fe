import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { errors } from "@/constant/errors";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { isAxiosError } from "axios";

interface FormErrorAlertProps {
  className?: string;
  error: Error | null;
}

export default function FormErrorAlert({
  error,
  className,
}: FormErrorAlertProps) {
  if (!isAxiosError(error) || !error.response) return null;
  const errorCode = error.response.data.message;

  const selectedError = errors.find(({ code }) => code === errorCode);

  if (!selectedError) return null;

  return (
    <Alert variant="destructive" className={className}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{selectedError.title}</AlertTitle>
      <AlertDescription>{selectedError.message}</AlertDescription>
    </Alert>
  );
}
