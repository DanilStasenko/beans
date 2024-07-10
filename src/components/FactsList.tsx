import { useCallback, useEffect, useState } from "react"

import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import type { Fact } from "@/app/types"
import { useGetFactsQuery } from "@/app/services/factsApi"

import { Skeleton } from "./ui/skeleton"

const FactsList: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [facts, setFacts] = useState<Fact[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const {
    data: factsResponse,
    error,
    isLoading,
  } = useGetFactsQuery({ pageIndex, pageSize: 10 })

  const loadMoreFacts = useCallback(() => {
    if (isLoading || isFetching || facts.length >= totalCount) return

    setIsFetching(true)
    setPageIndex(prev => prev + 1)
  }, [isLoading, isFetching, facts.length, totalCount])

  useInfiniteScroll(facts.length < totalCount ? loadMoreFacts : undefined)

  useEffect(() => {
    if (factsResponse && !isLoading) {
      setFacts(prev => [...prev, ...factsResponse.items])
      setIsFetching(false)
      setTotalCount(factsResponse.totalCount)
    }
  }, [factsResponse, isLoading])

  if (error) {
    return <div>Error: {error.toString()}</div>
  }

  return (
    <>
      <ul className="flex flex-col gap-5 ">
        {facts.map(fact => (
          <li
            key={fact.factId}
            className="border-2 rounded-md shadow-md bg-muted py-6 px-3"
          >
            <h2 className="text-xl">{fact.title}</h2>
            <p className="mt-3">{fact.description}</p>
          </li>
        ))}
      </ul>
      {isLoading || isFetching ? (
        <Skeleton className="w-full h-[90px] mt-5" />
      ) : null}
    </>
  )
}

export default FactsList
