import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import type { Bean } from "@/app/types"

const BeansCard: React.FC<Bean> = ({
  flavorName,
  description,
  imageUrl,
  ingredients,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <li className="border-2 rounded-md shadow-md bg-muted py-6 px-3 flex flex-col items-center gap-2 ease-linear duration-200 hover:scale-[1.03] cursor-pointer ">
            <h2 className="text-xl text-center">{flavorName}</h2>
            <img
              src={imageUrl}
              alt={description}
              height={80}
              className="h-[80px]"
            />
            <span className="text-center">{description}</span>
          </li>
        </TooltipTrigger>
        <TooltipContent>
          <ul className="grid grid-cols-2 gap-x-3">
            {ingredients.map((item, index) => (
              <li key={index} className="text-xs">
                {item}
              </li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default BeansCard
