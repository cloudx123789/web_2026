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

// 要求 2: window.onload 時，在 container div 中亂數產生 a-z 的 0 到 2 個字元的字串
window.onload = function() {
    const container = document.getElementById("container");
    container.innerText = generateRandomChars(0, 2);
};

// 要求 4: 在 keyup event 時觸發邏輯
window.addEventListener("keyup", function(e) {
    const container = document.getElementById("container");
    let currentText = container.innerText;
    
    console.log(e.key);

    // 確保字串不為空，避免出錯
    if (currentText.length > 0) {
        // 要求 3: 打入字元和第一個字相等時，消除該字元！
        if (e.key === currentText[0]) {
            // 擷取第二個字元到最後的字串（相當於刪除第一個字元）
            currentText = currentText.substring(1);
        }
    }

    // 要求 4: 在 container div 中亂數產生 a-z 的一到三個字元接在字串後
    const newChars = generateRandomChars(1, 3);
    currentText += newChars;

    // 將更新後的字串寫回 container
    container.innerText = currentText;
});