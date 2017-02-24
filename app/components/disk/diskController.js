angular.module('disk', [])
.controller('DiskController', ['$scope', '$q', '$state', 'Config', 'Image', 'System', 'ImageHelper', 'Messages', 'Pagination', 'ModalService',
function ($scope, $q, $state, Config, Image, System, ImageHelper, Messages, Pagination, ModalService) {
  $scope.state = {};
  $scope.state.pagination_count = Pagination.getPaginationCount('images');
  $scope.sortType = 'RepoTags';
  $scope.sortReverse = true;
  $scope.state.selectedItemCount = 0;
  $scope.systemData ={};



  $scope.config = { 
    Image: '',
    Registry: ''
  };

  $scope.order = function(sortType) {
    $scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
    $scope.sortType = sortType;
  };

  $scope.changePaginationCount = function() {
    Pagination.setPaginationCount('images', $scope.state.pagination_count);
  };

  

  

  function prepareSystemData(d) {
    var system = d;
    $scope.systemData = system;
  }

  function fetchData() {
    $('#loadingViewSpinner').show();
    $q.all([
      System.df({}).$promise
    ]).then(function (d) {
      prepareSystemData(d[0]);
      $('#loadingViewSpinner').hide();
    }, function(e) {
      $('#loadingViewSpinner').hide();
      Messages.error("Failure", e, "Unable to load dashboard data");
    });
  }

  $scope.selectItems = function (allSelected) {
    angular.forEach($scope.state.filteredImages, function (image) {
      if (image.Checked !== allSelected) {
        image.Checked = allSelected;
        $scope.selectItem(image);
      }
    });
  };

  $scope.selectItem = function (item) {
    if (item.Checked) {
      $scope.state.selectedItemCount++;
    } else {
      $scope.state.selectedItemCount--;
    }
  };

  /*

  function fetchImages() {
    Image.query({}, function (d) {
      $scope.images = d.map(function (item) {
        return new ImageViewModel(item);
      });
      $('#loadImagesSpinner').hide();
    }, function (e) {
      $('#loadImagesSpinner').hide();
      Messages.error("Failure", e, "Unable to retrieve images");
      $scope.images = [];
    });
  }*/

  Config.$promise.then(function (c) {
    fetchData();
  });
}]);
