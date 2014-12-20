'use strict';
angular.module('angularDateBinder', []).directive('bindDate', ["$parse", function($parse) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs) {
      var applyDateObject, calcLastDate, current, equalDate, getter, refresh, setter, storeDateObject;
      equalDate = function(d1, d2) {
        return !!d1 && !!d2 && d1.getTime() === d2.getTime();
      };
      getter = $parse(attrs.bindDate);
      setter = $parse(attrs.bindDate).assign;
      storeDateObject = function() {
        return getter(scope.$parent);
      };
      applyDateObject = function(date) {
        setter(scope.$parent, date);
        return setter(scope, date);
      };
      current = storeDateObject();
      calcLastDate = function(date) {
        return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
      };
      refresh = function(updateDate) {
        current = new Date(current.getTime());
        scope.$year = current.getFullYear();
        scope.$year = current.getFullYear();
        scope.$month = current.getMonth() + 1;
        scope.$date = current.getDate();
        scope.$hours = current.getHours();
        scope.$minutes = current.getMinutes();
        scope.$seconds = current.getSeconds();
        scope.$lastDate = calcLastDate(current);
        return applyDateObject(current);
      };
      scope.$parent.$watch(attrs.bindDate, function(newDateObject, oldDateObject) {
        if (newDateObject && !equalDate(newDateObject, oldDateObject)) {
          current = newDateObject;
          return refresh();
        }
      });
      scope.$watch(attrs.bindDate, function(newDateObject, oldDateObject) {
        if (newDateObject && !equalDate(newDateObject, oldDateObject)) {
          current = newDateObject;
          return refresh();
        }
      });
      scope.$watch('$year', function(newYear, oldYear) {
        console.log(newYear);
        if (newYear && newYear !== oldYear) {
          current.setFullYear(newYear);
          return refresh();
        }
      });
      scope.$watch('$month', function(newMonth, oldMonth) {
        if (newMonth && newMonth !== oldMonth) {
          current.setMonth(newMonth - 1);
          return refresh();
        }
      });
      scope.$watch('$date', function(newDate, oldDate) {
        if (newDate && newDate !== oldDate) {
          current.setDate(newDate);
          return refresh();
        }
      });
      scope.$watch('$hours', function(newHours, oldHours) {
        if (newHours && newHours !== oldHours) {
          current.setHours(newHours);
          return refresh();
        }
      });
      scope.$watch('$minutes', function(newMinutes, oldMinutes) {
        if (newMinutes && newMinutes !== oldMinutes) {
          current.setMinutes(newMinutes);
          return refresh();
        }
      });
      scope.$watch('$seconds', function(newSeconds, oldSeconds) {
        if (newSeconds && newSeconds !== oldSeconds) {
          current.setSeconds(newSeconds);
          return refresh();
        }
      });
      return refresh();
    }
  };
}]);
