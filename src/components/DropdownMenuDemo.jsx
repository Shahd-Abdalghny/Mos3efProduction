/** @format */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function DropdownMenuDemo({ isMine , onEdit, onDelete  }) {
    if (!isMine) return null; // Don't render the menu if the review isn't mine
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-6 h-6 flex items-center justify-center text-xl text-white">
          ⋮
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-Green border-none text-Blue-900 [direction:rtl] "
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onEdit}>
            تعديل
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>حذف</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
