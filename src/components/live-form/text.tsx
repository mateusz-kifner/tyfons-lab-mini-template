import { forwardRef, useEffect, useRef, type CSSProperties } from "react";
import type { LiveFormField } from "./input-type";
import { Label } from "../ui/label";
import { useMergedRef } from "@mantine/hooks";
import { useLiveFormContext } from "./form";
import { cn } from "@/lib/utils";

interface LiveFormTextProps extends LiveFormField<string> {
  style?: CSSProperties;
}
const LiveFormText = forwardRef<HTMLTextAreaElement, LiveFormTextProps>(
  (props, ref) => {
    const {
      label,
      disabled,
      required,
      value,
      onChange,
      style,
      className,
      leftSection,
      rightSection,
      name,
      ...moreProps
    } = useLiveFormContext(props);

    const setTextAreaHeight = (target: HTMLTextAreaElement) => {
      target.style.height = "0";
      target.style.height = `${Math.max(target.scrollHeight, 38)}px`;
    };

    const TextAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const combinedRef = useMergedRef(ref, TextAreaRef);

    // biome-ignore lint/correctness/useExhaustiveDependencies: This warning is incorrect
    useEffect(() => {
      if (TextAreaRef.current !== null) {
        setTextAreaHeight(TextAreaRef.current);
      }
    }, [TextAreaRef.current]);

    return (
      <div style={style} className={cn("grow", className)}>
        <Label label={label} copyValue={value} required={required} />
        <div className="flex w-full items-center gap-2 rounded-md border border-input bg-background px-2 text-gray-300 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 has-[:focus-visible]:text-stone-400 has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring dark:text-stone-600 dark:has-[:focus-visible]:text-stone-500">
          {!!leftSection && leftSection}
          <textarea
            disabled={disabled}
            // required={required}
            value={value}
            className="flex w-full resize-none overflow-hidden whitespace-pre-line break-words bg-transparent pt-[0.5625rem] pb-2 text-sm text-stone-800 outline-none file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none dark:text-stone-200"
            onInput={(e) => setTextAreaHeight(e.target as HTMLTextAreaElement)}
            onChange={(e) => onChange?.(e.target.value)}
            ref={combinedRef}
            {...moreProps}
          />
          {!!rightSection && rightSection}
        </div>
      </div>
    );
  },
);

LiveFormText.displayName = "LiveFormText";

export default LiveFormText;
