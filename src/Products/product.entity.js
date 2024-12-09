"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var category_entity_1 = require("../Category/category.entity");
var orderDetails_entity_1 = require("../Order/orderDetails.entity");
var Product = function () {
    var _classDecorators = [(0, typeorm_1.Entity)({ name: "products" })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _stock_decorators;
    var _stock_initializers = [];
    var _stock_extraInitializers = [];
    var _imgUrl_decorators;
    var _imgUrl_initializers = [];
    var _imgUrl_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _orderDetails_decorators;
    var _orderDetails_initializers = [];
    var _orderDetails_extraInitializers = [];
    var Product = _classThis = /** @class */ (function () {
        function Product_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, ''));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, ''));
            this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, 0));
            this.stock = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _stock_initializers, 0));
            this.imgUrl = (__runInitializers(this, _stock_extraInitializers), __runInitializers(this, _imgUrl_initializers, 'default-image.jpg'));
            this.category = (__runInitializers(this, _imgUrl_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.orderDetails = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _orderDetails_initializers, void 0));
            __runInitializers(this, _orderDetails_extraInitializers);
        }
        return Product_1;
    }());
    __setFunctionName(_classThis, "Product");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)("uuid")];
        _name_decorators = [(0, typeorm_1.Column)({ length: 50, nullable: false })];
        _description_decorators = [(0, typeorm_1.Column)("text", { nullable: false })];
        _price_decorators = [(0, typeorm_1.Column)("decimal", { precision: 10, scale: 2, nullable: false })];
        _stock_decorators = [(0, typeorm_1.Column)("int", { nullable: false })];
        _imgUrl_decorators = [(0, typeorm_1.Column)({ default: "default-image.jpg" })];
        _category_decorators = [(0, typeorm_1.ManyToOne)(function () { return category_entity_1.Category; }, function (category) { return category.products; })];
        _orderDetails_decorators = [(0, typeorm_1.ManyToMany)(function () { return orderDetails_entity_1.OrderDetails; }, function (orderDetail) { return orderDetail.products; }, { nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _stock_decorators, { kind: "field", name: "stock", static: false, private: false, access: { has: function (obj) { return "stock" in obj; }, get: function (obj) { return obj.stock; }, set: function (obj, value) { obj.stock = value; } }, metadata: _metadata }, _stock_initializers, _stock_extraInitializers);
        __esDecorate(null, null, _imgUrl_decorators, { kind: "field", name: "imgUrl", static: false, private: false, access: { has: function (obj) { return "imgUrl" in obj; }, get: function (obj) { return obj.imgUrl; }, set: function (obj, value) { obj.imgUrl = value; } }, metadata: _metadata }, _imgUrl_initializers, _imgUrl_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _orderDetails_decorators, { kind: "field", name: "orderDetails", static: false, private: false, access: { has: function (obj) { return "orderDetails" in obj; }, get: function (obj) { return obj.orderDetails; }, set: function (obj, value) { obj.orderDetails = value; } }, metadata: _metadata }, _orderDetails_initializers, _orderDetails_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Product = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Product = _classThis;
}();
exports.Product = Product;
