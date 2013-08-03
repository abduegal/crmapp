'use strict';
define([ 'angular'], function(angular) {

    angular.module('crmApp').controller('PlaceOrderCtrl', 
      function ($scope, Restangular, $location) {
        

        /* - Assignments ------------------------------- */
        $scope.title = "Place Order";

        $scope.products = {
        };
        
        $scope.suppliers = {
        };
        
        $scope.stock = {
            quantity : 1
        };
        
        $scope.order = {
            items : []
        };
        
        /* - Events ------------------------------------ */
        $scope.$watch('order.supplier._id', function(newValue, oldValue){
          $scope.order.supplier = _.find($scope.suppliers, function(supplier) {
            return supplier._id === newValue;
          });
        });
        
        $scope.mouseOver = function(stock){
          stock.mouseOver = "true";
        };
        
        $scope.mouseExit = function(stock){
          delete stock.mouseOver;
        };
        
        $scope.mouseClicked = function(stock){
          delete stock.mouseOver;
          stock.received = true;
        };
        
        $scope.mouseClickedRemove = function(stock){
          delete stock.received;
        };
        
        $scope.sendOrder = function(){
          $scope.order.supplierId = $scope.order.supplier._id;
          $scope.order.email = $scope.order.supplier.email;
          Restangular.all('order').post($scope.order).then(function(){
            $location.path('/settings');
          },function(output){
            $scope.buttonDisabled = "";
            $scope.errors = output.data;
          });
        };
        
        /**
         * Green add button pressed
         */
        $scope.addToStock = function(){
          $scope.order.items.push($scope.stock);
          $scope.stock = {
              quantity : 1
          };
          $scope.stock.order = $scope.generateOrderId();
        };
        
        /**
         * Red X button pressed
         */
        $scope.deleteStock = function(stock){
          $scope.order.items.splice($scope.order.items.indexOf(stock), 1);
          $scope.stock.order = $scope.generateOrderId();
          for(var i = 0; i < $scope.order.items.length; i++){
            $scope.order.items[i].order = i+1;            
          }
        };
        

        /* - methods -------------------------------- */
        /**
         * Calculates the price per stock
         */
        $scope.price = function(stock){
          if(stock.priceperunit){
            return (stock.quantity * stock.priceperunit);
          }
        }; 
        
        /**
         * Generated the order ID
         */
        $scope.generateOrderId = function(){
          var i = 1;
          var length = $scope.order.items.length + 1;
          if(length > i){
            return length
          }
          return i;
        };
        
        $scope.stock.order = $scope.generateOrderId();
        
        /**
         * Calculates the totalPrice for the order
         */
        $scope.totalPriceAll = function(){
          var totalPrice = 0;
          for(var i = 0; i < $scope.order.items.length; i++){
            var stock = $scope.order.items[i];
            var price = $scope.price(stock);
            if(price){
              totalPrice += price; 
            }
          }
          return totalPrice;
        };

        /*
         * REST CALLS
         */

        Restangular.all('product').getList().then(function(data){
          $scope.products = data;
        });
        
        Restangular.all('supplier').getList().then(function(data){
          $scope.suppliers = data;
        });
        
        Restangular.all('order').getList().then(function(data){
          $scope.orders = data;
          $scope.order.orderId = addLeadingZeros($scope.orders.length+1, 4);
        });
        
        function addLeadingZeros (n, length)
        {
            var str = (n > 0 ? n : -n) + "";
            var zeros = "";
            for (var i = length - str.length; i > 0; i--)
                zeros += "0";
            zeros += str;
            return n >= 0 ? zeros : "-" + zeros;
        }
        
        /**
         * Activate Settings menu
         */
        $scope.$emit('event:menuLinkActivate', 'Stock');
        
      });

  });
