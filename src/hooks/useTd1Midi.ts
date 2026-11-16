import { useCallback, useRef, useState } from 'react';

export default function useTd1Midi(
  onMidiMessage: (input: MIDIInput, event: MIDIMessageEvent) => void
) {
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

    function onMessage(event: MIDIMessageEvent) {
      onMidiMessage(input as MIDIInput, event);
    }

    input.addEventListener('midimessage', onMessage);
    await input.open();

    console.log('Connected to TD-1');

    midiAccess.current = access;
    listener.current = onMessage;
    setMidiDevice(input);
  }, [onMidiMessage]);
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
    disconnect
  };
}
