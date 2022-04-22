import {
  faPencil,
  faPlusCircle,
  faQuestionCircle,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import { Fragment, useCallback, useState } from 'react';
import { Button, ButtonGroup, Form, Modal, Table } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { v4 } from 'uuid';

import { useSettingsContext } from 'hooks/useSettingsContext';
import { materials } from 'utils';

export default function SpoolDatabase() {
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { spools, findSpool, addSpool, updateSpool, removeSpool } =
    useSettingsContext();
  const initialValues = {
    name: 'Spool',
    material: 'PLA',
    color: '#000000'
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    onSubmit: (vals) => {
      if (selectedId) {
        updateSpool({
          id: selectedId,
          ...vals
        });
      } else {
        addSpool({
          id: v4(),
          ...vals
        });
      }
      setShowForm(false);
    }
  });

  const handleAdd = useCallback(() => setShowForm(true), [setShowForm]);
  const handleEdit = useCallback(() => {
    if (!selectedId) {
      return;
    }

    const spool = findSpool(selectedId);

    for (const key in spool) {
      if (Object.hasOwn(spool, key)) {
        setFieldValue(key, spool[key]);
      }
    }

    setShowForm(true);
  }, [setShowForm, setFieldValue, findSpool, selectedId]);
  const handleRemove = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (selectedId && confirm('Are you sure you want to delete this spool?')) {
      removeSpool(selectedId);
    }
  }, [removeSpool, selectedId]);
  const hideForm = useCallback(() => {
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure you want to cancel?')) {
      setShowForm(false);
    }
  }, [setShowForm]);
  const toggleSelected = useCallback(
    (id) => setSelectedId((selId) => (selId === id ? null : id)),
    [setSelectedId]
  );

  return (
    <Fragment>
      <Modal onHide={hideForm} show={showForm}>
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
              <SketchPicker />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={hideForm} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <div className="d-flex align-items-center">
        <h1 className="me-2">Spool Database</h1>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </div>
      <ButtonGroup className="mb-2">
        <Button onClick={handleAdd} variant="success">
          <FontAwesomeIcon icon={faPlusCircle} /> Add
        </Button>
        <Button disabled={!selectedId} onClick={handleEdit}>
          <FontAwesomeIcon icon={faPencil} /> Edit
        </Button>
        <Button disabled={!selectedId} onClick={handleRemove} variant="danger">
          <FontAwesomeIcon icon={faTrash} /> Remove
        </Button>
      </ButtonGroup>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Material</th>
            <th>Net Weight</th>
            <th>Purchased</th>
            <th>Percent Remaining</th>
          </tr>
        </thead>
        <tbody>
          {!spools?.length && (
            <tr>
              <td colSpan={5}>No spools.</td>
            </tr>
          )}
          {spools.map((spool) => (
            <tr
              className={selectedId === spool.id ? 'bg-dark text-light' : ''}
              key={spool.id}
              onClick={() => toggleSelected(spool.id)}
            >
              <td>{spool.name}</td>
              <td>{spool.material}</td>
              <td>{spool.netWeight}</td>
              <td>{spool.purchaseDate}</td>
              <td>{spool.percentRemaining}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
}
