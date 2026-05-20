import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function App() {
  // 儲存從 API 取得的所有原始資料
  const [allData, setAllData] = useState([]);
  // 儲存經過搜尋過濾後要呈現的資料
  const [filteredData, setFilteredData] = useState([]);
  // 儲存搜尋框的關鍵字
  const [keyword, setKeyword] = useState('');

  // 1. 使用 useEffect 來呼叫 API 並更新資料
  // 空陣列 [] 作為 dependency，確保只在組件初次渲染時執行一次 (類似 window.onload)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6');
        const data = await response.json();
        
        // DataGrid 規定每筆 row 必須要有唯一值的 'id' 屬性
        // 由於原始 API 資料可能沒有唯一 ID，我們利用陣列的 index 來建立
        const formattedData = data.map((item, index) => ({
          id: index,
          title: item.title || "",
          location: (item.showInfo && item.showInfo.length > 0) ? item.showInfo[0].location : "",
          price: (item.showInfo && item.showInfo.length > 0) ? item.showInfo[0].price : ""
        }));

        setAllData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error("API 獲取失敗:", error);
      }
    };

    fetchData();
  }, []); // 請參考上課講義 page 42-45 的寫法，通常即是這種 fetch 資料的模式

  // 2. 處理搜尋功能
  const handleSearch = (e) => {
    const searchVal = e.target.value.trim().toLowerCase();
    setKeyword(searchVal);

    if (searchVal === "") {
      setFilteredData(allData);
    } else {
      const result = allData.filter(row => 
        row.title && row.title.toLowerCase().includes(searchVal)
      );
      setFilteredData(result);
    }
  };

  // 3. 定義 DataGrid 的欄位 (對應 HW4 的表頭)
  const columns = [
    { field: 'title', headerName: '名稱', flex: 2 },
    { field: 'location', headerName: '地點', flex: 1 },
    { field: 'price', headerName: '票價', flex: 1 }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
        <h1 style={{ margin: 0 }}>景點觀光展覽資訊</h1>
        <input 
          type="text" 
          placeholder="搜尋展覽名稱..." 
          value={keyword}
          onChange={handleSearch}
          style={{ width: '250px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      
      {/* 4. 使用 DataGrid 取代原本的 HTML Table */}
      <div style={{ height: 630, width: '100%' }}>
        <DataGrid 
          rows={filteredData} 
          columns={columns} 
          // 設定每頁顯示 10 筆，對應 HW4 的 itemsPerPage = 10
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

export default App;