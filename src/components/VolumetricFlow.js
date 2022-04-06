import { useFormik } from 'formik';
import { Fragment, useCallback } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import { getHotend, getNozzle, hotends, nozzles } from 'utils';

export default function VolumetricFlow() {
  // const [nozzleVolume, setNozzleVolume] = useState(0);
  // const [meltZoneVolume, setMeltZoneVolume] = useState(0);
  const initialValues = {
    nozzle: null,
    hotend: null,
    nozzleDiameter: 0.4,
    filamentDiameter: 1.75,
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

      // eslint-disable-next-line
      console.dir(
        `${newNozzleVolume.toFixed(2)} mm^3 + ${newMeltZoneVolume.toFixed(
          2
        )} mm^3 = ${totalMeltVolume.toFixed(2)} mm^3`
      );
      // eslint-disable-next-line
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

  return (
    <Fragment>
      <Helmet title="Volumetric Flow Optimization" />
      <h1>Volumetric Flow Optimization</h1>
      <Form onSubmit={handleSubmit}>
        <h3>Hotend</h3>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Dropdown onSelect={changeHotend}>
            <Dropdown.Toggle variant="primary">
              {values.hotend ? values.hotend : 'Select One'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {hotends.map((hotend) => (
                <Dropdown.Item key={hotend.name} eventKey={hotend.name}>
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
                type="number"
                name="customMeltZoneLength"
                value={values.customMeltZoneLength}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Diameter (mm)</Form.Label>
              <Form.Control
                type="number"
                name="customMeltZoneDiameter"
                value={values.customMeltZoneDiameter}
                onChange={handleChange}
              />
            </Form.Group>
          </Fragment>
        )}
        <h3>Nozzle</h3>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Dropdown onSelect={changeNozzle}>
            <Dropdown.Toggle variant="primary">
              {values.nozzle ? values.nozzle : 'Select One'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {nozzles.map((nozzle) => (
                <Dropdown.Item key={nozzle.name} eventKey={nozzle.name}>
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
                type="number"
                name="customNozzleDiameter"
                value={values.customNozzleDiameter}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Interior Length (mm)</Form.Label>
              <Form.Control
                type="number"
                name="customNozzleLength"
                value={values.customNozzleLength}
                onChange={handleChange}
              />
            </Form.Group>
          </Fragment>
        )}
        <Form.Group>
          <Form.Label>Diameter (mm)</Form.Label>
          <Form.Control
            type="number"
            name="nozzleDiameter"
            value={values.nozzleDiameter}
            onChange={handleChange}
          />
        </Form.Group>
        <h3>Slicing Parameters</h3>
        <Form.Group>
          <Form.Label>Layer Height (mm)</Form.Label>
          <Form.Control
            type="number"
            name="layerHeight"
            value={values.layerHeight}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Extrusion Width (mm)</Form.Label>
          <Form.Control
            type="number"
            name="extrusionWidth"
            value={values.extrusionWidth}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Print Speed (mm/s)</Form.Label>
          <Form.Control
            type="number"
            name="printSpeed"
            value={values.printSpeed}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit" className="mt-4">
            Calculate
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
}
