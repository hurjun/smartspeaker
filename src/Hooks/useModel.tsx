import { useState } from 'react';

function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  const onToggle = () => {
    setIsShowing((isShowing) => !isShowing);
  };

  return {isShowing, onToggle};
}

export default useModal;
