"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getGroupedRowModel,
  GroupingState,
} from "@tanstack/react-table"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react"
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  groupingOptions?: string[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  groupingOptions = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [grouping, setGrouping] = React.useState<GroupingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGroupingChange: setGrouping,
    getGroupedRowModel: getGroupedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      grouping,
      globalFilter,
    },
  })

  return (
    <Box gap={4} display="flex" flexDirection="column">
      <Flex justify="space-between" align="center">
        <Input
          placeholder="Filter all columns..."
          value={globalFilter ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(event.target.value)}
          maxW="sm"
        />
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Group By
          </MenuButton>
          <MenuList>
            {groupingOptions.map((option) => (
              <MenuItem key={option}>
                <Checkbox
                  isChecked={grouping.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setGrouping([...grouping, option])
                    } else {
                      setGrouping(grouping.filter((g) => g !== option))
                    }
                  }}
                >
                  {option}
                </Checkbox>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <Box borderWidth={1} borderRadius="md" overflow="hidden">
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {cell.getIsGrouped() ? (
                        <Flex align="center" gap={2}>
                          <IconButton
                            aria-label={row.getIsExpanded() ? "Collapse" : "Expand"}
                            icon={row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />}
                            size="sm"
                            variant="ghost"
                            onClick={row.getToggleExpandedHandler()}
                          />
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                          <Text ml={2}>({row.subRows.length})</Text>
                        </Flex>
                      ) : cell.getIsAggregated() ? (
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length} textAlign="center" h="24">
                  No results.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Flex justify="flex-end" gap={2}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </Flex>
    </Box>
  )
} 