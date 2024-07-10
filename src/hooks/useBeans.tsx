import { useState, useEffect, useCallback } from "react"

import { useGetBeansQuery } from "@/app/services/beansApi"
import type { Bean } from "@/app/types"

const useBeans = (
  selectedGroupName: string | undefined,
  selectedSugarFree: string | undefined,
) => {
  const [pageIndex, setPageIndex] = useState(1)
  const [beans, setBeans] = useState<Bean[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const {
    data: beansResponse,
    error,
    isLoading,
  } = useGetBeansQuery({
    pageIndex,
    pageSize: 12,
    groupName: selectedGroupName === "all" ? "" : selectedGroupName,
    sugarFree: selectedSugarFree === "all" ? "" : selectedSugarFree,
  })

  useEffect(() => {
    if (beansResponse && !isLoading) {
      setBeans(prev => [...prev, ...beansResponse.items])
      setIsFetching(false)
      setTotalCount(beansResponse.totalCount)
    }
  }, [beansResponse, isLoading])

  const loadMoreBeans = useCallback(() => {
    if (isLoading || isFetching || beans.length >= totalCount) return
    setIsFetching(true)
    setPageIndex(prev => prev + 1)
  }, [isLoading, isFetching, beans.length, totalCount])

  return {
    beans,
    isLoading,
    isFetching,
    totalCount,
    loadMoreBeans,
    setBeans,
    setPageIndex,
    error,
  }
}

export default useBeans
