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
};


let careers=[];
let classesAtCareer=[];
let registered=[];
let career;

async function retrieveInformation()
{
  let loading=new Loading();
  let manager=new Manager();
  loading.show();
  careers = await manager.getAll();
  career = await manager.getById(1);
  fullSelectOfCareers();
  fullSelectOfClasses();
  loading.hide();
}

function fullSelectOfClasses()
{
    let subjects=document.getElementById('materia');
    let semester=document.getElementById('semester').value;
    deleteOptions(subjects);
    for(let i=0;i<career.subjects.length;i++)
    {
        if(career.semesterOfSubject(i)===semester)
        {
            let option=document.createElement('option');
            option.setAttribute("value",i);
            option.append(career.nameOfSubject(i));
            subjects.appendChild(option);
        }
    }
}

function fullSelectOfCareers()
{
    var select=document.getElementById('career');
    for(var i=0;i<careers.length;i++)
    {
        var option=document.createElement('option');
        option.setAttribute("value",careers[i].id);
        option.append(careers[i].name);
        select.appendChild(option);
    }
}

function deleteOptions(select)
{
  if (select.hasChildNodes())
    while (select.childNodes.length > 0 )
      select.removeChild(select.lastChild);
}

function isAlreadyRegistered(comp)
{
    for(let i=0;i<registered.length;i++)
    {
        if(registered[i].name===comp)
        {
            return true;
        }
    }
    return false;
}

function putSubject()
{
    let index = document.getElementById('materia').value;
    if(index!=="")
    {
        if(!isAlreadyRegistered(career.nameOfSubject(index)))
        {
            registered.push(career.subjects[index][0]);
            reset(career.subjects[index]);
            swal({title: '¡Perfecto!', text: '¡Una materia fue añadida!',
            type: 'success', confirmButtonText: 'Chévere', confirmButtonColor: "#1aceff"}).catch(swal.noop);
        }
        else
        {
            swal("Error",
            "Parece que te gusta mucho la materia, pero no puedes verla dos veces en el mismo semestre",
            "error").catch(swal.noop);
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
    let manager = new Manager();
    var loading=new Loading();
    loading.show();
    career = await manager.getById(select);
    background();
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