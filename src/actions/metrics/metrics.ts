export const missedAndDeclinedCalls = async () => {
  const missedAndDeclinedCalls = 10; //await db.call.findMany({where:{}})
  const totalNumberOfCalls = 20; //await db.call.findMany({where:{}})

  return (missedAndDeclinedCalls / totalNumberOfCalls) * 100 || null;
};

export const callAbandonmentRate = async () => {
  const calls = 20; //await db.call.findMany({where:{}})
  const abandonedCalls = 10; //await db.call.findMany({where:{}})

  return abandonedCalls / calls || null;
};

export const firstContactResolutionRate = async () => {
  const calls = 20;
  const resolvedCalls = 15;

  return (resolvedCalls / calls) * 100 || null;
};

export const avgHandleTime = async (agent?: string) => {
  let calls;
  let totalHandleTime;

  if (agent) {
    calls = 2;
    totalHandleTime = 15;
  } else {
    calls = 20;
    totalHandleTime = 300;
  }

  return totalHandleTime / calls || null;
};
