import r from './domingo2';

export default function render(WC) {

    if (WC.missingDeps('render', ['on', 'trigger']).length) { return; }

    Object.defineProperty(WC.extensions, 'render', {
        get: () => function () {
            let shadowRoot = this.shadowRoot || this.createShadowRoot(),
            data = Array.isArray(this.data) ? this.data : [this.data];

            [...shadowRoot.childNodes]
                    .forEach(node => shadowRoot.removeChild(node));
            data.forEach(datum => {
                let shadowFrag = r(this.templateFragment, datum);
                return shadowRoot.appendChild( shadowFrag );
            });
            this.trigger('render');
        },
        set: () => console.error('templateFragment is not settable')
    });
}
