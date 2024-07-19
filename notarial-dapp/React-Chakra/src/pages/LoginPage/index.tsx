import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../../components/ModalReg"; // Ensure correct import path

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login Attempt:", username, password);
    
    if (username === "admin" && password === "123") {
      toast({
        title: "Login Successful",
        description: "You have successfully logged in as Notary.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/notary-dashboard"); // Redirect to Notary Dashboard
    } else if (username === "client" && password === "123") {
      toast({
        title: "Login Successful",
        description: "You have successfully logged in as Client.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/client-dashboard"); // Redirect to Client Dashboard
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxW="500px" borderWidth={1} borderRadius={8} boxShadow="lg" m="20px auto">
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Login
          </Button>
          <RegisterModal />  // Assuming the modal button is embedded here
        </VStack>
      </form>
    </Box>
  );
};

export default LoginPage;
