define(['app', 'config'], function(App, config) {

  'use strict';
  
  describe('Controller: ViewOrderCtrl', function () {
  
    // load the controller's module
    beforeEach(module('crmApp'));
  
    var ViewOrderCtrl, scope, $httpBackend, Restangular;
    
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

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _Restangular_, _$httpBackend_) {
      scope = $rootScope.$new();
      Restangular = _Restangular_;
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost:9000/product').respond(productData);
      $httpBackend.expectGET('http://localhost:9000/order').respond("[{}]");
      $httpBackend.expectGET('http://localhost:9000/supplier').respond(supplierData);
      ViewOrderCtrl = $controller('ViewOrderCtrl', {
        $scope: scope
      });
      $httpBackend.flush();
    }));
    
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it('should have the title object to be defined', function () {
      expect(scope.title).toBeDefined();
    });
    
    //EVENTS
    
    it('should check if mouseOver events are processed', function(){
      scope.stock = {};
      expect(scope.mouseOver).toBeDefined();
      expect(scope.stock.mouseOver).not.toBeDefined();
      scope.mouseOver(scope.stock);
      expect(scope.stock.mouseOver).toBeDefined();
      expect(scope.stock.mouseOver).toBe("true");
    });
    
    it('should check if mouseExit events are processed', function(){
      scope.stock = {};
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
    
    it('should be able to delete a stock', function(){
      var stockA = {id: 1};
      var stockB = {id: 2};
      var order = {
        items : [
         stockA,
         stockB
        ] 
      }
      expect(order.items.length).toBe(2);
      spyOn(scope, 'update');
      scope.deleteStock(stockA, order);
      expect(scope.update).toHaveBeenCalled();
      expect(order.items.length).toBe(1);
    });
    
    it('should Check if all items can be set to received', function(){
      var order = {
        items : [
          {received: false},
          {received: false}
        ]
      };
      spyOn(scope, 'update');
      scope.setAllItemsToReceived(order);
      expect(order.items[0].received).toBe(true);
      expect(order.items[1].received).toBe(true);
      expect(scope.update).toHaveBeenCalled();
    });
    
    it('should check if all items are received', function(){
      var order = {
          items : [
            {received: false},
            {received: false}
          ]
      };
      expect(scope.isAllItemsReceived(order)).toBe(false);
      spyOn(scope, 'update');
      scope.setAllItemsToReceived(order);
      expect(scope.isAllItemsReceived(order)).toBe(true);
    });
    
    it('should be able to finish an order', function(){
      var order = {
          items : [
            {quantity: 1, productId: 10},
            {quantity: 2, productId: 10}
          ],
          finished: false
      };
      var productA = {
        _id: 10,
        quantity: 3
      };
      spyOn(scope, 'update');
      scope.products.push(productA);
      scope.finishOrder(order);
      expect(order.finished).toBe(true);
      expect(productA.quantity).toBe(6);
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
    
    it('should be able to calc the total price', function(){
      var order = {
        items: [
          {quantity: 1, priceperunit: 2},  //2
          {quantity: 2, priceperunit: 3}  //6
        ] 
      };
      var expected = 8;
      var result = scope.totalPriceAll(order);
      expect(result).toBe(expected);
    });
    
    if('should be able to check the ongoing orders', function(){
      scope.orders = [
        {
          _id: 1,
          finshed: true
        },
        {
          _id: 2,
          finshed: true
        },
        {
          _id: 1,
          finshed: false
        }
      ];
      var resultOngoing = scope.ongoingOrders();
      expect(resultOngoing.length).toBe(1);
      var resultFinished = scope.finishedOrders();
      expect(resultFinished.length).toBe(2);
    });
    
  });

});