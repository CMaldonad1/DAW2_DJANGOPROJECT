function createElements(categ){
  var teFills=(categ.count!="None");
  var elementPare=document.getElementById("li-"+categ.jq);

  var li=document.createElement("li");
  li.setAttribute("id", "li-"+categ.nm);
  li.setAttribute("class","ps-2");

  var divcollapse=document.createElement("div");
  divcollapse.setAttribute("id",categ.jq+"-collapse");
  divcollapse.setAttribute("class", "collapse pt-1 show");

  var ul=document.createElement("ul");
  ul.setAttribute("class", "btn_sb list-unstyled fw-normal");

  var divbutton=document.createElement("div");
  divbutton.setAttribute("id", "div-"+categ.nm);
  divbutton.setAttribute("class", "option");

  var a=document.createElement("a");
  a.setAttribute("class","nav-link");
  a.setAttribute("href","/cataleg/"+categ.id);
  if(!teFills){
    a.innerHTML=" ➤ "+categ.nm;
  }else{
    a.innerHTML=" ★ "+categ.nm;
  }
  divbutton.appendChild(a);

  divcollapse.appendChild(divbutton);
  divcollapse.appendChild(ul);
  li.appendChild(divcollapse);
  elementPare.appendChild(li);
}
function verifyIfSelected(nm){
  var selected=document.getElementById(nm);

  if(selected.classList.contains("selected")){
    selected.classList.remove("selected");
  }else{
    selected.classList.add("selected");
  }
}
function createProductCard(product){
  var elementPare=document.getElementById(product.prodId);

  var imatge="/static/"+product.imatges[0]
  if(elementPare==null){
    creacioElementPare(product, imatge);
  }else{
    zonavariants=document.getElementById("variant-"+product.prodId);
    creacioMiniImatge(zonavariants, imatge, product);
  }
}
function creacioElementPare(product, imatge){
  var cataleg= document.getElementById("prodcat");
  
  var container=document.createElement("div");
  container.setAttribute("id", product.prodId)
  container.setAttribute("class","col-10 col-sm-6 col-lg-3 p-2");

  var img= document.createElement("img");
  img.setAttribute("id","imgtop-"+product.prodId);
  img.setAttribute("class","card-img-top");
  img.setAttribute("alt", "Product Image");
  img.setAttribute("src", imatge);

  var card=document.createElement("div");
  card.setAttribute("class","card");
  
  var dto=document.createElement("div");
  dto.setAttribute("id","dto-"+product.prodId);
 
  if(product.dto>0){
     dto.setAttribute("class","dtoinfo position-absolute top-0 start-0 d-flex");
  }else{
    dto.setAttribute("class","dtoinfo position-absolute top-0 start-0 d-none")
  }
  var span=document.createElement("span");
  span.innerText="-"+(product.dto*100)+"% dto."
  dto.appendChild(span);
  card.appendChild(dto);

  var cardbody=document.createElement("div");
  cardbody.setAttribute("class","card-body");

  var cardtitle=document.createElement("h5");
  cardtitle.setAttribute("class","card-title");
  cardtitle.innerHTML=product.prod;

  var marca=document.createElement("p")
  marca.setAttribute("class","card-title")
  marca.innerHTML="<b>Marca:</b> "+product.marca;

  var descr=document.createElement("p");
  descr.setAttribute("class","card-text");
  descr.innerHTML=product.descr;

  cardbody.appendChild(cardtitle);
  cardbody.appendChild(marca);
  cardbody.appendChild(descr)

  card.appendChild(img);
  card.appendChild(cardbody);
  
  var options=document.createElement("div");
  options.setAttribute("id","options-"+product.prodId);
  options.setAttribute("class","d-flex flex-column align-items-center");

  var preu=document.createElement("div");
  preu.setAttribute("id","preu-"+product.prodId);
  preu.setAttribute("class","col-11");
  if(product.dto>0){
    preu.innerHTML="<b>Preu:</b> "+ (product.preu*(1-product.dto>0)).toFixed(2)+"€ <s>"+product.preu+"€</s>";
  }else{
    preu.innerHTML="<b>Preu:</b> "+product.preu+"€";
  }

  options.appendChild(preu);

  var zonavariants=document.createElement("div");
  zonavariants.setAttribute("id","variant-"+product.prodId);
  zonavariants.setAttribute("class","d-flex flex-row align-items-start p-2");

  creacioMiniImatge(zonavariants, imatge, product);

  options.appendChild(zonavariants);
  
  card.appendChild(options);

  var cardFooter=document.createElement("div");
  cardFooter.setAttribute("id","foot-"+product.prodId);
  cardFooter.setAttribute("class","card-footer d-flex justify-content-between bg-light");

  var veureprod=document.createElement("a");
  veureprod.setAttribute("class","btn btn_normal btn-sm");
  veureprod.setAttribute("href","/info/"+product.id);
  veureprod.innerHTML="Veure";

  var afegir=document.createElement("button");
  afegir.setAttribute("class","btn btn_outline btn-sm");
  afegir.setAttribute("onClick", "cistella();")
  afegir.innerHTML="afegir";

  cardFooter.appendChild(veureprod);
  cardFooter.appendChild(afegir);
  card.appendChild(cardFooter);
  
  container.appendChild(card);
  cataleg.appendChild(container);

  return container;
}
function recorreMiniImatge(){
  document.querySelectorAll('[id*="variant-"]').forEach(
    el => el.querySelectorAll('img').forEach( img =>
      addhover(img)
    )
  );
}
function addhover(img){
  img.addEventListener('mouseover', (ev)=>{
    var element={
      "id":ev.explicitOriginalTarget.id,
      "preu":ev.explicitOriginalTarget.alt,
      "url":ev.explicitOriginalTarget.src
    }
    hoverImage(element);
  });
}
function creacioMiniImatge(zonavariants, imatge, product){
  var img= document.createElement("img");
  img.setAttribute("id",product.prodId)
  img.setAttribute("class","col-2 m-1");
  img.setAttribute("alt", product.preu+"-"+product.dto);
  img.setAttribute("src", imatge);
  addhover(img);
  zonavariants.appendChild(img);
}
function hoverImage(element){
  var pos=element.preu.indexOf("-");
  var pos2=element.preu.indexOf("_");
  var preu=element.preu.substring(0,pos);
  var dto=element.preu.substring(pos+1);
  var variant=element.preu.substring(pos2+1);
  var preuElement=document.getElementById("preu-"+element.id);
  var dtoElement=document.getElementById("dto-"+element.id);
  var btnElement=document.getElementById("btn-"+element.id);
  dtoElement.classList.remove("d-flex");
  dtoElement.classList.remove("d-none");
  document.getElementById("imgtop-"+element.id).setAttribute("src", element.url);
  if(dto>0){
    dtoElement.classList.add("d-flex")
    dtoElement.querySelector("span").innerText=(dto*100)+"% dto.";

    preuElement.innerHTML="<b>Preu:</b> "+ (preu*(1-dto)).toFixed(2)+"€ <s>"+preu+"€</s>";
  }else{
    dtoElement.classList.add("d-none")
    preuElement.innerHTML="<b>Preu:</b> "+preu+"€";
  }
  btnElement.setAttribute("href","/info/"+variant);
}
function hideFiltres(name){
  var hide=true;
  var classbutton="btn_outline";
  var filtres=document.getElementById(name);
  var button=document.getElementById("hide"+name);
  var listvar=document.getElementById("listVar")
  button.removeAttribute("class");
  if(filtres.hidden==true){
    hide=false;
    classbutton="btn_normal";
    listvar.style.overflowY="scroll";
    listvar.style.maxHeight="50%";
  }else{
    listvar.style.overflowY="hidden";
    listvar.style.maxHeight="100%";
  }
  filtres.hidden=hide;
  button.setAttribute("class",classbutton);
}
function setImage(event, src){
  document.getElementById("imgGran").setAttribute("src",src)
}
async function changeVariant(event) {
  try {
    const response = await fetch('http://127.0.0.1:8000/variantInfo/', 
      {method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'idVar': event.explicitOriginalTarget.id
        })
      }
    );
    const data = await response.json();
    if(data.length==0){
      alert("No s'ha trobat cap resultat per la busqueda");
    }else{
      informationChangeVar(data)

    }
  } catch (error) {
      alert("Error del servidor en filtrar la informació");
  }
}
function informationChangeVar(data){
  generarPreuInfo(data);
  document.getElementById("imgGran").setAttribute("src","/static/"+data.imatges[0])
  generarImatgesPetites(data.imatges)
  generarTallesSelector(data.talles);
  activaBotoCarro();
}
function generarTallesSelector(talles){
  var pare=document.getElementById("sTalles");
  pare.innerHTML="";
  var fill=document.createElement("option");
  fill.value= 0;
  fill.text="-";
  pare.appendChild(fill);
  for(i=0; i<talles.length;i++){
    console.info(talles[i].tNom)
      var opt=fill.cloneNode()
      opt.value= talles[i].tId;
      opt.text=talles[i].tNom;
      pare.appendChild(opt);
  }
}
function generarImatgesPetites(imatges){
  var pare=document.getElementById("imgProd");
  pare.innerHTML="";
  for(i=0; i<imatges.length; i++){
    var el=document.createElement("img");
    el.setAttribute("src","/static/"+imatges[i]);
    el.setAttribute("class","thumbnail rounded active");
    el.addEventListener("mouseenter",(ev)=>{
      setImage(ev, ev.explicitOriginalTarget.src)
    })
    pare.appendChild(el);
  }
}
function generarPreuInfo(data){
  var pare=document.getElementById("preuSection");
  pare.innerHTML="";
  var preu=data.preu
  var preu_dto=data.preu;
  var dto=data.dto;

  var divPreu=document.createElement("div");
  var spanPreu1=document.createElement("span");
  spanPreu1.setAttribute('class','h4');
  spanPreu1.innerText="Preu: ";

  var spanPreu2=document.createElement("span");
  spanPreu2.setAttribute('id','preuvar');
  spanPreu2.setAttribute('class','text-muted');

  divPreu.appendChild(spanPreu1);
  pare.appendChild(divPreu);
  if(dto>0){
    preu_dto=(data.preu*(1-dto)).toFixed(2);
    spanPreu2.innerHTML=preu_dto+"€ <s>"+preu+"€</s>";

    var divDto= document.createElement("div");
    divDto.setAttribute('class','ps-4');

    var spanDto1=document.createElement("span");
    spanDto1.setAttribute('class','h5');
    spanDto1.innerText="Dto: "

    var spanDto2=document.createElement("span");
    spanDto2.setAttribute('id','dtovar');
    spanDto2.setAttribute('class','text-muted');
    spanDto2.innerText=dto*100+"%";

    divDto.appendChild(spanDto1);
    divDto.appendChild(spanDto2);
    pare.appendChild(divDto);
  }else{
    spanPreu2.innerText=preu+"€";
  }
  divPreu.appendChild(spanPreu2);
}
async function cistella(){
    try {
        const response = await fetch('http://127.0.0.1:8000/add');
        const data = await response.json();
        const items = data.cistella;
        document.getElementById('cistella').innerText = items;
    } catch (error) {
        document.getElementById('exchangeRate').innerText = 'Error en obtenir el canvi';
    }
}
function desfiltra(){
  document.getElementById('pmin').value="";
  document.getElementById('pmax').value="";
  document.getElementById('nomf').value="";
  document.querySelectorAll('input[name=chktalla]:checked').forEach(ckbx => ckbx.checked=false);
  filtre();
}
async function filtre(){
  var pmin=document.getElementById('pmin').value;
  var pmax=document.getElementById('pmax').value;
  var nom=document.getElementById('nomf').value;
  var ckbx=document.querySelectorAll('input[name=chktalla]:checked');
  var talles="";

  //recorrem els checkboxs marcats i fem un array de talles per a pasar-la a la API
  if(ckbx.length>0){
    talles=ckbx[0].value;
    for(var i=1; i < ckbx.length; i++){
      talles+=","+ckbx[i].value;
    }
  }
  //si el preu minim es superior al máxim es fará que el preu maxim sigui igual al preu minim
  if(pmin>pmax &&  pmin!='' && pmax!=''){
    pmax=pmin
    document.getElementById('pmax').value=pmin
  }
  try {
    const response = await fetch('http://127.0.0.1:8000/filtrar/', 
      {method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'nom': nom,
          'pmin': pmin,
          'pmax': pmax,
          'talles':talles
        })
      }
    );
    const data = await response.json();
    
    if(data.length==0){
      alert("No s'ha trobat cap resultat per la busqueda");
    }else{
      var pare=document.getElementById("prodcat");
      pare.innerHTML="";
      for (var i = 0; i < data.length; i++){
        createProductCard(data[i]);
      }
    }
  } catch (error) {
      alert("Error del servidor en filtrar la informació");
  }
}
function activaBotoCarro(){
  var e=document.getElementById("sTalles");
  var btn=document.getElementById("addCart");
  var qty=document.getElementById("quantity");
  if(e.options[e.selectedIndex].value == 0){
    btn.disabled=true;
    qty.disabled=true;
  }else{
    btn.disabled=false;
    qty.disabled=false;
  }
}