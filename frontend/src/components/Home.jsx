import { Box, Button, Heading, Image } from "@chakra-ui/react";
4;
import Img from "../assets/banner.png";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const auth = useSelector((state) => state.auth.auth);

  return (
    <>
      <Box
        className="flex justify-center"
        mt={{ base: "0", md: "4rem" }}
      >
        <Box
          className="flex items-center justify-center   gap-[3rem]"
          
          flexDirection={{ base: "column", md: "row" }}
          w={{ base: "100%", md: "80%" }}
          p={"2rem"}
        >
          <Box >
            <Image src={Img} alt="Notes" />
          </Box>
          <Box width={{ base: "100%", md: "40%" }}>
            
            <Heading
              as={"h1"}
              fontSize={{ base: "2rem", md: "3rem" }}
              color={"#596e79"}
            >
              The simplest way to manage tasks
            </Heading>
            {auth ? (
              <>
                <Link to="/dashboard">
                  <Button
                    mt={"2rem"}
                    fontSize={"1.3rem"}
                    color={"black"}
                    bg={"white"}
                    p={"1.3rem 3rem"}
                    fontWeight={"bold"}
                    border={" 1px solid black"}
                    _hover={{ bg: "#aedadd", color: "#596e79" }}
                  >
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <Button
                    mt={"2rem"}
                    fontSize={"1.3rem"}
                    color={"#596e79"}
                    bg={"white"}
                    p={"1.3rem 3rem"}
                    border={" 1px solid black"}
                    _hover={{ bg: "#aedadd", color: "#596e79" }}
                  >
                    SingUp
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
