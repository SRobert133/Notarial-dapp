import React from "react";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Button
} from "@chakra-ui/react";
import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Layout"; // Ensure this import path matches the actual location of your Sidebar component

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box as="section" bg="gray.50" minH="100vh">
      <Sidebar /> {/* Sidebar included on the page */}
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="brown"
          borderBottomWidth="1px"
          color="white"
          h="14"
        >
          <InputGroup w="96">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Search for articles..." />
          </InputGroup>
          <Flex align="center">
            <FaBell color="gray.500" cursor="pointer" />
            <Avatar ml="4" size="sm" src="https://bit.ly/dan-abramov" cursor="pointer" />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          <Text fontSize="2xl" fontWeight="bold" mb="2">Welcome to Your Notarial Storage Application</Text>
          <Text mb="4">Here's where you can manage your notarial records securely.</Text>
          <Text fontSize="xl" fontWeight="bold" mt="6">Revolutionizing Document Security and Notarization</Text>
          <Text mt="2">Enhance the security and accessibility of your documents with Notarial Storage Application, the advanced platform designed for modern legal needs.</Text>
          <Text fontSize="lg" fontWeight="bold" mt="4">Document Encryption and Security</Text>
          <Text mt="1">Ensure the security of your documents with state-of-the-art encryption techniques that protect against unauthorized access and tampering.</Text>
          <Text fontSize="lg" fontWeight="bold" mt="4">Efficient Document Verification</Text>
          <Text mt="1">Quickly verify the authenticity of documents through blockchain-based timestamps and cryptographic signatures.</Text>
          <Text fontSize="lg" fontWeight="bold" mt="4">Remote Document Access</Text>
          <Text mt="1">Access your notarized documents from anywhere, at any time, ensuring flexibility and convenience for both notaries and clients.</Text>
          <Button colorScheme="green" size="lg" mt="5" onClick={() => navigate('/login')}>Login</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
