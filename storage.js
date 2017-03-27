(function (window, store) {
    if (window.localStorage) {     //检测localStorage 是否存在。

        store.prototype.storage = window.localStorage;

        Storage.prototype.initData = function (val, exp) {            //处理数据，转为json
            var dataInfo = {val: val};
            if (exp) {
                dataInfo = {val: val, exp: exp, time: new Date().getTime()};
            }
            return JSON.stringify(dataInfo);
        };

        Storage.prototype.dataReduction = function (infoCache) {       //还原数据
            return JSON.parse(infoCache);
        };


        Storage.prototype.set = function (key, val, exp) {             //存储数据
            var valInfo = this.initData(val, exp);
            this.storage.setItem(this.nameSpeace + key, valInfo)
        };

        Storage.prototype.get = function (key) {                       //获取数据
            var infoCache = this.storage.getItem(this.nameSpeace + key);
            if (!infoCache) {
                return null;
            }
            return this.checkExpired(infoCache);
        };

        Storage.prototype.checkExpired = function (infoCache) {        //检查过期数据
            var info = this.dataReduction(infoCache);
            if (info.exp && new Date().getTime() - info.time > info.exp) {
                return null;
            }
            return info.val
        };

        Storage.prototype.remove = function (key) {                    //删除数据
            this.storage.removeItem(this.nameSpeace + key);
        };

        Storage.prototype.clear = function () {
            var length = this.storage.length;
            for (var i = 0; i < length; i++) {
                if (this.storage.key(i).indexOf(this.nameSpeace) != -1) {
                    this.remove(this.storage.key(i));
                }
            }
        };


        Storage.prototype.getAll = function () {
            var length = this.storage.length;
            var allData = [];
            for (var i = 0; i < length; i++) {
                if (this.storage.key(i).indexOf(this.nameSpeace) != -1) {
                    var dataCache = this.storage.getItem(this.storage.key(i));
                    var data = {key:this.storage.key(i).replace(this.nameSpeace,""),value:this.dataReduction(dataCache).val};
                    allData.push(data);
                }
            }
            return allData;
        };

        Storage.prototype.length = function () {
            var data = this.getAll();
            return data.length;
        };

    } else {
        throw 'The browser does not support local storage';
    }
})(window, Storage);

function Storage() {
    this.nameSpeace = "__storage__";
}









