import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const ReservationForm = ({ isOpen, onClose, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGuests, setSelectedGuests] = useState("");

  const handleSubmit = () => {
    const formattedDate = new Date(selectedDate); // Convert selectedDate to a Date object
    const formattedTime = new Date(`1970-01-01T${selectedTime}`); // Create a Date object with the time portion

    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    console.log("Selected Guests:", selectedGuests);
    onSubmit({
      date: formattedDate,
      time: formattedTime,
      guests: selectedGuests,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Make a Reservation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Time</FormLabel>
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Number of Guests</FormLabel>
            <Input
              type="number"
              value={selectedGuests}
              onChange={(e) => setSelectedGuests(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Reserve
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReservationForm;
