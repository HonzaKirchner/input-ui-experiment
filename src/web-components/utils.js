import ReactDOM from 'react-dom'

export function register(ReactComponent, name) {
    const WebComponent = class extends HTMLElement {
      constructor() {
        super();
      }
    
      connectedCallback() {
        
        debugger;
        // Create a ShadowDOM
        const root = this.attachShadow({ mode: 'open' });
    
        // Create a mount element
        const mountPoint = document.createElement('div');
        
        root.appendChild(mountPoint);
    
        // You can directly use shadow root as a mount point
        ReactDOM.render(<ReactComponent name={this.getAttribute('name')}/>, mountPoint);
      }
    }
    
    customElements.define(name, WebComponent);
}
