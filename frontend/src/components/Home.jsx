import { Box, Button, Heading, Image } from "@chakra-ui/react";
4;
import Img from "../assets/homePageImg.png";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const auth = useSelector((state) => state.auth.auth);

  return (
    <>
      <Box
        className="bg-[#7f7b7b] flex justify-center"
        mt={{ base: "0", md: "4rem" }}
      >
        <Box
          className="flex items-center justify-center   gap-[3rem]"
          
          flexDirection={{ base: "column", md: "row" }}
          w={{ base: "100%", md: "80%" }}
          p={"2rem"}
        >
          <Box>
            <Image src={Img} alt="Notes" />
          </Box>
          <Box width={{ base: "100%", md: "40%" }}>
            
            <Heading
              as={"h1"}
              fontSize={{ base: "2rem", md: "3rem" }}
              color={"white"}
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
                   
                    _hover={{ bg: "#90ee90", color: "#091e17" }}
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
                    color={"black"}
                    bg={"white"}
                    p={"1.3rem 3rem"}
                    
                    _hover={{ bg: "#90ee90", color: "#091e17" }}
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
