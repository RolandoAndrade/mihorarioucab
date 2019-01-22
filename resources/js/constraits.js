var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
canvas.width = window.innerWidth;
var ClientRect = canvas.getBoundingClientRect();
var dias=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
var colores=["rgba(203,67,53,0.9)","rgba(155,89,182,0.9)","rgba(41,128,185,0.9)",
"rgba(26,188,156,0.9)","rgba(241,196,15,0.9)","rgba(211,84,0,0.9)",
"rgba(149,165,166,0.9)","rgba(52,73,94,0.9)","rgba(74, 35, 90,0.9)","rgba(128,0,0,0.9)"];

const WIDTH=canvas.width;
const HEIGHT=800;
const WHITE="#fff";
const NUMBER_OF_DAYS=7;
const ROW_HEIGHT=50;
const LEFT_WIDTH=100;
const FIELD_WIDTH=(WIDTH-LEFT_WIDTH)/NUMBER_OF_DAYS;
const FOOTER_HEIGHT=100;
const BOARD_HEIGHT=HEIGHT-FOOTER_HEIGHT;
const START_HOUR=7;
const END_HOUR=20;