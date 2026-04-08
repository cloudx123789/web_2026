var count = 1;

function addfunction() {
    // 建立新的 BUTTON 元素
    var btn = document.createElement("BUTTON");
    
    // 設定按鈕內文，加入當前的 count 數字
    btn.innerHTML = `CLICK ME (${count})`;
    
    // 設定 ID，並將 count 加 1 供下次使用
    btn.setAttribute("id", "btn_" + count++);
    
    // 設定 Bootstrap 的 class 讓按鈕變成紅色外框
    btn.setAttribute("class", "btn btn-outline-danger");
    
    btn.addEventListener("click", function(e){
        e.target.innerHTML = e.target.id + "CLICKED!!!";
        console.log("onlclick1")
    });
    
    console.log(btn);
    
    // 將按鈕加到頁面的 body 中
    document.body.appendChild(btn);
}

function delfunction() {
    // 透過 --count 取得最後一個生成的按鈕 ID
    var btn = document.getElementById("btn_" + --count);
    
    console.log(btn);
    
    // 將該按鈕從頁面中移除
    if (btn) { // 加上簡單的檢查，避免 count 減到 0 以下時出錯
        document.body.removeChild(btn);
    } else {
        count = 1; // 重置 count 防止負數產生錯誤
    }
}