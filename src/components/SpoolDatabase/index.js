import { parseISO, format, formatISO } from 'date-fns';
import {
  faClone,
  faDownload,
  faPencil,
  faPlusCircle,
  faPrint,
  faQuestionCircle,
  faTrash,
  faWeightScale
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useFormik } from 'formik';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  OverlayTrigger,
  ProgressBar,
  Table,
  Tooltip
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';

import { useSettingsContext } from 'hooks/useSettingsContext';
import SpoolEditForm from 'components/SpoolDatabase/SpoolEditForm';
import { getMaterial } from 'utils';

export default function SpoolDatabase() {
  const initialValues = {
    name: 'Spool',
    material: 'PLA',
    color: '#000000',
    netWeight: 1000,
    spoolWeight: 250,
    currentWeight: 1250,
    filamentDiameter: 1.75,
    purchaseDate: formatISO(new Date())
  };
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
  const { spools, findSpool, addSpool, updateSpool, removeSpool } =
    useSettingsContext();

  const form = useFormik({
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
  const { setFieldValue } = form;

  const handleAdd = useCallback(() => {
    setShowForm(true);
    setSelectedId(null);
  }, [setShowForm, setSelectedId]);
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
  const handleClone = useCallback(() => {
    addSpool({
      ...findSpool(selectedId),
      id: v4()
    });
  }, [addSpool, findSpool, selectedId]);
  const handlePrint = useCallback(() => {}, []);
  const handleTare = useCallback(() => {}, []);
  const handleExport = useCallback(() => {}, []);
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

  useEffect(() => {
    setTotalWeight(spools.reduce((prev, curr) => prev + curr.netWeight, 0));
    setTotalRemaining(
      spools.reduce(
        (prev, curr) => prev + (curr.currentWeight - curr.spoolWeight),
        0
      )
    );
  }, [setTotalWeight, setTotalRemaining, spools]);

  return (
    <Fragment>
      <Helmet title="Spool Database" />
      <SpoolEditForm form={form} onHide={hideForm} show={showForm} />
      <div className="d-flex align-items-center">
        <h1 className="me-2">Spool Database</h1>
        <OverlayTrigger
          overlay={
            <Tooltip>
              Spool data is saved to your browser&apos;s local storage.
            </Tooltip>
          }
        >
          <FontAwesomeIcon icon={faQuestionCircle} />
        </OverlayTrigger>
      </div>
      <div className="d-flex mb-2">
        <ButtonGroup>
          <Button onClick={handleAdd} variant="success">
            <FontAwesomeIcon icon={faPlusCircle} /> Add
          </Button>
          <Button disabled={!selectedId} onClick={handleEdit}>
            <FontAwesomeIcon icon={faPencil} /> Edit
          </Button>
          <Button disabled={!selectedId} onClick={handleClone}>
            <FontAwesomeIcon icon={faClone} /> Clone
          </Button>
          <Button
            disabled={!selectedId}
            onClick={handleRemove}
            variant="danger"
          >
            <FontAwesomeIcon icon={faTrash} /> Remove
          </Button>
        </ButtonGroup>
        <ButtonGroup className="ms-auto">
          <Button disabled={!selectedId} onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} /> Print
          </Button>
          <Button disabled={!selectedId} onClick={handleTare}>
            <FontAwesomeIcon icon={faWeightScale} /> Tare
          </Button>
          <Button onClick={handleExport}>
            <FontAwesomeIcon icon={faDownload} /> Export
          </Button>
        </ButtonGroup>
      </div>
      <Table>
        <thead>
          <tr>
            <th colSpan={4}></th>
            <th className="text-center" colSpan={3}>
              Remaining
            </th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Material</th>
            <th className="text-center">Purchased</th>
            <th className="text-end">Net Weight</th>
            <th className="text-end">%</th>
            <th className="text-end">Mass</th>
            <th className="text-end">Length</th>
          </tr>
        </thead>
        <tbody>
          {!spools?.length && (
            <tr>
              <td colSpan={5}>No spools.</td>
            </tr>
          )}
          {spools.map((spool) => {
            const remainingWeight = spool.currentWeight - spool.spoolWeight;
            const remainingVolume =
              remainingWeight / getMaterial(spool.material).density;
            const remainingLength =
              remainingVolume /
              Math.PI /
              Math.pow(spool.filamentDiameter / 2, 2);

            return (
              <tr
                className={selectedId === spool.id ? 'bg-dark text-light' : ''}
                key={spool.id}
                onClick={() => toggleSelected(spool.id)}
              >
                <td>
                  <Badge bg="" style={{ backgroundColor: spool.color }}>
                    {spool.name}
                  </Badge>
                </td>
                <td>{spool.material}</td>
                <td className="text-end">{spool.netWeight} g</td>
                <td className="text-center">
                  {Boolean(spool.purchaseDate) &&
                    format(parseISO(spool.purchaseDate), 'yyyy-MM-dd')}
                </td>
                <td className="text-end">
                  <ProgressBar
                    className="text-light"
                    label={`${Math.floor(
                      (remainingWeight / spool.netWeight) * 1e2
                    )}%`}
                    now={(remainingWeight / spool.netWeight) * 1e2}
                  />
                </td>
                <td className="text-end">{remainingWeight} g</td>
                <td className="text-end">{remainingLength.toFixed(2)} m</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Totals</td>
            <td className="text-end" colSpan={2}>
              {Math.round(totalWeight)} g
            </td>
            <td className="text-end" colSpan={3}>
              {Math.round(totalRemaining)} g
            </td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    </Fragment>
  );
}
