import React, { useState } from 'react';
import { Box, Flex, Button, VStack, Text, Center } from '@chakra-ui/react';
import Sidebar from '../../components/Layout';
import { useNotifications } from '../../components/Notifications'; // Adjust path as necessary

interface ClientContract {
  id: string;
  name: string;
}

const ClientDashboard: React.FC = () => {
  const [contracts, setContracts] = useState<ClientContract[]>([
    { id: '1', name: 'Contract 1' },
    { id: '2', name: 'Contract 2' }
  ]);
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  const handleWithdraw = () => {
    if (selectedContract) {
      addNotification(`Withdrawal request for ${selectedContract}`);
      alert(`Withdraw request sent for ${selectedContract}`);
    } else {
      alert('No contract selected');
    }
  };

  return (
    <Box>
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex justifyContent="center" p="4" bg="purple" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold">Client Name's Dashboard</Text>
        </Flex>
        <Center flexDir="column" mt="8">
          {contracts.map(contract => (
            <Button key={contract.id} onClick={() => setSelectedContract(contract.name)} m="2">
              {contract.name}
            </Button>
          ))}
          <Text fontSize="lg" mt="4">Selected Contract: {selectedContract || "None"}</Text>
          <Button colorScheme="red" size="sm" onClick={handleWithdraw} mt="2">
            Withdraw Contract
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default ClientDashboard;


// De schimbat putin interfata si de implementat functia de withdrawal