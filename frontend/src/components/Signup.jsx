

import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${username}, ${password}  , ${email}`);
    try {
      const response = await axios.post(
        
         "http://localhost:3000/user/signup"
        ,
        {
          username,
          email,
          password,
        }
      );
      setShowModal(true);
      setModalMessage("Registration successful");
    } catch (error) {
      setShowModal(true);
     
      console.log(error)
    }
  };
  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === "Registration successful") {
      navigate("/login"); // Redirect to login page after successful registration
    }
  };
  return (
    <div className="bg-[#7f7b7b] flex h-[38rem] items-center">
      <Container>
        <Box
          p={"2rem"}
          bg={"white"}
          borderRadius={10}
          boxShadow={"0px 9px 88px -1px rgba(157,159,119,0.89)"}
        >
          <form onSubmit={handleSubmit}>
            <Heading as={"h1"} color={"green"} textAlign={"center"} mb={4}>
              SignUp
            </Heading>
            <FormControl>
              <Stack spacing={5}>
                <Input
                  type="text"
                  placeholder="Username"
                  border={"1px solid gray"}
                  
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  border={"1px solid gray"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  border={"1px solid gray"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" colorScheme="green" width="full">
                  Sign Up
                </Button>

                <Text textAlign={"center"}>
                  Already have an account{" "}
                  <Text as={Link} to="/login" color="green" fontWeight="bold">
                    Login
                  </Text>
                </Text>
              </Stack>
            </FormControl>
          </form>
        </Box>
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Registration Status</ModalHeader>
            <ModalBody>{modalMessage}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </div>
  );
};

export default Signup;
