import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authLinLout } from "../redux/authSlice";
import axios from "axios";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://simple-notes-backend.onrender.com/users/logout",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      dispatch(authLinLout(false));
      navigate("/");
    }, 2000);
  };
  return (
    <>
      <Box>
        <Flex
          p={"1.5rem"}
          boxShadow="base"
          bg={"#091e17"}
          display={"flex"}
          alignItems={"center"}
          direction={{ base: "row", md: "row" }}
        >
          <Box>
            <Link to={"/"}>
              <Heading
                as="h2"
                fontSize={{ base: "1.6rem", md: "2rem" }}
                color={"white"}
              >
                Task
              </Heading>
            </Link>
          </Box>
          <Spacer />
          <Box>
            <IconButton
              icon={<HamburgerIcon color="white" fontSize={"1.6rem"} />}
              aria-label="Open navigation"
              onClick={onOpen}
              display={{ base: "flex", md: "none" }}
              bgColor="green"
            />

            <Flex
              gap={4}
              display={{ base: "none", md: "flex" }}
              justifyContent="space-around"
            >
              <Link to="/">
                <Button
                  fontSize={"1.3rem"}
                  color={"white"}
                  bg={"transparent"}
                  _hover={{ bg: "transparent", color: "#90ee90" }}
                >
                  Home
                </Button>
              </Link>

              {auth ? (
                <>
                  <Link to="/dashboard">
                    <Button
                      fontSize={"1.3rem"}
                      color={"white"}
                      bg={"transparent"}
                      _hover={{ bg: "transparent", color: "#90ee90" }}
                    >
                      Dashboard
                    </Button>
                  </Link>

                  <Button
                    fontSize={"1.3rem"}
                    color={"white"}
                    bg={"transparent"}
                    onClick={handleLogout}
                    _hover={{ bg: "transparent", color: "#90ee90" }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      fontSize={"1.3rem"}
                      color={"white"}
                      bg={"transparent"}
                      _hover={{ bg: "transparent", color: "#90ee90" }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      fontSize={"1.3rem"}
                      color={"white"}
                      bg={"transparent"}
                      _hover={{ bg: "transparent", color: "#90ee90" }}
                    >
                      SingUp
                    </Button>
                  </Link>
                </>
              )}
            </Flex>
          </Box>
        </Flex>

        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Box>
                <Link
                  className="hover:bg-primeGreen-600 block py-2"
                  color="#2f4e44"
                  to="/"
                  onClick={onClose}
                >
                  Home
                </Link>
              </Box>
              {auth ? (
                <>
                  <Link
                    to="/dashboard"
                    className="hover:bg-primeGreen-600 block py-2"
                    color="#2f4e44"
                    onClick={onClose}
                  >
                    Dashboard
                  </Link>

                  <Text
                    className="hover:bg-primeGreen-600 block py-2"
                    color="#2f4e44"
                    onClick={onClose}
                  >
                    Logout
                  </Text>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:bg-primeGreen-600 block py-2"
                    color="#2f4e44"
                    onClick={onClose}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="hover:bg-primeGreen-600 block py-2"
                    color="#2f4e44"
                    onClick={onClose}
                  >
                    SingUp
                  </Link>
                </>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;

// {auth ? (
//   <>
//     <Box>{name}</Box>
//     <Link to={"/"}>
//       <Button

//       >
//         Log out
//       </Button>
//     </Link>
//   </>
// ) : (
//   <>
//     <Link to="/signup">
//       <Button

//       >
//         Sign Up
//       </Button>
//     </Link>
//     <Link to="/login">
//       <Button

//       >
//         Login
//       </Button>
//     </Link>
//   </>
// )}
