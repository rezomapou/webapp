/**
 * docblock.js — Generic Document Block
 * Renders legal/doc content from langservice keys
 * contentKey: 'terms' | 'privacy' | 'copyright'
 */
let DocBlockComponent = {

    CONTENT: {
        terms: {
            titleKey: 'doc_terms_title',
            metaKey:  'doc_terms_meta',
            sections: [
                { h: 'doc_terms_h1', p: 'doc_terms_p1' },
                { h: 'doc_terms_h2', p: 'doc_terms_p2' },
                { h: 'doc_terms_h3', p: 'doc_terms_p3' },
                { h: 'doc_terms_h4', p: 'doc_terms_p4' },
                { h: 'doc_terms_h5', p: 'doc_terms_p5' },
                { h: 'doc_terms_h6', p: 'doc_terms_p6' },
                { h: 'doc_terms_h7', p: 'doc_terms_p7' },
                { h: 'doc_terms_h8', p: 'doc_terms_p8' }
            ]
        },
        privacy: {
            titleKey: 'doc_privacy_title',
            metaKey:  'doc_privacy_meta',
            sections: [
                { h: 'doc_privacy_h1', p: 'doc_privacy_p1' },
                { h: 'doc_privacy_h2', p: 'doc_privacy_p2' },
                { h: 'doc_privacy_h3', p: 'doc_privacy_p3' },
                { h: 'doc_privacy_h4', p: 'doc_privacy_p4' },
                { h: 'doc_privacy_h5', p: 'doc_privacy_p5' },
                { h: 'doc_privacy_h6', p: 'doc_privacy_p6' },
                { h: 'doc_privacy_h7', p: 'doc_privacy_p7' }
            ]
        },
        copyright: {
            titleKey: 'doc_copyright_title',
            metaKey:  'doc_copyright_meta',
            sections: [
                { h: 'doc_copyright_h1', p: 'doc_copyright_p1' },
                { h: 'doc_copyright_h2', p: 'doc_copyright_p2' },
                { h: 'doc_copyright_h3', p: 'doc_copyright_p3' },
                { h: 'doc_copyright_h4', p: 'doc_copyright_p4' },
                { h: 'doc_copyright_h5', p: 'doc_copyright_p5' },
                { h: 'doc_copyright_h6', p: 'doc_copyright_p6' }
            ]
        }
    },

    async init(containerId, contentKey) {
        const container = document.getElementById(containerId);
        if (!container) { console.warn('DocBlock container missing'); return; }

        // Strip any path prefix — accept 'terms' or 'docs/terms'
        const key = contentKey?.split('/').pop();
        const def = this.CONTENT[key];

        if (!def) {
            container.innerHTML = `<div class="doc-block container-narrow page-content">
                <p style="color:var(--muted);padding:3rem 0;">Document non disponible: ${key}</p>
            </div>`;
            return;
        }

        const get = (k) => LangService.get(k) || k;
        const sections = def.sections.map(s =>
            `<h2>${get(s.h)}</h2><p>${get(s.p)}</p>`
        ).join('');

        container.innerHTML = `
            <article class="doc-block container-narrow page-content">
                <div class="eyebrow">Legal</div>
                <h1>${get(def.titleKey)}</h1>
                <div class="doc-meta">${get(def.metaKey)}</div>
                ${sections}
            </article>`;

        console.log("DocBlockComponent initialized:", key);
    }
};

DocBlockComponent = BaseComponent.wrap('DOC_BLOCK', DocBlockComponent);
window.DocBlockComponent = DocBlockComponent;
console.log("DocBlockComponent registered to window.");
