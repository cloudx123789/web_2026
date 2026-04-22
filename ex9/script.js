// Flickr API 網址
var dataUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1';

function getimg() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, true);
    xhr.send();

    xhr.onload = function () {
        if (this.status === 200) {
            var data = JSON.parse(this.responseText);
            add_new_img(data);
        } else {
            console.error("API 請求失敗");
        }
    };
}

function add_new_img(dataset) {
    var gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; 

    var photoList = dataset.photos.photo;

    photoList.forEach(function(item) {
        var img = document.createElement('img');
        
        // 合成 Flickr 圖片網址
        var serverId = item.server;
        var id = item.id;
        var secret = item.secret;
        
        img.src = 'https://live.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_w.jpg';
        
        gallery.appendChild(img);
    });
}