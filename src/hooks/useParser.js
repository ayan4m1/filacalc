import { useCallback, useEffect, useMemo, useState } from 'react';

import parserWorker from 'workers/parser';
import { createWebWorker } from 'utils';

export default function useParser(handler) {
  const ParserWorker = useMemo(() => createWebWorker(parserWorker), []);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const parseHandler = useCallback(
    ({ data }) => {
      switch (data.type) {
        case 'progress':
          setProgress(data.progress);
          break;
        case 'result':
          handler(data);
          setLoading(false);
          setProgress(100);
          break;
        case 'error':
          setError(true);
          setLoading(false);
          break;
        default:
          break;
      }
    },
    [handler, setProgress, setLoading, setError]
  );

  const parse = useCallback(
    (file) => {
      if (!file || !file.name.endsWith('.gcode')) {
        setError(true);
        setLoading(false);
        return;
      }

      setError(false);
      setLoading(true);
      setProgress(0);

      ParserWorker.postMessage(file);
    },
    [ParserWorker]
  );

  useEffect(() => {
    ParserWorker.addEventListener('message', parseHandler);

    return () => ParserWorker.removeEventListener('message', parseHandler);
  });

  return {
    loading,
    error,
    progress,
    parse
  };
}
