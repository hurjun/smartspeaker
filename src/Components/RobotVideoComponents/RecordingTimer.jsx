import { useTimer } from "react-timer-and-stopwatch";
import { useEffect } from "react";

function Stopwatch({isRecord, stopRecording}) {
    const timer = useTimer({
        create: {
            stopwatch: {},
        },
        autoplay: false,
        callbacks: {
            onProgress: [
                {
                    time: {
                        hours: 1
                    },
                    callback: () => stopRecording()
                }
            ]
        }
    });

    useEffect(() => {
        if(isRecord) {
            timer.togglePause();
        } else {
            timer.resetTimer();
        }
    }, [isRecord]);

    return (
        <span>{ timer.timerText }</span>
    );
}

export default Stopwatch;