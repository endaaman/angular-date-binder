'use strict';

angular.module('angularDateBinder', [])

.directive('bindDate', ['$parse', function($parse) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs) {
      var validateDate = function(date, abort) {
        var retVal = (date == null) || (typeof date === 'undefined') || date.constructor === Date;
        if (abort && !retVal) {
          throw new Error('Expected `' + attrs.bindDate + '` to be a date');
        }
        return retVal;
      };

      var equalDate = function(d1, d2) {
        return !!d1 && !!d2 && validateDate(d1) && validateDate(d2) && d1.getTime() === d2.getTime();
      };

      var current = null;
      var getter = $parse(attrs.bindDate);
      var setter = $parse(attrs.bindDate).assign;

      var storeDateObject = function() {
        var date = getter(scope.$parent);
        validateDate(date, true);
        return date;
      };

      var applyDateObject = function(date) {
        setter(scope.$parent, date);
        setter(scope, date);
      };

      var refresh = function(updates) {
        if (current != null) {
          if ((updates == null) && !updates) {
            current = new Date(current.getTime());
          }
          scope.$year = current.getFullYear();
          scope.$month = current.getMonth() + 1;
          scope.$date = current.getDate();
          scope.$hour = current.getHours();
          scope.$minute = current.getMinutes();
          scope.$second = current.getSeconds();
          scope.$lastDate = (new Date(current.getFullYear(), current.getMonth() + 1, 0)).getDate();
          applyDateObject(current);
        } else {
          scope.$year = scope.$month = scope.$date = scope.$hour = scope.$minute = scope.$second = scope.$lastDate = null;
        }
      };

      var watchDate = function(newDateObject, oldDateObject) {
        if ((newDateObject == null) || validateDate(newDateObject, true) && !equalDate(newDateObject, oldDateObject)) {
          current = newDateObject;
          refresh();
        }
      };

      scope.$parent.$watch(attrs.bindDate, watchDate);
      scope.$watch(attrs.bindDate, watchDate);

      var watchList = [
        {
          key: '$year',
          setFunc: Date.prototype.setFullYear
        },{
          key: '$month',
          setFunc: function(month){
             this.setMonth(month - 1);
          }
        },{
          key: '$date',
          setFunc: Date.prototype.setDate
        },{
          key: '$hour',
          setFunc: Date.prototype.setHours
        },{
          key: '$minute',
          setFunc: Date.prototype.setMinutes
        },{
          key: '$second',
          setFunc: Date.prototype.setSeconds
        },{
          key: '$year',
          setFunc: Date.prototype.setFullYear
        }
      ];

      for(var i in watchList){
        (function(){
          var key = watchList[i].key
          var setFunc = watchList[i].setFunc
          scope.$watch(key, function(_new, _old) {
            if (_new && _new !== _old) {
              setFunc.call(current, _new);
              refresh();
            }
          });
        })();
      };
      current = storeDateObject(false);
      refresh();
    }
  };
}]);
