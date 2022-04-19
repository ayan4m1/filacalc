import { useFormik } from 'formik';
import { Fragment } from 'react';
import { Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import SpoolDimensions from 'components/SpoolUsage/SpoolDimensions';
import SpoolWeight from 'components/SpoolUsage/SpoolWeight';

export default function SpoolUsage() {
  const initialValues = {
    type: 'weight'
  };

  const { values, handleChange } = useFormik({ initialValues });

  return (
    <Fragment>
      <Helmet title="Spool Usage" />
      <h1>Spool Usage</h1>
      <p>
        Use this calculator to determine the amount of filament remaining on a
        partially used spool. Select which type of measurements you would like
        to take below.
      </p>
      <Form>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Select name="type" onChange={handleChange} value={values.type}>
            <option value="weight">Weight</option>
            <option value="dimensions">Dimensions</option>
          </Form.Select>
        </Form.Group>
      </Form>
      {values.type === 'weight' ? <SpoolWeight /> : <SpoolDimensions />}
    </Fragment>
  );
}
