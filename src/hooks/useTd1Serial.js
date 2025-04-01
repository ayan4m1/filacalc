import { useCallback, useState } from 'react';
import { getAsciiBytes, getAsciiString } from 'utils';

export default function useTd1Serial({ serialPort, setFieldValue }) {
  const [dataStreams, setDataStreams] = useState({
    reader: null,
    writer: null
  });
  const [waiting, setWaiting] = useState(false);
  const connect = useCallback(async () => {
    if (!serialPort || waiting) {
      return;
    }

    let reader = null,
      writer = null;

    try {
      await serialPort.open({ baudRate: 115200 });

      reader = serialPort.readable.getReader();
      writer = serialPort.writable.getWriter();

      setDataStreams({
        reader,
        writer
      });

      await writer.write(getAsciiBytes('connect\n'));

      let tempBuffer = '';

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        } else {
          tempBuffer += getAsciiString(value).trim();

          if (tempBuffer === 'ready') {
            break;
          }
        }
      }

      await writer.write(getAsciiBytes('P\n'));

      setWaiting(true);

      let filamentData = '';

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        } else {
          filamentData += getAsciiString(value).trim();

          if (filamentData.endsWith('licensed')) {
            break;
          }
        }
      }

      filamentData = '';

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        } else {
          filamentData += getAsciiString(value).trim();

          if (filamentData.lastIndexOf(',') == filamentData.length - 7) {
            break;
          }
        }
      }

      const [, , , , td, color] = filamentData.split(',');

      setWaiting(false);
      setFieldValue('transmissionDistance', td);
      setFieldValue('color', `#${color}`);
    } catch (error) {
      console.error(error);
    } finally {
      try {
        reader?.releaseLock?.();
        writer?.releaseLock?.();
        await serialPort.close();
      } catch {
        console.log('Failed to close serial port!');
      }
    }
  }, [serialPort, setFieldValue, waiting]);
  const disconnect = useCallback(async () => {
    if (!serialPort) {
      return;
    }

    dataStreams.reader?.releaseLock?.();
    dataStreams.writer?.releaseLock?.();
    await serialPort.close();
    setWaiting(false);
  }, [serialPort, dataStreams]);

  return {
    connect,
    disconnect,
    waiting
  };
}
