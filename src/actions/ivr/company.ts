"use server";

import { db } from "@/lib/db";
import { fromErrorToFormState } from "@/lib/utils";
import { Company } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UpdateCompanyType } from "./schema";

export const getCompany = async ({
  id,
}: {
  id: string;
}): Promise<Company | null> => {
  const company = await db.company.findFirst({ where: { id } });
  if (!company) return null;
  return company;
};

export const updateCompany = async (data: UpdateCompanyType) => {
  try {
    // Update company details
    const company = await db.company.update({
      where: { id: data.id },
      data: {
        name: data.name,
        context: data.context,
        email: data.email,
        phone: data.phone,
        address: data.address,
        website: data.website,
      },
    });

    revalidatePath("/settings/company");

    return {
      data: company,
    };
  } catch (error) {
    return fromErrorToFormState(error);
  }
};
