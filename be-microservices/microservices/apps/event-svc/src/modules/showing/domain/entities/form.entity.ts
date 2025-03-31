import { JsonValue } from "@prisma/client/runtime/library";

export interface FormInput {
  id: number;
  formId: number;
  fieldName: string;
  type: string;
  required: boolean;
  regex?: string;
  options?: JsonValue;
}

export interface Form {
  id: number;
  name: string;
  FormInput: FormInput[];
}