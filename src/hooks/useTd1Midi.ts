import { useCallback, useState } from 'react';

export default function useTd1Midi(
  onMidiMessage: (input: MIDIInput, event: MIDIMessageEvent) => void
) {
  const [midiDevice, setMidiDevice] = useState<MIDIInput>();
  const connect = useCallback(async () => {
    const result = await navigator.requestMIDIAccess();
    result.inputs.forEach(async (input) => {
      if (input.name !== 'CircuitPython Audio') {
        return;
      }

      function onMessage(this: MIDIInput, event: MIDIMessageEvent) {
        onMidiMessage(this, event);
      }

      input.onmidimessage = onMessage;
      await input.open();

      console.log('Connected to TD-1');

      setMidiDevice(input);
    });
  }, [onMidiMessage]);
  const disconnect = useCallback(async () => {
    if (midiDevice) {
      await midiDevice.close();
    }

    setMidiDevice(undefined);
  }, [midiDevice]);

  return {
    connect,
    connected: Boolean(midiDevice),
    disconnect
  };
}
