import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FiMenu, FiSearch } from "react-icons/fi";
import Sidebar from "../../components/Layout"; // Adjust this path if necessary

type FeedbackEntry = {
  id: number;
  text: string;
  date: string;
  username: string; // Add username to the feedback type
};

const FeedbackPage = () => {
  // Retrieve feedbacks from localStorage or initialize to an empty array
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>(() => {
    const savedFeedbacks = localStorage.getItem("feedbacks");
    return savedFeedbacks ? JSON.parse(savedFeedbacks).sort((a: FeedbackEntry, b: FeedbackEntry) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ) : [];
  });
  const [feedbackInput, setFeedbackInput] = useState("");

  useEffect(() => {
    // Update localStorage when feedbacks change
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const handleFeedbackSubmit = () => {
    if (!feedbackInput.trim()) return;
    const newFeedback: FeedbackEntry = {
      id: feedbacks.length + 1, // simple auto-incrementing ID
      text: feedbackInput,
      date: new Date().toISOString().split('T')[0], // Simple date string
      username: "CurrentUsername" // Replace with dynamic username
    };
    setFeedbacks(prev => [newFeedback, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setFeedbackInput(""); // Clear input after submission
  };

  return (
    <Box as="section" bg="gray.50" minH="100vh">
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="brown"
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <InputGroup w="96">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Search for articles..." />
          </InputGroup>
          <Avatar size="sm" src="https://bit.ly/dan-abramov" />
        </Flex>

        <VStack spacing={4} p={5}>
          <Text fontSize="2xl" fontWeight="bold">Feedback Section</Text>
          <Input
            placeholder="Type your feedback here"
            value={feedbackInput}
            onChange={(e) => setFeedbackInput(e.target.value)}
          />
          <Button onClick={handleFeedbackSubmit} colorScheme="blue">Submit Feedback</Button>
          {feedbacks.map((feedback) => (
            <Flex key={feedback.id} align="center" justify="space-between" w="100%" p={2} bg="gray.100" borderRadius="md">
              <Text>{feedback.text}</Text>
              <Text fontSize="sm">{`${feedback.username} on ${feedback.date}`}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default FeedbackPage;
