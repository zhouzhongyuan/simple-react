import $ from 'jquery';
import ReactDomTextComponent from './src/Component/ReactDomTextComponent';
function instantiateReactComponent(element) {
    if (typeof element === 'string' || typeof element === 'number') {
        return new ReactDomTextComponent(element);
    }
}
const React = {
    nextReactRootIndex: 0,
    createClass() {
    },
    createElement() {
    },
    render(element, container) {
        const inst = instantiateReactComponent(element);
        const markup = inst.mountComponent(React.nextReactRootIndex++);
        $(container).html(markup);
    },
};
export default React;
