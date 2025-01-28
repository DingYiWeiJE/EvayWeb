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
      <audio ref={audioRef} src='https://webfs.kugou.com/202501281603/49e8244c1280bdbf1e1bd9f57845bbde/v3/a2af3c831e5f3b9d5cdfbe3d40f55f56/yp/full/ap1014_us13788576_mii0w1iw8z2ai2iphcu80ooo2ki81120_pi406_mx621826507_s244741648.mp3' loop></audio>
    </>
  );
}