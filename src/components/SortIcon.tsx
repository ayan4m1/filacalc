import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortAlphaDown,
  faSortAlphaUp
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
  column: string;
  onToggle: (column: string, direction: boolean) => void;
}

export default function SortIcon({ column, onToggle }: IProps) {
  const [direction, setDirection] = useState(false);
  const handleToggle = useCallback(() => {
    setDirection((dir) => {
      const newDir = !dir;

      if (onToggle) {
        onToggle(column, newDir);
      }

      return newDir;
    });
  }, [setDirection, onToggle, column]);

  return (
    <FontAwesomeIcon
      className="sort-icon"
      icon={direction ? faSortAlphaDown : faSortAlphaUp}
      onClick={handleToggle}
    />
  );
}
