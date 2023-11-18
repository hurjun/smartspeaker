import React, { useEffect, useState } from 'react';
import { getSpeech } from './test/getspeech';

function RouteTest2() {
  useEffect(() => {
    window.speechSynthesis.getVoices();
    getSpeech('안녕');
  },[]);

  return (
    <h1>This is 3</h1>
  );
}

export default RouteTest2;