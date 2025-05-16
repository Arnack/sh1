"use client"

import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react"
import Autocomplete from "../components/Autocomplete1"
import AutocompleteSimple from "../components/autocompleteSimple"
import { InputWithHistory } from "../components/inputWithHistory"
import { AdvancedTable } from '../components/AdvancedTable'
import { DataTable } from '../components/DataTable'
import { ColumnDef } from "@tanstack/react-table"

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', department: 'Engineering', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', department: 'Design', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', department: 'Engineering', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', department: 'Engineering', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Designer', department: 'Design', status: 'Inactive' },
];

const columns = [
  { key: 'name' as const, header: 'Name', sortable: true, filterable: true, groupable: true },
  { key: 'email' as const, header: 'Email', sortable: true, filterable: true },
  { key: 'role' as const, header: 'Role', sortable: true, filterable: true, groupable: true },
  { key: 'department' as const, header: 'Department', sortable: true, filterable: true, groupable: true },
  { key: 'status' as const, header: 'Status', sortable: true, filterable: true, groupable: true },
];

const dataTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

export default function Test1Page() {
  return (
    <Container maxW="container.xl" py={10} pt={20}>
      <Card>
        <CardHeader>
          <Heading size="md">Component Examples</Heading>
        </CardHeader>
        <CardBody>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Autocomplete</Tab>
              <Tab>Input with History</Tab>
              <Tab>Advanced Table</Tab>
              <Tab>Data Table</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Heading size="sm" mb={4}>Autocomplete with Chakra UI</Heading>
                <Autocomplete />
              </TabPanel>

              <TabPanel>
                <Heading size="sm" mb={4}>Input with History</Heading>
                <InputWithHistory />
              </TabPanel>

              <TabPanel>
                <Heading size="sm" mb={4}>Advanced Table Example</Heading>
                <AdvancedTable
                  data={sampleData}
                  columns={columns}
                  defaultGroupBy="department"
                />
              </TabPanel>

              <TabPanel>
                <Heading size="sm" mb={4}>Data Table Example</Heading>
                <DataTable
                  data={sampleData}
                  columns={dataTableColumns}
                  groupingOptions={['department', 'role', 'status']}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Container>
  )
}
