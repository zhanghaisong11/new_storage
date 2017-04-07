(function (window, store) {
    if (!window.localStorage) {     //检测localStorage 是否存在。
        throw 'storage.js error : The browser does not support localStorage';
    }

    store.prototype.set = function (key, val, exp) {             //存储数据
        checkKeyExist(key, 'set');
        var valInfo = initData(val, exp);
        window.localStorage.setItem(this.nameSpeace + key, valInfo);
    };

    store.prototype.get = function (key) {    //获取数据
        checkKeyExist(key, 'get');
        var infoCache = window.localStorage.getItem(this.nameSpeace + key);
        if (!infoCache) {
            return null;
        }
        return checkExpired(infoCache, this.nameSpeace + key);
    };

    store.prototype.remove = function (key) {                    //删除数据
        window.localStorage.removeItem(this.nameSpeace + key);
    };

    store.prototype.clear = function () {
        var nameSpeace = this.nameSpeace;
        var keys = getAllKey(this.nameSpeace);
        keys.forEach(function (key) {
            window.localStorage.removeItem(nameSpeace + key);
        })
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
            if (key.indexOf(namespace) > -1) {
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
            checkExpType(exp);
            dataInfo = {val: val, exp: exp, time: new Date().getTime()};
        }
        return JSON.stringify(dataInfo);
    }

    function checkExpired(infoCache, key) {        //检查过期数据
        var info = dataReduction(infoCache);
        if (info.exp && new Date().getTime() - info.time > info.exp) {
            window.localStorage.removeItem(key);
            return null ;
        }
        return info.val ;
    }

    function checkKeyExist(key, type) {
        if (!key) {
            throw type + ' error : the key is undefind';
        }
    }

    function checkExpType(exp) {
        var type = Object.prototype.toString.call(exp).toString();
        if (type.indexOf('Number') < 0) {
            throw 'type error : the exp is not number';
        }
    }

})(window, Storage);

function Storage(nameSpeace) {
    this.nameSpeace = nameSpeace ? '__' + nameSpeace + '__' : '__storage__';
}









