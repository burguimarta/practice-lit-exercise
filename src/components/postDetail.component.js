import { LitElement, css, html } from "lit-element";

class PostDetail extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    :host {
      display: block;
      margin: 16px;
      padding: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    input[type="text"] {
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-bottom: 16px;
    }

    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 16px;
      cursor: pointer;
    }

    button + button {
      margin-left: 8px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('post-selected', this.handlePostSelected.bind(this));
    window.addEventListener('add-post', this.handleAddPost.bind(this));
    window.addEventListener('clear-selected', this.handleCancel.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('post-selected', this.handlePostSelected.bind(this));
    window.removeEventListener('add-post', this.handleAddPost.bind(this));
    window.removeEventListener('clear-selected', this.handleCancel.bind(this));

    super.disconnectedCallback();
  }

  handlePostSelected(event) {
    const post = event.detail;

    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const idInput = this.shadowRoot.querySelector('#id');

    idInput.value = post.id;
    titleInput.value = post.title;
    bodyInput.value = post.body;
  }

  handleAddPost() {
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const idInput = this.shadowRoot.querySelector('#id');

    idInput.value = "";
    titleInput.value = "";
    bodyInput.value = "";
  }

  render() {
    return html`
    <div>
      <div>
        <input type="hidden" id="id" />
      </div>
      <div>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
        />
      </div>
      <div>
        <label for="body">Body</label>
        <input
          type="text"
          id="body"
          name="body"
        />
      </div>
      <div>
        <button @click="${this.handleCancel}">Cancel</button>
        <button @click="${this.handleCreate}">Create</button>
        <button @click="${this.handleRemove}">Delete</button>
      </div>
    </div>
    `;
  }

  handleCancel() {
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const idInput = this.shadowRoot.querySelector('#id');

    idInput.value = "";
    titleInput.value = "";
    bodyInput.value = "";
  }

  handleCreate() {
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');

    const event = new CustomEvent('create-post', {
      bubbles: true,
      composed: true,
      detail: { title: titleInput, body: bodyInput }
    });
    this.dispatchEvent(event);
  }

  handleRemove() {
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const idInput = this.shadowRoot.querySelector('#id');

    const event = new CustomEvent('remove-post', {
      bubbles: true,
      composed: true,
      detail: { id: idInput, title: titleInput, body: bodyInput }
    });
    this.dispatchEvent(event);
  }
}

customElements.define("post-detail", PostDetail);
