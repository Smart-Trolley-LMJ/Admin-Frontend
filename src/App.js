import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import AddProduct from "./pages/AddProduct";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import LoginPage from './pages/LoginPage';
import Header from "./components//Header";
import ProductPage from "./pages/ProductPage";
import ProductEditScreen from "./scenes/producteditscreen/ProductEditScreen";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartTransactions from "./pages/CartTransactions";
import ProductEdit from "./pages/ProductEdit";
import { useSelector } from "react-redux";
import './App.css'

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userLogin = useSelector(state => state.userLogin)
  // const { error, loading, userInfo } = userLogin

  // useEffect(() => {
  //   const userInfo = localStorage.getItem('userInfo');
  //   if (userInfo) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);
  const userInfo = localStorage.getItem('userInfo');


  if (!userInfo) {
    return <LoginPage />;
  }

console.log('this is theme ' +  colorMode)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <div className="div-padding">
            <Routes>
              
              <Route path="/" element={<ProductPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              {/* <Route path="/:id/edit" element={<ProductDetailsPage />} /> */}
              <Route path="/products/:name/edit" element={<ProductEdit />} />
              <Route path="/products/edit/:id" element={<ProductPage />} />
              <Route path="/products/:id/details" element={<ProductDetailsPage />} />
              <Route path="/carttransactions" element={<CartTransactions />} />
              <Route path="/login" element={<LoginPage />} />
             

            </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
