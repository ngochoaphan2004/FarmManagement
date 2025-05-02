import { Table, Column } from "@tanstack/react-table";
import React from "react";
import CustomDropdown from "./Dropdown";
// use for setting times bettween API calls, that is to say,
// after  debounce=500 the api would be fired then
export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

//For filter, number type woud go for max and min,
// string type would go for search
export default function Filter({
  column,
  table,
  title,
  type,
  options,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
  title: string;
  type: string;
  options?: { [key: string]: any };
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );
  return (
    <div className="dark:text-white font-base flex mt-4 gap-3">
      {title}:
      {type === "selection" ? (
        <CustomDropdown
          label="Choose"
          options={Object.keys(options)}
          selectedOption={(columnFilterValue ?? "") as string}
          onSelectOption={(value) => {
            column.setFilterValue([options[value], options[value]]);
          }}
        />
      ) : type === "range" ? (
        <div>
          <div className="flex space-x-2">
            <DebouncedInput
              type="number"
              min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
              max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
              value={(columnFilterValue as [number, number])?.[0] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old: [number, number]) => [
                  value,
                  old?.[1],
                ])
              }
              placeholder={`From ${
                column.getFacetedMinMaxValues()?.[0]
                  ? `(${column.getFacetedMinMaxValues()?.[0]})`
                  : ""
              }`}
              className="w-24 border shadow rounded text-black pl-2"
            />
            <DebouncedInput
              type="number"
              min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
              max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
              value={(columnFilterValue as [number, number])?.[1] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old: [number, number]) => [
                  old?.[0],
                  value,
                ])
              }
              placeholder={`To ${
                column.getFacetedMinMaxValues()?.[1]
                  ? `(${column.getFacetedMinMaxValues()?.[1]})`
                  : ""
              }`}
              className="w-24 border shadow rounded text-black pl-2"
            />
          </div>
          <div className="h-1" />
        </div>
      ) : (
        <>
          <datalist id={column.id + "list"}>
            {sortedUniqueValues.slice(0, 5000).map((value: any) => (
              <option value={value} key={value} />
            ))}
          </datalist>
          <DebouncedInput
            type="text"
            value={(columnFilterValue ?? "") as string}
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`Search...`}
            className="w-36 border shadow rounded text-black dark:text-white pl-2"
            list={column.id + "list"}
          />
          <div className="h-1" />
        </>
      )}
    </div>
  );
}
