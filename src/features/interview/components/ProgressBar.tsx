import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  label?: string;
  className?: string;
};

export function ProgressBar({ value, label = "Progress", className }: ProgressBarProps) {
  return (
    <Progress
      value={value}
      label={label}
      showValue
      className={cn(className)}
    />
  );
}
