# angular-date-binder

2-Way binding for `Date` object via `$year`, `$month`, `$date`, `$hours`, `$minutes` and `$seconds`.
`$lastDate` is the last date of the month of the current `Date` object.

## Install
```
bower install angular-date-binder
```

## Usage

### Script

```coffee
angular.module('sampleApp', ['angularDateBinder'])
.controller('Ctrl', function($scope) {
    $scope.d = new Date();
});
```

### Markup

```html
<!-- 
Setting `Date` object to "date" attribute, 
`$year`, `$month`, `$date`, `$hours`, `$minutes ,`$seconds` and `$lastDate` are 
available on the child element scope.
-->
<div date="d">
    <p>Date: {{d}}</p>
    <p>Date Object: <input type="date" ng-model="d"></p>
    <p>$year: <input type="number" ng-model="$year"></p>
    <p>$month: <input type="number" ng-model="$month"></p>
    <p>$date: <input type="number" ng-model="$date"></p>
    <p>$hours: <input type="number" ng-model="$hours"></p>
    <p>$minutes: <input type="number" ng-model="$minutes"></p>
    <p>$seconds: <input type="number" ng-model="$seconds"></p>
    <p>$lastDate: {{$lastDate}}</p>
</div>
```


## Build

### Normal Build
```
gulp build
```

### Minify Build
```
gulp prod build
```

### Watch
```
gulp
```
Only this, gulp will build, watch and serve `./`.

