import React, { useCallback, useEffect, useRef } from 'react';
import latter from '../../assets/latter.jpg'
import music from '../../assets/我们像风.mp3'
export default function () {
  const [show, setShow] = React.useState(true);
  const audioRef = useRef(null);

  const play = useCallback(() => {
    setShow(false);
    audioRef.current && audioRef.current.play();
  }, [])

  return (
    <>{show ? <div className='open'>
        <img className='bt' onClick={play} src={latter} alt="" />
      </div> : null}
      <audio ref={audioRef} src={music} loop></audio>
    </>
  );
}