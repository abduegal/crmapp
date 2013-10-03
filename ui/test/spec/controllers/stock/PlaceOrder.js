define(['app', 'config'], function(App, config) {

  'use strict';
  
  describe('Controller: PlaceOrderCtrl', function () {
  
    // load the controller's module
    beforeEach(module('crmApp'));
  
    var PlaceOrderCtrl, scope, $httpBackend, Restangular;
    
    var productData = 
      [{
        _id: 1,
        name: 'test',
        description: 'description',
        unit: 'unit',
        unitName: 'unitName',
        quantity: 0,
        price: 1000
      }];
    
    var supplierData = 
      [{
        _id: 1,
        name: 'test',
        description: 'description',
        telephone: 'telephone',
        email: 'email'
      }];
    
    var orderData = 
      [{
        
      }];
    
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _Restangular_, _$httpBackend_) {
      scope = $rootScope.$new();
      Restangular = _Restangular_;
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost:9000/product').respond(productData);
      $httpBackend.expectGET('http://localhost:9000/supplier').respond(supplierData);
      $httpBackend.expectGET('http://localhost:9000/order').respond(orderData);
      PlaceOrderCtrl = $controller('PlaceOrderCtrl', {
        $scope: scope
      });
      $httpBackend.flush();
    }));
    
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it('should have the products object tobe defined', function () {
      expect(scope.suppliers).toBeDefined();
      expect(scope.suppliers[0]._id).toBe(productData[0]._id);
    });
    

    it('should have the suppliers object tobe defined', function () {
      expect(scope.suppliers).toBeDefined();
      expect(scope.suppliers[0]._id).toBe(supplierData[0]._id);
    });

    it('should have the orders object tobe defined', function () {
      expect(scope.orders[0]._id).toBe(orderData[0]._id);
    });
    
    //EVENTS
    
    it('should check if mouseOver events are processed', function(){
      expect(scope.mouseOver).toBeDefined();
      expect(scope.stock.mouseOver).not.toBeDefined();
      scope.mouseOver(scope.stock);
      expect(scope.stock.mouseOver).toBeDefined();
      expect(scope.stock.mouseOver).toBe("true");
    });
    
    it('should check if mouseExit events are processed', function(){
      expect(scope.mouseExit).toBeDefined();
      expect(scope.stock.mouseOver).not.toBeDefined();
      scope.mouseOver(scope.stock);
      scope.mouseExit(scope.stock);
      expect(scope.stock.mouseOver).not.toBeDefined();
    });
    
    it('should check if mouseClick events are processed', function(){
      var stock = {mouseOver: true};
      expect(stock).toBeDefined();
      expect(stock.received).not.toBeDefined();
      scope.mouseClicked(stock);
      expect(stock.mouseOver).not.toBeDefined();
      expect(stock.received).toBe(true);
    });
    
    it('should check if mouseRemove events are processed', function(){
      var stock = {received: true};
      expect(stock).toBeDefined();
      expect(stock.received).toBeDefined();
      scope.mouseClickedRemove(stock);
      expect(stock.received).not.toBeDefined();
    });
    
    //METHODS
    it('should check if the price is calculated properly', function(){
      var stock = {priceperunit: 2, quantity: 3};
      var sum = 2 * 3;
      var result = scope.price(stock);
      expect(result).toBe(sum);
      
      stock.priceperunit = undefined;
      var result = scope.price(stock);
      expect(result).not.toBeDefined();
    });
    
    it('should be able to find a product name', function(){
      var product = productData[0];
      var stock = {productId: product._id};
      var products = productData;
      var result = scope.productName(stock);
      expect(result).toBe(product.name + ' - ('+ product.unit + ' ' + product.unitName + ')')
    });
    
    it('should be able to generate an order ID', function(){
      scope.order = {
        items: {
          length : 10
        }
      };
      var orderId = scope.generateOrderId();
      expect(orderId).toBe(10+1);
      
      scope.order.items.length = 0;
      orderId = scope.generateOrderId();
      expect(orderId).toBe(1);
    });
    
    it('should be able to calc the total price', function(){
      scope.order = {
        items: [
          {quantity: 1, priceperunit: 2},  //2
          {quantity: 2, priceperunit: 3}  //6
        ] 
      };
      var expected = 8;
      var result = scope.totalPriceAll();
      expect(result).toBe(expected);
    });
    
    it('should be able to validate the form', function(){
      scope.order.orderId = undefined;
      scope.order.date = undefined;
      scope.supplier = undefined;
      scope.validate();
      expect(scope.errors.orderId).toBeDefined();
      expect(scope.errors.date).toBeDefined();
      expect(scope.errors.supplier).toBeDefined();
      scope.order.orderId = {};
      scope.order.date = {};
      scope.supplier = {};
      scope.validate();
      expect(scope.errors.orderId).not.toBeDefined();
      expect(scope.errors.date).not.toBeDefined();
      expect(scope.errors.supplier).not.toBeDefined();
    });
    
    it('should be able to validate the add stock form', function(){
      scope.stock.productId = undefined;
      scope.stock.expirationDate = undefined;
      scope.stock.priceperunit = undefined;
      
      expect(scope.validateAddStock()).toBe(false);
      expect(scope.errors.product).toBeDefined();
      scope.stock.productId = {};

      expect(scope.validateAddStock()).toBe(false);
      expect(scope.errors.expirationDate).toBeDefined();
      scope.stock.expirationDate = {};
      
      expect(scope.validateAddStock()).toBe(false);
      expect(scope.errors.priceperunit).toBeDefined();
      scope.stock.priceperunit = {};
      
      expect(scope.validateAddStock()).toBe(true);
    });
    
    it('should be able to send an order', function(){
      $httpBackend.expectPOST('http://localhost:9000/order').respond(200);
      scope.order.supplier = {
          _id : 1, email: 'email.com'
      };
      spyOn(scope, 'validate');
      scope.sendOrder();
      expect(scope.order.supplierId).toBe(scope.order.supplier._id);
      expect(scope.order.email).toBe(scope.order.supplier.email);
      $httpBackend.flush();
    });
  });

});