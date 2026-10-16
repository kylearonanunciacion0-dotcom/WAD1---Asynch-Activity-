// Target API Endpoint (Slide 24)
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// DOM Element Selections (Slide 20)
const loadPostsBtn = document.getElementById("loadPostsBtn");
const statusMessage = document.getElementById("statusMessage");
const postsContainer = document.getElementById("postsContainer");

// Custom news articles array to replace the default Latin placeholder text
const customArticles = [
  {
    title: "Sara Duterte Impeachment Proceedings",
    body: "Updates and overview regarding the legal and political developments surrounding the impeachment inquiry."
  },
  {
    title: "Cornell University Legal Investigation",
    body: "An overview of ongoing inquiries into institutional campus safety and reported judicial proceedings."
  },
  {
    title: "Anthropic Safety Researchers Issue AI Risk Warnings",
    body: "AI safety researchers highlight potential long-term risks and existential safety frameworks for advanced models."
  },
  {
    title: "Impeachment Trial Proceedings Update",
    body: "A review of court decorum, legal standards, and witness cross-examinations during recent trial sessions."
  },
  {
    title: "Discussion on Online Gaming and Platform Regulations",
    body: "Policy debates arise concerning digital platform restrictions, youth safety, and educational focus in schools."
  }
];

/**
 * Requirement 02: Async/Await Syntax (Slide 15)
 * Handles complete lifecycle: request states, fetching, error checks, and parsing.
 */
async function fetchPosts() {
  // Requirement 05 & Slide 21: Set Initial UI Request State
  loadPostsBtn.disabled = true; // Prevents duplicate submissions (Slide 22)
  loadPostsBtn.textContent = "Loading...";
  statusMessage.textContent = "Fetching posts from server...";
  statusMessage.className = "status-message loading";
  postsContainer.innerHTML = ""; // Clear existing list content (Slide 21)

  try {
    // Initiate asynchronous network request (Slide 11 & Slide 16)
    const response = await fetch(API_URL);

    // Requirement 06 & Slide 18: Handle HTTP errors (404, 500) manually
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    // Parse response body stream into JavaScript array (Slide 13 & Slide 16)
    const rawPosts = await response.json();

    // Requirement 03 & Custom Mapping: 
    // Extract first 5 items, then map custom titles/bodies onto the fetched items
    const firstFivePosts = rawPosts.slice(0, 5).map((post, index) => ({
      ...post,
      title: customArticles[index].title,
      body: customArticles[index].body
    }));

    // Safely render posts to DOM
    renderPosts(firstFivePosts);

    // Clear status message after successful render
    statusMessage.textContent = "";
    statusMessage.className = "status-message";

  } catch (error) {
    // Requirement 06 & Requirement 07: Intercept errors and provide clear message
    console.error("Fetch failure:", error);
    statusMessage.textContent = `Failed to load posts: ${error.message}. Click below to retry.`;
    statusMessage.className = "status-message error";

  } finally {
    // Requirement 07 & Slide 21: Re-enable trigger button allowing user to retry
    loadPostsBtn.disabled = false;
    loadPostsBtn.textContent = "Reload Posts";
  }
}

/**
 * Requirement 04 & Slide 20: Safe DOM Rendering (XSS Prevention)
 * Uses document.createElement and textContent to prevent raw HTML execution.
 */
function renderPosts(posts) {
  // Gracefully handle empty array responses (Slide 22 & Slide 25)
  if (!posts || posts.length === 0) {
    statusMessage.textContent = "No posts available to display.";
    statusMessage.className = "status-message";
    return;
  }

  posts.forEach((post) => {
    // Create card container (<article class="post-card">)
    const article = document.createElement("article");
    article.classList.add("post-card");

    // Create heading element safely (Slide 20)
    const titleEl = document.createElement("h3");
    titleEl.textContent = post.title; // textContent prevents XSS injection

    // Create body element safely (Slide 20)
    const bodyEl = document.createElement("p");
    bodyEl.textContent = post.body; // textContent prevents XSS injection

    // Append title and body to card container
    article.appendChild(titleEl);
    article.appendChild(bodyEl);

    // Append card to posts section
    postsContainer.appendChild(article);
  });
}

// Requirement 01 & 08: Bind click event to trigger dynamic fetch without page reloads
loadPostsBtn.addEventListener("click", fetchPosts);