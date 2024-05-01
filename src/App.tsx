import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainTemplate from "./templates/main-template";
import { MENU_LIST } from "./settings/menu-settings";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div>
      <MainTemplate>
        <AnimatePresence mode="wait">
          <Router>
            <Routes>
              {MENU_LIST.map(({ path, element, name }) => (
                <Route key={name} path={path} element={element} />
              ))}
            </Routes>
          </Router>
        </AnimatePresence>
      </MainTemplate>
    </div>
  );
}

export default App;
