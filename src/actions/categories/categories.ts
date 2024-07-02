"use server";

import { db } from "@/lib/db";
import { CallCategory } from "@prisma/client";
import {
  AddCategoryType,
  DeleteCategoryType,
  UpdateCategoryType,
} from "./schema";

export const getCategories = async (): Promise<CallCategory[]> => {
  const categories = await db.callCategory.findMany();
  return categories;
};

export const createCategory = async (data: AddCategoryType) => {
  const category = await db.callCategory.create({
    data: {
      name: data.name,
      context: data.context,
      typicalResolutionFlow: data.typicalResolutionFlow,
      defaultPriority: data.defaultPriority as any,
    },
  });

  return category;
};

export const updateCategory = async (data: UpdateCategoryType) => {
  const category = await db.callCategory.update({
    where: {
      id: data.categoryId,
    },
    data: {
      name: data.name,
      context: data.context,
      typicalResolutionFlow: data.typicalResolutionFlow,
      defaultPriority: data.defaultPriority as any,
    },
  });

  return category;
};

export const deleteCategory = async (data: DeleteCategoryType) => {
  const category = await db.callCategory.findUnique({
    where: { id: data.categoryId },
    include: { _count: { select: { calls: true } } },
  });

  if (!category) throw new Error("Category not found");

  let cat;
  if (!category._count.calls) {
    cat = await db.callCategory.delete({
      where: {
        id: data.categoryId,
      },
    });
  } else {
    cat = await db.callCategory.update({
      where: { id: data.categoryId },
      data: { status: "EXPIRED" },
    });
  }

  return cat;
};
