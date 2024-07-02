import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FormState = {
  message: string;
};

export const fromErrorToFormState = (error: unknown) => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
    };
    // if another error instance, return error message
    // e.g. database error
  } else if (error instanceof Error) {
    return {
      message: error.message,
    };
    // if not an error instance but something else crashed
    // return generic error message
  } else {
    return {
      message: "An unknown error occurred",
    };
  }
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const callerNumber = phoneNumber.split("+1")[1];
  if (!callerNumber) return "";
  return `+${callerNumber}`;
};
