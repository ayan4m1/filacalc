import { Fragment, useCallback } from 'react';
import { Form, ProgressBar } from 'react-bootstrap';

import ResultsCard from 'components/ResultsCard';
import { getMaterial, getSpool, materials, spools } from 'utils';
import useCalculatorForm from 'hooks/useCalculatorForm';
import FormErrors from 'components/FormErrors';

export default function SpoolWeight() {
  const initialValues = {
    brand: '',
    material: '',
    diameter: 1.75,
    netWeight: 1000,
    currentWeight: 0,
    customSpoolMass: 0,
    customMaterialDensity: 0
  };

  const {
    formik: { values, handleChange, handleBlur },
    results,
    errors
  } = useCalculatorForm({
    initialValues,
    shouldShow: useCallback(
      (vals, touched) =>
        touched.brand || vals.brand || touched.material || vals.material,
      []
    ),
    validate: useCallback((vals) => {
      const result = [];

      if (vals.currentWeight <= 0) {
        result.push('Current spool weight must be greater than zero.');
      }

      if (vals.netWeight <= 0) {
        result.push('Net weight must be greater than zero');
      }

      if (!vals.brand) {
        result.push('Select a brand.');
      } else {
        const spoolMass =
          vals.brand !== 'custom'
            ? getSpool(vals.brand).mass
            : parseFloat(vals.customSpoolMass);
        const remainingMass = Math.max(0, vals.currentWeight - spoolMass);

        if (remainingMass === 0) {
          result.push('Spool weight looks incorrect, it should be empty.');
        }
      }

      if (!vals.material) {
        result.push('Select a material.');
      }

      return result;
    }, []),
    calculate: useCallback((vals) => {
      const spoolMass =
        vals.brand && vals.brand !== 'custom'
          ? getSpool(vals.brand).mass
          : parseFloat(vals.customSpoolMass);
      const materialDensity =
        vals.material && vals.material !== 'custom'
          ? getMaterial(vals.material).density
          : parseFloat(vals.customMaterialDensity);

      const remainingMass = vals.currentWeight - spoolMass;
      const remainingVolume = remainingMass / materialDensity;
      const remainingLength =
        remainingVolume / (Math.PI * Math.pow(vals.diameter / 2.0, 2));
      const remainingPercent = (remainingMass / vals.netWeight) * 1e2;

      let progressVariant = 'success';

      if (remainingPercent <= 25) {
        progressVariant = 'danger';
      } else if (remainingPercent <= 50) {
        progressVariant = 'warning';
      }

      return [
        {
          label: 'Mass',
          content: <span>{Math.round(remainingMass)} g</span>
        },
        {
          label: 'Length',
          content: <span>{remainingLength.toFixed(2)} m</span>
        },
        {
          label: 'Volume',
          content: (
            <span>
              {remainingVolume.toFixed(2)} cm<sup>3</sup>
            </span>
          )
        },
        {
          label: 'Percentage',
          content: (
            <ProgressBar
              className="text-light"
              label={`${Math.round(remainingPercent)} %`}
              now={remainingPercent}
              variant={progressVariant}
            />
          )
        }
      ];
    }, [])
  });

  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Select
            name="brand"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.brand}
          >
            <option value="">Select One</option>
            {spools.map((spool) => (
              <option key={spool.brand} value={spool.brand}>
                {spool.brand}
              </option>
            ))}
            <option value="custom">Custom</option>
          </Form.Select>
        </Form.Group>
        {values.brand === 'custom' && (
          <Form.Group>
            <Form.Label>Custom Spool Mass (g)</Form.Label>
            <Form.Control
              name="customSpoolMass"
              onChange={handleChange}
              type="number"
              value={values.customSpoolMass}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Material</Form.Label>
          <Form.Select
            name="material"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.material}
          >
            <option value="">Select One</option>
            {materials.map((material) => (
              <option key={material.name} value={material.name}>
                {material.name}
              </option>
            ))}
            <option value="custom">Custom</option>
          </Form.Select>
        </Form.Group>
        {values.material === 'custom' && (
          <Form.Group>
            <Form.Label>
              Custom Material Density (g/cm<sup>3</sup>)
            </Form.Label>
            <Form.Control
              min="0"
              name="customMaterialDensity"
              onChange={handleChange}
              type="number"
              value={values.customMaterialDensity}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Filament Diameter (mm)</Form.Label>
          <Form.Control
            min="0"
            name="diameter"
            onChange={handleChange}
            type="number"
            value={values.diameter}
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
      </Form>
      <FormErrors errors={errors} />
      {Boolean(results) && (
        <ResultsCard results={results} title="Remaining Filament" />
      )}
    </Fragment>
  );
}
