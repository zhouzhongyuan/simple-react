import ReactDomTextComponent from '../Component/ReactDomTextComponent';
import ReactDomComponent from '../Component/ReactDomComponent';
function instantiateReactComponent(element) {
    if (typeof element === 'string' || typeof element === 'number') {
        return new ReactDomTextComponent(element);
    }
    if (element && typeof element.type === 'string') {
        return new ReactDomComponent(element);
    }
}
export default instantiateReactComponent;
