"use server";

import { DisplayError } from "../display-error";
import { RecursiveUI } from "../recursive-ui";

export const CitationAction = async (
  previousState: any,
  formData: FormData
) => {
  // const searchResponse = await FindCitationByID(formData.get("id") as string);

  // if (searchResponse.status !== "OK") {
  //   return <DisplayError errors={searchResponse.errors} />;
  // }

  // if (searchResponse.status === "OK") {
  //   const document = searchResponse.response;

  //   return (
  //     <div className="flex flex-col gap-4 text-sm max-w-[430px]">
  //       <RecursiveUI documentField={document.content} />
  //     </div>
  //   );
  // }

  return (
    <div>
      This is a placeholder for content to appear when linked to an actual data
      source.
    </div>
  );
};

interface Prop {
  documentField: any;
}
