import React, { useEffect, useRef } from 'react';
import borderImg from '../../assets/borderBg.png';
import img5 from '../../assets/WechatIMG42.png';

const CodeRainHeartAnimation = () => {
  // Refs for canvas elements
  const codeRainCanvasRef = useRef(null);
  const heartCanvasRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Code Rain Variables
    const cvs = codeRainCanvasRef.current;
    const ctx = cvs.getContext('2d');
    cvs.width = width;
    cvs.height = height;

    const columnWidth = 40;
    const columnCount = Math.floor(width / columnWidth);
    const columnNextIndexes = new Array(columnCount).fill(0);
    const message = '娇儿除夕快乐';

    // Heart Animation Variables
    const heartCanvas = heartCanvasRef.current;
    const heartCtx = heartCanvas.getContext('2d');
    heartCanvas.width = width;
    heartCanvas.height = height;

    const hearts = [];

    // Code Rain Draw Function
    const drawCodeRain = () => {
      ctx.fillStyle = 'rgba(49, 37, 32, 0.15)';
      ctx.fillRect(0, 0, width, height);
      
      const fz = 20;
      ctx.fillStyle = '#ff0000';
      ctx.font = `${fz}px "Roboto Mono"`;

      for (let i = 0; i < columnCount; i++) {
        const x = i * columnWidth;
        const y = fz * columnNextIndexes[i];
        const charIndex = (columnNextIndexes[i] % message.length);
        ctx.fillText(message[charIndex], x, y);

        if (y > height && Math.random() > 0.98) {
          columnNextIndexes[i] = 0;
        }

        columnNextIndexes[i]++;
      }
    };

    // Heart Animation Functions
    const createHeart = () => {
      const size = Math.random() * 30 + 20;
      const x = heartCanvas.width / 2;
      const y = heartCanvas.height / 2;
      const speed = Math.random() * 2 + 1;
      const angle = Math.random() * 2 * Math.PI;
      hearts.push({
        x,
        y,
        size,
        speed,
        angle,
        opacity: 0.8,
      });
    };

    const drawHearts = () => {
      heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

      hearts.forEach((heart, index) => {
        heartCtx.font = `${heart.size}px Arial`;
        heartCtx.fillStyle = `rgba(255, 0, 0, ${heart.opacity})`;
        heartCtx.fillText("❤", heart.x, heart.y);

        heart.x += Math.cos(heart.angle) * heart.speed;
        heart.y += Math.sin(heart.angle) * heart.speed;

        heart.opacity -= 0.005;

        if (heart.opacity <= 0 || heart.x < 0 || heart.x > heartCanvas.width || heart.y < 0 || heart.y > heartCanvas.height) {
          hearts.splice(index, 1);
        }
      });
    };

    // Main Animation Loop
    const animate = () => {
      drawCodeRain();
      setTimeout(animate, 100);
    };

    const heartAnimate = () => {
      drawHearts();
      requestAnimationFrame(heartAnimate);
    };

    // Start the animations
    animate();
    heartAnimate();
    setInterval(createHeart, 80);

    // Cleanup when the component is unmounted
    return () => {
      cancelAnimationFrame(heartAnimate);
      clearTimeout(animate);
    };
  }, []);

  return (
    <div>
      {/* Code Rain Canvas */}
      <canvas ref={codeRainCanvasRef} />
      
      {/* Heart Animation Canvas */}
      <canvas ref={heartCanvasRef} style={{position: 'fixed',left: 0}}/>

      {/* Image */}
      <div style={{
          position: 'fixed',
          top: '50%',
          left: '15%',
          width: '70%',
          aspectRatio:1,
          transform: 'translateY(-50%)',
        }}>
        <img
          src={img5}
          className="rotating"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '100%'
          }}
        />
        <img style={{
          position: 'absolute',
          top: '-15%',
          left: '-16.5%',
          width: '127%',
          objectFit: 'cover',
          }} src={borderImg} alt="" />
      </div>
      
    </div>
  );
};

export default CodeRainHeartAnimation;
