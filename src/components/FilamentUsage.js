import { useFormik } from 'formik';
import { Fragment, useCallback, useState } from 'react';
import {
  Col,
  Row,
  Form,
  Dropdown,
  Spinner,
  ProgressBar
} from 'react-bootstrap';

import Layout from 'components/Layout';
import ResultsCard from 'components/ResultsCard';
import { materials, getMaterial } from 'utils';

const parseMove = (line) => [
  ...line.trim().matchAll(/(\s*(([XYZFE])([0-9\-.]+))\s*)/g)
];

export default function FilamentUsage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const initialValues = {
    material: null,
    diameter: 1.75,
    length: 1,
    price: 0,
    customMaterialDensity: 0
  };

  const { values, handleChange, setFieldValue } = useFormik({
    initialValues
  });

  const changeMaterial = useCallback(
    (name) => setFieldValue('material', name),
    [setFieldValue]
  );

  const changeFile = useCallback(
    (event) => {
      const [file] = event.target.files;

      if (!file || !file.name.endsWith('.gcode')) {
        return false;
      }

      setLoading(true);

      const reader = new FileReader();

      let totalExtrusionDistance = 0;

      // reader.addEventListener('progress', (e) => {
      //   // eslint-disable-next-line
      //   console.dir(Math.round(e.loaded / e.total));
      //   setProgress(Math.round(e.loaded / e.total));
      // });

      reader.addEventListener('load', (e) => {
        setProgress(0);
        const code = e.target.result;
        const lines = code.split(/[\n]/g);
        const movementCommands = lines.filter((line) => /^G1/.test(line));
        // const nozzlePosition = [0, 0, 0];

        let index = 0;
        // let index = 0,
        //   lastHeight = 0,
        //   layerHeight = 0;

        // const lastPosition = [0, 0, 0];
        // const axes = 'XYZ';

        for (const command of movementCommands) {
          // lastPosition = [...nozzlePosition];

          for (const [, , , axis, position] of parseMove(command)) {
            if (axis === 'E') {
              totalExtrusionDistance += parseFloat(position);
            }
            // } else if (axis === 'Z') {
            //   const newHeight = parseFloat(position);

            //   layerHeight = newHeight - lastHeight;
            //   lastHeight = newHeight;
            // }

            // const positionIndex = axes.indexOf(axis);

            // if (positionIndex === -1) {
            //   // eslint-disable-next-line
            //   continue;
            // }

            // nozzlePosition[positionIndex] = parseFloat(position);
          }

          // const movementDistance = Math.sqrt(
          //   Math.pow(nozzlePosition[0] - lastPosition[0], 2) +
          //     Math.pow(nozzlePosition[1] - lastPosition[1], 2) +
          //     Math.pow(nozzlePosition[2] - lastPosition[2], 2)
          // );

          setProgress(Math.round((index / movementCommands.length) * 1e2));
          index++;
        }

        setInterval(() => {
          setLoading(false);
          setProgress(0);
        }, 500);
        setFieldValue('length', (totalExtrusionDistance / 1e3).toFixed(2));
      });
      reader.readAsText(file);

      return true;
    },
    [setFieldValue, setLoading]
  );

  let mass = 0,
    volume = 0,
    density = 0,
    cost = 0;

  if (values.material || values.customMaterialDensity) {
    volume =
      (Math.PI * Math.pow(values.diameter / 2.0, 2) * (values.length * 1e3)) /
      1e3;
    density =
      values.material !== 'custom'
        ? getMaterial(values.material).density
        : values.customMaterialDensity;
    mass = volume * density;

    if (values.price > 0) {
      cost = (mass / 1e3) * values.price;
    }
  }

  return (
    <Layout title="Filament Usage">
      <h1>Filament Usage</h1>
      {loading ? (
        <Fragment>
          <Row>
            <Col className="text-center">
              <h4>Parsing your G-code...</h4>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Spinner animation="border" className="my-3" />
              <ProgressBar variant="primary" animated now={progress} />
            </Col>
          </Row>
        </Fragment>
      ) : (
        <Fragment>
          <Form>
            <Form.Group>
              <Form.Label>Select a G-code file</Form.Label>
              <Form.Control type="file" onChange={changeFile}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Material</Form.Label>
              <Dropdown onSelect={changeMaterial}>
                <Dropdown.Toggle variant="primary">
                  {values.material ? values.material : 'Select One'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {materials.map((material) => (
                    <Dropdown.Item
                      key={material.name}
                      eventKey={material.name}
                      value={material.name}
                    >
                      {material.name}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item eventKey="custom">Custom</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            {values.material === 'custom' && (
              <Form.Group>
                <Form.Label>
                  Custom Material Density (g/cm<sup>3</sup>)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="customMaterialDensity"
                  value={values.customMaterialDensity}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label>Diameter (mm)</Form.Label>
              <Form.Control
                name="diameter"
                onChange={handleChange}
                value={values.diameter}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Length (m)</Form.Label>
              <Form.Control
                name="length"
                onChange={handleChange}
                value={values.length}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price (cost/kg)</Form.Label>
              <Form.Control
                name="price"
                onChange={handleChange}
                value={values.price}
              />
            </Form.Group>
          </Form>
          {Boolean(values.material) && (
            <ResultsCard
              results={[
                {
                  label: 'Volume',
                  content: (
                    <span>
                      {volume.toFixed(2)} cm<sup>3</sup>
                    </span>
                  )
                },
                { label: 'Mass', content: <span>{mass.toFixed(2)} g</span> },
                { label: 'Cost', content: <span>{cost.toFixed(2)}</span> },
                {
                  label: 'Prints per kg',
                  content: <span>{Math.floor(1e3 / mass)}</span>
                }
              ]}
            />
          )}
        </Fragment>
      )}
    </Layout>
  );
}
