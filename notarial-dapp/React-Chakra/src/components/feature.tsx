import React from 'react';
import { Box, Text, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface FeatureProps {
  icon: IconType;
  title: string;
  text: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, text }) => {
  return (
    <Box textAlign="center">
      <Icon as={icon} w={10} h={10} mb={4} />
      <Text fontWeight="bold" mb={2}>{title}</Text>
      <Text>{text}</Text>
    </Box>
  );
};

export default Feature;
