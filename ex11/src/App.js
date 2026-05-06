import React from 'react';
// 重點：要把 @material-ui 改成 @mui
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// 這是 Page 48 要求的元件邏輯
const MultiButton = (num) => {
  var output = [];
  
  output.push(
    <IconButton key="1" color="primary" aria-label="add to shopping cart">
      <AddShoppingCartIcon />
    </IconButton>
  );
  
  output.push(
    <IconButton key="2" color="primary" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
  
  output.push(
    <IconButton key="3" color="primary" aria-label="add an alarm">
      <AlarmIcon />
    </IconButton>
  );
  
  return output;
};

// 這是 Page 49 呈現的效果
function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ color: 'red', fontSize: '80px', fontWeight: 'bold' }}>
        hello CGU!!
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {MultiButton()}
      </div>
    </div>
  );
}

export default App;