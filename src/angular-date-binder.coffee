'use strict'

angular.module 'angularDateBinder', []

.directive 'bindDate', ($parse)->
    restrict : 'A'
    scope: true
    link: (scope, element, attrs)->
        equalDate = (d1, d2)->
            !!d1 and !!d2 and d1.getTime() is d2.getTime()
        getter = $parse attrs.bindDate
        setter = $parse(attrs.bindDate).assign
        storeDateObject = ->
            getter scope.$parent
        applyDateObject = (date)->
            setter scope.$parent, date
            setter scope, date

        current = storeDateObject()

        calcLastDate = (date)->
            (new Date date.getFullYear(), date.getMonth() + 1, 0).getDate()

        refresh = (updateDate)->
            current = new Date current.getTime()
            scope.$year = current.getFullYear()
            scope.$year = current.getFullYear()
            scope.$month = current.getMonth() + 1
            scope.$date = current.getDate()
            scope.$hours = current.getHours()
            scope.$minutes = current.getMinutes()
            scope.$seconds = current.getSeconds()
            scope.$lastDate = calcLastDate current

            applyDateObject current

        scope.$parent.$watch attrs.bindDate, (newDateObject, oldDateObject)->
            if newDateObject and not equalDate newDateObject, oldDateObject
                current = newDateObject
                refresh()

        scope.$watch attrs.bindDate, (newDateObject, oldDateObject)->
            if newDateObject and not equalDate newDateObject, oldDateObject
                current = newDateObject
                refresh()

        scope.$watch '$year', (newYear, oldYear)->
            if newYear and newYear isnt oldYear
                current.setFullYear newYear
                refresh()
        scope.$watch '$month', (newMonth, oldMonth)->
            if newMonth and newMonth isnt oldMonth
                current.setMonth newMonth - 1
                refresh()
        scope.$watch '$date', (newDate, oldDate)->
            if newDate and newDate isnt oldDate
                current.setDate newDate
                refresh()
        scope.$watch '$hours', (newHours, oldHours)->
            if newHours and newHours isnt oldHours
                current.setHours newHours
                refresh()
        scope.$watch '$minutes', (newMinutes, oldMinutes)->
            if newMinutes and newMinutes isnt oldMinutes
                current.setMinutes newMinutes
                refresh()
        scope.$watch '$seconds', (newSeconds, oldSeconds)->
            if newSeconds and newSeconds isnt oldSeconds
                current.setSeconds newSeconds
                refresh()

        refresh()
