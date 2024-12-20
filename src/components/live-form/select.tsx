"use client";

import * as React from "react";
import { type CSSProperties, forwardRef, useId } from "react";
import type { LiveFormField } from "./input-type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { useLiveFormContext } from "./form";

//  RadixSelectProps {
//   children?: React.ReactNode;
//   value?: string;
//   defaultValue?: string;
//   onValueChange?(value: string): void;
//   open?: boolean;
//   defaultOpen?: boolean;
//   onOpenChange?(open: boolean): void;
//   dir?: Direction;
//   name?: string;
//   autoComplete?: string;
//   disabled?: boolean;
//   required?: boolean;
// }

interface FormSelectProps extends LiveFormField<string> {
  style?: CSSProperties;
  options: string[];
  collapse?: boolean;
}

const FormSelect = forwardRef<HTMLInputElement, FormSelectProps>(
  (props, ref) => {
    const {
      name,
      value,
      onChange,
      leftSection,
      rightSection,
      options,
      collapse,
      required,
      label,
      ...moreProps
    } = useLiveFormContext(props);
    const uuid = useId();

    const t = { select: "Select" };

    return (
      <div
        className={cn("flex flex-grow", collapse ? "gap-3 pt-3" : "flex-col")}
      >
        <Label label={label} copyValue={value} required={required} />

        <Select onValueChange={(value) => onChange?.(value)} value={value}>
          <SelectTrigger>
            <SelectValue placeholder={`${t.select} ...`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group</SelectLabel>
              {options.map((val, index) => (
                <SelectItem value={val} key={`${uuid}:${index}`}>
                  {val}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
