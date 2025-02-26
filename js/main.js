let CoteCellule = 5;
const NombreInfectes = 0;
const NombreSurvivants = 0;
const NombreDocs = 0;
let DoctorSoinRay = 10;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


canvas.height = window.innerHeight/1.3;
canvas.width = window.innerWidth/2;
let Largeur = canvas.width;
let Hauteur = Math.round(canvas.height);

let resizeMatrix = document.getElementById('taillecel_select');
resizeMatrix.addEventListener('change', function(){CoteCellule=this.value});

let launch_time = 0;

let InfecteCanDeath;
let gamerule1 = document.getElementById('InfectPeuvMour');
gamerule1.addEventListener('change', function(){InfecteCanDeath=this.checked});

let InfecteCanRun;
let gamerule2 = document.getElementById('InfectPeuvCourir');
gamerule2.addEventListener('change', function(){InfecteCanRun=this.checked});

let InfecteCanHealth;
let gamerule3 = document.getElementById('InfectPeuvSoignerTTSeul');
gamerule3.addEventListener('change', function(){InfecteCanHealth=this.checked});

let SurvivorImunity;
let gamerule4 = document.getElementById('SurvivorImunity');
gamerule4.addEventListener('change', function(){SurvivorImunity=this.checked});

let SurvivorToDoctor;
let gamerule5 = document.getElementById('SurvivorToDoctor');
gamerule5.addEventListener('change', function(){SurvivorToDoctor=this.checked});

let SurvivorToInfect;
let gamerule6 = document.getElementById('SurvivorToInfect');
gamerule6.addEventListener('change', function(){SurvivorToInfect=this.checked});

let SurvivorChild;
let gamerule7 = document.getElementById('SurvivorChild');
gamerule7.addEventListener('change', function(){SurvivorChild=this.checked});


let entites = [];

function CountAll() {
  let InfectCount = 0;
  let SurvivCount = 0;
  let DocsCount = 0;
  let ImuniCount = 0;
  let MortCount = 0;
  for (let i = 0; i < entites.length; i++) {
    if (entites[i][2]=="infecté") {InfectCount++;} 
    else if (entites[i][2]=="docteur") {DocsCount++;} 
    else if (entites[i][2]=="survivant") {SurvivCount++;} 
    else if (entites[i][2]=="imunisé") {ImuniCount++;}
    else if (entites[i][2]=="mort") {MortCount++;}
  }

  document.getElementById('counter').innerHTML = "Nombre Survivants : "+SurvivCount.toString()+" | Nombre Infectés : "+InfectCount.toString()+" | Nombre Docteurs : "+DocsCount.toString()+" | Nombre Immusinés : "+ImuniCount.toString()+" | Nombre Morts : "+MortCount.toString()
}

function AddInfectes() {
  let k = document.getElementById('addinfected').value;
  for (let i=0; i<k; i++) {
    let x = Math.round(Math.random()*(Hauteur/CoteCellule));
    let y = Math.round(Math.random()*(Largeur/CoteCellule));
    entites.push([x,y,"infecté"]);
  }
}

function AddDocs() {
  let k = document.getElementById('adddoctors').value;
  for (let i=0; i<k; i++) {
    let x = Math.round(Math.random()*(Hauteur/CoteCellule));
    let y = Math.round(Math.random()*(Largeur/CoteCellule));
    entites.push([x,y,"docteur"]);
  }
}

function AddSurvivants() {
  let k = document.getElementById('addsurvivor').value;
  for (let i=0; i<k; i++) {
    let x = Math.round(Math.random()*(Hauteur/CoteCellule));
    let y = Math.round(Math.random()*(Largeur/CoteCellule));
    entites.push([x,y,"survivant"]);
  }
}

function AddImunise() {
  let k = document.getElementById('addimunise').value;
  for (let i=0; i<k; i++) {
    let x = Math.round(Math.random()*(Hauteur/CoteCellule));
    let y = Math.round(Math.random()*(Largeur/CoteCellule));
    entites.push([x,y,"imunisé"]);
  }
}

function MoveAll() {
  // 0 nord, 1 est, 2 sud, 3 ouest
  for (let i = 0; i < entites.length; i++) {
    if (entites[i][2]=="mort") {
      
    } else {
      min = Math.ceil(0);
      max = Math.floor(3);
      let direction = Math.floor(Math.random() * (max - min + 1)) + min;
      let Loin = Math.floor(Math.random() * (2 - 0 + 1)) + 0;;
      if (InfecteCanRun) {
        if (entites[i][2]=="infecté") {
          Loin = 4;
        }
      }
      
      if (direction==1) {
        entites[i][1] += Loin;
      } else if (direction==3) {
        entites[i][1] -= Loin;
      } else if (direction==0) {
        entites[i][0] -= Loin;
      } else if (direction==2) {
        entites[i][0] += Loin;
      }
  
      if (entites[i][0] > Hauteur/CoteCellule) {
        entites[i][0] = Math.round((Hauteur/CoteCellule)-2);
      } else if (entites[i][0] < 0) {
        entites[i][0] = 0;
      }
      if (entites[i][1] > (Largeur)/CoteCellule) {
        entites[i][1] = Math.round(Largeur/CoteCellule);
      } else if (entites[i][1] < 0) {
        entites[i][1] = 0;
      }
    }
  }
}

function Infection(x,y) {
  for (let i = 0; i < entites.length; i++) {
    let distance = Math.sqrt(((entites[i][1]-x)**2)+((entites[i][0]-y)**2));
    if (distance < 5) {
      if (!(entites[i][2]=="mort")) {
        if (!(entites[i][2]=="imunisé")) {
          entites[i][2] = "infecté";
        }
      } 
    }
  }
}


function FaireDesEnfants(x,y) {
  for (let i = 0; i < entites.length; i++) {
    let distance = Math.sqrt(((entites[i][1]-x)**2)+((entites[i][0]-y)**2));
    if (distance < 1) {
      if (entites[i][2]=="survivant") {
        let newbaby = Math.floor(Math.random() * (10000 - 0 + 1)) + 0;
        if (newbaby==69) {entites.push([x,y,"survivant"]);}
      } 
    }
  }
}

function Soin(x,y) {
  for (let i = 0; i < entites.length; i++) {

    let distance = Math.sqrt(((entites[i][1]-x)**2)+((entites[i][0]-y)**2));
    if (distance < DoctorSoinRay) {
      if (distance>0){
        if (!(entites[i][2]=="mort")) {
          if(SurvivorImunity) {entites[i][2]="imunisé"} else {entites[i][2]="survivant"}
        } 
      }
    }
  }
}

function drawMatrice() {
  MoveAll();
  CountAll();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < entites.length; i++) {
    
    
    
    if (entites[i][2]=="infecté") {
      ctx.fillStyle = "rgb(0, 200, 0)";
      Infection(entites[i][1],entites[i][0]);
      if (InfecteCanDeath) {
        let mourir = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
        if (mourir==69) {entites[i][2]="mort"}
      } else if (InfecteCanHealth) {
        let sesoin = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
        if (sesoin==69) {
          if(SurvivorImunity) {entites[i][2]="imunisé"} else {entites[i][2]="survivant"}
        }
      }
      ctx.fillRect(entites[i][1]*CoteCellule, entites[i][0]*CoteCellule, CoteCellule, CoteCellule);
    } 
    
    
    else if (entites[i][2]=="survivant") {
      if (SurvivorChild) {FaireDesEnfants(entites[i][1],entites[i][0]);}
      
      if (SurvivorToDoctor) {
        let devenirdoc = Math.floor(Math.random() * (100000 - 0 + 1)) + 0;
        if (devenirdoc==5) {entites[i][2]="docteur"}
      }
      if (SurvivorToInfect) {
        let devenirinfecté = Math.floor(Math.random() * (100000 - 0 + 1)) + 0;
        if (devenirinfecté==5) {entites[i][2]="infecté"}
      }
      ctx.fillStyle = "rgb(255, 0, 0)";
      ctx.fillRect(entites[i][1]*CoteCellule, entites[i][0]*CoteCellule, CoteCellule, CoteCellule);
    } 
    
    
    else if (entites[i][2]=="docteur") {
      Soin(entites[i][1],entites[i][0]);
      ctx.fillStyle = "rgb(0, 0, 255)";
      ctx.fillRect(entites[i][1]*CoteCellule, entites[i][0]*CoteCellule, CoteCellule, CoteCellule);
    } 


    else if (entites[i][2]=="mort") {
      ctx.fillStyle = "rgb(30, 30, 30)";
      ctx.fillRect(entites[i][1]*CoteCellule, entites[i][0]*CoteCellule, CoteCellule, CoteCellule);
    }


    else if (entites[i][2]=="imunisé") {
      ctx.fillStyle = "rgb(0, 255, 255)";
      ctx.fillRect(entites[i][1]*CoteCellule, entites[i][0]*CoteCellule, CoteCellule, CoteCellule);
    }
  }
  setTimeout(function() {drawMatrice();}, 100 );
}


setTimeout(function() {drawMatrice();}, 10 );
