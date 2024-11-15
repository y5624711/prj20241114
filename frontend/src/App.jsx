import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BoardAdd } from "./page/board/BoardAdd.jsx";
import { BordList } from "./page/board/BordList.jsx";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <BordList /> },
      { path: "add", element: <BoardAdd /> },
      {
        path: "view/:id",
        element: <BoardView />,
      },
      {
        path: "edit/:id",
        element: <BoardEdit />,
      },
      { path: "member/signup", element: <MemberSignup /> },
      { path: "member/list", element: <div>회원목록</div> },
      { path: "member/:id", element: <div>회원정보</div> },
      { path: "member/edit/:id", element: <div>회원정보 수정</div> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
