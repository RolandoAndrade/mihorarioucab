$(".add").click(function ()
{
    $(".dialog-background").fadeIn(300);
});

$(".add-subject").click(function ()
{
    putSubject();
});
$(".close-card").click(function ()
{
    $(".dialog-background").fadeOut(300);
});
$(".dialog-background").click(function(event)
{
  if (!$(event.target).closest(".dialog-card").length)
      $(".dialog-background").fadeOut(300);
});
