import { parseISO, format, formatISO } from 'date-fns';
import {
  faClone,
  faDownload,
  faPencil,
  faPlusCircle,
  faPrint,
  faQuestionCircle,
  faTrash,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import fileDownload from 'js-file-download';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { getContrastingColor } from 'react-color/lib/helpers/color';
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  OverlayTrigger,
  ProgressBar,
  Row,
  Table,
  Tooltip
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { v4 } from 'uuid';
import * as Yup from 'yup';

import { useSettingsContext } from 'hooks/useSettingsContext';
import SpoolEditForm from 'components/SpoolDatabase/SpoolEditForm';
import SpoolPrintForm from 'components/SpoolDatabase/SpoolPrintForm';
import { getRemainingFilament } from 'utils';

const SpoolSchema = Yup.object({
  name: Yup.string().required('Name must be provided.'),
  material: Yup.string().required('Material must be provided.'),
  materialDensity: Yup.number().moreThan(
    0,
    'Density must be greater than zero.'
  ),
  color: Yup.string()
    .required('Color must be provided.')
    .matches(/#[a-fA-F0-9]+/, 'Color is invalid.'),
  netWeight: Yup.number()
    .required('Net weight must be provided.')
    .moreThan(0, 'Net weight must be greater than zero.'),
  spoolWeight: Yup.number()
    .required('Spool weight must be provided.')
    .moreThan(0, 'Spool weight must be greater than zero.'),
  currentWeight: Yup.number()
    .required('Current weight must be provided.')
    .moreThan(0, 'Current weight must be greater than zero.'),
  filamentDiameter: Yup.number()
    .required('Filament diameter must be provided.')
    .moreThan(0, 'Filament diameter must be greater than zero.'),
  purchaseDate: Yup.string().required('Purchase date must be provided.'),
  purchaseCost: Yup.number().required('Purchase cost must be provided.')
});

export default function SpoolDatabase() {
  const { filamentDiameter } = useSettingsContext();
  const initialValues = {
    name: 'Spool',
    material: 'PLA',
    materialDensity: 1.24,
    color: '#000000',
    netWeight: 1000,
    spoolWeight: 250,
    currentWeight: 1250,
    filamentDiameter,
    purchaseDate: formatISO(new Date()),
    purchaseCost: 0
  };
  const importRef = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPrintForm, setShowPrintForm] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
  const { spools, findSpool, addSpool, updateSpool, removeSpool, setSpools } =
    useSettingsContext();

  const form = useFormik({
    initialValues,
    validationSchema: SpoolSchema,
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
      setShowEditForm(false);
    }
  });
  const { handleReset, setFieldValue } = form;

  const handleAdd = useCallback(() => {
    handleReset();
    setShowEditForm(true);
    setSelectedId(null);
  }, [setShowEditForm, setSelectedId, handleReset]);
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

    setShowEditForm(true);
  }, [setShowEditForm, setFieldValue, findSpool, selectedId]);
  const handleRemove = useCallback(() => {
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
  const handlePrint = useCallback(() => {
    if (!selectedId) {
      return;
    }

    setShowPrintForm(true);
  }, [selectedId, setShowPrintForm]);
  const handlePrintSubmit = useCallback(
    (filamentWeight) => {
      if (!selectedId) {
        return;
      }

      const spool = findSpool(selectedId);
      const remainingWeight =
        Math.round((spool.currentWeight - filamentWeight) * 1e2) / 1e2;

      updateSpool({
        ...spool,
        currentWeight: remainingWeight
      });
      setShowPrintForm(false);
    },
    [findSpool, updateSpool, selectedId]
  );
  const handleImport = useCallback(() => {
    if (importRef.current) {
      importRef.current.click();
    }
  }, [importRef]);
  const handleImportSubmit = useCallback(
    (event) => {
      const {
        target: {
          files: [file]
        }
      } = event;
      const reader = new FileReader();

      reader.onloadend = (loaded) => {
        const {
          target: { result }
        } = loaded;
        const parsed = JSON.parse(result);

        if (
          parsed &&
          alert(
            'Are you sure you want to overwrite your current spool database?'
          )
        ) {
          setSelectedId(null);
          setSpools(parsed);
        }
      };
      reader.readAsText(file);
    },
    [setSelectedId, setSpools]
  );
  const handleExport = useCallback(
    () =>
      fileDownload(
        JSON.stringify(spools),
        `filacalc-export-${format(Date.now(), 'yyyy-MM-dd')}.json`
      ),
    [spools]
  );
  const hideForm = useCallback(() => {
    if (confirm('Are you sure you want to cancel?')) {
      setShowEditForm(false);
    }
  }, [setShowEditForm]);
  const hidePrintForm = useCallback(
    () => setShowPrintForm(false),
    [setShowPrintForm]
  );
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
      {showEditForm && <SpoolEditForm form={form} onHide={hideForm} />}
      {selectedId && showPrintForm && (
        <SpoolPrintForm
          onHide={hidePrintForm}
          onSubmit={handlePrintSubmit}
          spool={findSpool(selectedId)}
        />
      )}
      <Row className="mb-2">
        <Col md={9}>
          <div className="d-flex align-items-center">
            <h1 className="me-2">Spool Database</h1>
            <OverlayTrigger
              overlay={(props) => (
                <Tooltip {...props}>
                  All data is saved to your browser&apos;s local storage.
                </Tooltip>
              )}
              placement="right"
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
            </OverlayTrigger>
          </div>
        </Col>
        <Col className="d-flex justify-content-end align-items-end" md={3}>
          <input
            className="d-none"
            onChange={handleImportSubmit}
            ref={importRef}
            type="file"
          />
          <ButtonGroup>
            <Button onClick={handleImport}>
              <FontAwesomeIcon icon={faUpload} /> Import
            </Button>
            <Button onClick={handleExport}>
              <FontAwesomeIcon icon={faDownload} /> Export
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
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
        </ButtonGroup>
      </div>
      <Table>
        <thead>
          <tr>
            <th colSpan={5}></th>
            <th className="text-center" colSpan={3}>
              Remaining
            </th>
          </tr>
          <tr>
            <th style={{ width: '30%' }}>Name</th>
            <th>Material</th>
            <th className="text-center">Purchased</th>
            <th className="text-end">Net Weight</th>
            <th className="text-end">Cost / kg</th>
            <th className="text-end" style={{ width: '20%' }}>
              %
            </th>
            <th className="text-end">Mass</th>
            <th className="text-end">Length</th>
          </tr>
        </thead>
        <tbody>
          {!spools?.length && (
            <tr>
              <td colSpan={8}>No spools.</td>
            </tr>
          )}
          {spools.map((spool) => {
            const { mass: remainingMass, length: remainingLength } =
              getRemainingFilament(spool);
            const rowClasses =
              selectedId === spool.id ? 'bg-dark text-light' : '';
            const purchaseDate = format(
              parseISO(spool.purchaseDate),
              'yyyy-MM-dd'
            );
            const material =
              spool.material === 'custom' ? 'Custom' : spool.material;

            return (
              <tr
                className={rowClasses}
                key={spool.id}
                onClick={() => toggleSelected(spool.id)}
              >
                <td>
                  <Badge
                    bg=""
                    style={{
                      color: getContrastingColor(spool.color),
                      backgroundColor: spool.color
                    }}
                  >
                    {spool.name}
                  </Badge>
                </td>
                <td>{material}</td>
                <td className="text-center">{purchaseDate}</td>
                <td className="text-end">{spool.netWeight} g</td>
                <td className="text-end">
                  {Boolean(spool.purchaseCost) &&
                    ((spool.purchaseCost / spool.netWeight) * 1e3).toFixed(2)}
                </td>
                <td className="text-end">
                  <ProgressBar
                    className="text-light"
                    label={`${Math.floor(
                      (remainingMass / spool.netWeight) * 1e2
                    )}%`}
                    now={(remainingMass / spool.netWeight) * 1e2}
                  />
                </td>
                <td className="text-end">{remainingMass.toFixed(2)} g</td>
                <td className="text-end">{remainingLength.toFixed(2)} m</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Totals</td>
            <td className="text-end" colSpan={3}>
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
