import { cn } from "@/Lib/utils";
import { ComponentProps } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 text-gray-900 dark:text-gray-100",
                className
            )}
            {...props}
        ></div>
    );
}
