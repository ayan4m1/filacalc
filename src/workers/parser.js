export default () => {
  const parseMove = (line) => [
    ...line.trim().matchAll(/(\s*(([XYZFEIJR])([0-9\-.]+))\s*)/g)
  ];

  const getExtrusionLength = (command) => {
    for (const [, , , axis, position] of parseMove(command)) {
      if (axis === 'E') {
        return parseFloat(position);
      }
    }

    return 0;
  };

  // const getLineTravelLength = (position, command) => {
  //   const subCommands = parseMove(command);
  //   const values = {
  //     x: 0,
  //     y: 0,
  //     z: 0
  //   };

  //   for (const [, , , code, value] of subCommands) {
  //     values[code.toLowerCase()] = parseFloat(value);
  //   }

  //   return Math.sqrt(
  //     Math.pow(position.x - values.x, 2) +
  //       Math.pow(position.y - values.y, 2) +
  //       Math.pow(position.z - values.z, 2)
  //   );
  // };

  // const getArcTravelLength = (position, command) => {
  //   const subCommands = parseMove(command);
  //   const values = {
  //     x: 0,
  //     y: 0,
  //     i: 0,
  //     j: 0,
  //     r: 0
  //   };

  //   for (const [, , , code, value] of subCommands) {
  //     values[code.toLowerCase()] = parseFloat(value);
  //   }

  //   const centerPoint = {
  //     x: position.x + values.x,
  //     y: position.y + values.y
  //   };

  //   if (values.r !== 0) {
  //     if (values.x === 0 && values.y === 0) {
  //       // invalid according to Marlin
  //       return 0;
  //     }

  //     return 0;
  //   } else if (values.i !== 0 || values.j !== 0) {
  //     const radius = Math.sqrt(
  //       Math.pow(position.x - centerPoint.x, 2) +
  //         Math.pow(position.y - centerPoint.y, 2)
  //     );

  //     if (values.x === 0 && values.y === 0) {
  //       // complete circle
  //       return 2 * Math.PI * radius;
  //     } else {
  //       // partial circle
  //       return 0;
  //     }
  //   } else {
  //     return 0;
  //   }
  // };

  self.addEventListener('message', ({ data }) => {
    const reader = new FileReader();

    let totalExtrusionDistance = 0,
      percentComplete = 0;

    reader.addEventListener('load', (e) => {
      const code = e.target.result;
      const lines = code.split(/[\n]/g);
      const movementCommands = lines.filter((line) => /^G[1-3]/.test(line));

      for (const [index, command] of movementCommands.entries()) {
        totalExtrusionDistance += getExtrusionLength(command);

        const newPercent = Math.round((index / movementCommands.length) * 1e2);

        if (newPercent !== percentComplete) {
          postMessage({
            type: 'progress',
            progress: newPercent
          });
          percentComplete = newPercent;
        }
      }

      if (totalExtrusionDistance > 0) {
        postMessage({
          type: 'result',
          length: totalExtrusionDistance / 1e3
        });
      }
    });

    reader.addEventListener('error', () => {
      postMessage({ type: 'error' });
    });

    reader.readAsText(data);
  });
};
