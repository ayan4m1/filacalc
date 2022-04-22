import {
  faGripLines,
  faRulerHorizontal,
  faWeightHanging,
  faWeightScale,
  faHeart,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import spoolLogo from 'images/filament-spool.svg';

export default function Header() {
  return (
    <Navbar bg="dark" className="mb-4" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="Filament Spool"
            className="me-2"
            src={spoolLogo}
            style={{ stroke: '#b58900' }}
            width={64}
          />{' '}
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
            <Nav.Link as={Link} to="/z-axis">
              <FontAwesomeIcon icon={faGripLines} /> Z-Axis Calibration
            </Nav.Link>
            <Nav.Link as={Link} to="/spools">
              <FontAwesomeIcon icon={faDatabase} /> Spool Database
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link
              href="https://paypal.me/ayan4m1"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faHeart} /> Donate
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
