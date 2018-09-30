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

EasyHTTP.prototype.post = function (url, data, callback) {
  this.http.open('POST', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');

  const self = this;
  this.http.onload = function () {
    callback(null, self.http.responseText);
  };
  // Send data as string
  this.http.send(JSON.stringify(data));
};

EasyHTTP.prototype.put = function (url, data, callback) {
  this.http.open('PUT', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');
  const self = this;
  this.http.onload = function () {
    callback(null, self.http.responseText);
  };
  this.http.send(JSON.stringify(data));
};

EasyHTTP.prototype.delete = function (url, callback) {
  this.http.open('DELETE', url, true);
  const self = this;

  this.http.onload = function () {
    if (self.http.status === 200) {
      callback(null, `${url} deleted`);
    } else {
      callback(`Error: ${self.http.status}`);
    }
  };
  this.http.send();
};