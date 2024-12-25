// src/TranslateComponent.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const appKey = '0664c5e24ade7d78';
const key = '7RJy5wG31uqwqPp5QsTvpibmlNM4AgD8';
const apiUrl = 'https://openapi.youdao.com/api';

const truncate = (q: string) => {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
};

const TranslateComponent: React.FC = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const salt = new Date().getTime();
  const curtime = Math.round(new Date().getTime() / 1000);

  const translate = async () => {
    if (!text) return;

    setLoading(true);
    setError('');
    
    const salt = new Date().getTime();
    const sign = generateSign(text, salt);

    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: text,
          appKey,
          salt,
          from: 'auto',
          to: 'zh-CHS', // 目标语言
          sign,
        },
      });

      if (response.data.errorCode === '0') {
        setTranslatedText(response.data.translation[0]);
      } else {
        setError(`Error: ${response.data.errorCode}`);
      }
    } catch (err) {
      setError('Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateSign = (text: string, salt: number): string => {
    const str = appKey + text + salt + key;
    return str
  };


  const test = async () => {
    const requestData = {
      q: '丁凯乐挑战全世界',
      appKey: appKey,
      salt: salt,
      from: 'auto',
      to: 'en',
      sign: CryptoJS.MD5('丁凯乐挑战全世界' + salt + curtime + key).toString(),
      signType: "v3",
      curtime: curtime,
      vocabId: '',
    };

    try {
      const response = await fetch('https://openapi.youdao.com/v2/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>有道翻译 Demo</h1>
      <textarea 
        rows={4} 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="输入要翻译的文本"
      />
      <button onClick={translate} disabled={loading}>
        {loading ? '翻译中...' : '翻译'}
      </button>
      {translatedText && (
        <div>
          <h2>翻译结果:</h2>
          <p>{translatedText}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TranslateComponent;
