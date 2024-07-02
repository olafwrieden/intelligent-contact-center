import { db } from "@/lib/db";
import { Customer } from "@prisma/client";

export const getCustomer = async ({
  phone,
  refId,
  email,
}: {
  refId?: string;
  phone?: string;
  email?: string;
}): Promise<Customer | null> => {
  if (!phone && !refId && !email) return null;

  const customer = await db.customer.findFirst({
    where: { OR: [{ phone }] },
  });

  console.log(customer);

  return customer;
};

export const getCustomers = async (): Promise<Customer[]> => {
  const customers = await db.customer.findMany({});
  if (!customers) return [];
  return customers;
};
