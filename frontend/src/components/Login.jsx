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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { authLinLout } from "../redux/authSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(` ${password}  , ${email}`);
    try {
      const response = await axios.post(
       
       " http://localhost:3000/user/login"
        ,
        {
          email,
          password,
        }
      );

      // console.log(response);
      if (response.status === 200) {
        const token = response.data.token;

        // console.log(">>>>>>>>>", auth);
        localStorage.setItem("token", token); 
        setShowModal(true);
        setModalMessage("Login successful");
        dispatch(authLinLout(true));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      setShowModal(true);
      setModalMessage("Please register yourself");
      console.error("Error:", error);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    if (modalMessage === "Login successful") {
      navigate("/dashboard");
    }
  };
  return (
    <div className="flex h-[38rem] items-center">
      <Container>
        <Box
          p={"2rem"}
          bg={"white"}
          borderRadius={10}
          boxShadow={"1px 7px 9px 1px "}
        >
          <form onSubmit={handleSubmit}>
            <Heading as={"h1"} color={"#596e79"} textAlign={"center"} mb={4}>
              Login
            </Heading>
            <FormControl>
              <Stack spacing={5}>
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
                <Button type="submit" color="black" width="full">
                  Login
                </Button>

                <Text textAlign={"center"}>
                  Don't have an account{" "}
                  <Text as={Link} to="/signup" color="black" fontWeight="bold">
                    Signup
                  </Text>
                </Text>
              </Stack>
            </FormControl>
          </form>
        </Box>
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login Status</ModalHeader>
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

export default Login;


