import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectFilterProps = {
  onChange: (value: string) => void;
};

export const SelectFilter = ({ onChange }: SelectFilterProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordenar por</SelectLabel>
          <SelectItem value="padrao">Relevantes</SelectItem>
          <SelectItem value="menor">Menor Preço</SelectItem>
          <SelectItem value="maior">Maior Preço</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
