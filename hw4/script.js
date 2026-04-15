// 全域變數宣告
let allData = [];        // 儲存從 API 抓回來的所有原始資料
let filteredData = [];   // 儲存經過搜尋篩選後的資料 (畫面上實際呈現的來源)
let currentPage = 1;     // 目前頁碼
const itemsPerPage = 10; // 規定每頁顯示 10 筆

// 發送 AJAX 請求取得資料
function loadData() {
    var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', openUrl, true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // 解析回傳的 JSON 並儲存到全域變數
            allData = JSON.parse(this.responseText);
            // 初始狀態下，未搜尋前的篩選資料等於所有資料
            filteredData = allData;
            // 回到第一頁並重新渲染表格
            currentPage = 1;
            renderTable();
        }
    };
}

// 根據 current page 渲染表格與分頁資訊
function renderTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = ""; // 清空舊的表格內容

    // 計算總頁數 (如果篩選後沒資料，至少顯示 1 頁)
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

    // 更新分頁資訊文字
    document.getElementById("pageInfo").innerText = `${currentPage} / ${totalPages} 頁`;

    // 計算陣列的起點與終點索引
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // 擷取當前頁次需要顯示的 10 筆資料
    const pageData = filteredData.slice(startIndex, endIndex);

    // 將擷取出的資料逐筆塞入表格中
    pageData.forEach(function(data) {
        var row = tbody.insertRow();
        
        row.insertCell(0).innerText = data['title'] || "";
        
        if (data['showInfo'] && data['showInfo'].length > 0) {
            row.insertCell(1).innerText = data['showInfo'][0]['location'] || "";
            row.insertCell(2).innerText = data['showInfo'][0]['price'] || "";
        } else {
            row.insertCell(1).innerText = "";
            row.insertCell(2).innerText = "";
        }
    });

    // 處理防呆：如果在第一頁，禁用「上一頁」；如果在最後一頁，禁用「下一頁」
    document.getElementById("prevBtn").disabled = (currentPage === 1);
    document.getElementById("nextBtn").disabled = (currentPage === totalPages);
}

// 處理搜尋功能 (當 input 失去焦點或按下 Enter 時觸發 onchange)
function searchData() {
    // 取得輸入值，轉小寫並去除前後空白
    const keyword = document.getElementById("searchInput").value.trim().toLowerCase();

    if (keyword === "") {
        // 如果沒輸入東西，就回復成全部資料
        filteredData = allData;
    } else {
        // 使用 filter 篩選出標題包含關鍵字的資料
        filteredData = allData.filter(function(data) {
            return data.title && data.title.toLowerCase().includes(keyword);
        });
    }

    // 搜尋後，資料總數改變，必須強制回到第一頁重新計算
    currentPage = 1;
    renderTable();
}

// 切換至上一頁
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

// 切換至下一頁
function nextPage() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

// 當網頁載入完成後，自動執行一次抓取資料
window.onload = function() {
    loadData();
};