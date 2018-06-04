angular.module('components', [])
  .component('wistiaUploader', {
    templateUrl: '../templates/wistia-uploader.html',
    controller: WistiaUploaderController,
    controllerAs: 'wuCtrl',
  });

function WistiaUploaderController($element, $scope, $timeout, uploadUrl, uploadKey) {
  var vm = this;

  vm.state = {
    uploading: false,
    statusMessage: '',
    embeddedHash: null,
    progressStyle: {}
  };

  vm.setUploading = setUploading;
  vm.updateProgress = updateProgress;
  vm.updateStatusMessage = updateStatusMessage;
  vm.setVideoHash = setVideoHash;

  activate();

  function activate() {
    $element.find('#fileupload').fileupload({
      dataType: 'json',
      url: uploadUrl,
      formData: {
        api_password: uploadKey
      },
      acceptFileTypes: /(\.|\/)(mp4|avi|mp?g|wmv|flv|3gp|divx|xvid|webm)$/i,
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        updateProgress(progress);
      },
      add: function (e, data) {
        setUploading(true);
        data.submit();
      },
      done: function (e, data) {
        setUploading(false);
        setVideoHash(data.result.hashed_id);
      },
      fail: function (e, data) {
        setUploading(false);
        var msg = data.errorThrown;
        if (data.errorThrown !== 'abort' &&
          data.dataType &&
          data.dataType.indexOf('json') === data.dataType.length - 4) {
          try {
            var result = angular.fromJson(data.jqXHR.responseText);
            msg += ' ' + result.error;
          } catch (ignore) {}
        }
        updateStatusMessage(msg);
      }
    });
  }

  function setUploading(uploading) {
    vm.state.uploading = uploading;
    $scope.$apply();
  }

  function updateProgress(value) {
    value = value < 0 || value > 100 ? 0 : value;
    vm.state.progressStyle = {
      'width': value + '%'
    };
    $scope.$apply();
  }

  function updateStatusMessage(message) {
    vm.state.statusMessage = message;
    $scope.$apply();
  }

  function setVideoHash(hash) {
    vm.state.embeddedHash = 'wistia_embed wistia_async_' + hash;
    $scope.$apply();
  }
}
