'use strict'

angular.module 'angularDateBinder', []

.directive 'bindDate', ($parse)->
    restrict : 'A'
    scope: true
    link: (scope, element, attrs)->
        validateDate = (date, abort)->
            retval = not date? or date.constructor is Date
            if abort and not retval
                throw new Error "Expected `#{attrs.bindDate}` to be a date"
            retval
        equalDate = (d1, d2)->
            !!d1 and !!d2 and validateDate(d1) and validateDate(d2) and d1.getTime() is d2.getTime()
        current = null
        getter = $parse attrs.bindDate
        setter = $parse(attrs.bindDate).assign
        storeDateObject = ->
            date = getter scope.$parent
            validateDate date, true
            date
        applyDateObject = (date)->
            setter scope.$parent, date
            setter scope, date

        calcLastDate = (date)->
            (new Date date.getFullYear(), date.getMonth() + 1, 0).getDate()

        refresh = (updates)->
            if current?
                if not updates? and not updates
                    current = new Date current.getTime()
                scope.$year = current.getFullYear()
                scope.$year = current.getFullYear()
                scope.$month = current.getMonth() + 1
                scope.$date = current.getDate()
                scope.$hours = current.getHours()
                scope.$minutes = current.getMinutes()
                scope.$seconds = current.getSeconds()
                scope.$lastDate = calcLastDate current
            else
                scope.$year = scope.$year = scope.$month = scope.$date = scope.$hours = scope.$minutes = scope.$seconds = scope.$lastDate = null

        watchDate = (newDateObject, oldDateObject)->
            if not newDateObject? or validateDate(newDateObject, true) and not equalDate newDateObject, oldDateObject
                current = newDateObject
                refresh()

        scope.$parent.$watch attrs.bindDate, watchDate

        scope.$watch attrs.bindDate, watchDate

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

        current = storeDateObject false
        refresh()
