angular.module('demoApp', ['ngMaterial', 'md.data.table'])

    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        'use strict';
        $mdThemingProvider.theme('default')
            .primaryPalette('blue');
    }])

    .controller('nutritionController', ['$mdEditDialog', '$q', '$scope', '$timeout', '$http',
        function ($mdEditDialog, $q, $scope, $timeout, $http, getDataFunc) {
            'use strict';
            var vm = $scope;
            var finalInfArr = [];
            var lnk = "1.txt";
            $http({method: 'GET', url: lnk}).success(function (data) {
                console.log('succ');
                vm.splitData = data;
                vm.splitData = vm.splitData.split(/\r\n/);
                vm.informationHeaders = vm.splitData.splice(0, 5);
                vm.splitData1 = vm.splitData.splice(2, vm.splitData.length);
                vm.finalInf = [];
                vm.splitData1.forEach(function (element) {
                    var dataHolder = element.replace(/  +/g, ' ').replace(/^\s*/, '').split(' ');
                    var dataHolderObj = {
                        year: parseFloat(dataHolder[0]),
                        month: parseFloat(dataHolder[1]),
                        tmax: parseFloat(dataHolder[2]),
                        tmin: parseFloat(dataHolder[3]),
                        afdays: parseFloat(dataHolder[4]),
                        rainmm: parseFloat(dataHolder[5]),
                        sunhrs: parseFloat(dataHolder[6]),
                        prov: dataHolder[7]
                    };
                    if (isNaN(dataHolderObj.tmax)) {
                        dataHolderObj.tmax = "---";
                    }
                    if (isNaN(dataHolderObj.rainmm)) {
                        dataHolderObj.rainmm = "---";
                    }
                    if (isNaN(dataHolderObj.tmin)) {
                        dataHolderObj.tmin = "---";
                    }
                    if (isNaN(dataHolderObj.afdays)) {
                        dataHolderObj.afdays = "---";
                    }
                    if (isNaN(dataHolderObj.sunhrs)) {
                        dataHolderObj.sunhrs = "---";
                    }
                    vm.finalInf.push(dataHolderObj);
                });
                finalInfArr = vm.finalInf;
            }).error(function (data) {
                console.log('fail');
            });

            $scope.selected = [];
            $scope.options = {
                limitSelect: true,
                pageSelect: true
            };
            vm.query = {
                order: 'year',
                limit: 10,
                page: 1
            };

            $scope.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            $scope.selectedItem = 1;
            $scope.getSelectedText = function () {
                if ($scope.selectedItem !== undefined) {
                    return "You have selected: " + $scope.selectedItem + " Month";
                } else {
                    return "Please select a month";
                }
            };

            $scope.items1 = ['Max temperature', 'Min temperature', 'Af days', 'Rain (mm)', 'Sun hours'];
            $scope.selectedItem1 = 'Max temperature';
            $scope.getSelectedText1 = function () {
                if ($scope.selectedItem1 !== undefined) {
                    return "You have selected: " + $scope.selectedItem1;
                } else {
                    return "Please select an item";
                }
            };
            var yearArrey = [];
            var xArrey = [];
            $scope.generatorGrafics = function () {
                var tmpDataStr;
                yearArrey = [];
                xArrey = [];
                if ($scope.selectedItem1 === 'Max temperature') {
                    finalInfArr.forEach(function (element) {
                        if (element.month === $scope.selectedItem) {
                            xArrey.push(element.tmax)
                            yearArrey.push(element.year)
                        }
                    });
                }
                if ($scope.selectedItem1 === 'Min temperature') {
                    finalInfArr.forEach(function (element) {
                        if (element.month === $scope.selectedItem) {
                            xArrey.push(element.tmin)
                            yearArrey.push(element.year)
                        }
                    });
                }
                if ($scope.selectedItem1 === 'Af days') {
                    finalInfArr.forEach(function (element) {
                        if (element.month === $scope.selectedItem) {
                            xArrey.push(element.afdays)
                            yearArrey.push(element.year)
                        }
                    });
                }
                if ($scope.selectedItem1 === 'Rain (mm)') {
                    finalInfArr.forEach(function (element) {
                        if (element.month === $scope.selectedItem) {
                            xArrey.push(element.rainmm)
                            yearArrey.push(element.year)
                        }
                    });
                }
                if ($scope.selectedItem1 === 'Sun hours') {
                    finalInfArr.forEach(function (element) {
                        if (element.month === $scope.selectedItem) {
                            xArrey.push(element.sunhrs)
                            yearArrey.push(element.year)
                        }
                    });
                }
                $scope.labels = yearArrey;
                $scope.series = ['Series A', 'Series B'];
                $scope.data = xArrey;
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };
                $scope.datasetOverride = [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}];
                $scope.options = {
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'
                            },
                            {
                                id: 'y-axis-2',
                                type: 'linear',
                                display: true,
                                position: 'right'
                            }
                        ]
                    }
                };

            };

        }])

    .directive('mytable', function () {
        return {
            restrict: 'E',
            templateUrl: 'table/table.html',

        }
    })
    .directive('graphs', function () {
    return {
        restrict: 'E',
        templateUrl: 'graph/graph.html',

    }
})