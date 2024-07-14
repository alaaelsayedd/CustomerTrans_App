import Graph from "./component/Graph/Graph";
import NavBar from "./component/Navbar/Navbar";
import Transaction from "./component/transaction/Transaction";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
const router = createBrowserRouter([
  {
    path: "/",
    element: <><NavBar/><Transaction /></>,
  },
  {
    path: "/tranaction/:id",
    element: <Graph />,
  },
]);



function App() {
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </>
  );
}

export default App;
