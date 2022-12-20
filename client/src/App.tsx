import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import englishJson from '../src/assets/i18n/en.json';
import GatewayList from './components/gateway/components/list';
import GatewayAdd from './components/gateway/components/add';
import DeviceList from './components/device/components/list';
import DeviceAdd from './components/device/components/add';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: englishJson
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/gateway/list" element={<GatewayList />} />
          <Route path="/gateway/add" element={<GatewayAdd />} />
          <Route path="/devices/list/:gatewayId" element={<DeviceList />} />
          <Route path="/devices/add/:gatewayId" element={<DeviceAdd />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/gateway/list">Gateways</Nav.Link>
              <Nav.Link href="/gateway/add">Add Gateway</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
