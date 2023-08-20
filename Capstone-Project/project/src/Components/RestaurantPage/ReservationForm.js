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
  Select,
} from "@chakra-ui/react";

const ReservationForm = ({ isOpen, onClose, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGuests, setSelectedGuests] = useState("");

  const handleSubmit = () => {
    const formattedDate = new Date(selectedDate); // Convert selectedDate to a Date object
    const formattedTime = new Date(`1970-01-01T${selectedTime}`); // Create a Date object with the time portion

    const reservationData = {
      date: formattedDate,
      time: formattedTime,
      guests: selectedGuests,
    };
    onSubmit(reservationData);
    onClose();
  };

  const getAvailableTimeOptions = () => {
    const currentTime = new Date();
    currentTime.setMinutes(
      currentTime.getMinutes() + 30 - (currentTime.getMinutes() % 30)
    );

    const timeOptions = [];
    while (
      currentTime.getHours() < 23 ||
      (currentTime.getHours() === 23 && currentTime.getMinutes() === 30)
    ) {
      timeOptions.push(currentTime.toTimeString().substring(0, 5));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return timeOptions;
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
            <Select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {getAvailableTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
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

//showToast("success",`Your reservation on ${selectedDate} at ${formattedTime} with ${selectedGuests} guests has been successfully booked`)
