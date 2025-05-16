'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  Box,
  IconButton,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
}

interface AdvancedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  defaultGroupBy?: keyof T;
}

interface GroupedData<T> {
  key: string;
  items: T[];
  isExpanded: boolean;
}

export function AdvancedTable<T extends Record<string, any>>({
  data,
  columns,
  defaultGroupBy,
}: AdvancedTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});
  const [groupBy, setGroupBy] = useState<keyof T | undefined>(defaultGroupBy);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const headerBg = useColorModeValue('gray.50', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = String(item[key as keyof T]).toLowerCase();
        return itemValue.includes(value.toLowerCase());
      });
    });
  }, [data, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Group data
  const groupedData = useMemo(() => {
    if (!groupBy) return [{ key: 'all', items: sortedData, isExpanded: true }];

    const groups: GroupedData<T>[] = [];
    const groupMap = new Map<string, T[]>();

    sortedData.forEach((item) => {
      const groupKey = String(item[groupBy]);
      if (!groupMap.has(groupKey)) {
        groupMap.set(groupKey, []);
      }
      groupMap.get(groupKey)!.push(item);
    });

    groupMap.forEach((items, key) => {
      groups.push({
        key,
        items,
        isExpanded: expandedGroups.has(key),
      });
    });

    return groups;
  }, [sortedData, groupBy, expandedGroups]);

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilter = (key: keyof T, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((current) => {
      const newSet = new Set(current);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  };

  return (
    <Box w="full" overflowX="auto">
      <Flex mb={4} alignItems="center" gap={4}>
        <Select
          value={groupBy as string}
          onChange={(e) => setGroupBy(e.target.value as keyof T)}
          size="md"
        >
          <option value="">No Grouping</option>
          {columns
            .filter((col) => col.groupable)
            .map((col) => (
              <option key={String(col.key)} value={String(col.key)}>
                Group by {col.header}
              </option>
            ))}
        </Select>
      </Flex>

      <Table variant="simple">
        <Thead bg={headerBg}>
          <Tr>
            {groupBy && <Th w="10" px={6} py={3}></Th>}
            {columns.map((column) => (
              <Th
                key={String(column.key)}
                px={6}
                py={3}
                textTransform="uppercase"
                fontSize="xs"
                fontWeight="medium"
                color="gray.500"
              >
                <Flex alignItems="center" gap={2}>
                  {column.header}
                  {column.sortable && (
                    <IconButton
                      aria-label={`Sort by ${column.header}`}
                      icon={
                        sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUpIcon />
                          ) : (
                            <ChevronDownIcon />
                          )
                        ) : (
                          <ChevronUpIcon opacity={0.5} />
                        )
                      }
                      size="xs"
                      variant="ghost"
                      onClick={() => handleSort(column.key)}
                    />
                  )}
                  {column.filterable && (
                    <Input
                      placeholder="Filter..."
                      size="sm"
                      w="24"
                      value={filters[column.key] || ''}
                      onChange={(e) => handleFilter(column.key, e.target.value)}
                    />
                  )}
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {groupedData.map((group) => (
            <React.Fragment key={group.key}>
              {groupBy && (
                <Tr bg={headerBg}>
                  <Td px={6} py={4}>
                    <IconButton
                      aria-label={group.isExpanded ? 'Collapse group' : 'Expand group'}
                      icon={
                        group.isExpanded ? (
                          <ChevronDownIcon />
                        ) : (
                          <ChevronRightIcon />
                        )
                      }
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleGroup(group.key)}
                    />
                  </Td>
                  <Td colSpan={columns.length} px={6} py={4}>
                    <Text fontWeight="medium">
                      {group.key} ({group.items.length})
                    </Text>
                  </Td>
                </Tr>
              )}
              {group.isExpanded &&
                group.items.map((item, index) => (
                  <Tr
                    key={index}
                    _hover={{ bg: hoverBg }}
                    borderBottom="1px"
                    borderColor={borderColor}
                  >
                    {groupBy && <Td px={6} py={4}></Td>}
                    {columns.map((column) => (
                      <Td
                        key={String(column.key)}
                        px={6}
                        py={4}
                        whiteSpace="nowrap"
                        fontSize="sm"
                        color="gray.500"
                      >
                        {item[column.key]}
                      </Td>
                    ))}
                  </Tr>
                ))}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
} 