import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const Convert = () => {
  const [text, setText] = useState('');
  const messageRef = useRef(null);

  const [color, setColor] = useState('#FFFFFF');
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const [fontColor, setFontColor] = useState('#282231');
  const handleFontColorChange = (event) => {
    setFontColor(event.target.value);
  };

  const handleColorSwap = () => {
    let temp = color;
    setColor(fontColor);
    setFontColor(temp);
  }

  const handleConvert = async () => {
    const wrapText = (text, lineHeight, maxLines, containerWidth) => {
      const words = text.split(' ');
      let lines = [];
      let currentLine = '';

      words.forEach((word) => {
        const testLine = currentLine + word + ' ';
        const testDiv = document.createElement('div');
        testDiv.style.position = 'absolute';
        testDiv.style.whiteSpace = 'nowrap';
        testDiv.style.fontFamily = 'Times New Roman';
        testDiv.style.fontSize = '16px';
        testDiv.style.visibility = 'hidden';
        testDiv.textContent = testLine;
        document.body.appendChild(testDiv);
        const testWidth = testDiv.clientWidth;
        document.body.removeChild(testDiv);

        if (testWidth > containerWidth && currentLine) {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine) {
        lines.push(currentLine.trim());
      }

      let chunks = [];
      for (let i = 0; i < lines.length; i += maxLines) {
        chunks.push(lines.slice(i, i + maxLines).join(' '));
      }

      return chunks;
    };

    const lineHeight = 24;
    const maxLines = 15;
    const containerWidth = 800;
    const textChunks = wrapText(text, lineHeight, maxLines, containerWidth);

    for (let i = 0; i < textChunks.length; i++) {
      const chunk = textChunks[i];

      const tempDiv = document.createElement('div');
      tempDiv.style.width = `${containerWidth}px`;
      tempDiv.style.padding = '20px';
      tempDiv.style.backgroundColor = color;
      tempDiv.style.fontFamily = 'Times New Roman';
      tempDiv.style.color = fontColor;
      tempDiv.style.whiteSpace = 'pre-wrap';
      tempDiv.innerHTML = `<p>${chunk}</p><br/><p style="text-align: center; margin: 0;">${i + 1}</p>`;
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        backgroundColor: '#FFE7A3',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `converted_text_${i}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      document.body.removeChild(tempDiv);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500 text-secondary font-times p-4">
      <textarea
        className="w-full max-w-lg p-2 mb-4 border border-secondary rounded"
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        ref={messageRef}
      />

      <div className='flex flex-rows'>
      <div style={{  padding: '20px' }}>
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
      />
      <p className='text-lg'>Background Color: <span className='font-semibold'> {color}</span> </p>
      
    </div>
    <div className='m-6'>
        <button 
        className='px-4 py-2 bg-secondary text-primary rounded-lg'
        onClick={handleColorSwap}>Swap</button>
    </div>
    <div style={{  padding: '20px' }}>
      <input
        type="color"
        value={fontColor}
        onChange={handleFontColorChange}
      />
      <p className='text-lg'>Font Color: <span className='font-semibold'> {fontColor}</span></p>
    </div>
      </div>
      

      <button
        className="bg-secondary text-primary py-2 px-4 rounded"
        onClick={handleConvert}
      >
        Convert to Image
      </button>
    </div>
  );
};

export default Convert;
