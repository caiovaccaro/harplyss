'use strict';

var app = angular.module('exampleApp', ['JSONedit']);

function MainViewCtrl($scope, $filter) {

    // example JSON
    $scope.jsonData = jsonToEdit;

    $scope.$watch('jsonData', function(json) {
        $scope.jsonString = $filter('json')(json);
    }, true);
    $scope.$watch('jsonString', function(json) {
        try {
            $scope.jsonData = JSON.parse(json);
            $scope.wellFormed = true;
        } catch(e) {
            $scope.wellFormed = false;
        }
    }, true);

    $scope.saveFile = function() {
        $.ajax({
            url: window.location.href,
            method: 'POST',
            data: {
                jsonFile: JSON.stringify($scope.jsonData)
            },
            dataType: 'text'
        })
        .done(function(data) {
            $('.msg').show().text('Json file updated!').delay(2000).fadeOut(function() {
                $(this).text('');
            });
        })
        .fail(function(data) {
            $('.msg').show().text('Could not save the file.').delay(2000).fadeOut(function() {
                $(this).text('');
            });
        });
    }
}
