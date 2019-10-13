
//Ref: codepen.io/esausilva/pen/RKVoQw
if (window.FileReader) {
  var drop;
  listenDrop(window, 'load', function() {
    // var status = document.getElementById('status');
    drop = document.getElementById('drop');
    var imgdiv = document.getElementById('imgdiv');

    function cancel(event) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      return false;
    }

    listenDrop(drop, 'dragover', cancel);
    listenDrop(drop, 'dragenter', cancel);

    listenDrop(drop, 'drop', function(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      }

      var dt = e.dataTransfer;
      var files = dt.files;
        var file = files[0];
        var reader = new FileReader();

        reader.readAsDataURL(file);
        listenDrop(reader, 'loadend', function(e, file) {
          var bin = this.result;
          var newFile = document.createElement('div');
          newFile.innerHTML = file.name;
          imgdiv.appendChild(newFile);
          var fileNumber = imgdiv.getElementsByTagName('div').length;
        }.bindToEventHandler(file));
      return false;
    });
    Function.prototype.bindToEventHandler = function bindToEventHandler() {
      var handler = this;
      var boundParameters = Array.prototype.slice.call(arguments);
      return function(e) {
        boundParameters.unshift(e);
        handler.apply(this, boundParameters);
      }
    };
  });
}

function listenDrop(obj, evt, handler) {
    obj.addEventListener(evt, handler, false);
}
