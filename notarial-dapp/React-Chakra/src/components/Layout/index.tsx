import React from 'react';
import { Box, Flex, Icon, Text, useColorModeValue, Image } from '@chakra-ui/react';
import { MdHome, MdLibraryBooks, MdFeedback, MdSettings } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const color = useColorModeValue("gray.600", "gray.300");

  const NavItem = ({ icon, children, to }) => (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      onClick={() => navigate(to)}
      _hover={{
        bg: "gray.100",
        color: "gray.900",
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
    >
      {icon && (
        <Icon
          mr="2"
          boxSize="4"
          as={icon}
        />
      )}
      {children}
    </Flex>
  );

  return (

    <Box
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      color="inherit"
      borderRightWidth="1px"
      w="60"
    >
      <Flex px="4" py="5" align="center">
        <Image src="src/assets/appLogo.png" alt="Notarial Dapp Logo" boxSize="50px" />
        <Text fontSize="2xl" ml="2" fontWeight="semibold" fontStyle="italic">
          Notarial Dapp
        </Text>
      </Flex>
      <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
        <NavItem icon={MdHome} to="/">Home</NavItem>
        <NavItem icon={MdLibraryBooks} to="/guide">Guide</NavItem>
        <NavItem icon={MdSettings} to="/settings">Settings</NavItem>
        <NavItem icon={MdFeedback} to="/feedback">Feedback</NavItem>
      </Flex>
    </Box>
  );
};

export default Sidebar;
