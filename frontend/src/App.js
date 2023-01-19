import Login from "./pages/Login";
import { ProSidebarProvider } from "react-pro-sidebar";
import Dashboard from "./pages/Dashboard";
import ListKendaraan from "./pages/ListKendaraan";
import Peminjaman from "./pages/Peminjaman";
import DetailKendaraan from "./pages/DetailKendaraan";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";

function App() {
  return (
    <ProSidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route exact path="/loginAdmin" element={<Login tipe="Admin" />} />
          <Route exact path="/loginPenyetuju" element={<Login tipe="Penyetuju" />} />
          <Route
            exact
            path="/listKendaraan"
            element={
              <Protected>
                <ListKendaraan />
              </Protected>
            }
          />
          <Route
            exact
            path="/peminjamanKendaraan"
            element={
              <Protected>
                <Peminjaman />
              </Protected>
            }
          />
          <Route
            exact
            path="/detailKendaraan/:id"
            element={
              <Protected>
                <DetailKendaraan />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <div className="App"> */}
      {/* <Login tipe="Admin" /> */}
      {/* <Dashboard /> */}
      {/* <ListKendaraan /> */}
      {/* <Peminjaman /> */}
      {/* <DetailKendaraan /> */}
      {/* </div> */}
    </ProSidebarProvider>
  );
}

export default App;
