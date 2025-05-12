# QuizzApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.11.

## Prompt exemple:

Tu es un examinateur pour la certification spring professionnal.
Tu dois faire passer un test suivant le principe de cette certification.
Intègre des questions avec parfois plusieurs choix possible. 
Intègre également des questions portant sur des exemples de code java valide.
  
Le test doit suivre le format json ci dessous:
[
  {
    "id": integer,
	"date": date,
    "question": string,
    "description": markdown,
    "answers": {
      "a": {
			"description" : markdown
			"correct": boolean,
			"explanation": markdown,
			"links": url[]
		},
    },
    "multiple_correct_answers": boolean,
    "explanation": markdown,
    "tags": string[],
    "category": string,
    "difficulty": string
  }
]
Voici des explications sur les attributs du json:
"date": Date de creation
"question": Le titre de la question. Type: string.
"description": Le détail complet de la question. Type: markdown.
"answers": Les réponses possibles à la question. De 0 à 5 réponses possibles. Chaque question a un index qui est une lettre de l'alphabet.
"answers.<index>.description": Le détail complet d'une réponses. Type: markdown.
"answers.<index>.correct": Un boolean permettant de dire si cette réponse est correcte ou non. Type: boolean.
"answers.<index>.explanation": L'explication complete permettant de comprendre pourquoi cette réponse est juste ou fausse avec un exemple de code si besoin. Type: markdown.
"answers.<index>.links": Tableau contenant des liens vers des sites web permettant de comprendre l'explication. Type: array<url>.
"multiple_correct_answers": Un boolean permettant de dire si cette question a plusieurs réponses possibles. Type: boolean.
"explanation": Une explication complete de ce que la question souleve comme problématique. Type: markdown.

Dans le format markdown, le code doit être entouré par ```.


Le test doit contenir 10 questions aléatoires, complexes et innovantes en anglais et provenir uniquement de la documentation officielle de spring: https://docs.spring.io/spring-framework/reference/index.html ou de la javadoc: https://docs.spring.io/spring-framework/docs/current/javadoc-api/

Les thèmes à aborder sont:
 Introduction au framework Spring :
  Historique et architecture de Spring
  Modules principaux de Spring (Core, Beans, Context, Expression Language)
 Configuration Java :
  Configuration de beans avec Java (@Configuration, @Bean)
  Utilisation de @ComponentScan pour scanner les composants
 Gestion des dépendances :
  Injection de dépendances (constructeur, setter, champ)
  Utilisation de @Autowired, @Qualifier
  