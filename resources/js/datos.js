/*
$.ajax({
    url: 'resources/text/informatica4.csv',
    dataType: 'text',
  }).done(successFunction);

var mat=new Array();


function successFunction(data) {
  var allRows = data.split(/\r?\n|\r/);
  for (var singleRow = 0; singleRow < allRows.length; singleRow++) 
  {
    mat.push(new Array());
    var rowCells = allRows[singleRow].split(',');
    for (var rowCell = 0; rowCell < rowCells.length; rowCell++) 
      mat[singleRow].push(rowCells[rowCell].replace(/['"]+/g, ''));
  } 
  llenaSelectMateria();
}*/

window.onload = function () 
{ 
  retrieveInformation();
}

async function retrieveInformation()
{
  var dao=new CareerDao();
  var loading=new Loading();
  loading.show();
  fullSelectOfCareers(await dao.getAll());
  await retrieveInformationOf(1);
  fullSelectOfClasses();
  loading.hide();
}

var classesAtCareer=[];

async function retrieveInformationOf(id)
{
  var dao = new CareerDao();
  var career = await dao.getById(id);
  for(var i=0;i<career.subjects.length;i++)
  {
      var s=new Subject(career.subjects[i]);
      var index = indexOfClass(s);
      if(index!=-1)
      {
        classesAtCareer[index].push(s);
      }
      else
      {
        classesAtCareer.push([s]);
      }
      
  }
}

function fullSelectOfClasses()
{
  var subjects=document.getElementById('materia');
  var semester=document.getElementById('semester').value;
  deleteOptions(subjects);
  for(var i=0;i<classesAtCareer.length;i++)
  {
    subject=classesAtCareer[i][0];
    if(subject.semester==semester)
    {
      var option=document.createElement('option');
      option.setAttribute("value",i);
      option.setAttribute("style","background:#88C0DB");
      option.append(subject.name);
      subjects.appendChild(option);
    }
    
  }
}


function fullSelectOfCareers(careers)
{
    var select=document.getElementById('career');
    for(var i=0;i<careers.length;i++)
    {
        var option=document.createElement('option');
        option.setAttribute("value",careers[i].career_id);
        option.setAttribute("style","background:#88C0DB");
        option.append(careers[i].name);
        select.appendChild(option);
    }
}

function indexOfClass(subject)
{
  for(var i=0;i< classesAtCareer.length;i++)
  {
    if(classesAtCareer[i][0].name==subject.name)
    {
      return i;
    }
  }
  return -1;
}


function deleteOptions(select)
{
  if (select.hasChildNodes())
    while (select.childNodes.length > 0 )
      select.removeChild(select.lastChild);
}

var registered=[];

function isAlreadyRegistered(comp)
{
  console.log(registered, comp)
  for(var i=0;i<registered.length;i++)
  {
    if(registered[i].name==comp[0].name)
    {
      return true;
    }
      
  }
  return false;
}

function putSubject()
{
  var subject = document.getElementById('materia').value;
  if(subject!="")
  {
    if(!isAlreadyRegistered(classesAtCareer[subject]))
    {
      registered.push(classesAtCareer[subject][0]);
      reset(classesAtCareer[subject]);
    }
    else
    {
      alert("Parece que te gusta mucho la materia pero no puedes verla dos veces en el mismo semestre :(")
    }
      
  }
  
  background();
}

async function changeCareer()
{
  classesAtCareer=[];
  cards=[];
  registered=[];
  var select=document.getElementById('career').value;
  var loading=new Loading();
  loading.show();
  background();
  await retrieveInformationOf(select);
  loading.hide();
  fullSelectOfClasses();
}



class Loading
{
  constructor()
  {
    this.window= document.getElementById('loading');
  }
  show()
  {
    this.window.style.display="block";
  }
  hide()
  {
    this.window.style.display="none";
  }
}

background();