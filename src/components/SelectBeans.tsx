import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

interface SelectGroupProps {
  handleGroupNameChange: (value: string) => void
  handleSugarFreeChange: (value: string) => void
}

const BeanSelectGroup: React.FC<SelectGroupProps> = ({
  handleGroupNameChange,
  handleSugarFreeChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-5">
      <div>
        <p className="mb-2">Sort by Group Name:</p>
        <Select onValueChange={handleGroupNameChange} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by Group Name:" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by Group Name:</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Jelly Belly Official Flavors">
                Jelly Belly Official Flavors
              </SelectItem>
              <SelectItem value="Superfruit Flavors">
                Superfruit Flavors
              </SelectItem>
              <SelectItem value="Cold Stone® Flavors">
                Cold Stone® Flavors
              </SelectItem>
              <SelectItem value="Kids Mix Flavors">Kids Mix Flavors</SelectItem>
              <SelectItem value="Tropical Mix Flavors">
                Tropical Mix Flavors
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <p className="mb-2">Sort by Sugar:</p>
        <Select onValueChange={handleSugarFreeChange} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by Sugar:" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by Sugar:</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default BeanSelectGroup
