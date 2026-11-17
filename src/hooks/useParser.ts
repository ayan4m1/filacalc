import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

type ProgressEvent = {
  type: 'progress';
  progress: number;
};

type ResultEvent = {
  type: 'result';
  length: number;
};

type ErrorEvent = {
  type: 'error';
  error: object;
};

type ParserEvent = ProgressEvent | ResultEvent | ErrorEvent;

export default function useParser(handler: (result: ResultEvent) => void) {
  const ParserWorker = useMemo(
    () => new Worker(new URL('../workers/parser.ts', import.meta.url)),
    []
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const parseHandler = useCallback(
    ({ data }: { data: ParserEvent }) => {
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

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (
        !file ||
        (!file.name.endsWith('.gcode') && !file.name.endsWith('.gcode.3mf'))
      ) {
        setError(true);
        setLoading(false);
        return;
      }

      setError(false);
      setLoading(true);
      setProgress(0);

      ParserWorker?.postMessage({
        format: file.name.endsWith('.3mf') ? '3mf' : 'gcode',
        file
      });
    },
    [ParserWorker]
  );

  useEffect(() => {
    ParserWorker?.addEventListener('message', parseHandler);

    return () => ParserWorker?.removeEventListener('message', parseHandler);
  });

  return {
    loading,
    error,
    progress,
    handleChange
  };
}
