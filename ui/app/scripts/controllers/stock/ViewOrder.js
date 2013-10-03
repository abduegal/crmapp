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
        
        $scope.setAllItemsToReceived = function(order){
          _.forEach(order.items, function(item){
            item.received = true;
          });
          $scope.update(order, false);
        };
        
        $scope.isAllItemsReceived = function(order){
          var count = 0;
          _.forEach(order.items, function(item){
           if(item.received){
             count++;
           } 
          });
          return (count === order.items.length);
        };
        
        $scope.finishOrder = function(order){
          order.finished = true;
          _.forEach(order.items, function(item){
            var product = $scope.getProduct(item.productId);
            product.quantity += item.quantity;
            $scope.update(product, false);
          });
          $scope.update(order, true);
        };
        
        $scope.update = function(item, redirect){
          item.put().then(function(){
            if(redirect){
              $location.path('/settings');
            }
          },function(output){
            $scope.buttonDisabled = "";
            $scope.errors = output.data;
          });
        };
        
        $scope.remove = function(item){
          var c = confirm('Are you sure?');
          if(c){
            item.remove().then(function(){
              $scope.orders = _.without($scope.orders, item);
            });
          }
        }
        
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
        
        $scope.getProduct = function(productId){
          if(productId !== undefined){
            var product = _.findWhere($scope.products, {_id: productId});
            return product;
          }
        };
        
        $scope.unactivateTabPane = function(){
          $('.tab-pane').removeClass('active');
          $('.nav-tabs li').removeClass('active');
        };
        
        /*
         * REST CALLS
         */
        
        Restangular.all('product').getList().then(function(data){
          $scope.products = data;
        });
        
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
