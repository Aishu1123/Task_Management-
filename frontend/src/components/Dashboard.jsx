import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";


const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found!");
        return;
      }
      try {
        const res = await axios.get("http://localhost:3000/task", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.tasks);
        console.log(res.data.tasks);
        // console.log("xxxxxxxxx",res.data.tasks.id)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getTasks ();
  }, [showModal]);

  const getTaskss = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no token found!");
      return;
    }
    try {
      const res = await axios.get("http://localhost:3000/task", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks (res.data.tasks );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/task",
        {
          title,
          description,
          userID: localStorage.getItem("userID"), 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 201) {
        toast({
          title: "Task created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
      } else {
        toast({
          title: "server error",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      setTitle("");
      setDescription("");
      setShowModal(false);
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Something went wrong! Please try again later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
      setShowModal(false);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Button
          p="1rem 2rem"
          mt={4}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add task
        </Button>
      </Box>
      <Box width="80%" m="auto" mt="2rem">
        {loading ? (
          <Box display="flex" justifyContent="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
            m="auto"
            justifyContent="center"
          >
            {Array.isArray(tasks ) &&
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  taskID={task.id}
                 
                  title={task.title}
                  description={task.description}
                  getTasks={getTaskss}
                />
               
              ))}
              
          </Grid>
        )}
         
      </Box>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description:</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                resize={"none"}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleCreateTask}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;
