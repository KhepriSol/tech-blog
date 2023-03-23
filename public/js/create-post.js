async function createPostHandler(event) {
    event.preventDefault();
    // Get input values
    const postTitle = document.querySelector("#post-title").value.trim();
    const postBody = document.querySelector("#post-body").value.trim();
  
    // Check for errors
    if (!postTitle) {
      alert("Please enter a title for your post.");
      return;
    }
    if (!postBody) {
      alert("Please enter a body for your post.");
      return;
    }
  
    // Send POST request
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title: Title,
          content: Body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Handle response
      if (response.ok) {
        const postId = await response.json();
        document.location.replace(`/post/${postId}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }
  
  document
    .querySelector("#create-post-btn")
    .addEventListener("click", createPostHandler);
  