/**
 * langservice.js - Localization Service
 */
const LangService = {
    currentLang: (localStorage.getItem('rmn_lang') || 'ht'),

    dictionary: {
        ht: {
            lang_ht: 'Kreyòl', lang_fr: 'Français', lang_en: 'English',
            nav_home: 'Akèy', nav_about: 'Sou nou', nav_contact: 'Kontakte nou',
            footer_legal: 'Mentions légales', footer_privacy: 'Konfidansyalite',
            footer_terms: 'Kondisyon itilizasyon',
            footer_meta: '© 2026 RMNE | Inisyativ Fatra se Lò',
            stat_members: 'Manm', stat_actions: 'Aksyon', stat_points: 'Pwen',
            tab_filozofi: 'Filozofi', tab_program: 'Pwogram',
            hero_tag: 'Rezo Machann Nasyonal · Ayiti 2026',
            hero_h1a: 'Ou se', hero_h1b: 'Rezo Mapou.', hero_h1c: 'Vini grandi.',
            hero_lead: 'Yon rezo nasyonal ki sipòte machann ak antreprenè nan tout Ayiti — vizibilite, koneksyon, ak sipò konkrè chak mwa.',
            hero_cta1: 'Enskri Kounye a — Gratis', hero_cta2: 'Kijan sa Travay',
            map_eye: 'Senbòl Nou', map_title: 'Poukisa Mapou?',
            map_p1: 'Pyebwa Mapou se pyebwa ki pi solid ann Ayiti. Li pa grandi vit — li bati rasin pwofon, long, solid anvan li leve anlè. Siklòn pa ka rache l paske pa gen yon sèl rasin ki pote tout pwa a — tout rasin yo travay ansanm.',
            map_p2: 'Se menm lojik la nou itilize pou rezo sa a. Machann yo, yo menm, se rasin ekonomi Ayisyen an. Chak machann dlo, chak vandè manje, chak ti komèsan — se yon rasin. Ansanm, nou fòme yon rezo ki pa ka rache.',
            map_dis_title: 'Yon bagay enpòtan pou nou di klè:',
            map_dis1: 'Rezo Mapou pa gen okenn afiliyasyon relijye — ni katolik, ni pwotestan, ni vodou, ni okenn lòt kwayans. Senbòl mapou a se yon senbòl natirèl, ekolojik, ki se eritaj tout pèp Ayisyen san eksepsyon.',
            map_dis2: 'Rezo Mapou pa gen okenn afiliyasyon politik — ni pati, ni kandida, ni gouvènman. Nou travay pou machann ak kominote yo, pa pou okenn ajanda politik.',
            map_dis3: 'Tout moun ki kwè nan nenpòt relijyon, oswa ki pa kwè ditou — gen plas yo nan Rezo Mapou. Sèl kondisyon: vle wè Ayiti avanse.',
            prog_eye: 'Pwogram Map Sipote Lakay', prog_title: 'Etap yo, klè klè.',
            ven_call: 'Ou se yon machann dlo, manje, legim, elatrye — ou se yon Santinèl k ap bay ekonomi an jaret. Vini nan Rezo Mapou kote w ap jwenn bon jan avantaj.',
            st1t: 'Enskri — Gratis', st1d: 'Enskripsyon louvri depi jodi a. Pa peye anyen. Kreye pwofil ou kòm Santinèl nan rezo a.',
            st2t: 'Coach Chwazi Ou', st2d: 'Coach yo gade pwofil Santinèl yo epi yo ka deside sipòte ou. Yon Coach peye frè enskripsyon pou ou nan pwogram.',
            st3t: 'Resevwa Sipò Chak Mwa', st3d: 'Chak mwa, ou resevwa yon pati nan sipò Coach la peye a — akondisyon ou reyalize 3 aktivite rezo a.',
            c1t: '① Poste sou Rezo Mapou', c1d: 'Pataje yon post sou paj Rezo Mapou pou pale de Coach ou ak aktivite ou.',
            c2t: '② Aktivite Kominotè', c2d: 'Patisipe nan omwen yon aktivite kominotè ki gen valè nan mwa a.',
            c3t: '③ Rapò Mansyèl', c3d: 'Ranpli rapò mansyèl rezo a — kèk kesyon sou aktivite ou ak zòn ou.'
        },
        fr: {
            lang_ht: 'Kreyòl', lang_fr: 'Français', lang_en: 'English',
            nav_home: 'Accueil', nav_about: 'À propos', nav_contact: 'Contact',
            footer_legal: 'Mentions légales', footer_privacy: 'Confidentialité',
            footer_terms: "Conditions d'utilisation",
            footer_meta: "© 2026 RMNE | Initiative Fatra se Lò",
            stat_members: 'Membres', stat_actions: 'Actions', stat_points: 'Points',
            tab_filozofi: 'Philosophie', tab_program: 'Programme',
            hero_tag: 'Réseau Marchand National · Haïti 2026',
            hero_h1a: 'Vous êtes', hero_h1b: 'Rezo Mapou.', hero_h1c: 'Venez grandir.',
            hero_lead: 'Un réseau national qui soutient les marchands et entrepreneurs à travers Haïti — visibilité, connexions et soutien concret chaque mois.',
            hero_cta1: "S'inscrire — Gratuit", hero_cta2: 'Comment ça marche',
            map_eye: 'Notre Symbole', map_title: 'Pourquoi Mapou?',
            map_p1: "L'arbre Mapou est l'arbre le plus solide d'Haïti. Il ne grandit pas vite — il construit des racines profondes et solides avant de s'élever. Les cyclones ne peuvent pas le déraciner car aucune racine seule ne porte tout le poids.",
            map_p2: "C'est la même logique que nous utilisons pour ce réseau. Les marchands eux-mêmes sont les racines de l'économie haïtienne. Ensemble, nous formons un réseau impossible à déraciner.",
            map_dis_title: 'Une chose importante à dire clairement:',
            map_dis1: "Rezo Mapou n'a aucune affiliation religieuse — ni catholique, ni protestante, ni vaudou, ni aucune autre croyance. Le symbole du mapou est un symbole naturel et écologique, patrimoine de tout le peuple haïtien.",
            map_dis2: "Rezo Mapou n'a aucune affiliation politique — ni parti, ni candidat, ni gouvernement. Nous travaillons pour les marchands et les communautés.",
            map_dis3: "Toute personne, quelle que soit sa religion ou son orientation — a sa place dans Rezo Mapou. Une seule condition: vouloir voir Haïti avancer.",
            prog_eye: 'Programme Map Sipote Lakay', prog_title: 'Les étapes, clairement.',
            ven_call: "Que vous soyez marchand d'eau, de nourriture, de légumes — vous soutenez l'économie. Rejoignez Rezo Mapou et bénéficiez d'avantages concrets.",
            st1t: "S'inscrire — Gratuit", st1d: "Les inscriptions sont ouvertes dès aujourd'hui. Gratuit. Créez votre profil Sentinelle.",
            st2t: 'Un Coach vous choisit', st2d: "Les Coachs consultent les profils et peuvent décider de vous soutenir en payant les frais d'inscription.",
            st3t: 'Recevez un soutien mensuel', st3d: 'Chaque mois, vous recevez une partie du soutien — à condition de réaliser 3 activités du réseau.',
            c1t: '① Poster sur Rezo Mapou', c1d: 'Partager un post sur la page Rezo Mapou pour parler de votre Coach et activités.',
            c2t: '② Activité Communautaire', c2d: 'Participer à au moins une activité communautaire significative dans le mois.',
            c3t: '③ Rapport Mensuel', c3d: 'Remplir le rapport mensuel du réseau.'
        },
        en: {
            lang_ht: 'Kreyòl', lang_fr: 'Français', lang_en: 'English',
            nav_home: 'Home', nav_about: 'About', nav_contact: 'Contact',
            footer_legal: 'Legal Notice', footer_privacy: 'Privacy Policy',
            footer_terms: 'Terms of Use',
            footer_meta: '© 2026 RMNE | Fatra se Lò Initiative',
            stat_members: 'Members', stat_actions: 'Actions', stat_points: 'Points',
            tab_filozofi: 'Philosophy', tab_program: 'Program',
            hero_tag: 'National Merchant Network · Haiti 2026',
            hero_h1a: 'You are', hero_h1b: 'Rezo Mapou.', hero_h1c: 'Come grow.',
            hero_lead: 'A national network supporting merchants and entrepreneurs across Haiti — visibility, connections, and concrete monthly support.',
            hero_cta1: 'Register Now — Free', hero_cta2: 'How It Works',
            map_eye: 'Our Symbol', map_title: 'Why Mapou?',
            map_p1: "The Mapou tree is Haiti's most resilient tree. It doesn't grow fast — it builds deep, strong roots before rising. Hurricanes cannot uproot it because no single root carries all the weight.",
            map_p2: "This is the same logic we use for this network. Merchants themselves are the roots of the Haitian economy. Together, we form a network that cannot be uprooted.",
            map_dis_title: 'One thing important to state clearly:',
            map_dis1: 'Rezo Mapou has no religious affiliation — neither Catholic, Protestant, Vodou, nor any other belief. The mapou symbol is a natural, ecological symbol that belongs to all Haitian people.',
            map_dis2: 'Rezo Mapou has no political affiliation — no party, no candidate, no government. We work for merchants and communities.',
            map_dis3: 'Anyone, regardless of religion or political orientation — has a place in Rezo Mapou. One condition only: wanting Haiti to move forward.',
            prog_eye: 'Map Sipote Lakay Program', prog_title: 'The steps, clearly.',
            ven_call: 'Whether you sell water, food, or vegetables — you hold up the economy. Join Rezo Mapou and access real benefits.',
            st1t: 'Register — Free', st1d: 'Registration open from today. Free. Create your Sentinel profile.',
            st2t: 'A Coach Chooses You', st2d: 'Coaches browse profiles and can decide to support you by paying the enrollment fee.',
            st3t: 'Receive Monthly Support', st3d: "Each month, you receive a portion of the Coach's payment — provided you complete 3 network activities.",
            c1t: '① Post on Rezo Mapou', c1d: 'Share a post on the Rezo Mapou page about your Coach and activities.',
            c2t: '② Community Activity', c2d: 'Participate in at least one meaningful community activity in the month.',
            c3t: '③ Monthly Report', c3d: "Complete the network's monthly report.",
            doc_terms_title: 'Terms of Use',
            doc_terms_meta: 'Last updated: April 2026',
            doc_terms_h1: '1. Acceptance', doc_terms_p1: 'By using fatraselo.net or registering with RMN, you accept these terms.',
            doc_terms_h2: '2. Purpose', doc_terms_p2: 'This site provides information about FSL and RMN and allows registration.',
            doc_terms_h3: '3. Registration', doc_terms_p3: 'By registering, you confirm your information is accurate and you are over 16.',
            doc_terms_h4: '4. Conduct', doc_terms_p4: 'Members agree to respect other members and not misuse the RMN brand.',
            doc_terms_h5: '5. Liability', doc_terms_p5: 'RMN is not liable for damages arising from use of this site.',
            doc_terms_h6: '6. Changes', doc_terms_p6: 'We reserve the right to modify these terms at any time.',
            doc_terms_h7: '7. Governing Law', doc_terms_p7: 'These terms are governed by the laws of the Republic of Haiti.',
            doc_terms_h8: '8. Contact', doc_terms_p8: 'Email: info@fatraselo.net · WhatsApp: +509 4733 4565',
            doc_privacy_title: 'Privacy Policy',
            doc_privacy_meta: 'Last updated: April 2026',
            doc_privacy_h1: '1. Data collected', doc_privacy_p1: 'We collect: name, email, phone, department, commune.',
            doc_privacy_h2: '2. Purpose', doc_privacy_p2: 'We use your data to contact you about network activities.',
            doc_privacy_h3: '3. Protection', doc_privacy_p3: 'Data is stored on secured Google Sheets.',
            doc_privacy_h4: '4. Retention', doc_privacy_p4: 'We keep your data while the network is active.',
            doc_privacy_h5: '5. Your rights', doc_privacy_p5: 'You may request copy, correction or deletion of your data.',
            doc_privacy_h6: '6. Cookies', doc_privacy_p6: 'This site does not use tracking cookies.',
            doc_privacy_h7: '7. Contact', doc_privacy_p7: 'Email: info@fatraselo.net',
            doc_copyright_title: 'Copyright',
            doc_copyright_meta: '© 2026 Rezo Mapou Nasyonal',
            doc_copyright_h1: '1. Ownership', doc_copyright_p1: 'All content on fatraselo.net is the exclusive property of RMN.',
            doc_copyright_h2: '2. Trademarks', doc_copyright_p2: 'The FSL and RMN logos are registered trademarks.',
            doc_copyright_h3: '3. Restrictions', doc_copyright_p3: 'You may not copy or use logos without written permission.',
            doc_copyright_h4: '4. Permitted use', doc_copyright_p4: 'You may share site links with clear attribution.',
            doc_copyright_h5: '5. User content', doc_copyright_p5: 'By submitting content, you grant RMN a license to use it.',
            doc_copyright_h6: '6. Contact', doc_copyright_p6: 'Email: info@fatraselo.net',
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

// Note: doc content keys appended below
// These are added to the existing dictionary in langservice.js
// Paste these into each language block manually, or replace langservice.js entirely
