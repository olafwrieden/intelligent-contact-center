"use server";

import { ROLE } from "@/lib/constant";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getAgents = async (): Promise<User[]> => {
  const agents = await db.user.findMany({});
  if (!agents) return [];
  return agents;
};

export const getAgent = async (id: string): Promise<User | null> => {
  const agent = await db.user.findFirst({ where: { id } });
  if (!agent) return null;

  return agent;
};

export const updateAgentStatus = async (id: string, enabled: boolean) => {
  const agent = await db.user.update({
    where: { id },
    data: { enabled },
  });

  revalidatePath("/settings/agents");

  return agent;
};

export const deleteAgent = async (id: string) => {
  const agent = await db.user.delete({ where: { id } });

  revalidatePath("/settings/agents");

  return agent;
};

export const updateRole = async (id: string, role: ROLE) => {
  const agent = await db.user.update({
    where: { id },
    data: { role },
  });

  revalidatePath("/settings/agents");

  return agent;
};
