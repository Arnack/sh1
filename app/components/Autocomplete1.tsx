import { useState, useRef, useEffect } from "react"
import { Box, Input, List, ListItem, Text, useColorModeValue, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"

// Sample data - replace with your actual data
const entities = [
  { code: "ABC", name: "Acme Business Corp" },
  { code: "BCD", name: "Blue Cloud Development" },
  { code: "CDE", name: "Creative Digital Enterprises" },
  { code: "DEF", name: "Dynamic Engineering Firm" },
  { code: "EFG", name: "Evergreen Financial Group" },
  { code: "FGH", name: "Future Growth Holdings" },
  { code: "GHI", name: "Global Healthcare Industries" },
  { code: "HIJ", name: "Horizon Innovation Junction" },
  { code: "IJK", name: "Infinite Journey Knowledge" },
  { code: "JKL", name: "Jade Kingdom Logistics" }
]

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState("")
  const [filteredItems, setFilteredItems] = useState(entities)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const highlightBg = useColorModeValue("yellow.200", "yellow.600")
  const hoverBg = useColorModeValue("gray.100", "gray.700")
  const selectedBg = useColorModeValue("blue.100", "blue.700")

  useEffect(() => {
    const filtered = entities.filter(item => 
      item.code.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    )
    setFilteredItems(filtered.slice(0, 7))
    setSelectedIndex(filtered.length === 1 ? 0 : -1)
  }, [inputValue])

  const highlightText = (text: string) => {
    if (!inputValue) return text
    const regex = new RegExp(`(${inputValue})`, 'gi')
    return text.split(regex).map((part, i) => 
      regex.test(part) ? (
        <Text as="span" key={i} bg={highlightBg}>{part}</Text>
      ) : part
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredItems.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          const selected = filteredItems[selectedIndex]
          setInputValue(`${selected.name}`)
          setIsOpen(false)
        }
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }

  const handleClear = () => {
    setInputValue("")
    setIsOpen(false)
  }

  return (
    <Box position="relative" width="100%" maxW="600px">
      <InputGroup>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setIsOpen(true)
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setHasFocus(true)
            setIsOpen(true)
          }}
          onBlur={() => {
            setTimeout(() => setIsOpen(false), 100)
            setTimeout(() => setHasFocus(false), 100)
          }}
          placeholder="Search by code or name..."
        />
        {inputValue && (
          <InputRightElement>
            <IconButton
              aria-label="Clear input"
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              onClick={handleClear}
            />
          </InputRightElement>
        )}
      </InputGroup>
      
      {isOpen && hasFocus && filteredItems.length > 0 && (
        <List
          ref={listRef}
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={2}
          maxH="300px"
          overflowY="auto"
          borderWidth={1}
          borderRadius="md"
          boxShadow="sm"
          bg={useColorModeValue("white", "gray.800")}
          zIndex={10}
        >
          {filteredItems.map((item, index) => (
            <ListItem
              key={item.code}
              px={4}
              py={2}
              cursor="pointer"
              position="relative"
              zIndex={10}
              bg={selectedIndex === index ? selectedBg : "transparent"}
              _hover={{ bg: selectedIndex === index ? selectedBg : hoverBg }}
              onClick={() => {
                console.log(item)
                setInputValue(item.name)
                // setInputValue(`${selected.name}`)
                setIsOpen(false)
              }}
            >
              <div style={{ display: 'flex', gap: '40px' }}>
                <Text
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  fontWeight={500}
                  color="gray.500"
                  fontSize="sm"
                >
                  {highlightText(item.code)}
                </Text>
                <Text
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  fontWeight={500}
                >
                  {highlightText(item.name)}
                </Text>
              </div>
            </ListItem>
          ))}
        </List>
      )}

      {selectedIndex >= 0 && filteredItems.length > 0 && !isOpen && (
          <Text fontSize="sm" color="gray.500">
            {filteredItems[selectedIndex].name}
          </Text>
      )}
    </Box>
  )
}

export default Autocomplete;
