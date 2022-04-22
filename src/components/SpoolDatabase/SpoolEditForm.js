import { parseISO, formatISO } from 'date-fns';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { SketchPicker } from 'react-color';
import DatePicker from 'react-datepicker';
import { Form, Modal, Button } from 'react-bootstrap';

import { materials } from 'utils';

export default function SpoolEditForm({
  form: { values, handleChange, handleSubmit, setFieldValue },
  onHide,
  show
}) {
  const handleColorChange = useCallback(
    (color) => {
      setFieldValue('color', color.hex);
    },
    [setFieldValue]
  );

  return (
    <Modal dialogClassName="modal-90w" onHide={onHide} show={show}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{values ? 'Edit' : 'Create'} a Spool</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Spool Name</Form.Label>
            <Form.Control
              name="name"
              onChange={handleChange}
              type="text"
              value={values.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Filament Material</Form.Label>
            <Form.Select
              name="material"
              onChange={handleChange}
              value={values.material}
            >
              {materials.map((material) => (
                <option key={material.name} value={material.name}>
                  {material.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Control
              name="color"
              onChange={handleChange}
              type="text"
              value={values.color}
            />
            <SketchPicker
              className="my-2"
              color={values.color}
              onChange={handleColorChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Net Weight (g)</Form.Label>
            <Form.Control
              min="0"
              name="netWeight"
              onChange={handleChange}
              type="number"
              value={values.netWeight}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Spool Weight (g)</Form.Label>
            <Form.Control
              min="0"
              name="spoolWeight"
              onChange={handleChange}
              type="number"
              value={values.spoolWeight}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Current Weight (g)</Form.Label>
            <Form.Control
              min="0"
              name="currentWeight"
              onChange={handleChange}
              type="number"
              value={values.currentWeight}
            />
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
              min="0"
              name="filamentDiameter"
              onChange={handleChange}
              type="text"
              value={values.filamentDiameter}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Purchase Date</Form.Label>
            <Form.Control
              as={DatePicker}
              onChange={(date) =>
                setFieldValue('purchaseDate', formatISO(date))
              }
              selected={parseISO(values.purchaseDate)}
            />
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
  form: PropTypes.shape({
    values: PropTypes.object,
    setFieldValue: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }).isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool
};
