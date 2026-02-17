"use client"

import * as React from "react"
import * as SliderPrimitives from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
    className,
    ...props
}: React.ComponentProps<typeof SliderPrimitives.Root>) {
    return (
        <SliderPrimitives.Root
            data-slot="slider"
            className={cn(
                "relative flex w-full touch-none select-none items-center",
                className
            )}
            {...props}
        >
            <SliderPrimitives.Track
                data-slot="slider-track"
                className="bg-slate-200 dark:bg-slate-800 relative h-1.5 w-full grow overflow-hidden rounded-full"
            >
                <SliderPrimitives.Range
                    data-slot="slider-range"
                    className="bg-primary absolute h-full"
                />
            </SliderPrimitives.Track>
            <SliderPrimitives.Thumb
                data-slot="slider-thumb"
                className="border-primary bg-white ring-offset-background focus-visible:ring-ring block h-4 w-4 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            />
        </SliderPrimitives.Root>
    )
}

export { Slider }
