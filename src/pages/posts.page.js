import { html, css, LitElement } from "lit";
import "./../components/posts.component";
import { AllPostsUseCase } from "../usecases/all-posts.usecase";

export class PostsPage extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      posts: {
        type: Array,
        state: true,
      },
    };
  }

  static get styles() {
    return css`
      .container {
        display: flex;
      }
      .main {
        width: 100%;
        padding-left: 50px;
      }
      .addPost {
        display: block;
        color: white;
        text-decoration: none;
        margin: 0 0 10px 200px;
        background-color: #f39ad5;
        border-radius: 10px;
        padding: 10px 10px;
        box-sizing: border-box;
        width: 5rem;
      }
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    const allPostsUseCase = new AllPostsUseCase();
    this.posts = await allPostsUseCase.execute();
  }

  handleAddPost(post) {
    const event = new CustomEvent('add-post', {
      bubbles: true,
      composed: true,
      detail: post
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="container">
        <aside>
          <h2>Posts Page</h2>
          <a class="addPost" href="#" @click="${this.handleAddPost}">Add post</a>

          <posts-ui .posts="${this.posts}"></posts-ui>

          <!-- <ul>
                <li><a href="#">Título del post 1</a></li>
                <li><a href="#">Título del post 2</a></li>
                <li><a href="#">Título del post 3</a></li>
                </ul>
                 -->
        </aside>

        <div class="main">
          <h2>Posts Detail</h2>
          <post-detail></post-detail>
        </div>
      </div>
    `;
  }
}

customElements.define("posts-page-genk", PostsPage);
