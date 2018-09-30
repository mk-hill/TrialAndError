const http = new EasyHTTP();

http.get('https://jsonplaceholder.typicode.com/posts', function (error, postsReceived) {
  if (error) {
    console.log(error);
  } else {
    console.log(postsReceived);
  }
});
