import { useState } from "react"

import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import useBeans from "@/hooks/useBeans"

import { Skeleton } from "./ui/skeleton"
import BeansCard from "./BeansCard"
import BeanSelectGroup from "./SelectBeans"

const BeanList: React.FC = () => {
  const [selectedGroupName, setSelectedGroupName] = useState<
    string | undefined
  >(undefined)
  const [selectedSugarFree, setSelectedSugarFree] = useState<
    string | undefined
  >(undefined)

  const [sortingData, setSortingData] = useState(false)

  const {
    beans,
    isLoading,
    isFetching,
    totalCount,
    loadMoreBeans,
    setBeans,
    setPageIndex,
    error,
  } = useBeans(selectedGroupName, selectedSugarFree)

  useInfiniteScroll(beans.length < totalCount ? loadMoreBeans : undefined)

  const handleGroupNameChange = (value: string) => {
    setSelectedGroupName(value)
    setPageIndex(1)
    setBeans([])
    setSortingData(true)
  }

  const handleSugarFreeChange = (value: string) => {
    setSelectedSugarFree(value)
    setPageIndex(1)
    setBeans([])
  }

  if (error) {
    return <div>Error: {error.toString()}</div>
  }

  return (
    <>
      <BeanSelectGroup
        handleGroupNameChange={handleGroupNameChange}
        handleSugarFreeChange={handleSugarFreeChange}
      />

      {totalCount === 0 && sortingData && <h2>The list is empty</h2>}

      <ul className="flex flex-col gap-5 lg:grid grid-cols-3">
        {beans.map(bean => (
          <BeansCard key={bean.beanId} {...bean} />
        ))}
      </ul>

      {sortingData && totalCount !== 0 && totalCount !== beans.length && (
        <div className="flex flex-col gap-5 lg:grid grid-cols-3 w-full mt-5">
          <Skeleton className="w-full h-[223px]" />
          <Skeleton className="w-full h-[223px]" />
          <Skeleton className="w-full h-[223px]" />
        </div>
      )}

      {(isLoading || isFetching) && (
        <div className="flex flex-col gap-5 lg:grid grid-cols-3 w-full mt-5">
          <Skeleton className="w-full h-[223px]" />
          <Skeleton className="w-full h-[223px]" />
          <Skeleton className="w-full h-[223px]" />
        </div>
      )}
    </>
  )
}

export default BeanList
