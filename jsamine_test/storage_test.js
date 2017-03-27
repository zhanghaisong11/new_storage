var tsetStorage = new Storage();  //定义存储键名为 tsetStorage 过期时间4秒
tsetStorage.clear();
describe("测试storage", function () {

    it("测试存取字符串", function () {
        tsetStorage.set("fildeTestString", "string");
        expect(tsetStorage.get("fildeTestString")).toBe("string");
    });

    it("测试存取数字", function () {
        tsetStorage.set("fildeTestNumber", 2);
        expect(tsetStorage.get("fildeTestNumber")).toBe(2);
    });

    it("测试存取对象", function () {
        tsetStorage.set("fildeTestObject", {data: "object"});
        expect(tsetStorage.get("fildeTestObject").data).toBe("object");
    });

    it("测试存取数组", function () {
        tsetStorage.set("fildeTestArray", [1, 2]);
        expect(tsetStorage.get("fildeTestArray").length).toBe(2);
        expect(tsetStorage.get("fildeTestArray")[0]).toBe(1);
    });

    it("测试存取undefined", function () {
        tsetStorage.set("fildeTestUndefined", undefined);
        expect(tsetStorage.get("fildeTestUndefined")).toBe(undefined);
    });
    it("测试存取null", function () {
        tsetStorage.set("fildeTestNull", null);
        expect(tsetStorage.get("fildeTestNull")).toBe(null);
    });
    it("测试存取空对象", function () {
        tsetStorage.set("fildeTestEmptyObject", {});
        expect(typeof tsetStorage.get("fildeTestEmptyObject")).toBe("object");
        expect(tsetStorage.get("fildeTestEmptyObject").length).toBe({}.length);
    });
    it("测试存取空数组", function () {
        tsetStorage.set("fildeTestEmptyArray", []);
        expect(typeof tsetStorage.get("fildeTestEmptyArray")).toBe("object");
        expect(tsetStorage.get("fildeTestEmptyArray").length).toBe([].length);
    });


    it("测试删除", function () {
        tsetStorage.set("fildeTestDelete", 'delete');
        expect(tsetStorage.get("fildeTestDelete")).toBe("delete");
        tsetStorage.remove("fildeTestDelete");
        expect(tsetStorage.get("fildeTestDelete")).toBe(null);
    });

    it("测试过期之前", function () {
        tsetStorage.set("fildeTestTimeout", 'timeout', 2000);
        expect(tsetStorage.get("fildeTestTimeout")).toBe("timeout");
    });

    it("测试无过期存取", function () {
        var notHaveExpDataInfo = new Storage("notHaveExpDataInfo");  //定义存储键名 无过期时间
        notHaveExpDataInfo.set("fildeTestNotTimeout", 'notTimeout');
        expect(notHaveExpDataInfo.get("fildeTestNotTimeout")).toBe("notTimeout");
    });

    it("测试获取localstorage的length", function () {
        expect(tsetStorage.length()).toBe(10);
    });

    describe("测试超时", function() {
        beforeEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        });
        it("测试超时", function(done) {
            setTimeout(function() {
                expect(tsetStorage.get("fildeTestTimeout")).toBe(null);
                done();
            }, 5000);
        });

        it("测试无超时数据", function(done) {
            setTimeout(function() {
                var notHaveExpDataInfo = new Storage("notHaveExpDataInfo");
                expect(notHaveExpDataInfo.get("fildeTestNotTimeout")).toBe("notTimeout");
                done();
            }, 5000);
        });
    });

});
