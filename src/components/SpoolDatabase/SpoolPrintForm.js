import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default function SpoolPrintForm({ spool, onHide, show, onSubmit }) {
  const [filamentLength, setFilamentLength] = useState(0);

  const handleSubmit = useCallback(
    () => onSubmit(filamentLength),
    [onSubmit, filamentLength]
  );

  return (
    <Modal onHide={onHide} show={show}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Print from {spool?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Filament Length (m)</Form.Label>
            <Form.Control
              min="0"
              onChange={(event) =>
                setFilamentLength(parseFloat(event.target.value))
              }
              type="number"
              value={filamentLength}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Print
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

SpoolPrintForm.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool,
  onSubmit: PropTypes.func,
  spool: PropTypes.object
};
