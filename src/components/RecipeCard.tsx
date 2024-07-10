import type { Recipe } from "@/app/types"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"

const RecipeCard: React.FC<Recipe> = ({
  name,
  description,
  imageUrl,
  ingredients,
  directions,
}) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <li className="border-2 rounded-md shadow-md bg-muted py-6 px-3">
          <h2 className="text-xl">{name}</h2>
          <p className="mt-3">{description}</p>
        </li>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">{name}</DrawerTitle>
          <DrawerDescription>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-6">
                <div className="rounded-md overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={name}
                    width={200}
                    className="w-[200px] aspect-auto"
                  />
                </div>
                <ul>
                  <li className="font-bold">Ingredients</li>
                  {ingredients.map((item, index) => (
                    <li key={item} className="text-sm">
                      <span className="mr-2">{`${index + 1}.`}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="hidden lg:inline-block text-xs">
                {directions.join(" ")}
              </p>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default RecipeCard
