import { assureString } from "@/mappers";
import { AiMessageResponse } from "@/types";
import { get } from "lodash-es";

export const assureAiMessageResponse = (val: unknown): AiMessageResponse => {
  const maybeMessage = get(val, "message");

  return {
    message: assureString(maybeMessage, "assureAiMessageResponse.message"),
  };
};
