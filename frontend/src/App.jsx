import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BoardAdd } from "./page/board/BoardAdd.jsx";
import { BordList } from "./page/board/BordList.jsx";
import { RootLayout } from "./page/root/RootLayout.jsx";

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
