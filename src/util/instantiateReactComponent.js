import ReactDomTextComponent from '../Component/ReactDomTextComponent';
import ReactDomComponent from '../Component/ReactDomComponent';
import ReactCompositeComponent from '../Component/ReactCompositeComponent';
function instantiateReactComponent(element) {
    if (typeof element === 'string' || typeof element === 'number') {
        return new ReactDomTextComponent(element);
    }
    if (element && typeof element.type === 'string') {
        return new ReactDomComponent(element);
    }
    if (element && typeof element.type === 'function') {
        return new ReactCompositeComponent(element);
    }
}
export default instantiateReactComponent;
