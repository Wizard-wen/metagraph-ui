/**
 * @author songxiwen
 * @date  2022/3/17 10:39
 */

// Create a class for the element
export class MetaPopupInfo extends HTMLElement {

  info = document.createElement('span');

  text = '';
  imgUrl = 'logo.png';

  constructor() {
    // Always call super first in constructor
    super();

    // 创建 shadow root
    // mode表示是否能够从外部获取 shadow dom
    const shadow = this.attachShadow({ mode: 'open' });

    // Create spans
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', '0');

    this.info = document.createElement('span');
    this.info.setAttribute('class', 'info');

    const img = document.createElement('img');
    img.src = this.imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    // ShadowRoot 与 shadow DOM 是否已经连接。
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      img {
        width: 1.2rem;
      }

      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(this.info);
  }

  // 生命周期 当 custom element首次被插入文档DOM时，被调用
  connectedCallback() {
    // Take attribute content and put it inside the info span
    // data-* 的自定义元素可以通过 HTMLElement.dataset.* 访问
    const text = this.getAttribute('data-text');
    this.info.textContent = text;
    // Insert icon
    if (this.hasAttribute('img')) {
      this.imgUrl = this.getAttribute('img')!;
    }
  }

  // 当 custom element从文档DOM中删除时，被调用
  disconnectedCallback() {

  }

  //当 custom element被移动到新的文档时，被调用
  adoptedCallback() {

  }

  // : 当 custom element增加、删除、修改自身属性时，被调用。
  attributeChangedCallback() {

  }
}
