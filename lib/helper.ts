import { toast } from "@/components/ui/use-toast";
import { errors } from "@/constant/errors";
import { AxiosError, isAxiosError } from "axios";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export function getErrorResponse(e: unknown) {
  if (!isAxiosError(e) || !e.response) {
    toast({ variant: "destructive", title: "SOMETHING WENT WRONG" });
    return null;
  }

  return e.response.data;
}

export function showToastError(e: unknown) {
  if (!(e instanceof AxiosError) || !e.response) {
    toast({ variant: "destructive", title: "COULD NOT CONNECT TO THE SERVER" });
    return;
  }

  const error = e.response.data;
  const selectedError = errors.find(({ code }) => code === error.message);

  if (!selectedError) {
    toast({ variant: "destructive", title: "UNKNOWN ERROR" });
    return;
  }

  toast({
    variant: "destructive",
    title: selectedError.title,
    description: selectedError.message,
  });

  return;
}

export function handleValidationError<T extends FieldValues>(
  error: any,
  form: UseFormReturn<T>
) {
  if (!error) return;

  if (error.message === "VALIDATION_ERROR") {
    for (const [key, messages] of Object.entries(error.data)) {
      for (const message of messages as string[]) {
        form.setError(key as Path<T>, { message });
      }
    }
  }
}

export function getAvatarFallback(name: string) {
  // Split the name by spaces
  const nameParts: string[] = name.split(" ");

  // Get the first part as first name
  const firstName: string = nameParts[0];

  // If only one part, take the first two letters
  // else take the first letter of first name and first letter of last name
  let fallbackInitials: string;
  if (nameParts.length === 1) {
    fallbackInitials = firstName.substring(0, 2);
  } else {
    const lastName: string = nameParts[nameParts.length - 1];
    fallbackInitials = `${firstName[0]}${lastName[0]}`;
  }

  // Capitalize the initials
  fallbackInitials = fallbackInitials.toUpperCase();

  return fallbackInitials;
}

export function getPagination(c: number, m: number) {
  let current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}
