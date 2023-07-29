export default class Section {
    constructor({
        items,
        renderer
    }, container) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(container);

    }

    addItem(element) {
        this._container.prepend(element);
    }

    setItems(newItems) {
        this._renderedItems = newItems; 
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        this.clear()
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}