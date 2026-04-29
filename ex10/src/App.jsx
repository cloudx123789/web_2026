import React from 'react'

function App() {
  // 定義點擊事件處理函式
  const changeText = (event) => {
    console.log(event.target);
    // 實作投影片要求的文字變更
    event.target.innerText = event.target.innerText + "被點了";
  };

  const styleArgument = {
    color: 'blue',
    cursor: 'pointer',
    fontSize: '2rem',
    marginTop: '50px',
    textAlign: 'center'
  };

  return (
    <div className="App">
      {/* 綁定點擊事件 */}
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
      <p style={{ textAlign: 'center' }}>（點擊上方文字看看效果）</p>
    </div>
  )
}

export default App