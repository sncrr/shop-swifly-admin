import { Yup } from "../exporter/packages";

export class GlobalOverrider {
  readonly value: string = '';
  readonly useGlobal: boolean = true;
}

export const GlobalOverriderSchema = Yup.object({
  value: Yup.string(),
  useGlobal: Yup.bool(),
});
