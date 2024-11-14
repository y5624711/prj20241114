import { Box, Stack } from "@chakra-ui/react";
import { Navbar } from "../../components/root/navbar.jsx";
import { Outlet } from "react-router-dom";
import React from "react";

export function RootLayout() {
  return (
    <Stack>
      <Box>
        <Navbar />
      </Box>
      <Box>
        {/*자식경로 작업 화면에 표시*/}
        <Outlet />
      </Box>
    </Stack>
  );
}
