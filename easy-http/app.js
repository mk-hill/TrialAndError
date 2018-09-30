const http = new EasyHTTP();

// Get posts
// http.get('https://jsonplaceholder.typicode.com/posts', function (error, postsReceived) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(postsReceived);
//   }
// });

// Get single post
// http.get('https://jsonplaceholder.typicode.com/posts/1', function (error, post) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(post);
//   }
// });

// Create data that will be used in post/put requests
const data = {
  title: 'Lorem ipsum',
  body: 'Dolor sit amet',
};

// POST request
// http.post('https://jsonplaceholder.typicode.com/posts', data, function (error, post) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(post);
//   }
// });

// PUT request
// http.put('https://jsonplaceholder.typicode.com/posts/59', data, function (error, post) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(post);
//   }
// });

// DELETE request
http.delete('https://jsonplaceholder.typicode.com/posts/59', function (error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
});