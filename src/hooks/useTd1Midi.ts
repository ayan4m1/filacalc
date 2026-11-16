import { useCallback, useRef, useState } from 'react';
import { TD1ScanResults } from '../types';

export default function useTd1Midi() {
  const [waiting, setWaiting] = useState(false);
  const [midiDevice, setMidiDevice] = useState<MIDIInput>();
  // hold a reference to MIDIAccess so it isn't garbage collected while connected
  const midiAccess = useRef<MIDIAccess>(undefined);
  const listener = useRef<(event: MIDIMessageEvent) => void>(undefined);
  const connect = useCallback(async () => {
    // sysex messages are silently dropped unless explicitly requested
    const access = await navigator.requestMIDIAccess({ sysex: true });
    const input = Array.from(access.inputs.values()).find(
      (candidate) => candidate.name === 'CircuitPython Audio'
    );

    if (!input) {
      return;
    }

    console.log('Connected to TD-1');

    midiAccess.current = access;
    setMidiDevice(input);
  }, []);
  const readData = useCallback(async () => {
    if (!midiDevice) {
      return Promise.reject('No MIDI device!');
    }

    return new Promise<TD1ScanResults>((resolve, reject) => {
      function onMessage(event: MIDIMessageEvent) {
        setWaiting(false);

        if (midiDevice && listener.current) {
          midiDevice.removeEventListener('midimessage', listener.current);
        }

        const { data } = event;

        if (!data) {
          return reject('No data in SysEx message!');
        }

        const decoder = new TextDecoder();
        const filamentData = decoder.decode(data);
        const [, , , , rawTd, rawColor] = filamentData.split(',');
        const transmissionDistance = parseFloat(rawTd);
        const color = rawColor.substring(0, 6);

        resolve({
          transmissionDistance,
          color: color ? `#${color}` : '#000000'
        });
      }

      midiDevice.addEventListener('midimessage', onMessage);
      midiDevice
        .open()
        .then(() => setWaiting(true))
        .catch(reject);

      listener.current = onMessage;
    });
  }, [midiDevice]);
  const disconnect = useCallback(async () => {
    if (midiDevice) {
      if (listener.current) {
        midiDevice.removeEventListener('midimessage', listener.current);
      }

      await midiDevice.close();
    }

    midiAccess.current = undefined;
    listener.current = undefined;
    setMidiDevice(undefined);
  }, [midiDevice]);

  return {
    connect,
    connected: Boolean(midiDevice),
    readData,
    disconnect,
    waiting
  };
}
