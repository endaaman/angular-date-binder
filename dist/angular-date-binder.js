'use strict';
angular.module('angularDateBinder', []).directive('bindDate', ["$parse", function($parse) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs) {
      var applyDateObject, calcLastDate, current, equalDate, getter, refresh, setter, storeDateObject, validateDate, watchDate;
      validateDate = function(date, abort) {
        var retval;
        retval = (date == null) || date.constructor === Date;
        if (abort && !retval) {
          throw new Error("Expected `" + attrs.bindDate + "` to be a date");
        }
        return retval;
      };
      equalDate = function(d1, d2) {
        return !!d1 && !!d2 && validateDate(d1) && validateDate(d2) && d1.getTime() === d2.getTime();
      };
      current = null;
      getter = $parse(attrs.bindDate);
      setter = $parse(attrs.bindDate).assign;
      storeDateObject = function() {
        var date;
        date = getter(scope.$parent);
        validateDate(date, true);
        return date;
      };
      applyDateObject = function(date) {
        setter(scope.$parent, date);
        return setter(scope, date);
      };
      calcLastDate = function(date) {
        return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
      };
      refresh = function(updates) {
        if (current != null) {
          if ((updates == null) && !updates) {
            current = new Date(current.getTime());
          }
          scope.$year = current.getFullYear();
          scope.$year = current.getFullYear();
          scope.$month = current.getMonth() + 1;
          scope.$date = current.getDate();
          scope.$hours = current.getHours();
          scope.$minutes = current.getMinutes();
          scope.$seconds = current.getSeconds();
          return scope.$lastDate = calcLastDate(current);
        } else {
          return scope.$year = scope.$year = scope.$month = scope.$date = scope.$hours = scope.$minutes = scope.$seconds = scope.$lastDate = null;
        }
      };
      watchDate = function(newDateObject, oldDateObject) {
        if ((newDateObject == null) || validateDate(newDateObject, true) && !equalDate(newDateObject, oldDateObject)) {
          current = newDateObject;
          return refresh();
        }
      };
      scope.$parent.$watch(attrs.bindDate, watchDate);
      scope.$watch(attrs.bindDate, watchDate);
      scope.$watch('$year', function(newYear, oldYear) {
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
      current = storeDateObject(false);
      return refresh();
    }
  };
}]);
