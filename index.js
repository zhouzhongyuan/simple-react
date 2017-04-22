import $ from 'jquery';
import ReactDomTextComponent from './src/Component/ReactDomTextComponent';
function instantiateReactComponent(element) {
    if (typeof element === 'string') {
        return new ReactDomTextComponent(element);
    }
}
const React = {
    createClass() {
    },
    createElement() {
    },
    render(element, container) {
        const inst = instantiateReactComponent(element);
        const html = inst.mountComponent();
        $(container).append(html);
    },
};
export default React;
