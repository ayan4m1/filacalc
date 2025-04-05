import { useCallback, useEffect, useState } from 'react';
import { getAsciiBytes, getAsciiString, supportsWebSerial } from 'utils';

export default function useTd1Serial() {
  const [serialPort, setSerialPort] = useState(null);
  const [dataStreams, setDataStreams] = useState({
    reader: null,
    writer: null
  });
  const [waiting, setWaiting] = useState(false);
  const readData = useCallback(async () => {
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

      const [, , , , transmissionDistance, color] = filamentData.split(',');

      setWaiting(false);
      return {
        transmissionDistance,
        color: `#${color}`
      };
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
  }, [serialPort, waiting]);
  const close = useCallback(async () => {
    if (!serialPort) {
      return;
    }

    dataStreams.reader?.releaseLock?.();
    dataStreams.writer?.releaseLock?.();
    await serialPort.close();
    setWaiting(false);
  }, [serialPort, dataStreams]);
  const connect = useCallback(async () => {
    try {
      const grantedPort = await navigator.serial.requestPort({
        filters: [{ usbVendorId: 0xe4b2, usbProductId: 0x0045 }]
      });

      if (grantedPort) {
        setSerialPort(grantedPort);
      }
    } catch (error) {
      if (!error.message.includes('No port selected')) {
        alert(error.message);
      }
    }
  }, []);

  useEffect(() => {
    const enumerateSerialPorts = async () => {
      const existingPorts = await navigator.serial.getPorts();

      if (existingPorts.length) {
        setSerialPort(existingPorts[0]);
      }
    };

    if (supportsWebSerial) {
      enumerateSerialPorts();
    }
  }, []);

  return {
    connect,
    readData,
    close,
    waiting,
    serialPort
  };
}
