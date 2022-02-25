import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col,Label} from 'reactstrap';
import classnames from 'classnames';

class HelpPage extends React.Component {
constructor(props) {
    super(props);
    this.state = {
	  activeTab : '1',
    };

  }

  toggleTab(tab){
	if (this.state.activeTab !== tab) {
		this.setState({ activeTab: tab });
	  }
  }

  render() {		
    return (
        <div className="responsive-container">
                    <Nav tabs light expand="md">
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggleTab('1'); }}
                            >
                                <Label>Designer</Label>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '7' })}
                                onClick={() => { this.toggleTab('7'); }}
                            >
                                
                                <Label>Interface</Label>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '10' })}
                                onClick={() => { this.toggleTab('10'); }}
                            >
                                
                                <Label>Barre d'outils</Label>
                            </NavLink>
                        </NavItem>
                            <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggleTab('2'); }}
                            >
                                
                                <Label>Noeud</Label>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggleTab('3'); }}
                            >
                                
                                <Label>Tache</Label>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => { this.toggleTab('4'); }}
                            >
                                
                                <Label>Notifications</Label>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '5' })}
                                onClick={() => { this.toggleTab('5'); }}
                            >
                                
                                <Label>Actions</Label>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                                className={classnames({ active: this.state.activeTab === '8' })}
                                onClick={() => { this.toggleTab('8'); }}
                            >
                                
                                <Label>Mail Personnalisé
                                </Label>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            
                                className={classnames({ active: this.state.activeTab === '9' })}
                                onClick={() => { this.toggleTab('9'); }}
                            >
                                
                                <Label>Etat</Label>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '6' })}
                                onClick={() => { this.toggleTab('6'); }}
                            >
                                
                                <Label>Tutoriel</Label>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '11' })}
                                onClick={() => { this.toggleTab('11'); }}
                            >
                                
                                <Label>Workflow Métier</Label>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                        <Row>
                            <Col sm="15">
                                <h1 className="grand-titre" >Designer workflow</h1>
                                <hr class="home-page-hr" />
                                <p  >
                                <br /><br />
                                    Ce Designer Workflow utilise la technologie Kaleo sur la plate-forme Liferay pour définir un suivi de tâches pour les formulaires.<br />
                                    Designer conçu par l'entreprise AgiirNetwork.
                                </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="7">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Interface</h1 >
                            <hr class="home-page-hr" />
                            <p className="agiir-texte-tuto" >
                                L'interface du designer est séparée en trois zones :<br />
                                <ul>
                                    <li >Barre d'outils : fournit les différents outils et vous permet d'accéder
                                    à différents menus tels que les sauvegardes, notifications ,les workflows déjà crées et les actions.</li>
                                    <li>Palette : Cette palette vous permettra de créer les différents éléments qui vont vous permettre de construire votre Workflow.</li>
                                    <li>Zone de design : C'est la zone qui vous permettra de visualiser votre workflow et les différents éléments que vous avez déjà insérés.</li>
                                </ul>
                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="10">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Barre d'outils</h1 >
                            <hr class="home-page-hr" />
                            <p className="agiir-texte-tuto" >
                                Dans la barre d'outils se trouve plusieurs éléments utile à la construction d'un Workflow.<br />
                                <em> De gauche à droite</em><br /><br />
                                <ul>
                                    <li>Recommencer : Efface tous les noeuds et éléments créés pour obtenir un designer vide.</li>
                                    <li>Ajuster : Ré-ajuste la vue du Designer afin de pouvoir apercevoir tous les noeuds créés sur un seul plan</li>
                                    <li>Zoom moins/plus : Permet de faire varier la vue en se rapprochant ou s'éloignant des noeuds.</li>
                                    <li>Liste de Sauvegarde : Liste de Workflows dans le designer créés par l'utilisateur (possible de les importer afin de les continuer)<br />
                                    C'est ici que l'accès sera possible pour les worfklows sauvés avec le bouton <em>Sauvegarder brouillon</em></li>
                                    <li>Liste de Workflow : Liste de Workflows compilés sous forme XML prêt à être utiliser par la plate-forme.<br />
                                    C'est ici que l'accès sera possible pour les worfklow sauvé avec le bouton <em>Pré-publier</em></li>
                                    <li>Notifications : Liste de notifcations du noeud sélectionné</li>
                                    <li>Actions : Liste des actions du noeud sélectionné</li>
                                    <li>Code Groovy : Liste des scripts pré-défini par <strong>Agiir</strong>.</li>
                                    <li>Aide : Conseils,explications que vous êtes actuellement en train de lire en fait...</li>
                                </ul>
                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Noeud</h1 >
                            <hr class="home-page-hr" />
                            <p className="agiir-texte-tuto" >
                                Un noeud d'un worfklow est un élément qui peut être comparé à une étape d'un programme. Dans ce workflow il existe divers types de noeuds. 
                                Chaque noeud a un comportement différent et se configure différemment. <br />
                                La liste de ces noeuds est visible dans le menu de gauche (la palette). il suffit de <em>cliquer</em> pour faire apparaitre 
                                la fenètre de configuration et de suivre les étapes. Les types principaux de noeuds sont les tâches et les états.
                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Tache</h1 >
                            <hr class="home-page-hr" />
                            <p className="agiir-texte-tuto" > Une Tache est un type de noeud, c'est l'un des noeuds les plus complexes du workflow mais aussi la plus utile et puissante
                                Il existe plusieurs type de taches en fonction de la manière dont l'acteur sera sélectionné. L'acteur est une personne à qui sera confié la tache.
                            <ul>
                                <li>Assigner au créateur : Assignation automatique de la tache à l'utilisateur qui aura soumis le formulaire</li>
                                <li>Assigner à plusieurs rôles : Créer liste des rôles en indiquant pour chacun son type et sa fonction</li>
                                <li>Assigner à un rôle précis : si l'id du rôle( numéro unique du rôle) est connu, indiquez-le pour éffectuer son assignation.</li>
                                <li>Ecrire le script pour définir les assignements : Utiliser un script pour définir la liste de rôles( ou d'utilisateur) qui pourront s'attribuer la tache.</li>
                                <li>Assigner à un utilisateur spécifique : il est possible à partir de l'adresse e-mail,un id ou le nom de l'utilisateur de lui attribuer la tâche</li>
                            </ul>
                            Le noeud Validation n'est autre que un noeud tache qui s'implémente directement avec deux autres noeuds de type état pour un gain de temps.
                            Il est possible de modifier une tache en effectuant un clic droit sur la tâche dans la zone de design et sélectionner <em>Modifier</em>
                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="4">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Notification</h1 >
                            <hr class="home-page-hr" />
                            <p className="agiir-texte-tuto" >La notification utilise le même principe que sur n'importe quelle autre plate-forme,à l'arrivée d'un évenement elle informe l'utilisateur. 
                            <br />Elle se configure de la manière suivante : <br />
                            <ul> 
                                <li>Etape 1 : Indiquer le nom de la notification </li>
                                <li>Etape 2 : Indiquer la description de la notification </li>
                                <li>Etape 3 : Indiquer le langage du template de la notification </li>
                                <li>Etape 4 : Indiquer le  template de la notification </li>
                                <li>Etape 5 : Choisir le type de notification :
                                    <ul>
                                    <li> email : Un email sera envoyé au(x) acteur(s) assignés </li>
                                    <li> user-notification : Un petit icone apparaitra près de l'avatar de l'utilisateur </li>
                                    <li> instant message : Un message instantané sera envoyé à l'utilisateur </li>
                                    <li> private-message : Un message privé sera envoyé à l'utilisateur </li>
                                    </ul>
                            
                                </li>
                                <li>Etape 6 : Indiquer le type d'activation de la notification : 
                                <ul>
                                    <li>En entrée : Activation de la notification dès l'arrivée dans le noeud</li>
                                    <li>En sortie : Activation de la notification dès la sortie du noeud</li>
                                    <li>A l'assignation :Si c'est une tâche, activation de la notification dès le choix de l'acteur fait</li>
                                </ul>

                                </li>
                            </ul>

                            Il est possible d'accéder à la liste de notifcations de deux manières : 
                            <ul>
                                <li> En effectuant un clic droit sur le noeud et choisir <em>Notifications</em></li>
                                <li> En sélectionnant dans la barre d'outils le bouton <em>Notifications</em></li>
                            </ul>
                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="5">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Actions</h1 >
                            <hr class="home-page-hr" />
                            <p className="agiir-texte-tuto" >
                                Une action dans un noeud est très vaste comme concept car en somme tout est possible avec le script adéquat.
                                Parmi la liste de d'actions prédéfini fourni par Agiir, il sera notamment possible de changer les états du formulaires (validéation,refus,archive,en attente),
                                mais aussi envoyé un mail automatique ou personnalisé.
                                Suivant la même structure que la notification, elle se configurera ainsi:
                                <ul> 
                                <li>Etape 1 : Indiquer le nom de l'action </li>
                                <li>Etape 2 : Indiquer la description de l'action </li>
                                <li>Etape 3 : Indiquer le langage du script de l'action </li>
                                <li>Etape 4 : Choisir le script de l'action </li>
                                <li>Etape 5 : Indiquer le type d'activation de l'action : 
                                <ul>
                                    <li>En entrée : Activation de l'action dès l'arrivée dans le noeud</li>
                                    <li>En sortie : Activation de l'action dès la sortie du noeud</li>
                                    <li>A l'assignation :Si c'est une tâche, activation de l'action dès le choix de l'acteur fait</li>
                                </ul>

                                </li>
                            </ul>
                            Il est possible d'accéder à la liste d'actions de deux manières : 
                            <ul>
                                <li> En effectuant un clic droit sur le noeud et choisir <em>Actions</em></li>
                                <li> En Sélectionnant dans la barre d'outils le bouton <em>Actions</em></li>
                            </ul>
                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="8">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Mail Personnalisé</h1 >
                            <hr class="home-page-hr" />
                            <p className="agiir-texte-tuto" >
                                Un mail personnalisé est un type d'action, il permet l'envoi d'un mail où vous pourrez choisir tous les élements. Voici les étapes de la configurations :<br/>
                                <ul> 
                                    <li>Etape 1 : Indiquer le nom de l'action </li>
                                    <li>Etape 2 : Indiquer la description de l'action </li>
                                    <li>Etape 3 : Indiquer l'addresse de l'envoi </li>
                                    <li>Etape 4 : Indiquer le destinataire de l'envoi </li>
                                    <li>Etape 5 : Indiquer le sujet du mail </li>
                                    <li>Etape 5 : Indiquer le contenu du mail </li>
                                    <li>Etape 5 bis : Il est possible de sélectionner un formulaire afin d'avoira ccès à ses différents pour intégrer des informations de celu-ci dans votre mail </li>
                                    <li>Etape 6 : Indiquer le type d'activation de la notification : 
                                    <ul>
                                        <li>En entrée : Activation de la notification dès l'arrivée dans le noeud</li>
                                        <li>En sortie : Activation de la notification dès la sortie du noeud</li>
                                        <li>A l'assignation :Si c'est une tâche, activation de la notification dès le choix de l'acteur fait</li>
                                </ul>

                                </li>
                            </ul>
                            La liste des mails se trouve dans la liste d'action car un mail personnalisé est une action
                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="9">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Etat</h1 >
                            <hr class="home-page-hr" />
                            <p className="agiir-texte-tuto" >
                                Un Etat est un type de noeud qui ne nécéssite pas d'interactions humaines comme la tâche, c'est un noeud par lequel le workflow transite,
                                exécute les actions et notifications à l'intérieur puis continue son parcours.< br/>
                                Il est possible d'y mettre des actions et des notifications, lors de la configuration de ceux-ci il ne sert à rien de mettre un type d'activation
                                  <em > A l'assignation</em> sachant que ce n'est pas une tâche.< br/>
                                Dans la palette se trouve les noeuds <em>Accepter</em> et <em>Refuser</em>, ce sont des noeuds de type états pré-définis, 
                                utilisés lors de l'implementation du groupe de noeud <em>Validation</em>.
                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="6">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Tutoriel</h1>
                            <hr class="home-page-hr" />
                            <p className="agiir-texte-tuto" >
                                Ici nous allons configurer pas à pas un Workflow basique pour s'accomoder au designer et comprendre sa simplicité :<br /><br />
                                
                                <strong>Etape 1 - Créer une tâche de validation : </strong> <br /><br />
                                Dans la Palette cliquer sur <em>Validation</em>  <br />
                                Nommer la tâche et choisir le type de sélection d'acteur, ici nous allons prendre <em>Assigner à plusieurs rôles</em> :<br />
                                Pour créer la liste de rôles, nous allons utiliser la liste suivante : <br />
                                Entre chaque ajout, vous devez <strong>évidemment</strong> cliquer sur le bouton <em>Ajouter</em> pour valider votre choix <br /><br />
                                Ceci est une liste non exhaustive de la liste de rôles.
                                <ul>
                                    <li>Type de rôle  - Nom du rôle</li>
                                    <li>Organisation  - Organization Administrator</li>
                                    <li>Organisation  - Organization Content Reviewer</li>
                                    <li>Organisation  - Organization Owner</li>
                                    <li>Regulier  - Administrator</li>
                                    <li>Regulier  - Portal Content Reviewer</li>
                                    <li>Site  - Site Administrator</li>
                                    <li>Site  - Site Content Reviewer</li>
                                    <li>Site  - Site Owner</li>
                                </ul>
                                Au fur et à mesure de vos ajouts, vous allez vous apercevoir que votre liste grandit juste en dessous, 
                                 si vous avez fait une erreur vous pouvez toujours sélectionner la ligne et cliquer sur le bouton en 
                                 forme de poubelle pour supprimer votre sélection.<br />
                                 <br/>
                                Votre assignation est donc configurée (Bravo!).<br/><br />

                                <strong>Etape 2 - Créer un rappel :</strong><br/><br />
                                 Avant de cliquer sur <em>Créer</em>, nous allons rajouter un <em>Rappel</em>,
                                en haut à droite de la fenêtre, vous allez cliquer sur <em>Rappel</em>.<br/>Une fenêtre va apparaître.
                                Dans la liste de Timers (normalement vide), cliquer sur <em>Ajouter</em>.<br />
                                Configuration d'un timer : <br />
                                <ul>
                                    <li>1 - Titre du Timer : Rappel d'assignation</li>
                                    <li>2 - Description du timer : Timer qui va envoyer un mail et une notification toutes les heures si aucun utilisateur ne prend en charge 
                                        cette tâche.</li>
                                    <li>3 - Choisir la durée du timer : 30  et Secondes</li>
                                    <li>Laisser la case <em>Bloquage</em> décochée pour cette fois</li>
                                    Nous allons mettre une récurrence(fait de répéter le l'action du timer) 
                                    <li>3 - Choisir la durée période de récurrence ( 1 et Heures )</li>
                                </ul>
                                    Les temps étant définis, il faut configurer l'action à éxécuter.  Nous allons définir une action et une notification.<br />
                                    Sur les trois boutons dans la fenêtre, cliquer sur <em>Ajouter</em> puis <em>Notification</em>.<br />
                                    Le procédé reste le même, il faut remplir les champs :<br />
                                <ul>
                                    <li>Langage de template de la notifation  : freemarker</li>
                                    <li>Template : Vous avez reçu une tache,  n'oubliez pas ! </li>
                                    <li>Type de notifcation : user-notification & email </li>
                                </ul>
                                Votre notification est configurée, cliquer sur <em>Créer</em>.<br />
                                Votre notification apparait dans une liste juste en dessous, passons au mail personnalisé pour envoyer un mail à une personne précisément<br />
                            
                                Cliquer sur <em>Ajouter</em> puis sur <em>Mail Personnalisé</em> 
                                Vous commencer à connaître la chanson j'en suis sur : 
                                <ul>
                                    <li>1 - Titre de l'action : Mail de Rappel d'assignation</li>
                                    <li>2 - Description de l'action : Mail de rappel car ils oublient tous</li>
                                    <li>3 - Adresse d'envoi : Ne pas toucher à l'adresse d'envoi</li>
                                    <li>4 - Adresse destinataire : Mettre votre adresse mail.</li>
                                    <li>5 - Objet du mail : Tâche incompléte</li>
                                    Vous n'êtes pas obligés d'utiliser les champs de formulaires
                                    <li>6 - Contenu du mail : Mettre ce que vous voulez (un vrai texte quand même, nous n'aimons <strong>pas</strong> les mails vides ici !)</li>
                                </ul>
                                Le mail personnalisé est configuré, cliquer sur <em>Créer</em>.<br />
                                Et bien voici un beau timer fraichement construit par vos mains d'expert(e)s, il est de temps de valider en cliquant sur la touche <em>Creer</em><br />
                                Le timer apparait donc dans la liste, cliquer sur la petite croix rose à droite de <em>Ajouter</em>.<br />

                                La tâche ainsi que son rappel étant construit, cliquer sur <em>Créer</em>.

                                Comme vous l'avez vu, trois noeuds ce sont ajoutés aux <em>Début</em> et <em>Fin</em> déjà présent dans la zone de design.<br /><br />

                                <em>Cliquer quelque part sur la zone de design pour faire apparaitre les liens entre les noeuds(c'est magique !)</em>
                                <br /><br />
                                <strong>Etape 3 - Notifications d'assignation </strong> <br /><br />
                                La base des noeuds est faîtes, il faut les rendre vivants maintenant. <br />
                                Sur le composant <em>Validation</em> créé il y a trois éléments : une tâche et deux états (<em>Accepter & Refuser</em>), 
                                 faire un clic droit sur la tâche (probablement le noeud de couleur jaune)  et cliquer sur <em>Notifications</em> 
                                   pour avoir accès à liste de notifications (supposé vide).<br />
                                La liste de notifications de ce noeud est accessible aussi en cliquant sur le noeud puis dans <em>Liste de notifications</em> dans la barre d'outils.
                                (De même pour la liste d'actions d'un noeud)<br />

                                Dans le menu de boutons en au haut à droite, cliquer sur <em>Ajouter</em>.<br /><br />

                                Configuration de la notification : <br /><br />
                                <ul>
                                    <li>Titre de la notifcation : Assignation effectuée</li>
                                    <li>Langage du template de la notifcation :freemarker</li>
                                    <li>Template de la notifcation :Vous avez reçu une tâche pour une revue.</li>
                                    <li>Type de la notifcation :email  , user-notification , instant-message</li>
                                    <li>Type d'activation notifcation : à l'assignation</li>
                                </ul>

                                Cliquer sur <em>Créer</em>.<br /><br />

                            <strong>Etape 4 -  Action de lancement</strong><br /><br />
                            Toujours sur le même noeud, clic droit puis cliquer sur <em>Actions</em><br />

                            Ciquer sur <em>Ajouter</em>

                            Toujours la même routine, vous savez quoi faire : <br/><br />
                            <ul>
                                    <li>Titre de l'action : Lancement du Workflow</li>
                                    <li>Description de l'action : Avertissement des personnes concernés pour la tâche</li>
                                    <li>Langage du script : groovy</li>
                                    <li>Script : Lancement WF</li>
                                    <li>Type d'activation : en entrée </li>
                            </ul>

                            Configuration, c'est fait  ! Maintenant on clique :<em>Créer</em><br /><br />

                            <strong>Etape 5 - Validation</strong> <br /><br />
                            Maintenant notre workflow doit savoir comment réagir si l'utilisateur valide ou refuse le formulaire qui sera lié au Workflow. Pour éviter des 
                            interférences, nous allons placer l'action de validation sur le noeud <em>Fin</em>, le code du script saura se charger de vérifier 
                            si le workflow est passé par le noeud <em>Refuser</em>.<br/>

                            Pour ce faire, clic droit sur le noeud <em>Fin</em> pour accéder au menu et cliquer sur <em>Actions</em>. 
                             Le principe reste le même, je vous laisse le remplir.... Pas de panique c'était une blague :) , voici la procédure : <br/>
                            <ul>
                                    <li>Titre de l'action : Refus du formulaire</li>
                                    <li>Description de l'action : Avertissement pour le refus du formulaire</li>
                                    <li>Langage du script : groovy</li>
                                    <li>Script : Approbation</li>
                                    <li>Type d'activation : en entrée </li>
                            </ul>

                            Configuration, c'est dans la boîte ! Maintenant on clique :<em>Créer</em><br />

                            <strong>Etape 6 - Refus</strong> <br /><br />
                            Accepter c'est bien , mais il faut savoir quoi faire si l'utilisateur refuse, heureusement Agiir fournit des scripts pour cette situation aussi.
                            Le procédé devrait vous rappeler quelque chose : <br />
                            Clic droit sur le noeud <em>Refuser</em>, dans le menu cliquer sur <em>Actions</em><br />

                            Aller c'est la dernière configuration :<br /><br />
                            <ul>
                                <li>Titre de l'action : Approbation du formulaire</li>
                                <li>Description de l'action : C'est un non pour nous ici !</li>
                                <li>Langage du script : groovy</li>
                                <li>Script : Refus - Mail + Commentaire</li>
                                <li>Type d'activation : en entrée </li>
                            </ul>

                            Configuration, emballé c'est pesé ! Maintenant on clique :<em>Créer</em><br />

                            <strong>Etape 7 - Des Liens à tisser </strong> <br /><br />
                            Vous l'avez peut-être remarqué, mais La tâche ainsi que les noeuds <em>Accepter</em> et <em>Refuser</em> sont liés entre eux, il faudrait faire de même 
                            pour <em>Début</em> et <em>Fin</em>. Les Noeuds se relis entres eux grâce aux ports présent juste devant les flèches sous les noms de chaque noeud.

                            Si la flèche se dirige vers la <em>droite</em> c'est un port de <em>sortie</em> 
                             et s'il se dirige vers la <em>gauche</em> c'est un port d'entrée <em>d'éntrée</em>

                            C'est pour cela que le noeud <em>Début</em> n'a qu'un port de <em>sortie</em>  et un port <em>d'éntrée</em> pour <em>Fin</em>.
                            Pour créer un lien, il faut partir d'un noeud de sortie et aller à un port d'entrée.

                            Décomposons ensemble le mouvement pour une meilleure compréhension.
                            <ul>
                                <li>Placer curseur sur la case juste devant la flèche de sortie du noeud <em>Début</em> </li>
                                <li>La case est censée devenir rouge</li>
                                <li>Cliquer et tirer (ne pas relacher le clic)</li>
                                <li>Diriger le lien jusqu'au port d'entrée du noeud la tache( pour rappel c'est le noeud jaune)</li>
                                <li>Relacher le clic</li>
                                
                                <li>Félications, le noeud <em>Début</em> est mainenant connecté aux autres</li>
                                <li>Répéter l'action pour <em>Accepter</em> vers <em>Fin</em> </li>
                                <li>Répéter l'action pour <em>Refuser</em> vers <em>Fin</em> </li>
                            </ul>

                            Félicitations, grâce à Agiir vous venez de créer votre premier workflow fonctionnel !

                            Il serait dommage de perdre ce travail donc vous allez me faire le plaisir de cliquer sur le bouton en bas à droite <em>Sauvegarde brouillon</em>.<br/>

                            Il faudra ensuite donner le nom et la description de votre choix à votre travail, cliquer ensuite sur <em>Valider</em>.
                             Vous aller apercevoir votre workflow sous une autre forme, pas de panique ce n'est pas du chinois, cliquer juste sur le bouton en bas à 
                            droite <em>Sauver</em>.<br/>

                            Et voilà votre workflow est sauver dans la liste de sauvegarde et vous pourrez donc le reprendre à n'importe quel moment. <br/><br/>Bravo champion(ne) !<br/>

                            Pour terminer il faut <strong>compiler</strong> ce workflow donc cette fois c'est le bouton en bas à droite <em> Pré-publier</em>.
                            Un nom et une description est nécéssaire ici aussi avant de cliquer sur <em>Valider</em>.
                            On reste calme ce n'est toujours pas du chinois mais encore une autre forme du workflow (un vrai caméléon ce workflow je sais) 
                            qui cette fois est compréhensible par Liferay. Cliquer sur <em>Sauver</em> pour stocker votre Workflow dans la liste de Workflow, 
                            celui n'est pas modifiable par contre sachez-le, c'est pourquoi avant de le sauver sous cette forme il vaut mieux le sauver sous l'autre.
                            Vous pourrez juste le télécharger pour l'envoyer dans kaleo, mais ceci c'est une autre histoire.<br/>
                            <br/>
                            Ainsi se termine le tutoriel <strong>Mon premier Workflow !</strong> Félicitations à vous !


                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                        <TabPane tabId="11">
                        <Row>
                            <Col sm="12">
                            <h1 className="grand-titre" >Workflow Métier</h1 >
                            <hr class="home-page-hr" />
                            <p align="justify">
                                Ici nous allons créer un Workflow parmi ceux qui nous ont été demandé :  <em>le changement d'adresse</em> <br />
                                Les codes sont disponibles dans la <em>liste de script</em>.

                                <br />Les Noeuds <em>Debut</em> et <em>Fin</em> étant déjà disponibles, il suffit de générer le groupe de noeud validation composé 
                                de trois noeuds (une tâche et deux états : Accepter & Refuser).<br />
                                Cliquer sur le bouton <strong>Validation</strong> il va falloir choisir le type de tâche plus précisément la manière dont sera 
                                choisi le validateur. Ici nous choisirons <em>Ecrire le script pour définir les assignements</em>.<br />

                                Le Script à sélectionner se nomme <em>Assignation RH</em>, une fois sélectionné vous pouvez cliquer sur valider.
                                Maintenant, il faut rajouter les notifications et actions nécéssaires
                                Concernant les notifications , il va y en avoir qu'une seule dans le noeud Validation. Pour créer une notification,
                                 il y a deux possibilités, clic-droit sur le noeud  et cliquer sur notifications ou dans la barre chercher le bouton pour les 
                                 notifications.<br />

                                 Une fois le menu des notifications ouvert, cliquer sur <em>Ajouter</em> et remplir les champs , pour vous aider vous pouver consulter l'onglet
                                  <em>Notification</em> <br />

                                <ul>
                                    <li>Nom : Notification demandeur</li>
                                    <li>Template : Vous avez reçu une démarche changement d'adresse</li>
                                    <li>Langage de template : free-maker</li>
                                    <li>Type de notification : user-notification</li>
                                    <li>Type d'éxécution : Assignement</li>
                                </ul>

                                Une fois ces champs remplis, il est possible de validé la création de cette notification.
                                <br/>
                                Ensuite il faut passer aux actions comme l'envoie du mail au collaborateur<br/>
                                Nous procédons de la meme manière pour se rendre dans le menu <em>Actions</em>, une fois dans celui-ci
                                cliquer sur <em>Ajouter</em> et procéder au remplissage :  <br />

                                
                                <ul>
                                    <li>Nom : Mail collaborateur</li>
                                    <li>Description : Envoi de mail au collaborateur</li>
                                    <li>Langage du script : groovy</li>
                                    <li>Script : Mail demande CDA</li>
                                    <li>Type d'activation: A l'entrée</li>
                                </ul>

                                Une fois ces champ remplis vous pouvez valider et recliquer <em>Ajouter</em> car il reste encore plusieurs <em>Actions</em>
                                <br />
                                <ul>
                                    <li>Nom :  pending</li>
                                    <li>Description : Mise en attente du Workflow</li>
                                    <li>Langage du script : groovy</li>
                                    <li>Script : pending</li>
                                    <li>Type d'activation: A l'entrée</li>
                                </ul>
                                <br />
                                Maintenant il faut ajouter l'envoi du mail au validateur<br />
                                <ul>
                                    <li>Nom :  Mail RH CDA</li>
                                    <li>Description : Envoi d'un mail au RH</li>
                                    <li>Langage du script : groovy</li>
                                    <li>Script : CDA RH</li>
                                    <li>Type d'activation: A l'assignement</li>
                                </ul>

                                Toutes ces actions ayant été ajouté dans la tâche, il manque deux actions dans chaque état pour terminer le workflow à savoir 
                                le changement d'état du formulaire ainsi que l'envoi du mail au demandeur/collaborateur.<br />

                                Pour le noeud accepter, reprendre le <em>protocole</em> et ajouter une autre action : <br />
                                <ul>
                                    <li>Nom :  Approbation</li>
                                    <li>Description : Validation</li>
                                    <li>Langage du script : groovy</li>
                                    <li>Script : Approbation</li>
                                    <li>Type d'activation: A l'entrée</li>
                                </ul>

                                Maintenant le mail : <br />

                                <ul>
                                    <li>Nom :  Mail Réponse positive</li>
                                    <li>Description : Envoi du mail de validation</li>
                                    <li>Langage du script : groovy</li>
                                    <li>Script : Réponse positive</li>
                                    <li>Type d'activation: A l'entrée</li>
                                </ul>

                                Il suffit de faire la même chose pour le Noeud Refuser
                                <ul>
                                    <li>Nom :  Denied</li>
                                    <li>Description : Refus</li>
                                    <li>Langage du script : groovy</li>
                                    <li>Script : Denied</li>
                                    <li>Type d'activation: A l'entrée</li>
                                </ul>
                                Plus que le mail <br />
                                <ul>
                                    <li>Nom :  Mail Négatif</li>
                                    <li>Description : Envoi du mail de refus</li>
                                    <li>Langage du script : groovy</li>
                                    <li>Script : Réponse Négative</li>
                                    <li>Type d'activation: A l'entrée</li>
                                </ul>

                        Ces actions étant créée, il est possible de valider en cliquant sur <em>Pré-Publier</em>, il faut juste donner le nom et la description du 
                        Workflow final (il est possible de juste le nommer Changement d'adresse puisque c'est ce que nous avons crée)

                            </p>
                            </Col>
                        </Row>
                        </TabPane>
                    </TabContent>
                    </div>
                
    );
}
}
export default HelpPage;
