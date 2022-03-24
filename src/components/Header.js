import {
  faRulerHorizontal,
  faWeightHanging,
  faWeightScale
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Filacalc
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/filament">
              <FontAwesomeIcon icon={faWeightHanging} /> Filament Usage
            </Nav.Link>
            <Nav.Link as={Link} to="/spool">
              <FontAwesomeIcon icon={faWeightScale} /> Spool Usage
            </Nav.Link>
            <Nav.Link as={Link} to="/extruder">
              <FontAwesomeIcon icon={faRulerHorizontal} /> Extruder Calibration
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
