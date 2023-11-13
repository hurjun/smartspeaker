/* eslint-disable */
import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import RecordingTimer from './RecordingTimer';
import styles from './RobotVideo.module.scss';
import recordStart from '../../Assets/recordStart.png';
import recordStop from '../../Assets/recordStop.png';

function RobotVideo({ robotId }) {
  let mediaRecorder;
  let recordedChunks = [];
  const MediaOptions = {
    audio: true,
    video: true,
    preferCurrentTab: true,
  };
  const iframeRef = useRef(null);
  const linkRef = useRef(null);
  const [isRecord, setIsRecord] = useState(false);

  let track;
  const getMediaStream = useCallback(
    async (options) => {
      let stream;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(options);
        [track] = stream.getVideoTracks();
        const cropTarget = await CropTarget.fromElement(iframeRef.current);
        await track.cropTo(cropTarget);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
      return stream;
    },
    [mediaRecorder]
  );

  const startRecording = useCallback(async () => {
    const mediaStream = await getMediaStream(MediaOptions);
    mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm;codecs=vp9',
    });
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
        const blob = new Blob(recordedChunks, {
          type: 'video/webm',
        });
        const url = URL.createObjectURL(blob);
        linkRef.current.href = url;
        linkRef.current.download = 'record.webm';
        linkRef.current.click();
        window.URL.revokeObjectURL(url);
      }
    };
    mediaRecorder.start();
    setIsRecord(true);
  }, [mediaRecorder]);

  const stopRecording = useCallback(() => {
    mediaRecorder.stop();

    recordedChunks = [];
    mediaRecorder = undefined;
    track.stop();
    track = undefined;
    setIsRecord(false);
  }, [mediaRecorder]);

  return (
    <>
      <RobotVideoContents>
        <VideoTag ref={iframeRef}>
          <Oon>
            <iframe
              // ref={iframeRef}
              title="videos"
              scrolling="no"
              src={`https://oon.dogong.xyz/vr/${robotId}/front/`}
              style={{ width: '100%', height: '100%' }}
              frameBorder={0}
            />
          </Oon>
          <Oon>
            <iframe
              // ref={iframeRef}
              title="videos"
              scrolling="no"
              src={`https://oon.dogong.xyz/vr/${robotId}/left/`}
              style={{ width: '100%', height: '100%' }}
              frameBorder={0}
            />
          </Oon>
          <Oon>
            <iframe
              // ref={iframeRef}
              title="videos"
              scrolling="no"
              src={`https://oon.dogong.xyz/vr/${robotId}/right/`}
              style={{ width: '100%', height: '100%' }}
              frameBorder={0}
            />
          </Oon>
          <Oon>
            <iframe
              // ref={iframeRef}
              title="videos"
              scrolling="no"
              src={`https://oon.dogong.xyz/vr/${robotId}/rear/`}
              style={{ width: '100%', height: '100%' }}
              frameBorder={0}
            />
          </Oon>
        </VideoTag>
      </RobotVideoContents>
      <VideoRecordingStartContents>
        {!isRecord && (
          <button onClick={startRecording} className={styles.button}>
            <img src={recordStart} alt="recordStartImage" />
          </button>
        )}
        {isRecord && (
          <button onClick={stopRecording} className={styles.button}>
            <img src={recordStop} alt="recordStopImage" />
          </button>
        )}
        <RecordingTimer isRecord={isRecord} stopRecording={stopRecording} />
        <a ref={linkRef} />
      </VideoRecordingStartContents>
    </>
  );
}

const RobotVideoContents = styled.div`
  background-color: #1a1a1a;
  border-radius: 30px;
  grid-area: a;
  padding: 15px;
`;

const VideoRecordingStartContents = styled.div`
  background-color: #1a1a1a;
  border-radius: 30px;
  grid-area: b;
  padding: 15px;
  display: flex;
  align-items: center;
  column-gap: 30px;
`;

const VideoTag = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  //grid-row: auto auto;
`;
const Oon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default RobotVideo;
