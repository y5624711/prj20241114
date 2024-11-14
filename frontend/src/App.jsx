import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Box, Flex, Stack } from "@chakra-ui/react";

function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex gap={3}>
      <Box onClick={() => navigate("/")}>HOME</Box>
      <Box onClick={() => navigate("/add")}>글작성</Box>
    </Flex>
  );
}

function RootLayout() {
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

function BordList() {
  return (
    <Box>
      <h3>게시물 목록</h3>
    </Box>
  );
}

function BoardAdd() {
  return (
    <Box>
      <h3>게시물 작성</h3>
    </Box>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <BordList /> },
      { path: "add", element: <BoardAdd /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
