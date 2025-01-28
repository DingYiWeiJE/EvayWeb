import React, { useState, useEffect } from 'react';
import img5 from '../../assets/WechatIMG42.jpg';

const RadialImageTransition = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
        <img
          src={img5}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 1, // 确保每张图片都显示
            transition: 'clip-path 1s ease-out', // 平滑过渡
          }}
        />
      
    </div>
  );
};

export default RadialImageTransition;
