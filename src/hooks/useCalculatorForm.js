import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

export default function useCalculatorForm({
  initialValues,
  calculate,
  shouldShow,
  validate
}) {
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);

  const formik = useFormik({ initialValues });
  const { values, touched } = formik;

  useEffect(() => {
    if (!shouldShow(values, touched)) {
      setErrors([]);
      setResults(null);
      return;
    }

    const validationResults = validate(values);

    if (validationResults.length > 0) {
      setErrors(validationResults);
      setResults(null);
    } else {
      setErrors([]);
      setResults(calculate(values));
    }
  }, [values, touched, shouldShow, validate, calculate, setResults]);

  return {
    formik,
    results,
    errors
  };
}
