// import JobRouterClient, {
//   QueueLengthExceptionTrigger,
// } from "@azure-rest/communication-job-router";

// if (!process.env.ACS_ENDPOINT || !process.env.ACS_API_KEY) {
//   throw new Error("ACS_ENDPOINT or ACS_API_KEY is not set");
// }

// // Job Router Client
// const connectionString = `${process.env.ACS_ENDPOINT};${process.env.ACS_API_KEY}`;
// export const jobRouter = JobRouterClient(connectionString);

// const setupRouting = async () => {
//   const distributionPolicyId = "longest-idle-time-policy";
//   await jobRouter
//     .path(
//       "/routing/distributionPolicies/{distributionPolicyId}",
//       distributionPolicyId
//     )
//     .patch({
//       contentType: "application/merge-patch+json",
//       body: {
//         name: "Longest Idle Time",
//         mode: {
//           kind: "longestIdle",
//           minConcurrentOffers: 1,
//           maxConcurrentOffers: 5,
//           bypassSelectors: false,
//         },
//         offerExpiresAfterSeconds: 120,
//       },
//     });

//   // Define exception trigger for queue overflow
//   const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
//     kind: "queueLength",
//     threshold: 100,
//   };

//   // TODO: Understand this better
//   const exceptionPolicyId = "exception-policy-123";
//   await jobRouter
//     .path("/routing/exceptionPolicies/{exceptionPolicyId}", exceptionPolicyId)
//     .patch({
//       contentType: "application/merge-patch+json",
//       body: {
//         name: "test-policy",
//         exceptionRules: [
//           {
//             id: "MaxWaitTimeExceeded",
//             actions: [
//               {
//                 kind: "reclassify",
//                 classificationPolicyId: "Main",
//                 labelsToUpsert: {
//                   escalated: true,
//                 },
//               },
//             ],
//             trigger: queueLengthExceptionTrigger,
//           },
//         ],
//       },
//     });

//   const queueId = "queue-123";
//   await jobRouter.path("/routing/queues/{queueId}", queueId).patch({
//     contentType: "application/merge-patch+json",
//     body: {
//       distributionPolicyId: distributionPolicyId,
//       name: "General Queue",
//       labels: {},
//       exceptionPolicyId: "exception-policy-123",
//     },
//   });

//   const jobId = "router-job-123";
//   const result = await jobRouter.path("/routing/jobs/{jobId}", jobId).patch({
//     contentType: "application/merge-patch+json",
//     body: {
//       channelId: "ChatChannel",
//       queueId: queueId,
//       channelReference: "abc",
//       priority: 2,
//       labels: {},
//     },
//   });
// };
