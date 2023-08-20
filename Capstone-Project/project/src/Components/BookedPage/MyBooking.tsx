import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Stack,
  Button,
} from "@chakra-ui/react";

interface Reservation {
  _id: string;
  date: string;
  time: string;
  guests: number;
  restaurant: {
    _id: string;
    name: string;
    // Add other properties of the restaurant here
  };
}

const RestaurantPage = () => {
  const [userReservations, setUserReservations] = useState<Reservation[]>([]);

  const handleDeleteReservation = async (reservationId: string) => {
    const token = localStorage.getItem("C_Token");
    setUserReservations((prevReservations) =>
      prevReservations.filter(
        (reservation) => reservation._id !== reservationId
      )
    );
    try {
      const response = await fetch(
        `http://localhost:3002/restaurants/reservation/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Reservation deleted successfully, update the userReservations state
        setUserReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation._id !== reservationId
          )
        );
      } else {
        console.error("Error deleting reservation");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("C_Token");
    // Fetch user reservations from the backend API
    fetch("http://localhost:3002/restaurants/my-reservations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Reservation[]) => {
        setUserReservations(data);
      })
      .catch((error) => {
        console.error("Error fetching user reservations:", error);
      });
  }, []);

  const formatTime = (timeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    };
    return new Date(timeString).toLocaleTimeString("en-US", options);
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>
        My Reservations
      </Heading>
      <Wrap justify="center" spacing={4}>
        {userReservations.map((reservation) => (
          <WrapItem key={reservation._id}>
            <Box
              maxW="250px"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              position="relative"
            >
              <Stack p="4" spacing={2}>
                <Text>
                  Date: {new Date(reservation.date).toLocaleDateString()}
                </Text>
                <Text>Time: {formatTime(reservation.time)}</Text>
                <Text>Guests: {reservation.guests}</Text>
                {reservation.restaurant ? (
                  <Text>Restaurant: {reservation.restaurant.name}</Text>
                ) : (
                  <Text>Restaurant: Not Available</Text>
                )}
                <Button
                  onClick={() => handleDeleteReservation(reservation._id)}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default RestaurantPage;
