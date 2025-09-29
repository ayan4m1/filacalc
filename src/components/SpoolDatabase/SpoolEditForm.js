import PropTypes from 'prop-types';
import { DatePicker } from 'react-datepicker';
import { SketchPicker } from 'react-color';
import { parseISO, formatISO } from 'date-fns';
import { Fragment, useCallback, useState } from 'react';
import {
  faDownload,
  faInfoCircle,
  faQuestionCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Form,
  Modal,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';

import { materials, supportsWebSerial } from 'utils';

export default function SpoolEditForm({
  isSpoolSelected,
  form: { errors, values, handleChange, handleSubmit, setFieldValue },
  onHide,
  serialPort,
  readData,
  close,
  waiting
}) {
  const [connected, setConnected] = useState(false);
  const handleDateChange = useCallback(
    (date) => setFieldValue('purchaseDate', formatISO(date)),
    [setFieldValue]
  );
  const handleColorChange = useCallback(
    (color) => setFieldValue('color', color.hex),
    [setFieldValue]
  );
  const handleFetchClick = useCallback(async () => {
    if (connected) {
      close();
      setConnected(false);
    } else {
      const { transmissionDistance, color } = await readData();

      setFieldValue('transmissionDistance', transmissionDistance);
      setFieldValue('color', color);
    }

    setConnected((val) => !val);
  }, [readData, close, connected, setFieldValue]);
  const closeOnHide = useCallback(async () => {
    try {
      await close();
      setConnected(false);
    } catch (error) {
      console.error(error);
      console.warn('Failed to close serial port!');
    }
    onHide();
  }, [onHide, close]);

  return (
    <Modal onHide={closeOnHide} show={true}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isSpoolSelected ? 'Edit' : 'Add'} a Spool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Vendor</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.vendor)}
              name="vendor"
              onChange={handleChange}
              type="text"
              value={values.vendor}
            />
            <Form.Control.Feedback type="invalid">
              {errors.vendor}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Spool Name</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.name)}
              name="name"
              onChange={handleChange}
              type="text"
              value={values.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Filament Material</Form.Label>
            <Form.Select
              isInvalid={Boolean(errors.material)}
              name="material"
              onChange={handleChange}
              value={values.material}
            >
              {materials.map((material) => (
                <option key={material.name} value={material.name}>
                  {material.name}
                </option>
              ))}
              <option value="custom">Custom</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.material}
            </Form.Control.Feedback>
          </Form.Group>
          {values.material === 'custom' && (
            <Form.Group>
              <Form.Label>
                Material Density (g/cm<sup>3</sup>)
              </Form.Label>
              <Form.Control
                isInvalid={Boolean(errors.materialDensity)}
                name="materialDensity"
                onChange={handleChange}
                type="number"
                value={values.materialDensity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.materialDensity}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.color)}
              name="color"
              onChange={handleChange}
              type="text"
              value={values.color}
            />
            <Form.Control.Feedback type="invalid">
              {errors.color}
            </Form.Control.Feedback>
            <Container fluid>
              <Row>
                <Col className="d-flex justify-content-center">
                  <SketchPicker
                    className="my-2"
                    color={values.color}
                    onChange={handleColorChange}
                  />
                </Col>
              </Row>
            </Container>
          </Form.Group>
          <Form.Group>
            <Form.Label>Net Weight (g)</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.netWeight)}
              min="0"
              name="netWeight"
              onChange={handleChange}
              type="number"
              value={values.netWeight}
            />
            <Form.Control.Feedback type="invalid">
              {errors.netWeight}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Spool Weight (g)</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.spoolWeight)}
              min="0"
              name="spoolWeight"
              onChange={handleChange}
              type="number"
              value={values.spoolWeight}
            />
            <Form.Control.Feedback type="invalid">
              {errors.spoolWeight}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Current Weight (g)</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.currentWeight)}
              min="0"
              name="currentWeight"
              onChange={handleChange}
              step="0.01"
              type="number"
              value={values.currentWeight}
            />
            <Form.Control.Feedback type="invalid">
              {errors.currentWeight}
            </Form.Control.Feedback>
            <Form.Text className="text-primary">
              {(
                ((values.currentWeight - values.spoolWeight) /
                  values.netWeight) *
                1e2
              ).toFixed(2)}
              % remaining
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Filameter Diameter (mm)</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.filamentDiameter)}
              min="0"
              name="filamentDiameter"
              onChange={handleChange}
              step="0.01"
              type="number"
              value={values.filamentDiameter}
            />
            <Form.Control.Feedback type="invalid">
              {errors.filamentDiameter}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Transmission Distance (TD){' '}
              <OverlayTrigger
                overlay={(props) => (
                  <Tooltip {...props}>
                    Transmission distance is used by HueForge for color
                    blending.
                  </Tooltip>
                )}
                placement="right"
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
              </OverlayTrigger>
            </Form.Label>
            <InputGroup>
              <Form.Control
                isInvalid={Boolean(errors.transmissionDistance)}
                min="0"
                name="transmissionDistance"
                onChange={handleChange}
                step="0.1"
                type="number"
                value={values.transmissionDistance}
              />
              {serialPort?.connected && supportsWebSerial && (
                <Fragment>
                  <Button onClick={handleFetchClick}>
                    <FontAwesomeIcon
                      icon={waiting ? faSpinner : faDownload}
                      spin={waiting}
                    />{' '}
                    {waiting ? 'Insert filament...' : 'Fetch from TD-1'}
                  </Button>
                  <OverlayTrigger
                    overlay={(props) => (
                      <Tooltip {...props}>Click to visit AJAX-3D</Tooltip>
                    )}
                    placement="left"
                  >
                    <Button
                      as="a"
                      href="https://www.patreon.com/AJAX_3D"
                      rel="noopener"
                      target="_blank"
                      variant="info"
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </Button>
                  </OverlayTrigger>
                </Fragment>
              )}
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.transmissionDistance}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Purchase Date</Form.Label>
            <Form.Control
              as={DatePicker}
              isInvalid={Boolean(errors.purchaseDate)}
              onChange={handleDateChange}
              selected={parseISO(values.purchaseDate)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.purchaseDate}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Purchase Cost</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.purchaseCost)}
              min="0"
              name="purchaseCost"
              onChange={handleChange}
              step="0.01"
              type="number"
              value={values.purchaseCost}
            />
            <Form.Control.Feedback type="invalid">
              {errors.purchaseCost}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

SpoolEditForm.propTypes = {
  isSpoolSelected: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }).isRequired,
  onHide: PropTypes.func.isRequired,
  serialPort: PropTypes.object,
  readData: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired
};
