/**
 * docblock.js — Generic Document Block Component
 * Renders any content passed via pageConfig.content
 * Content keys map to langservice dictionary
 */

let DocBlockComponent = {

    CONTENT: {
        'docs/terms': {
            titleKey: 'doc_terms_title',
            metaKey:  'doc_terms_meta',
            sections: [
                { heading: 'doc_terms_h1', body: 'doc_terms_p1' },
                { heading: 'doc_terms_h2', body: 'doc_terms_p2' },
                { heading: 'doc_terms_h3', body: 'doc_terms_p3' },
                { heading: 'doc_terms_h4', body: 'doc_terms_p4' },
                { heading: 'doc_terms_h5', body: 'doc_terms_p5' },
                { heading: 'doc_terms_h6', body: 'doc_terms_p6' },
                { heading: 'doc_terms_h7', body: 'doc_terms_p7' },
                { heading: 'doc_terms_h8', body: 'doc_terms_p8' }
            ]
        },
        'docs/privacy': {
            titleKey: 'doc_privacy_title',
            metaKey:  'doc_privacy_meta',
            sections: [
                { heading: 'doc_privacy_h1', body: 'doc_privacy_p1' },
                { heading: 'doc_privacy_h2', body: 'doc_privacy_p2' },
                { heading: 'doc_privacy_h3', body: 'doc_privacy_p3' },
                { heading: 'doc_privacy_h4', body: 'doc_privacy_p4' },
                { heading: 'doc_privacy_h5', body: 'doc_privacy_p5' },
                { heading: 'doc_privacy_h6', body: 'doc_privacy_p6' },
                { heading: 'doc_privacy_h7', body: 'doc_privacy_p7' }
            ]
        },
        'docs/copyright': {
            titleKey: 'doc_copyright_title',
            metaKey:  'doc_copyright_meta',
            sections: [
                { heading: 'doc_copyright_h1', body: 'doc_copyright_p1' },
                { heading: 'doc_copyright_h2', body: 'doc_copyright_p2' },
                { heading: 'doc_copyright_h3', body: 'doc_copyright_p3' },
                { heading: 'doc_copyright_h4', body: 'doc_copyright_p4' },
                { heading: 'doc_copyright_h5', body: 'doc_copyright_p5' },
                { heading: 'doc_copyright_h6', body: 'doc_copyright_p6' }
            ]
        }
    },

    async init(containerId, contentKey) {
        const container = document.getElementById(containerId);
        if (!container) { console.warn('DocBlock container missing'); return; }

        const def = this.CONTENT[contentKey];
        if (!def) {
            container.innerHTML = `<div class="doc-block container-narrow page-content">
                <p>Document not found: ${contentKey}</p>
            </div>`;
            return;
        }

        const title = LangService.get(def.titleKey);
        const meta  = LangService.get(def.metaKey);

        const sections = def.sections.map(s => `
            <h2>${LangService.get(s.heading)}</h2>
            <p>${LangService.get(s.body)}</p>
        `).join('');

        container.innerHTML = `
            <article class="doc-block container-narrow page-content">
                <h1>${title}</h1>
                <div class="doc-meta">${meta}</div>
                ${sections}
            </article>`;

        console.log("DocBlockComponent initialized:", contentKey);
    }
};

DocBlockComponent = BaseComponent.wrap('DOC_BLOCK', DocBlockComponent);
window.DocBlockComponent = DocBlockComponent;
console.log("DocBlockComponent registered to window.");
