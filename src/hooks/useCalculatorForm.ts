import { FormikTouched, FormikValues, useFormik } from 'formik';
import { useEffect, useState } from 'react';

type CalculatorFormOpts<V, R> = {
  initialValues: V;
  calculate: (values: V) => R;
  shouldShow: (values: V, touched: FormikTouched<V>) => boolean;
  validate: (values: V) => string[];
};

export default function useCalculatorForm<V extends FormikValues, R>({
  initialValues,
  calculate,
  shouldShow,
  validate
}: CalculatorFormOpts<V, R>) {
  const [results, setResults] = useState<R>();
  const [errors, setErrors] = useState<string[]>([]);

  const formik = useFormik<V>({ initialValues, onSubmit: () => {} });
  const { values, touched } = formik;

  useEffect(() => {
    if (!shouldShow(values, touched)) {
      // eslint-disable-next-line
      setErrors([]);
      setResults(undefined);
      return;
    }

    const validationResults = validate(values);

    if (validationResults.length > 0) {
      setErrors(validationResults);
      setResults(undefined);
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
