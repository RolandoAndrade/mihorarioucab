function isValidPutIt(subject, saves)
{
    for(let i=0;i<saves.length;i++)
    {
        if(saves[i].shareCommonHours(subject))
            return false;
    }
    return true;
}

function putOnBoard(card, subject)
{
    for(let i=0;i<subject.days.length;i++)
    {
        if(subject.days[i].hasAClass())
        {
            let x=LEFT_WIDTH+i*FIELD_WIDTH;
            let y=(subject.days[i].startHour-START_HOUR+1)*ROW_HEIGHT;
            let w=FIELD_WIDTH;
            let h=subject.days[i].getDiference()*ROW_HEIGHT;
            card.reset();
            card.setBounds(x,y,w,h);
            subject.createCard(card.color,card.id,card.subjects,i);
            background();
        }
    }

}

function randomScheduler(index, saves)
{
    try
    {
        let subArr = cards[index].subjects;
        for (let i = 0; i < subArr.length; i++)
        {
            if (isValidPutIt(subArr[i], saves))
            {
                saves.push(subArr[i]);
                let rs = randomScheduler(index + 1, saves);
                if (rs !== null )
                {
                    putOnBoard(cards[index], subArr[i]);
                    rs.push(cards[index]);
                    return rs;
                }
                else if(index===cards.length-1)
                {
                    putOnBoard(cards[index], subArr[i]);
                    return [cards[index]];
                }
            }
        }
    }
    catch (e)
    {
        return null;
    }
    return null;
}
function deleteRepeatedCards()
{
    for(let i=0;i<cards.length;i++)
    {
        let j=i+1;
        while (j<cards.length)
        {
            if(cards[j].id===cards[i].id)
                cards.splice(j,1);
            else
                j++;
        }
    }
}

$(".random").click(function ()
{
    deleteRepeatedCards();
    if(randomScheduler(0,[])===null)
    {
        swal("Error", "No se logró formar un horario con las materias dadas", "error");
    }

});