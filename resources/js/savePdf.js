function isIn(s,d)
{
    for(let i=0;i<d.length;i++)
        if(s.equals(d[i]))
            return true;
    return false;
}

function listOfSigned()
{
    let t=[];
    for(let i=0;i<cards.length;i++)
    {
        if(cards[i].isIn()&&!isIn(cards[i],t))
            t.push(cards[i]);
    }
    return t;
}

const PDF_FONT=12;
const MARGIN_LEFT=30;
const PAGE_WIDTH=150;

function generateTables(subjects,doc)
{

    for(let i=0;i<5;i++)
    {
        doc.rect(MARGIN_LEFT,50+45*i,150,12);
        doc.text("Nombre de la materia:",30+5,50+7+45*i);

        doc.rect(MARGIN_LEFT,62+45*i,150,12);
        doc.text("NRC:",30+5,62+7+45*i);

        doc.rect(MARGIN_LEFT,74+45*i,150,12);
        doc.text("Profesor:",30+5,74+7+45*i);
    }
}
$(".download").click(function ()
{
    let doc = new jsPDF();
    let subjects=listOfSigned();
    //console.log(subjects);
    doc.setDrawColor("Gray");
    doc.setTextColor("Gray");
    doc.text("MI HORARIO UCAB",83,30);
    doc.setFontSize(12);

    generateTables(subjects,doc);

    doc.insertPage();

    generateTables(subjects,doc);
    //doc.addImage(canvas.toDataURL("image/jpeg"), 'JPEG', 30, 50, 150, 100);




    doc.save('MiHorarioUCAB.pdf');
});

