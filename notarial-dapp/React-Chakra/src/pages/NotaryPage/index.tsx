import React, { useState } from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  VStack,
  Text,
  Heading,
  Flex,
  List,
  ListItem,
  ListIcon,
  IconButton,
  Input,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack // Added HStack import
} from '@chakra-ui/react';
import { FiUpload, FiBell } from 'react-icons/fi';
import { MdPerson } from 'react-icons/md';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'; // Ensure these are imported
import Sidebar from '../../components/Layout';
import { useNotifications } from '../../components/Notifications'; // Ensure this import is correct

interface Client {
  name: string;
  id: string;
}

const NotaryDashboard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isNotificationOpen,
    onOpen: onNotificationOpen,
    onClose: onNotificationClose
  } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([{ name: "Client A", id: "1" }, { name: "Client B", id: "2" }]);
  const [contracts, setContracts] = useState<string[]>([]);
  const notaryName = "Notary Name";
  const { notifications } = useNotifications();

  const handleClientSelect = (client: string) => {
    setSelectedClient(client);
    setContracts(['HouseContract/10.05.2022', 'CarContract/05.06.2002']); // Simulate fetching contracts
    onClose(); // Close the drawer when a client is selected
  };

  const handleUpload = () => {
    alert("Upload functionality to be implemented");
  };

  const handleApprove = (id: string) => {
    // Logic to approve the request
    console.log("Approved", id);
    // Optionally remove the notification or update state
  };

  const handleDeny = (id: string) => {
    // Logic to deny the request
    console.log("Denied", id);
    // Optionally remove the notification or update state
  };

  return (
    <Box as="section" bg="gray.50" minH="100vh">
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          justifyContent="space-between"
          align="center"
          p="4"
          bg="brown"
          w="full"
        >
          <Heading as="h3">{notaryName}'s Dashboard</Heading>
          <Button onClick={onOpen}>Open Client List</Button>
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            onClick={onNotificationOpen}
          />
        </Flex>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Clients</DrawerHeader>
            <DrawerBody>
              <List spacing={2}>
                {clients.map(client => (
                  <ListItem key={client.id} cursor="pointer" onClick={() => handleClientSelect(client.name)}>
                    <ListIcon as={MdPerson} color="green.500" />
                    {client.name}
                  </ListItem>
                ))}
              </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <VStack spacing={4} align="stretch" mt="8" px="4">
          <Text fontSize="lg">Selected Client: {selectedClient || "None"}</Text>
          {contracts.map((contract, index) => (
            <Text key={index}>{contract}</Text>
          ))}
        </VStack>

        <Center flexDir="column" mt="auto" p="4">
          <Input type="file" size="sm" onChange={() => {}} w="50%" />
          <Button leftIcon={<FiUpload />} colorScheme="teal" onClick={handleUpload} mt="2">
            Upload Contract
          </Button>
        </Center>

        <Modal isOpen={isNotificationOpen} onClose={onNotificationClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Notifications</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <Flex key={notification.id} align="center" justify="space-between" mb={2}>
                    <Text>{notification.message}</Text>
                    <HStack spacing={2}>
                      <Button size="sm" colorScheme="green" onClick={() => handleApprove(notification.id)}>
                        <CheckIcon />
                      </Button>
                      <Button size="sm" colorScheme="red" onClick={() => handleDeny(notification.id)}>
                        <CloseIcon />
                      </Button>
                    </HStack>
                  </Flex>
                ))
              ) : (
                <Text>No new notifications.</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onNotificationClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default NotaryDashboard;


// De schimbat interfata si sa schimb notificarile pentru cerere de withdrawal 
