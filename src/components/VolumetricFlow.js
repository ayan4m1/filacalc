import { useFormik } from 'formik';
import { Fragment, useCallback } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';

import { useSettingsContext } from 'hooks/useSettingsContext';
import { getHotend, getNozzle, hotends, nozzles } from 'utils';

export default function VolumetricFlow() {
  const { filamentDiameter } = useSettingsContext();
  const initialValues = {
    nozzle: null,
    hotend: null,
    nozzleDiameter: 0.4,
    filamentDiameter,
    customNozzleDiameter: 0,
    customNozzleLength: 0,
    customMeltZoneDiameter: 0,
    customMeltZoneLength: 0,
    layerHeight: 0.2,
    extrusionWidth: 0.3,
    printSpeed: 50
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    onSubmit: useCallback((vals) => {
      const nozzle =
        vals.nozzle !== 'custom'
          ? getNozzle(vals.nozzle)
          : {
              diameter: vals.customNozzleDiameter,
              length: vals.customNozzleLength
            };
      const hotend =
        vals.hotend !== 'custom'
          ? getHotend(vals.hotend)
          : {
              meltZoneDiameter: vals.customMeltZoneDiameter,
              meltZoneLength: vals.customMeltZoneLength
            };
      const newNozzleVolume =
        Math.PI * Math.pow(nozzle.diameter / 2.0, 2) * nozzle.length;
      const newMeltZoneVolume =
        Math.PI *
        Math.pow(hotend.meltZoneDiameter / 2.0, 2) *
        hotend.meltZoneLength;
      const totalMeltVolume = newNozzleVolume + newMeltZoneVolume;
      const desiredFlowRate =
        vals.extrusionWidth * vals.layerHeight * vals.printSpeed;

      console.dir(
        `${newNozzleVolume.toFixed(2)} mm^3 + ${newMeltZoneVolume.toFixed(
          2
        )} mm^3 = ${totalMeltVolume.toFixed(2)} mm^3`
      );
      console.dir(`${desiredFlowRate} mm^3/s`);
    }, [])
  });

  const changeNozzle = useCallback(
    (name) => setFieldValue('nozzle', name),
    [setFieldValue]
  );
  const changeHotend = useCallback(
    (name) => setFieldValue('hotend', name),
    [setFieldValue]
  );

  let hotendLabel = 'Select One',
    nozzleLabel = 'Select One';

  if (values.hotend) {
    if (values.hotend === 'custom') {
      hotendLabel = 'Custom';
    } else {
      hotendLabel = values.hotend;
    }
  }

  if (values.nozzle) {
    if (values.nozzle === 'custom') {
      nozzleLabel = 'Custom';
    } else {
      nozzleLabel = values.nozzle;
    }
  }

  return (
    <Fragment>
      <title>Filacalc - Volumetric Flow Optimization</title>
      <h1>Volumetric Flow Optimization</h1>
      <Form onSubmit={handleSubmit}>
        <h3>Hotend</h3>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Dropdown onSelect={changeHotend}>
            <Dropdown.Toggle variant="primary">{hotendLabel}</Dropdown.Toggle>
            <Dropdown.Menu>
              {hotends.map((hotend) => (
                <Dropdown.Item eventKey={hotend.name} key={hotend.name}>
                  {hotend.name}
                </Dropdown.Item>
              ))}
              <Dropdown.Item eventKey="custom" value="custom">
                Custom
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        {values.hotend === 'custom' && (
          <Fragment>
            <Form.Group>
              <Form.Label>Length (mm)</Form.Label>
              <Form.Control
                name="customMeltZoneLength"
                onChange={handleChange}
                type="number"
                value={values.customMeltZoneLength}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Diameter (mm)</Form.Label>
              <Form.Control
                name="customMeltZoneDiameter"
                onChange={handleChange}
                type="number"
                value={values.customMeltZoneDiameter}
              />
            </Form.Group>
          </Fragment>
        )}
        <h3>Nozzle</h3>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Dropdown onSelect={changeNozzle}>
            <Dropdown.Toggle variant="primary">{nozzleLabel}</Dropdown.Toggle>
            <Dropdown.Menu>
              {nozzles.map((nozzle) => (
                <Dropdown.Item eventKey={nozzle.name} key={nozzle.name}>
                  {nozzle.name}
                </Dropdown.Item>
              ))}
              <Dropdown.Item eventKey="custom" value="custom">
                Custom
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        {values.nozzle === 'custom' && (
          <Fragment>
            <Form.Group>
              <Form.Label>Interior Diameter (mm)</Form.Label>
              <Form.Control
                name="customNozzleDiameter"
                onChange={handleChange}
                type="number"
                value={values.customNozzleDiameter}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Interior Length (mm)</Form.Label>
              <Form.Control
                name="customNozzleLength"
                onChange={handleChange}
                type="number"
                value={values.customNozzleLength}
              />
            </Form.Group>
          </Fragment>
        )}
        <Form.Group>
          <Form.Label>Diameter (mm)</Form.Label>
          <Form.Control
            name="nozzleDiameter"
            onChange={handleChange}
            type="number"
            value={values.nozzleDiameter}
          />
        </Form.Group>
        <h3>Slicing Parameters</h3>
        <Form.Group>
          <Form.Label>Layer Height (mm)</Form.Label>
          <Form.Control
            name="layerHeight"
            onChange={handleChange}
            type="number"
            value={values.layerHeight}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Extrusion Width (mm)</Form.Label>
          <Form.Control
            name="extrusionWidth"
            onChange={handleChange}
            type="number"
            value={values.extrusionWidth}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Print Speed (mm/s)</Form.Label>
          <Form.Control
            name="printSpeed"
            onChange={handleChange}
            type="number"
            value={values.printSpeed}
          />
        </Form.Group>
        <Form.Group>
          <Button className="mt-4" type="submit" variant="primary">
            Calculate
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
}
