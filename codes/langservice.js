const LangService = {
    currentLang: (localStorage.getItem('rmn_lang') || 'ht'),
    dictionary: {
        ht: {
            lang_ht: 'Kreyol', lang_fr: 'Francais', lang_en: 'English',
            nav_home: 'Akey', nav_about: 'Sou nou', nav_contact: 'Kontakte nou',
            footer_legal: 'Legal', footer_privacy: 'Konfidansyalite',
            footer_terms: 'Kondisyon', footer_meta: '© 2026 RMNE | Fatra se Lo',
            tab_filozofi: 'Filozofi', tab_program: 'Pwogram',
            hero_tag: 'Rezo Machann Nasyonal - Ayiti 2026',
            hero_h1a: 'Ou se', hero_h1b: 'Rezo Mapou.', hero_h1c: 'Vini grandi.',
            hero_lead: 'Yon rezo nasyonal ki sipote machann ak antreprene nan tout Ayiti.',
            hero_cta1: 'Enskri Kounye a - Gratis', hero_cta2: 'Kijan sa Travay',
            map_eye: 'Senbòl Nou', map_title: 'Poukisa Mapou?',
            map_p1: 'Pyebwa Mapou se pyebwa ki pi solid ann Ayiti. Li pa grandi vit - li bati rasin pwofon, long, solid anvan li leve anle.',
            map_p2: 'Se menm lojik la nou itilize pou rezo sa a. Machann yo se rasin ekonomi Ayisyen an. Ansanm, nou fome yon rezo ki pa ka rache.',
            map_dis_title: 'Yon bagay enpòtan pou nou di kle:',
            map_dis1: 'Rezo Mapou pa gen okenn afiliyasyon relijye - ni katolik, ni pwotestan, ni vodou.',
            map_dis2: 'Rezo Mapou pa gen okenn afiliyasyon politik - ni pati, ni kandida, ni gouvènman.',
            map_dis3: 'Tout moun gen plas yo nan Rezo Mapou. Sel kondisyon: vle we Ayiti avanse.',
            prog_eye: 'Pwogram Map Sipote Lakay', prog_title: 'Etap yo, kle kle.',
            ven_call: 'Ou se yon machann - ou se yon Santinel k ap bay ekonomi an jaret.',
            st1t: 'Enskri - Gratis', st1d: 'Enskripsyon louvri depi jodi a. Pa peye anyen.',
            st2t: 'Coach Chwazi Ou', st2d: 'Coach yo gade pwofil Santinel yo epi yo ka deside sipote ou.',
            st3t: 'Resevwa Sipo Chak Mwa', st3d: 'Chak mwa, ou resevwa yon pati nan sipo Coach la peye a.',
            c1t: 'Poste sou Rezo Mapou', c1d: 'Pataje yon post sou paj Rezo Mapou.',
            c2t: 'Aktivite Kominotè', c2d: 'Patisipe nan omwen yon aktivite kominotè nan mwa a.',
            c3t: 'Rapò Mansyel', c3d: 'Ranpli rapo mansyel rezo a.'
        },
        fr: {
            lang_ht: 'Kreyol', lang_fr: 'Francais', lang_en: 'English',
            nav_home: 'Accueil', nav_about: 'A propos', nav_contact: 'Contact',
            footer_legal: 'Mentions legales', footer_privacy: 'Confidentialite',
            footer_terms: 'Conditions', footer_meta: '© 2026 RMNE | Initiative Fatra se Lo',
            tab_filozofi: 'Philosophie', tab_program: 'Programme',
            hero_tag: 'Reseau Marchand National - Haiti 2026',
            hero_h1a: 'Vous etes', hero_h1b: 'Rezo Mapou.', hero_h1c: 'Venez grandir.',
            hero_lead: 'Un reseau national qui soutient les marchands et entrepreneurs a travers Haiti.',
            hero_cta1: 'Inscrire - Gratuit', hero_cta2: 'Comment ca marche',
            map_eye: 'Notre Symbole', map_title: 'Pourquoi Mapou?',
            map_p1: "L'arbre Mapou est l'arbre le plus solide d'Haiti. Il ne grandit pas vite.",
            map_p2: "C'est la meme logique que nous utilisons pour ce reseau.",
            map_dis_title: 'Une chose importante a dire clairement:',
            map_dis1: "Rezo Mapou n'a aucune affiliation religieuse.",
            map_dis2: "Rezo Mapou n'a aucune affiliation politique.",
            map_dis3: "Toute personne a sa place dans Rezo Mapou.",
            prog_eye: 'Programme Map Sipote Lakay', prog_title: 'Les etapes, clairement.',
            ven_call: "Vous soutenez l'economie. Rejoignez Rezo Mapou.",
            st1t: 'Inscrire - Gratuit', st1d: "Les inscriptions sont ouvertes. Gratuit.",
            st2t: 'Un Coach vous choisit', st2d: 'Les Coachs consultent les profils.',
            st3t: 'Recevez un soutien mensuel', st3d: 'Chaque mois, vous recevez une partie du soutien.',
            c1t: 'Poster sur Rezo Mapou', c1d: 'Partager un post sur la page Rezo Mapou.',
            c2t: 'Activite Communautaire', c2d: 'Participer a une activite communautaire.',
            c3t: 'Rapport Mensuel', c3d: 'Remplir le rapport mensuel du reseau.'
        },
        en: {
            lang_ht: 'Kreyol', lang_fr: 'French', lang_en: 'English',
            nav_home: 'Home', nav_about: 'About', nav_contact: 'Contact',
            footer_legal: 'Legal Notice', footer_privacy: 'Privacy Policy',
            footer_terms: 'Terms of Use', footer_meta: '© 2026 RMNE | Fatra se Lo Initiative',
            tab_filozofi: 'Philosophy', tab_program: 'Program',
            hero_tag: 'National Merchant Network - Haiti 2026',
            hero_h1a: 'You are', hero_h1b: 'Rezo Mapou.', hero_h1c: 'Come grow.',
            hero_lead: 'A national network supporting merchants and entrepreneurs across Haiti.',
            hero_cta1: 'Register Now - Free', hero_cta2: 'How It Works',
            map_eye: 'Our Symbol', map_title: 'Why Mapou?',
            map_p1: 'The Mapou tree is the most resilient tree in Haiti. It builds deep roots before rising.',
            map_p2: 'This is the same logic we use for this network. Together we form an unbreakable network.',
            map_dis_title: 'One thing important to state clearly:',
            map_dis1: 'Rezo Mapou has no religious affiliation of any kind.',
            map_dis2: 'Rezo Mapou has no political affiliation of any kind.',
            map_dis3: 'Everyone has a place in Rezo Mapou. One condition: wanting Haiti to move forward.',
            prog_eye: 'Map Sipote Lakay Program', prog_title: 'The steps, clearly.',
            ven_call: 'You hold up the economy. Join Rezo Mapou and access real benefits.',
            st1t: 'Register - Free', st1d: 'Registration open from today. Free.',
            st2t: 'A Coach Chooses You', st2d: 'Coaches browse profiles and choose who to support.',
            st3t: 'Receive Monthly Support', st3d: 'Each month you receive support from your Coach.',
            c1t: 'Post on Rezo Mapou', c1d: 'Share a post on the Rezo Mapou page.',
            c2t: 'Community Activity', c2d: 'Participate in at least one community activity.',
            c3t: 'Monthly Report', c3d: 'Complete the monthly network report.'
        }
    },
    async init() {
        console.log("Initializing Language Service...");
        const stored = localStorage.getItem('rmn_lang');
        if (stored && this.dictionary[stored]) this.currentLang = stored;
        return true;
    },
    get(key) {
        const lang = this.dictionary[this.currentLang];
        return (lang && lang[key]) || key;
    },
    setLang(langCode) {
        if (this.dictionary[langCode]) {
            this.currentLang = langCode;
            localStorage.setItem('rmn_lang', langCode);
        }
    }
};
window.LangService = LangService;
