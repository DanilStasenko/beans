import { useCallback, useEffect, useState } from "react"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { useGetRecipesQuery } from "@/app/services/recipesApi"
import type { Recipe } from "@/app/types"

import { Skeleton } from "./ui/skeleton"
import RecipeCard from "./RecipeCard"

const RecipesList: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const {
    data: recipesResponse,
    error,
    isLoading,
  } = useGetRecipesQuery({ pageIndex, pageSize: 10 })

  const loadMoreRecipes = useCallback(() => {
    if (isLoading || isFetching || recipes.length >= totalCount) return

    setIsFetching(true)
    setPageIndex(prev => prev + 1)
  }, [isLoading, isFetching, recipes.length, totalCount])

  useInfiniteScroll(recipes.length < totalCount ? loadMoreRecipes : undefined)

  useEffect(() => {
    if (recipesResponse && !isLoading) {
      setRecipes(prev => [...prev, ...recipesResponse.items])
      setIsFetching(false)
      setTotalCount(recipesResponse.totalCount)
    }
  }, [recipesResponse, isLoading])

  if (error) {
    return <div>Error: {error.toString()}</div>
  }

  return (
    <>
      <ul className="flex flex-col gap-5 ">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.recipeId} {...recipe} />
        ))}
      </ul>
      {isLoading || isFetching ? (
        <Skeleton className="w-full h-[90px] mt-5" />
      ) : null}
    </>
  )
}

export default RecipesList
