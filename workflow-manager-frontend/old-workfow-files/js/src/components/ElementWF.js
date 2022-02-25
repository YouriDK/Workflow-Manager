 class action {
    constructor(name,description, script,Script_langage,Ex_Type,Act_id,script_name,scriptID, ){
        this.name = name;
        this.ID = Math.random().toString(36).substr(2, 16);
        this.description =description;
        this.script = script;
        this.script_name = script_name
        this.Script_langage = Script_langage;
        this.Ex_Type = Ex_Type;
        this.Act_id = Act_id
        this.scriptID =scriptID
        this.typeAct=null
    }
}


 class actionTimer {
    constructor(name,description, script,Script_langage,Act_id,scriptID,type){
        this.name = name;
        this.ID = Math.random().toString(36).substr(2, 16);
        this.description =description;
        this.script = script;
        this.Script_langage = Script_langage;
        this.Act_id = Act_id
        this.scriptID =scriptID
        this.typeAct=null
        this.type = type
    }
}

 class Condition {
    constructor(name,script_langage,script){
        this.name = name;
        this.descrition=""
        this.script_langage = script_langage;
        this.script ='![CDATA['+""+"]]";
    }
}



 class mail {
    constructor(from,destinataire,object,body){
        this.from = from;
        this.destinataire = destinataire;
        this.object =object;
        this.body =  body
        this.type = ""
    }
}



 class notificationTimer {
    constructor(name,template,template_langage,Notification_Type,Ex_Type,notId,type){
        this.ID = Math.random().toString(36).substr(2, 16);
        this.name = name;
        this.template = template;
        this.template_langage = template_langage;
        this.Notification_Type = Notification_Type;
        this.Ex_Type = Ex_Type;
        this.notId= notId;
        this.type = type
    }
}



 class Role {
    constructor(role,name,Roleid){
            this.role = role;
            this.name = name;
            this.autocreate = false;
            this.Roleid =Roleid
        };
}


 class Task {
    constructor(name){
        this.ID = Math.random().toString(36).substr(2, 16);
        this.name = name;
        this.Type = ''
        this.RoleID = ''
        this.roles = []
        this.Choix =''
        this.Script =''
        this.Scriptname =''
        this.ScreenName=''
        this.ScriptLangage = '';
        this.Notification_Type = "";
        this.Ex_Type = "";
        this.mailUser=''
        this.RessourcesActions = []
        this.Dunno =''
        this.TaskTimer = []
        this.taskPattern = null
    }
}


 class TaskTimer {
    constructor(name,dduration, dscale,rduration,rscale,block){
        this.ID = Math.random().toString(36).substr(2, 16);
        this.name = name;   
        this.dduration = dduration;
        this.dscale = dscale;
        this.rduration = rduration
        this.rscale = rscale;
        this.block = block
        this.timerAction = [];
        this.type = ""
    }
}

 class timerAction {
    constructor(name,description, script,Script_langage,type){
        this.ID = Math.random().toString(36).substr(2, 16);
        this.name = name;   
        this.description =description;
        this.script = script;
        this.Script_langage = Script_langage;
        this.type = type
        
    }
}


 class timerNotification {
    constructor(name,template,template_langage,Notification_Type,notId){
        this.ID = Math.random().toString(36).substr(2, 16);  
        this.name = name;
        this.template = template;
        this.template_langage = template_langage;
        this.Notification_Type = Notification_Type;
        this.notId= notId;
    }
}


 class Transition {
    constructor(name,target,id,idNode){
        this.name = name;
        this.target = target
        this.defaut = true;
        this.IDLink = id
        this.IDNode =idNode
    }
}


 class User {
    constructor(name,template){
        this.name = name;
        this.Choix = template;
        this.userid =''
        this.template_langage = "";
        this.Notification_Type = "";
        this.Ex_Type = "";
    }
}

class notification {
    constructor(name,template,template_langage,Notification_Type,Ex_Type,notId,adress,script,ScriptName){
        this.ID = Math.random().toString(36).substr(2, 16);
        this.name = name;
        this.template = template;
        this.template_langage = template_langage;
        this.Notification_Type = Notification_Type;
        this.Ex_Type = Ex_Type;
        this.notId= notId; 
        this.destinataire = adress
        this.script = script
        this.ScriptName = ScriptName
    }
}

export {
    action , 
    Transition ,
     actionTimer , 
     timerNotification , 
     User , 
     timerAction , 
     TaskTimer , 
     Task , 
     notificationTimer , 
     Role , 
     mail , 
     Condition , 
     notification
}

