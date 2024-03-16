import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export default function Container({ className, children }: ContainerProps) {
  return <div className={cn("container px-2 sm:px-4 md:px-8", className)}>{children}</div>;
}
