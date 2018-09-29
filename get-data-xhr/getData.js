const loadData = () => {
  // Create XHR object
  const xhr = new XMLHttpRequest();

  // OPEN - third param sets async
  xhr.open('GET', 'data.txt', true);

  // *****************************************************************************
  // *** readyState Values ***
  // 0: request not initialized
  // 1: server connection established
  // 2: request received
  // 3: processing request
  // 4: request finished and response is ready
  // by .onload we are already at state 4
  // before onload we used .onreadystatechange and checked to see if we were on 4
  // *** Common HTTP Status examples ***
  // 200: "OK"
  // 403: "Forbidden"
  // 404: "Not Found"
  // *****************************************************************************

  // // console.log('Ready state: ', xhr.readyState); -- 1 at this point
  // onprogress can be used for loading/progress indicators
  // xhr.onprogress = function () {
  //   console.log(xhr.readyState); -- 3 as expected
  // }

  // onerror can be used to log errors
  // xhr.onerror = function () {
  //   console.log(xhr.readyState); -- 3 as expected
  // }

  xhr.onload = function () {
    if (this.status === 200) {
      // console.log('Ready state: ', xhr.readyState); -- already at 4
      // console.log(this.responseText);
      document.getElementById('output').innerHTML = `We got: <h1>${this.responseText}</h1>`;
    }
  };

  // // Attempting onreadystatechange instead, see readyState Values
  // xhr.onreadystatechange = function () {
  //   // console.log('Ready state: ', xhr.readyState); -- goes through the whole thing
  //   //Hence the check below
  //   if (this.status === 200 && this.readyState === 4) {
  //     console.log(this.responseText);
  //   }
  // };

  xhr.send();
};

document.getElementById('button').addEventListener('click', loadData);
