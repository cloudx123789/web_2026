// 輔助函式：亂數產生指定數量區間的 a-z 小寫字串
function generateRandomChars(min, max) {
    // 決定要產生的字元長度
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    let result = '';
    
    for (let i = 0; i < length; i++) {
        // a 到 z 的 ASCII code 為 97 到 122
        const randomCharCode = Math.floor(Math.random() * 26) + 97;
        result += String.fromCharCode(randomCharCode);
    }
    return result;
}

// 宣告全域變數，用於追蹤連續打錯的次數
let consecutiveErrors = 0;

// 要求 2: window.onload 時，在 container div 中亂數產生 a-z 的 0 到 2 個字元的字串
window.onload = function() {
    const container = document.getElementById("container");
    container.textContent = generateRandomChars(0, 2);
};

// 要求 4: 在 keyup event 時觸發邏輯
window.addEventListener("keyup", function(e) {
    const container = document.getElementById("container");
    // 讀取當前字串
    let currentText = container.textContent;
    
    console.log(e.key);

    // 確保字串不為空，避免出錯
    if (currentText.length > 0) {
        // 判斷按下的按鍵是否與第一個字元相同
        if (e.key === currentText[0]) {
            // 輸入正確：擷取第二個字元到最後的字串（刪除第一個字元）
            currentText = currentText.substring(1);
            // 連續錯誤次數歸零
            consecutiveErrors = 0;
        } else {
            // 輸入錯誤：連續錯誤次數加一
            consecutiveErrors++;
        }
    }

    // 原本每次按鍵都要增加的亂數 1 到 3 個字元
    const newChars = generateRandomChars(1, 3);
    currentText += newChars;

    // 判斷是否連續打錯三次
    if (consecutiveErrors === 3) {
        // 額外增加 3 個亂數產生的字串（此處以長度為 3 的隨機字串實作）
        const penaltyChars = generateRandomChars(3, 3);
        currentText += penaltyChars;
        
        // 懲罰執行後，將計數器歸零重新計算
        consecutiveErrors = 0;
    }

    // 將更新後的字串寫回 container（改用 textContent 提升效能與安全性）
    container.textContent = currentText;
});