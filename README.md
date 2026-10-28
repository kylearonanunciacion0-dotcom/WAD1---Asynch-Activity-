# Build a Dynamic Post Explorer

- About the Activity

This activity is about loading blog posts from an API and displaying them on a webpage without refreshing the page. I will use the JSONPlaceholder API and JavaScript to get and display the posts.

- API Used

`https://jsonplaceholder.typicode.com/posts`

This API provides sample blog posts with titles and body content.

- Required Features

1. Load Button: The posts will load when the user clicks the Load Posts button.
2. Async / Await: Use `async` and `await` to fetch the data.
3. First 5 Posts: Display only the first five posts from the API.
4. Safe DOM Rendering: Use `textContent` to display the post titles and body safely.
5. Loading Indicator: Show a loading message while fetching the posts.
6. Error Handling: Display an error message if the request fails.
7. Retry Capability: Allow the user to click the button again if an error occurs.
8. No Page Refresh: Display the posts without refreshing the webpage.

- How It Works

1. Open the webpage.
2. Click the Load Posts button.
3. A loading message appears while fetching the data.
4. The webpage gets the posts from the API.
5. If the request is successful, the first five posts will be displayed.
6. If the request fails, an error message appears, and the user can try again.

- Sample JavaScript

```
async function loadPosts() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts.");
    }

    const posts = await response.json();
    return posts.slice(0, 5);
  } catch (error) {
    console.error("Error loading posts:", error);
    throw error;
  }
}
```

This function fetches the posts and returns only the first five. It still needs to be connected to the button, loading indicator, and post container in the webpage.

# Checklist

- Posts load when the button is clicked.
- The code uses `async` and `await`.
- Only five posts are displayed.
- Post content is rendered safely.
- A loading indicator appears during the request.
- Errors are handled properly.
- The user can retry after a failed request.
- The page does not refresh when loading posts.
