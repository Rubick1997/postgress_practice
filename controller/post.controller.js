const db = require("../db");

class PostController {
  async createPost(req, res) {
    const { title, content, userId } = req.body;
    console.log(req.body);
    const newPost = await db.query(
      "INSERT INTO post (title , content, user_id) values ($1, $2, $3) RETURNING *",
      [title, content, userId]
    );
    res.json(newPost.rows[0]);
  }

  async getPostsByUser(req, res) {
    const id = req.query.id;
    const posts = await db.query("select * from post where user_id = $1", [id]);
    res.json(posts.rows);
  }

  async deletePostByUser(req, res) {
    const { postId, userId } = req.body;
    const onePost = await db.query(
      "DELETE from post where id = $1 and user_id = $2",
      [postId, userId]
    );
    res.json(onePost.rows);
  }
}

module.exports = new PostController();
