// ============================================================
// i18n.gs — Rezo Mapou Nasyonal — Backend Translations
// All system messages in Kreyòl, French, English.
// Reference by key — never hard-code strings in pipeline.gs.
// ============================================================

const I18N = {

  ht: {
    // Registration
    REG_SUCCESS:        'Enskripsyon fèt avèk siksè. Verifye imèl ou pou aktive kont ou.',
    REG_DUPLICATE:      'Nimewo telefòn sa a deja nan sistèm nan.',
    REG_INVALID_PHONE:  'Nimewo telefòn ou pa valid. Tanpri itilize fòma entènasyonal.',
    REG_HONEYPOT:       'Demann lan pa valid.',
    REG_ERROR:          'Yon erè te fèt. Tanpri eseye ankò.',

    // Verification & login
    VERIFY_SUCCESS:     'Kont ou verifye. Ou ka konekte kounye a.',
    VERIFY_EXPIRED:     'Lyen verifye a ekspire. Mande yon nouvo lyen.',
    VERIFY_INVALID:     'Lyen verifye a pa valid.',
    LOGIN_SENT:         'Nou voye yon lyen koneksyon nan imèl ou.',
    LOGIN_NOT_FOUND:    'Nou pa jwenn kont sa a. Verifye nimewo oswa imèl ou.',
    SESSION_EXPIRED:    'Sesyon ou ekspire. Tanpri konekte ankò.',
    SESSION_INVALID:    'Sesyon ou pa valid.',

    // Duplicate check
    PHONE_EXISTS:       'Nimewo sa a deja enskri.',
    PHONE_AVAILABLE:    'Nimewo disponib.',

    // Invites
    INVITE_SENT:        'Envitasyon voye.',
    INVITE_EXPIRED:     'Envitasyon sa a ekspire.',
    INVITE_MISMATCH:    'Nimewo telefòn ou pa koresponn ak envitasyon an. Coach la pral konfiame manyèlman.',
    INVITE_VELOCITY:    'Twòp enskripsyon nan yon ti tan. Nou ap verifye.',

    // Validation
    VALIDATION_SUCCESS: 'Validasyon anrejistre.',
    VALIDATION_LIMIT:   'Ou rive nan limit validasyon jounen an.',
    VALIDATION_SELF:    'Ou pa ka valide tèt ou.',
    VALIDATION_DUP:     'Ou deja valide manm sa a ak tip sa a.',
    UNVALIDATION_OK:    'Validasyon retire.',

    // Coaching
    COACH_REQUEST_SENT: 'Demann coaching voye.',
    COACH_OFFER_SENT:   'Ofri coaching voye.',
    COACH_ACCEPTED:     'Relasyon coaching aktive.',
    COACH_DECLINED:     'Demann refize.',
    COACH_EXPIRED:      'Relasyon coaching ekspire. Manm nan disponib ankò.',
    COACH_ACTIVITY_LOW: 'Aktivite manm nan twò ba pou kontinye coaching.',

    // Ads
    AD_CREATED:         'Anons kreye.',
    AD_UPDATED:         'Anons modifye.',
    AD_NO_POINTS:       'Pa gen pwen ase. Ajoute pwen pou aktive anons ou.',
    AD_TOO_LONG:        'Mesaj la twò long. Maksimòm 80 karaktè.',

    // General
    NOT_FOUND:          'Pa jwenn.',
    UNAUTHORIZED:       'Ou pa otorize pou fè aksyon sa a.',
    MISSING_FIELDS:     'Ranpli tout chan obligatwa yo.',
    SUCCESS:            'Siksè.',
    ERROR:              'Erè. Tanpri eseye ankò.',
  },

  fr: {
    REG_SUCCESS:        'Inscription réussie. Vérifiez votre email pour activer votre compte.',
    REG_DUPLICATE:      'Ce numéro de téléphone est déjà enregistré.',
    REG_INVALID_PHONE:  'Numéro de téléphone invalide. Utilisez le format international.',
    REG_HONEYPOT:       'Demande invalide.',
    REG_ERROR:          'Une erreur est survenue. Veuillez réessayer.',

    VERIFY_SUCCESS:     'Compte vérifié. Vous pouvez vous connecter maintenant.',
    VERIFY_EXPIRED:     'Le lien de vérification a expiré. Demandez un nouveau lien.',
    VERIFY_INVALID:     'Lien de vérification invalide.',
    LOGIN_SENT:         'Nous avons envoyé un lien de connexion à votre email.',
    LOGIN_NOT_FOUND:    'Compte introuvable. Vérifiez votre numéro ou email.',
    SESSION_EXPIRED:    'Votre session a expiré. Veuillez vous reconnecter.',
    SESSION_INVALID:    'Session invalide.',

    PHONE_EXISTS:       'Ce numéro est déjà enregistré.',
    PHONE_AVAILABLE:    'Numéro disponible.',

    INVITE_SENT:        'Invitation envoyée.',
    INVITE_EXPIRED:     'Cette invitation a expiré.',
    INVITE_MISMATCH:    'Votre numéro ne correspond pas à l\'invitation. Le coach confirmera manuellement.',
    INVITE_VELOCITY:    'Trop d\'inscriptions en peu de temps. Vérification en cours.',

    VALIDATION_SUCCESS: 'Validation enregistrée.',
    VALIDATION_LIMIT:   'Limite de validations journalières atteinte.',
    VALIDATION_SELF:    'Vous ne pouvez pas vous valider vous-même.',
    VALIDATION_DUP:     'Vous avez déjà validé ce membre avec ce type.',
    UNVALIDATION_OK:    'Validation retirée.',

    COACH_REQUEST_SENT: 'Demande de coaching envoyée.',
    COACH_OFFER_SENT:   'Offre de coaching envoyée.',
    COACH_ACCEPTED:     'Relation de coaching activée.',
    COACH_DECLINED:     'Demande refusée.',
    COACH_EXPIRED:      'La relation de coaching a expiré. Le membre est à nouveau disponible.',
    COACH_ACTIVITY_LOW: 'L\'activité du membre est trop faible pour continuer le coaching.',

    AD_CREATED:         'Annonce créée.',
    AD_UPDATED:         'Annonce modifiée.',
    AD_NO_POINTS:       'Points insuffisants. Ajoutez des points pour activer votre annonce.',
    AD_TOO_LONG:        'Message trop long. Maximum 80 caractères.',

    NOT_FOUND:          'Introuvable.',
    UNAUTHORIZED:       'Vous n\'êtes pas autorisé à effectuer cette action.',
    MISSING_FIELDS:     'Veuillez remplir tous les champs obligatoires.',
    SUCCESS:            'Succès.',
    ERROR:              'Erreur. Veuillez réessayer.',
  },

  en: {
    REG_SUCCESS:        'Registration successful. Check your email to activate your account.',
    REG_DUPLICATE:      'This phone number is already registered.',
    REG_INVALID_PHONE:  'Invalid phone number. Please use international format.',
    REG_HONEYPOT:       'Invalid request.',
    REG_ERROR:          'An error occurred. Please try again.',

    VERIFY_SUCCESS:     'Account verified. You can now log in.',
    VERIFY_EXPIRED:     'Verification link has expired. Request a new link.',
    VERIFY_INVALID:     'Invalid verification link.',
    LOGIN_SENT:         'We sent a login link to your email.',
    LOGIN_NOT_FOUND:    'Account not found. Check your phone number or email.',
    SESSION_EXPIRED:    'Your session has expired. Please log in again.',
    SESSION_INVALID:    'Invalid session.',

    PHONE_EXISTS:       'This number is already registered.',
    PHONE_AVAILABLE:    'Number available.',

    INVITE_SENT:        'Invitation sent.',
    INVITE_EXPIRED:     'This invitation has expired.',
    INVITE_MISMATCH:    'Your phone number does not match the invitation. The coach will confirm manually.',
    INVITE_VELOCITY:    'Too many registrations in a short time. Verification in progress.',

    VALIDATION_SUCCESS: 'Validation recorded.',
    VALIDATION_LIMIT:   'Daily validation limit reached.',
    VALIDATION_SELF:    'You cannot validate yourself.',
    VALIDATION_DUP:     'You have already validated this member with this type.',
    UNVALIDATION_OK:    'Validation removed.',

    COACH_REQUEST_SENT: 'Coaching request sent.',
    COACH_OFFER_SENT:   'Coaching offer sent.',
    COACH_ACCEPTED:     'Coaching relationship activated.',
    COACH_DECLINED:     'Request declined.',
    COACH_EXPIRED:      'Coaching relationship expired. Member is available again.',
    COACH_ACTIVITY_LOW: 'Member activity too low to continue coaching.',

    AD_CREATED:         'Ad created.',
    AD_UPDATED:         'Ad updated.',
    AD_NO_POINTS:       'Insufficient points. Add points to activate your ad.',
    AD_TOO_LONG:        'Message too long. Maximum 80 characters.',

    NOT_FOUND:          'Not found.',
    UNAUTHORIZED:       'You are not authorized to perform this action.',
    MISSING_FIELDS:     'Please fill in all required fields.',
    SUCCESS:            'Success.',
    ERROR:              'Error. Please try again.',
  },
};

/**
 * Returns a translated message by key.
 * Falls back to English if key not found in requested language.
 * Falls back to key itself if not found in any language.
 */
function t(key, lang) {
  lang = lang || 'ht';
  if (I18N[lang] && I18N[lang][key]) return I18N[lang][key];
  if (I18N['en'] && I18N['en'][key]) return I18N['en'][key];
  return key;
}
