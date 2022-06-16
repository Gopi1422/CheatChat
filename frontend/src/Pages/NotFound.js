import { Box, Text } from "@chakra-ui/react";
import React from "react";
// import { Link } from "react-router-dom";
import "./NotFoundStyle.css";

const NotFound = () => {
  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="center"
        h="100%"
        width={"100%"}
        p="100px"
        background={"white"}
      >
        <div>
          <Text
            fontSize="4xl"
            fontWeight={"bold"}
            textAlign="center"
            textColor={"blackAlpha.700"}
          >
            404 - Page Not Found!
          </Text>

          <section className="error-container">
            <span className="four">
              <span className="screen-reader-text">4</span>
            </span>
            <span className="zero">
              <span className="screen-reader-text">0</span>
            </span>
            <span className="four">
              <span className="screen-reader-text">4</span>
            </span>
          </section>

          <div className="link-container">
            <a href="/" className="more-link">
              Go Home
            </a>
          </div>
        </div>

        {/* <Link to="/">Go Home</Link>  */}
      </Box>
    </div>
  );
};

export default NotFound;
