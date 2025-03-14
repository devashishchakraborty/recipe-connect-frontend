import { useState } from "react";
import MdiDelete from "../assets/svg/MdiDelete";

const Comments = ({ recipe, recipeId, token, user }) => {
  const [comments, setComments] = useState(recipe.comments.toReversed());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  const addComment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/recipes/${recipeId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setComments((prev) => [data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteComment = async (commentId) => {
    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/recipes/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setComments((prev) => prev.filter((comment) => comment.id != data.id));
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <>
      <h3>Comments</h3>
      <div className="commentsMeta">{comments.length} comments</div>
      <hr />

      <form onSubmit={addComment} className="addCommentForm">
        <fieldset>
          <legend><b>Add Comment</b></legend>
          <textarea
            name="commentText"
            id="commentText"
            placeholder="Write your comment here!"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            required
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </fieldset>
      </form>
      <div className="comments">
        {comments.length > 0 &&
          comments.map((comment) => (
            <section key={comment.id}>
              <div className="commentMeta">
                <span className="authorName">
                  <b>{comment.author.name}</b>
                </span>
                &#10072;
                <span className="authorEmail">{comment.author.email}</span>
                {/* Only show delete button if recipe or comment author is logged in */}
                {(recipe.author_id == user.id ||
                  comment.author_id == user.id ||
                  user.role == "ADMIN") && (
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="deleteBtn outline"
                    disabled={isSubmitting}
                  >
                    <MdiDelete />
                  </button>
                )}
              </div>
              <p className="commentText">{comment.text}</p>
              <hr />
            </section>
          ))}
      </div>
    </>
  );
};

export default Comments;
