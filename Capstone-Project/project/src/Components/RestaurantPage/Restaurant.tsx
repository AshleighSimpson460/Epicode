import { useEffect, useState } from "react";
import { Box, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string[];
  type: string;
  Average: number;
  imgURL: string;
}

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch("http://localhost:3002/restaurants", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        List of Restaurants
      </Heading>
      <Wrap spacing={4}>
        {restaurants.map((restaurant) => (
          <WrapItem key={restaurant._id}>
            <Box
              maxW="md"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              bgImage={`url(${restaurant.imgURL})`}
              bgSize="cover" // Use "cover" or "contain" here
              bgPosition="center center" // Center the image
              bgRepeat="no-repeat" // Prevent repeating the image
            >
              {/* Restaurant Details */}
              <Box p="4" bg="rgba(255, 255, 255, 0.12)">
                {" "}
                <Heading as="h3" size="md" mb={2}>
                  {restaurant.name}
                </Heading>
                <Text fontSize="sm" mb={2}>
                  Cuisine: {restaurant.cuisine.join(", ")}
                </Text>
                <Text fontSize="sm">Type: {restaurant.type}</Text>
              </Box>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default RestaurantPage;
