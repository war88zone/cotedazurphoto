var languages = {
	"en": {
		// Title of the website
		website_title: "Tetiana Kushchynska</br>Photographer",
		// Menu
		menu_galleries: "Galleries",
		menu_slideshow: "Slideshow", 
		menu_contact: "Contact",
		menu_collaboration: "Collaboration",
		menu_aboutme: "About me",
		// Galleries
		galleries_portrait: "Portrait",
		galleries_weddingAndLoveStory: "Wedding and Love story",
		galleries_family: "Family",
		galleries_littleRiviera: "Little Riviera",
		galleries_artProject: "Art project",
		galleries_blackAndWhite: "Black and white",
		// Contact
		contact_global_title: "Contact me",
		contact_global_text: "",
		contact_links_title: "My links",
		contact_mail_title: "Send me an email",
		contact_mail_emptyError: "Please fill this field!",
		contact_mail_emailFormatError: "Please fill a valid email!",
		contact_mail_validated: "Your message has been sent!",
		contact_mail_placeholder: "Message",
		contact_mail_button: "Send",
		// Collaboration
		collaboration_global_title: "You want to collaborate with me?",
		collaboration_global_text: "You're a talented model, makeup artist, hair stylist, photographer or a very creative person?</br></br>You're ready for creative ideas realisations and experiments?</br></br>Join the team of professionals. Together we will create wonderful masterpieces and expand our portfolio! Collaboration is all expenses paid.</br></br>Any questions, ideas, suggestions, please contact us by this email address cotedazurphoto@gmail.com or by this phone number +3(3) 771 42 78 34.</br></br>See you soon!",
		// About me
		aboutMe_global_title: "Hi my name is Tetiana Kushchynska",
		aboutMe_global_text: "",
		aboutMe_facts_title: "Facts about me",
		aboutMe_facts_text: "",
		aboutMe_skill_title: "Skill set",
		aboutMe_skill_text: ""
	},
	"fr": {
		// Title of the website
		website_title: "Photographe</br>Tetiana Kushchynska",
		// Menu
		menu_galleries: "Galleries",
		menu_slideshow: "Montages", 
		menu_contact: "Contact",
		menu_collaboration: "Collaboration",
		menu_aboutme: "A propos de moi",
		// Galleries
		galleries_portrait: "Portrait",
		galleries_weddingAndLoveStory: "Mariage et histoire d'amour",
		galleries_family: "Famille",
		galleries_littleRiviera: "La Riviera",
		galleries_artProject: "Projet d'art",
		galleries_blackAndWhite: "Noir et blanc",
		// Contact
		contact_global_title: "Me contacter",
		contact_global_text: "Un texte pour expliquer aux utilisateur comment prendre contact",
		contact_links_title: "Mes liens",
		contact_mail_title: "M'envoyer un e-mail",
		contact_mail_emptyError: "Veuillez remplir le champ svp !",
		contact_mail_emailFormatError: "Veuillez replir le champ avec un mail valide svp !",
		contact_mail_validated: "Votre message à été envoyé",
		contact_name_placeholder: "Name",
		contact_email_placeholder: "Email",
		contact_message_placeholder: "Message",
		contact_mail_button: "Envoyer",
		// Collaboration
		collaboration_global_title: "Tu as envie de collaborer avec moi ?",
		collaboration_global_text: "Tu es un talentueux modèle, maquilleur, coiffeur, photographe ou une personne très créative ?</br></br>Tu es prêt(e) pour des idées créatives de réalisation et d'expériences ?</br></br>Rejoins une équipe de professionnels. Nous allons créer des chefs-d'œuvres et élargir notre portfolio ensemble! La collaboration est tout frais payés.</br></br>Pour toutes questions, idées, suggestions, tu peux me contacter via l'email cotedazurphoto@gmail.com ou par téléphone +3 (3) 771 42 78 34.</br></br>A très bientot !",
		// About me
		aboutMe_global_title: "Salut, je m'appelle Tetiana Kushchynska",
		aboutMe_global_text: "Un texte pour presenter Tetiana",
		aboutMe_facts_title: "Pour en savoir plus sur moi",
		aboutMe_facts_text: "Un texte pour expliquer un truc sur Tetiana",
		aboutMe_skill_title: "Talents",
		aboutMe_skill_text: "Un texte pour expliquer les talents de Tetiana"
	}
};


var userLanguage = navigator.language;
if(userLanguage.indexOf("fr") != -1){
  userLanguage = "fr";
}
else if (userLanguage == "ru" || userLanguage == "uk"){
  userLanguage = "ru";
}
else{
  userLanguage = "en";
}

var viewModel = function() {
  // Title of the website
  this.website_title = ko.observable(languages[userLanguage].website_title);
  // Menu
  this.menu_galleries = ko.observable(languages[userLanguage].menu_galleries);
  this.menu_slideshow = ko.observable(languages[userLanguage].menu_slideshow);
  this.menu_contact = ko.observable(languages[userLanguage].menu_contact);
  this.menu_collaboration = ko.observable(languages[userLanguage].menu_collaboration);
  this.menu_aboutme = ko.observable(languages[userLanguage].menu_aboutme);
  // Galleries
  this.galleries_portrait = ko.observable(languages[userLanguage].galleries_portrait);
  this.galleries_weddingAndLoveStory = ko.observable(languages[userLanguage].galleries_weddingAndLoveStory);
  this.galleries_family = ko.observable(languages[userLanguage].galleries_family);
  this.galleries_littleRiviera = ko.observable(languages[userLanguage].galleries_littleRiviera);
  this.galleries_artProject = ko.observable(languages[userLanguage].galleries_artProject);
  this.galleries_blackAndWhite = ko.observable(languages[userLanguage].galleries_blackAndWhite);
  // Contact
  this.contact_global_title = ko.observable(languages[userLanguage].contact_global_title);
  this.contact_global_text = ko.observable(languages[userLanguage].contact_global_text);
  this.contact_links_title = ko.observable(languages[userLanguage].contact_links_title);
  this.contact_mail_title = ko.observable(languages[userLanguage].contact_mail_title);
  this.contact_mail_emptyError = ko.observable(languages[userLanguage].contact_mail_emptyError);
  this.contact_mail_emailFormatError = ko.observable(languages[userLanguage].contact_mail_emailFormatError);
  this.contact_mail_validated = ko.observable(languages[userLanguage].contact_mail_validated);
  this.contact_name_placeholder = ko.observable(languages[userLanguage].contact_name_placeholder);
  this.contact_email_placeholder = ko.observable(languages[userLanguage].contact_email_placeholder);
  this.contact_message_placeholder = ko.observable(languages[userLanguage].contact_message_placeholder);
  this.contact_mail_button = ko.observable(languages[userLanguage].contact_mail_button);
  // Collaboration
  this.collaboration_global_title = ko.observable(languages[userLanguage].collaboration_global_title);
  this.collaboration_global_text = ko.observable(languages[userLanguage].collaboration_global_text);
  // About me
  this.aboutMe_global_title = ko.observable(languages[userLanguage].aboutMe_global_title);
  this.aboutMe_global_text = ko.observable(languages[userLanguage].aboutMe_global_text);
  this.aboutMe_facts_title = ko.observable(languages[userLanguage].aboutMe_facts_title);
  this.aboutMe_facts_text = ko.observable(languages[userLanguage].aboutMe_facts_text);
  this.aboutMe_skill_title = ko.observable(languages[userLanguage].aboutMe_skill_title);
  this.aboutMe_skill_text = ko.observable(languages[userLanguage].aboutMe_skill_text);
};