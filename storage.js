(function (window, store) {
    if (!window.localStorage) {     //检测localStorage 是否存在。
        throw 'storage.js error : The browser does not support localStorage';
    }
    store.prototype.storage = window.localStorage;

    store.prototype.set = function (key, val, exp) {             //存储数据
        var valInfo = initData(val, exp);
        this.storage.setItem(this.nameSpeace + key, valInfo);
    };

    store.prototype.get = function (key) {                       //获取数据
        var infoCache = this.storage.getItem(this.nameSpeace + key);
        if (!infoCache) {
            return null;
        }
        return checkExpired(infoCache, key);
    };

    store.prototype.remove = function (key) {                    //删除数据
        this.storage.removeItem(this.nameSpeace + key);
    };

    store.prototype.clear = function () {
        this.storage.clear();
    };

    store.prototype.length = function () {
        return getAllKey(this.nameSpeace).length;
    };

    store.prototype.getAll = function () {                          //获取所有数据
        var keys = getAllKey(this.nameSpeace);
        var allData = [];
        for (var i = 0; i < keys.length; i++) {
            allData.push({key: keys[i], value: this.get(keys[i])});
        }
        return allData;
    };

    function getAllKey(namespace) {
        var allKeys = [];
        for (var i = 0; i < window.localStorage.length; i++) {
            var key = window.localStorage.key(i);
            if (key.indexOf(namespace) != -1) {
                allKeys.push(key.replace(namespace, ""));
            }
        }
        return allKeys;
    }

    function dataReduction(infoCache) {       //还原数据
        return JSON.parse(infoCache);
    }

    function initData(val, exp) {            //处理数据，转为json
        var dataInfo = {val: val};
        if (exp) {
            dataInfo = {val: val, exp: exp, time: new Date().getTime()};
        }
        return JSON.stringify(dataInfo);
    }

    function checkExpired(infoCache, key) {        //检查过期数据
        var info = dataReduction(infoCache);
        if (info.exp && new Date().getTime() - info.time > info.exp) {
            store.prototype.remove(key);
            return null;
        }
        return info.val
    }

})(window, Storage);

function Storage() {
    this.nameSpeace = "__storage__";
}









