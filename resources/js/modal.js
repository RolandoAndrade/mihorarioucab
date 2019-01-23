class Modal
{
    constructor()
    {

        swal({
                title: 'Añadir materia',
                confirmButtonText: 'Inscribir',
                html: '<label for="">Carrera:</label><select name="" id="career" class="combo" onchange="changeCareer()"></select><label for="">Semestre:</label><select name="" id="semester" class="combo" onchange="fullSelectOfClasses()"><option class="opcion" value="I" selected>I</option><option class="opcion" value="II">II</option><option class="opcion" value="III">III</option><option class="opcion" value="IV">IV</option><option class="opcion" value="V">V</option><option class="opcion" value="VI">VI</option><option class="opcion" value="VII">VII</option><option class="opcion" value="VIII">VIII</option><option class="opcion" value="IX">IX</option><option class="opcion" value="X">X</option></select><label for="">Materia:</label><select name="" id="materia" class="combo"></select>',
                preConfirm: function() {putSubject();}
            }).catch(swal.noop);
        fullSelectOfCareers();
        fullSelectOfClasses();
    }
}

$(".add").click(function ()
{
    new Modal();
});