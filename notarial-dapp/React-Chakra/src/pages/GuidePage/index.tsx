import React, { useState } from 'react';
import { Flex, Text, Box, Image, Stack, HStack } from '@chakra-ui/react';
import Sidebar from '../../components/Layout';

const GuidePage = () => {
  const arrowStyles = {
    cursor: "pointer",
    position: "absolute" as const,
    top: "50%",
    width: "auto",
    marginTop: "-22px",
    padding: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none" as const,
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const slides = [
    {
      img: "https://i.pinimg.com/originals/3c/bc/25/3cbc25ddad166dafa64667e570236bc9.jpg",
      label: " ",
      description: "The client comes and signs/give a contract to the notary.",
    },
    {
      img: "https://i.pinimg.com/originals/7f/73/31/7f73314b76da0e60d3e3d543015c5aa9.png",
      label: " ",
      description: "The notary scans the contract as a pdf.",
    },
    {
      img: "https://i.pinimg.com/originals/e4/08/48/e4084846171d12e55bc88bcf75aca254.jpg",
      label: " ",
      description:
        "The applications stores the contract on the blockchain.",
    },
    {
      img: "https://i.pinimg.com/originals/4c/54/65/4c54656cb5011396c47b469550cb8c17.jpg",
      label: " ",
      description: "The clients can retrieve the file from anywhere.",
    },

  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide(s => s === 0 ? slidesCount - 1 : s - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(s => s === slidesCount - 1 ? 0 : s + 1);
  };

  const carouselStyle = {
    transition: "all .5s",
    marginLeft: `-${currentSlide * 100}%`,
  };

  return (
    <Flex width="full" bg="#edf3f8" p={10} alignItems="center" justifyContent="center">
      <Sidebar />
      <Flex width="calc(100% - 250px)" ml="250px" position="relative" overflow="hidden"> {/* Adjust width and marginLeft to match the sidebar width */}
        <Flex height="400px" width="full" style={carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Text color="white" fontSize="xs" padding="8px 12px" position="absolute" top="0">
                {sid + 1} / {slidesCount}
              </Text>
              <Image src={slide.img} alt="carousel image" boxSize="full" objectFit="cover" />
              <Stack padding="8px 12px" position="absolute" bottom="24px" textAlign="center" width="full" marginBottom="8" color="white">
                <Text fontSize="2xl">{slide.label}</Text>
                <Text fontSize="lg">{slide.description}</Text>
              </Stack>
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" position="absolute" bottom="8px" width="full">
          {Array.from({ length: slidesCount }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", "15px"]}
              margin="0 2px"
              backgroundColor={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              borderRadius="full"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{ backgroundColor: "blackAlpha.800" }}
              onClick={() => setCurrentSlide(slide)}
            />
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default GuidePage;


// De schimbat pozele cu unele mai sugestive 