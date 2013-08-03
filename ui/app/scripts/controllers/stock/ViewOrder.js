'use strict';
define([ 'angular'], function(angular) {

    angular.module('crmApp').controller('ViewOrderCtrl', 
      function ($scope, Restangular, $location) {

        /* - Assignments ------------------------------- */
        $scope.title = 'View orders';
      
        /* - Events ------------------------------------ */
        
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
        
        $scope.finishOrder = function(order){
          order.finished = true;
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
         * Calculates the totalPrice for the order
         */
        $scope.totalPriceAll = function(order){
          var totalPrice = 0;
          for(var i = 0; i < order.items.length; i++){
            var stock = order.items[i];
            var price = $scope.price(stock);
            if(price){
              totalPrice += price; 
            }
          }
          return totalPrice;
        };
        
        $scope.ongoingOrders = function(){
          var ongoingOrders = [];
          _.forEach($scope.orders, function(order){
            if(order.finished === undefined || order.finished === false){
              ongoingOrders.push(order);
            }
          });
          return ongoingOrders;
        };
        
        $scope.finishedOrders = function(){
          var ongoingOrders = [];
          _.forEach($scope.orders, function(order){
            if(order.finished !== undefined && order.finished === true){
              ongoingOrders.push(order);
            }
          });
          return ongoingOrders;
        };
        
        /*
         * REST CALLS
         */
        Restangular.all('order').getList().then(function(data){
          $scope.orders = data;
          for(var i = 0; i < $scope.orders.length; i++){
            $scope.addSupplierToOrder($scope.orders[i]);
          }
        });
        
        $scope.addSupplierToOrder = function(order){
          Restangular.one('supplier', order.supplierId).get().then(function(supplierData){
            order.supplier = supplierData;
          });
        };
        
        /**
         * Activate Settings menu
         */
        $scope.$emit('event:menuLinkActivate', 'Stock');
        
      });

  });
