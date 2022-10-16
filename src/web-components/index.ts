/**
 * @author songxiwen
 * @date  2022/3/17 10:22
 */
import { CurrentTimeElement } from './meta-custom-element';
import { MetaPopupInfo } from "./meta-popup-info";
import { MetaWordCount } from './meta-word-count';

export function init(): void;

export function init() {
  window.customElements.define('meta-word-count', MetaWordCount, { extends: 'p' });
  window.customElements.define('meta-popup-info', MetaPopupInfo);
  window.customElements.define('meta-current-time', CurrentTimeElement)
}

