import { useCallback, useEffect, useState } from 'react';
import { getAsciiBytes, getAsciiString, supportsWebSerial } from 'utils';

const readUntil = async (reader, isEnd) => {
  let result = '';

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      // if device is sending screen mirroring commands, ignore and restart
      if (result === 'clearScreen' || result.startsWith('display')) {
        result = '';
        continue;
      }

      break;
    } else {
      result += getAsciiString(value).trim();

      const end = isEnd(result);

      if (end) {
        break;
      }
    }
  }

  return result;
};

export default function useTd1Serial() {
  const [serialPort, setSerialPort] = useState(null);
  const [dataStreams, setDataStreams] = useState({
    reader: null,
    writer: null
  });
  const [waiting, setWaiting] = useState(false);
  const readData = useCallback(async () => {
    if (!serialPort || waiting) {
      return {};
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
      await readUntil(reader, (msg) => msg === 'ready');
      await writer.write(getAsciiBytes('P\n'));

      let filamentData = '';

      setWaiting(true);
      await readUntil(reader, (msg) => msg.endsWith('licensed'));

      filamentData = await readUntil(
        reader,
        (msg) => msg.lastIndexOf(',') == msg.length - 7
      );

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

    return {};
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
        filters: [
          { usbVendorId: 0xe4b2, usbProductId: 0x0045 }, // td-1
          { usbVendorId: 0xe4b2, usbProductId: 0x0044 } // td-0
        ]
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
