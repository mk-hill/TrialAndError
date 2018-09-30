function EasyHTTP() {
  this.http = new XMLHttpRequest();
}

// Added callback param for async
EasyHTTP.prototype.get = function (url, callback) {
  this.http.open('GET', url, true);

  // Workaround for es5 function scope this
  const self = this;

  this.http.onload = function () {
    if (self.http.status === 200) {
      // Sending error and response to callback no error if status is 200
      callback(null, self.http.responseText);
    } else {
      // Send status code as error
      callback(`Error: ${self.http.status}`);
    }
  };
  this.http.send();
};
