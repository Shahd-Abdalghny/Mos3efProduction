import React from 'react'
import { Button } from './ui/button'
import { HeartIcon } from 'lucide-react'
export const HeartButton = () => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="z-10 absolute top-[19px] right-4 w-2 h-2 p-0"
            aria-label="Add to favorites">
            <HeartIcon className="w-6 h-6 fill-Blue-900 text-Blue-900" />
        </Button>
    )
}
