import React from 'react'
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
const TaskCard = ({ taskID, title, description, getTasks }) => {

    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(taskID,title,description);
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:3000/task/${taskID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Task deleted successfully");
        getTasks();
      } catch (error) {
        console.error("Error deleting Task:", error);
      }
    };
  
    const handleEdit = () => {
      setIsModalOpen(true);
    };
  
    const handleUpdate = async () => {
      try {
        await axios.put(
          `http://localhost:3000/task/${taskID}`,
          {
            title: updatedTitle,
            description: updatedDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Task updated successfully");
        setIsModalOpen(false);
        getTasks();
      } catch (error) {
        console.error("Error updating Task:", error);
      }
    };


  return (
    <>
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p="2rem 1.4rem"
        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
        borderRadius="1rem"
        bg={useColorModeValue("white", "gray.700")}
      >
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text textAlign="center" w={{ base: "80%", md: "100%" }} mt={2}>
          {description}
        </Text>
        <Flex mt={4}>
          <Button colorScheme="blue" mr={2} onClick={handleEdit}>
            Edit
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </Flex>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Title:</FormLabel>
                <Input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleUpdate}>
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}

export default TaskCard