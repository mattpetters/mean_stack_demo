'use strict';

angular.module('core').directive('homeBlock', function () {
    return {
        restrict: 'E',
        scope: {
            info: '=info',
            render: "&"
        },
        templateUrl: 'modules/core/client/views/home-block.client.view.html'
    };
});
