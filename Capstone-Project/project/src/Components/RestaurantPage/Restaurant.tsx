import { useState, useEffect } from "react";
import { Box, Heading, Text, Wrap, WrapItem, Button } from "@chakra-ui/react";
import ReservationForm from "./ReservationForm"; // Import the ReservationForm component

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

      // Convert date and time to a single JavaScript Date object
      const reservationDate = new Date(date);
      const reservationTime = new Date(time);
      console.log("formattedDate:", reservationData);
      console.log("Time:", reservationTime);

      const dataToSend = {
        restaurantName: selectedRestaurant.name,
        date: reservationDate.toISOString(), // Send the converted date
        time: reservationTime.toISOString(),
        guests: guests,
        participants: [currentUser.id, "64d902e241e0e7f38f90eeda"],
      };

      const token = localStorage.getItem("C_Token");
      console.log("Data to send:", dataToSend);

      try {
        // Send reservation data to the server using fetch or axios
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
          // Reservation successful, handle accordingly (e.g., show a message or redirect)
          console.log("Reservation successful");
          handleCloseForm();
        } else {
          console.error("Failed to make reservation");
        }
      } catch (error) {
        console.error("Error making reservation:", error);
      }
    }
  };

  useEffect(() => {
    // Fetch restaurant data from the server
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
              bgSize="cover"
              bgPosition="center center"
              bgRepeat="no-repeat"
            >
              <Box p="4" bg="rgba(255, 255, 255, 0.12)">
                <Heading as="h3" size="md" mb={2}>
                  {restaurant.name}
                </Heading>
                <Text fontSize="sm" mb={2}>
                  Cuisine: {restaurant.cuisine.join(", ")}
                </Text>
                <Text fontSize="sm">Type: {restaurant.type}</Text>

                {/* Reserve Button */}
                <Button onClick={() => handleOpenForm(restaurant)}>
                  Reserve
                </Button>
              </Box>
            </Box>
          </WrapItem>
        ))}
      </Wrap>

      {/* Reservation Form Popout */}
      <ReservationForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleReservation}
      />
    </Box>
  );
};

export default RestaurantPage;
