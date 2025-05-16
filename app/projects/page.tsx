"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Progress,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react"
import {
  AddIcon,
  CalendarIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  HamburgerIcon,
  TimeIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  WarningIcon,
} from "@chakra-ui/icons"

// Mock data for projects
const projectsData = [
  {
    id: "PRJ001",
    name: "Website Redesign",
    status: "Completed",
    priority: "High",
    deadline: "2023-12-15",
    progress: 100,
    client: "Acme Corp",
    budget: 15000,
  },
  {
    id: "PRJ002",
    name: "Mobile App Development",
    status: "In Progress",
    priority: "High",
    deadline: "2024-03-30",
    progress: 65,
    client: "TechStart Inc",
    budget: 45000,
  },
  {
    id: "PRJ003",
    name: "Marketing Campaign",
    status: "In Progress",
    priority: "Medium",
    deadline: "2024-02-28",
    progress: 40,
    client: "Global Retail",
    budget: 12000,
  },
  {
    id: "PRJ004",
    name: "Database Migration",
    status: "On Hold",
    priority: "Low",
    deadline: "2024-04-15",
    progress: 20,
    client: "FinServe Ltd",
    budget: 8000,
  },
  {
    id: "PRJ005",
    name: "CRM Implementation",
    status: "Not Started",
    priority: "Medium",
    deadline: "2024-05-01",
    progress: 0,
    client: "Healthcare Plus",
    budget: 30000,
  },
  {
    id: "PRJ006",
    name: "Security Audit",
    status: "Completed",
    priority: "High",
    deadline: "2023-11-30",
    progress: 100,
    client: "BankSecure",
    budget: 22000,
  },
  {
    id: "PRJ007",
    name: "Content Strategy",
    status: "In Progress",
    priority: "Low",
    deadline: "2024-02-15",
    progress: 75,
    client: "Media Group",
    budget: 7500,
  },
  {
    id: "PRJ008",
    name: "E-commerce Platform",
    status: "In Progress",
    priority: "High",
    deadline: "2024-06-30",
    progress: 30,
    client: "Retail Chain",
    budget: 60000,
  },
]

type SortConfig = {
  key: keyof (typeof projectsData)[0] | null
  direction: "asc" | "desc"
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })

  // Responsive display settings
  const isMobile = useBreakpointValue({ base: true, md: false })
  const isTablet = useBreakpointValue({ base: true, lg: false })

  // Handle sorting
  const requestSort = (key: keyof (typeof projectsData)[0]) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Get sorted and filtered data
  const getSortedProjects = () => {
    const filteredProjects = projectsData.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.status.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (sortConfig.key) {
      return [...filteredProjects].sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }
    return filteredProjects
  }

  const sortedProjects = getSortedProjects()

  // Render sort indicator
  const renderSortIndicator = (key: keyof (typeof projectsData)[0]) => {
    if (sortConfig.key !== key) {
      return <Icon as={ChevronDownIcon} ml={1} w={4} h={4} />
    }
    return sortConfig.direction === "asc" ? (
      <Icon as={TriangleUpIcon} ml={1} w={3} h={3} />
    ) : (
      <Icon as={TriangleDownIcon} ml={1} w={3} h={3} />
    )
  }

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Tag colorScheme="green" size="md">
            <Icon as={CheckCircleIcon} mr={1} /> {status}
          </Tag>
        )
      case "In Progress":
        return (
          <Tag colorScheme="blue" size="md">
            <Icon as={TimeIcon} mr={1} /> {status}
          </Tag>
        )
      case "On Hold":
        return (
          <Tag colorScheme="yellow" size="md">
            {status}
          </Tag>
        )
      case "Not Started":
        return (
          <Tag colorScheme="gray" variant="outline" size="md">
            <Icon as={WarningIcon} mr={1} /> {status}
          </Tag>
        )
      default:
        return <Tag size="md">{status}</Tag>
    }
  }

  return (
    <Container maxW="container.xl" py={10} pt={20}>
      <Card>
        <CardHeader>
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ md: "center" }} gap={4}>
            <Box>
              <Heading size="md">Projects</Heading>
              <Text color="gray.500">Manage your projects and track their progress</Text>
            </Box>
            <Flex direction={{ base: "column", sm: "row" }} gap={2}>
              <Input
                placeholder="Filter projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                width={{ base: "full", sm: "250px" }}
              />
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <TableContainer borderWidth="1px" borderRadius="md">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th cursor="pointer" onClick={() => requestSort("name")}>
                    <Flex align="center">
                      Project Name
                      {renderSortIndicator("name")}
                    </Flex>
                  </Th>
                  <Th cursor="pointer" onClick={() => requestSort("client")}>
                    <Flex align="center">
                      Client
                      {renderSortIndicator("client")}
                    </Flex>
                  </Th>
                  <Th cursor="pointer" onClick={() => requestSort("status")}>
                    <Flex align="center">
                      Status
                      {renderSortIndicator("status")}
                    </Flex>
                  </Th>
                  {!isMobile && (
                    <Th cursor="pointer" onClick={() => requestSort("priority")}>
                      <Flex align="center">
                        Priority
                        {renderSortIndicator("priority")}
                      </Flex>
                    </Th>
                  )}
                  {!isMobile && (
                    <Th cursor="pointer" onClick={() => requestSort("deadline")}>
                      <Flex align="center">
                        Deadline
                        {renderSortIndicator("deadline")}
                      </Flex>
                    </Th>
                  )}
                  {!isTablet && (
                    <Th cursor="pointer" onClick={() => requestSort("budget")}>
                      <Flex align="center">
                        Budget
                        {renderSortIndicator("budget")}
                      </Flex>
                    </Th>
                  )}
                  {!isTablet && <Th>Progress</Th>}
                  <Th width="50px"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedProjects.length > 0 ? (
                  sortedProjects.map((project) => (
                    <Tr key={project.id}>
                      <Td fontWeight="medium">{project.name}</Td>
                      <Td>{project.client}</Td>
                      <Td>{renderStatusBadge(project.status)}</Td>
                      {!isMobile && <Td>{project.priority}</Td>}
                      {!isMobile && (
                        <Td>
                          <Flex align="center">
                            <Icon as={CalendarIcon} mr={2} color="gray.500" />
                            {new Date(project.deadline).toLocaleDateString()}
                          </Flex>
                        </Td>
                      )}
                      {!isTablet && <Td>${project.budget.toLocaleString()}</Td>}
                      {!isTablet && (
                        <Td>
                          <Progress value={project.progress} size="sm" colorScheme="teal" borderRadius="full" mb={1} />
                          <Text fontSize="xs" color="gray.500">
                            {project.progress}%
                          </Text>
                        </Td>
                      )}
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem>View details</MenuItem>
                            <MenuItem>Edit project</MenuItem>
                            <MenuDivider />
                            <MenuItem>Archive project</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={8} textAlign="center" py={10}>
                      No projects found.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Container>
  )
}
