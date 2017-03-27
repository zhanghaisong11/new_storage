(function (window, store) {
    if (window.localStorage) {     //检测localStorage 是否存在。

        store.prototype.storage = window.localStorage;

        store.prototype.set = function (key, val, exp) {             //存储数据
            var valInfo = initData(val, exp);
            this.storage.setItem(this.nameSpeace + key, valInfo)
        };

        store.prototype.get = function (key) {                       //获取数据
            var infoCache = this.storage.getItem(this.nameSpeace + key);
            if (!infoCache) {
                return null;
            }
            return checkExpired(infoCache);
        };

        store.prototype.remove = function (key) {                    //删除数据
            this.storage.removeItem(this.nameSpeace + key);
        };

        store.prototype.clear = function () {
            this.storage.clear();
        };

        function dataReduction(infoCache) {       //还原数据
            return JSON.parse(infoCache);
        }

        function  initData (val, exp) {            //处理数据，转为json
            var dataInfo = {val: val};
            if (exp) {
                dataInfo = {val: val, exp: exp, time: new Date().getTime()};
            }
            return JSON.stringify(dataInfo);
        }

        function checkExpired (infoCache) {        //检查过期数据
            var info = dataReduction(infoCache);
            if (info.exp && new Date().getTime() - info.time > info.exp) {
                return null;
            }
            return info.val
        }

    } else {
        throw 'The browser does not support local storage';
    }
})(window, Storage);

function Storage() {
    this.nameSpeace = "__storage__";
}









