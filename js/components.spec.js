describe('WistiaUploaderController', function() {
  var ctrl, $compile, $rootScope;

  beforeEach(module('components'));
  beforeEach(inject(function(_$componentController_, _$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    var scope = $rootScope.$new();
    var element = angular.element('<input id="fileupload" type="file" name="files[]" hidden>');
    ctrl = _$componentController_(
      'wistiaUploader',
      { $scope: scope, $element: element, uploadUrl: '', uploadKey: '' } ,
      {}
    );
  }));

  it('should have valid initial state', function() {
      expect(ctrl.state).toEqual({
        uploading: false,
        statusMessage: '',
        embeddedHash: null,
        progressStyle: {}
      });
  });

  it('should update `uploading` value while calling `setUploading`', function() {
    ctrl.setUploading(true);
    expect(ctrl.state.uploading).toEqual(true);
  });

  it('should update `progressStyle` while calling `updateProgress`', function() {
    ctrl.updateProgress(50);
    expect(ctrl.state.progressStyle).toEqual({
      'width': '50%'
    });
  });

  it('should update `statusMessage` while calling `updateStatusMessage`', function() {
    ctrl.updateStatusMessage('test');
    expect(ctrl.state.statusMessage).toEqual('test');
  });

  it('should update `embeddedHash` while calling `setVideoHash`', function() {
    ctrl.setVideoHash('test');
    expect(ctrl.state.embeddedHash).toEqual('wistia_embed wistia_async_test');
  });
});
