# angular-date-binder

2-Way binding for `Date` object via `$year`, `$month`, `$date`, `$hour`, `$minute` and `$second`.
`$lastDate` is the last date of the month of the current `Date` object.

[example page](http://endaaman.github.io/angular-date-binder/)

## Install
```
bower install angular-date-binder
```

## Usage

```javascript
```

Nice to use `<select>` Tag.

```html
<script>
angular.module('sampleApp', ['angularDateBinder'])
.controller('Ctrl', function($scope) {
    $scope.date = new Date();

    $scope.range = function(min, max){
        var list = new Array()
        for (var i = parseInt(min); i <= parseInt(max); i = i + 1) {
            list.push(i)
        }
        return list
    }
}).filter('range', function() {
    return function(list, min, max) {
        for (var i = parseInt(min); i <= parseInt(max); i = i + 1) {
        list.push(i)
        }
        return list
    }
});
</script>
<div ng-controller="Ctrl">
    <p>{{date}}</p>
    <div bind-date="date">
        <div>
            <h4>$year</h4>
            <!-- direct binding to $year by <input type="number"/> -->
            <input type="number" ng-model="$year">
        </div>
        <div>
            <h4>$month</h4>
            <!-- implemnted range function -->
            <select ng-model="$month" ng-options="month for month in range(1, 12)"></select>
        </div>
        <div>
            <h4>$date</h4>
            <!-- or make custom filter -->
            <select ng-model="$month" ng-options="month for month in [] | range:1:$lastDate"></select>
        </div>
    </div>
</div>
```
