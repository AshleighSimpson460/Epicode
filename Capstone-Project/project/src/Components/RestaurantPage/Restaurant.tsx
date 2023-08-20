import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Button,
  Select,
  Stack,
} from "@chakra-ui/react";
import { showToast, showError } from "../Toaster.js";
import ReservationForm from "./ReservationForm";

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string[];
  type: string;
  Average: number;
  imgURL: string;
}

interface PrivateMessagesProps {
  currentUser: { id: string; name: string };
}

const RestaurantPage = ({ currentUser }: PrivateMessagesProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>("");
  const [selectedType, setSelectedType] = useState<string | null>("");
  const [uniqueCuisines, setUniqueCuisines] = useState<string[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  const handleOpenForm = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleReservation = async (reservationData: {
    date: string;
    time: string;
    guests: number;
  }) => {
    console.log("Reservation data:", reservationData);

    if (selectedRestaurant) {
      const { date, time, guests } = reservationData;

      const reservationDate = new Date(date);
      const reservationTime = new Date(time);

      console.log("reservationTime", reservationTime);

      const dataToSend = {
        restaurantName: selectedRestaurant.name,
        date: reservationDate.toISOString(),
        time: reservationTime.toISOString(),
        guests: guests,
        participants: [currentUser.id, "64d902e241e0e7f38f90eeda"],
      };

      const token = localStorage.getItem("C_Token");
      console.log("Data to send:", dataToSend);

      try {
        const response = await fetch(
          "http://localhost:3002/restaurants/reservation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dataToSend),
          }
        );

        if (response.ok) {
          showToast("success", "reservation booked");
          handleCloseForm();
        } else {
          showError("error", "Failed to make reservation");
        }
      } catch (error) {
        console.error("Error making reservation:", error);
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:3002/restaurants", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: Restaurant[]) => {
        const allCuisines = data.flatMap((restaurant) => restaurant.cuisine);
        const uniqueCuisines = Array.from(new Set(allCuisines));
        const allTypes = data.map((restaurant) => restaurant.type);
        const uniqueTypes = Array.from(new Set(allTypes));
        uniqueCuisines.sort();
        uniqueTypes.sort();
        setRestaurants(data);
        setUniqueCuisines(uniqueCuisines);
        setUniqueTypes(uniqueTypes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function handleCuisineChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedCuisine(event.target.value);
  }

  function handleTypeChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedType(event.target.value);
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (selectedCuisine && !restaurant.cuisine.includes(selectedCuisine)) {
      return false;
    }
    if (selectedType && restaurant.type !== selectedType) {
      return false;
    }
    return true;
  });

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        List of Restaurants
      </Heading>
      <Box m={4} display="flex">
        <Box marginRight={3}>
          <Text mb={2}>Filter by Cuisine:</Text>
          <Select
            width={"150px"}
            placeholder="All Cuisines"
            value={selectedCuisine || ""}
            onChange={handleCuisineChange}
          >
            {uniqueCuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Text mb={2}>Filter by Type:</Text>
          <Select
            width={"150px"}
            placeholder="All Types"
            value={selectedType || ""}
            onChange={handleTypeChange}
          >
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
      <Wrap justify="center" spacing={4}>
        {filteredRestaurants.map((restaurant) => (
          <WrapItem key={restaurant._id}>
            <Box
              width="250px"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              position="relative"
            >
              <Box
                h="180px"
                bgImage={`url(${restaurant.imgURL})`}
                bgSize="cover"
                bgPosition="center center"
                bgRepeat="no-repeat"
              />
              <Stack p="4" spacing={2}>
                <Heading as="h3" size="md">
                  {restaurant.name}
                </Heading>
                <Text fontSize="sm" mb={2}>
                  Cuisine: {restaurant.cuisine.join(", ")}
                </Text>
                <Text fontSize="sm">Type: {restaurant.type}</Text>
                <Button onClick={() => handleOpenForm(restaurant)}>
                  Reserve
                </Button>
              </Stack>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
      <ReservationForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleReservation}
      />
    </Box>
  );
};

export default RestaurantPage;
