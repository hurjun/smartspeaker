import { useState } from 'react';

function useWebsocket() {
  const [isWebsocket, setIsWebsocket] = useState(false);

  const onToggleWS = () => {
    setIsWebsocket((isWebsocket) => !isWebsocket);
  };

  return { isWebsocket, onToggleWS };
}

export default useWebsocket;
