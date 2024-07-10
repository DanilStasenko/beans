import { useCallback, useEffect, useState } from "react"

import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import type { Combo } from "@/app/types"

import { Skeleton } from "./ui/skeleton"
import { useGetComboQuery } from "@/app/services/comboApi"

const ComboList: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [combo, setCombo] = useState<Combo[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const {
    data: comboResponse,
    error,
    isLoading,
  } = useGetComboQuery({ pageIndex, pageSize: 16 })

  const loadMoreCombo = useCallback(() => {
    if (isLoading || isFetching || combo.length >= totalCount) return

    setIsFetching(true)
    setPageIndex(prev => prev + 1)
  }, [isLoading, isFetching, combo.length, totalCount])

  useInfiniteScroll(combo.length < totalCount ? loadMoreCombo : undefined)

  useEffect(() => {
    if (comboResponse && !isLoading) {
      setCombo(prev => [...prev, ...comboResponse.items])
      setIsFetching(false)
      setTotalCount(comboResponse.totalCount)
    }
  }, [comboResponse, isLoading])

  if (error) {
    return <div>Error: {error.toString()}</div>
  }

  return (
    <>
      <ul className="flex flex-col gap-5 lg:grid grid-cols-4">
        {combo.map(item => (
          <li
            key={item.combinationId}
            className="border-2 rounded-md shadow-md bg-muted py-6 px-3"
          >
            <h2 className="text-xl">{item.name}</h2>
            <p className="mt-3">{item.tag}</p>
          </li>
        ))}
      </ul>
      {isLoading || isFetching ? (
        <div className="gap-5 lg:grid grid-cols-4">
          <Skeleton className="w-full h-[140px] mt-5" />
          <Skeleton className="w-full h-[140px] mt-5" />
          <Skeleton className="w-full h-[140px] mt-5" />
          <Skeleton className="w-full h-[140px] mt-5" />
        </div>
      ) : null}
    </>
  )
}

export default ComboList
