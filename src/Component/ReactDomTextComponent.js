function ReactDomTextComponent(element) {
    this.text = element;
}
ReactDomTextComponent.prototype.mountComponent = function () {
    return `<div>${this.text}</div>`;
};
export default ReactDomTextComponent;
