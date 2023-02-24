import { html, css, LitElement } from "lit";

export class PostsUI extends LitElement {
  static get properties() {
    return {
      posts: {
        type: Array,
      },
    };
  }

  static get styles() {
    return css`
      .posts {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .post {
          display: block;
      }

      .title {
          width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0;
          font-size: 18px;
          font-weight: normal;
      }

      .title::first-letter {
          text-transform: capitalize;
      }
      
      .title::after {
        content: "...";
      }

      .link-post {
        text-decoration: none;
        color: black;
      }
    `;
  }

  constructor() {
    super();
    this.posts = [];
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('create-post', this.handleAddPost.bind(this));
    window.addEventListener('remove-post', this.handleRemovePost.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('create-post', this.handleAddPost.bind(this));
    window.removeEventListener('remove-post', this.handleRemovePost.bind(this));

    super.disconnectedCallback();
  }

  handleAddPost(event) {
    const post = event.detail;

    this.posts.push({
      id: this.posts.lenght,
      title: post.title.value,
      body: post.body.value
    })

    this.requestUpdate();
  }

  handleShowPost(post) {
    const event = new CustomEvent('post-selected', {
      bubbles: true,
      composed: true,
      detail: post
    });
    this.dispatchEvent(event);
  }

  handleRemovePost(event) {
    const post = event.detail;

    this.posts = this.posts.filter(function(item) {
      return item.id != post.id.value
    })

    this.requestUpdate();
  }

  render() {
    return html`
        <ul class="posts" id="posts">
          ${this.posts &&
          this.posts.map(
            (post) => html`
              <a href="#" @click="${() => this.handleShowPost(post)}" class="link-post">
                <li class="post" id="post_${post.id}">
                  <h2 class="title">&#9744; ${post.title}</h2>
                </li>
              </a>
            `
          )}
        </ul>
    `;
  }
}

customElements.define("posts-ui", PostsUI);
