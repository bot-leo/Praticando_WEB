console.log('Flappy Bird');

const somDe_Hit = new Audio();
somDe_Hit.src = './efeitos/hit.wav';
const sprites = new Image();
sprites.src = './flappysprite.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//Plano de fundo
const planodefundo = {
    spriteX: 0,
    SpriteY: 90,
    largura: 287,
    altura: 512,
    x:0,
    y:canvas.height -512,
    desenha(){
        contexto.drawImage(
            sprites, 
            planodefundo.spriteX, planodefundo.SpriteY,
            planodefundo.largura, planodefundo.altura, 
            planodefundo.x, planodefundo.y, 
            planodefundo.largura, planodefundo.altura,
        );
            //aidiconando mais uma imagems para completar o fundo
        contexto.drawImage(
            sprites, 
            planodefundo.spriteX, planodefundo.SpriteY,
            planodefundo.largura, planodefundo.altura, 
            (planodefundo.x + planodefundo.largura), planodefundo.y, 
            planodefundo.largura, planodefundo.altura,
        );
    }
}
//Chão
    const chao = {
        spriteX: 600,
        SpriteY: 0,
        largura: 338,
        altura: 113,
        x:0,
        y:368,//canvas.height -113
        atualiza(){
            
        },
        desenha(){
            contexto.drawImage(
                sprites, 
                chao.spriteX, chao.SpriteY,
                chao.largura, chao.altura, 
                chao.x, chao.y, 
                chao.largura, chao.altura,
            );
        }
    }
function fazColisao(flappybird, chao){
    const flappyBirdY = flappybird.y + flappybird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY){
        return true;
    }else{
        return false;
    }
}
function criaFlappyBird(){
    //Passarinho
    const flappybird = {
        spriteX: 5,
        SpriteY: 980,
        largura: 36,
        altura: 25,
        x:10,
        y: 50,
        pulo: 4.6,
        pula(){
            flappybird.velocidade = - flappybird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza(){
            if(fazColisao (flappybird, chao)){
                console.log('Colisao');
                somDe_Hit.play();

                setTimeout(() => {
                    mudaParaTela(Telas.Inicio);
                }, 500);
                return;
            }
            flappybird.velocidade = flappybird.velocidade + flappybird.gravidade;
            //console.log(flappybird.velocidade);
            flappybird.y = flappybird.y + flappybird.velocidade;
        },
        desenha(){
            contexto.drawImage(
                sprites, 
                flappybird.spriteX, flappybird.SpriteY,
                flappybird.largura, flappybird.altura, 
                flappybird.x, flappybird.y, 
                flappybird.largura, flappybird.altura,
            );
        }
    }
    return flappybird;
}

/* antigo trecho de codigo
function loop(){
    contexto.drawImage(
        sprites, 
        5, 980,  // Sprite X, Sprite Y, seria a posição da figura no arquivo
        36, 25,  // tamanho do recorte, oque queremos dela
        10, 50, 
        36, 25,
    );
    requestAnimationFrame(loop);
}
*/

//Tela de Inicio
const mensagemGetReady = {
    sX: 585,
    sY: 180,
    w: 112,
    h: 100,
    x: 100,//(canvas.width / 2) - 112 /2
    y: 150,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    }

}
//Letreiro
const getReady = {
    sX: 590,
    sY: 115,
    w: 186,
    h: 56,
    x: 80,//(canvas.width / 2) - 112 /2
    y: 100,
    desenha(){
        contexto.drawImage(
            sprites,
             getReady.sX,  getReady.sY,
             getReady.w,  getReady.h,
             getReady.x,  getReady.y,
             getReady.w,  getReady.h
        );
    }
}
//TELAS
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}
const Telas = {
    Inicio: {
        inicializa(){
            globais.flappybird = criaFlappyBird();
        },
        desenha(){
            planodefundo.desenha();
            chao.desenha();
            globais.flappybird.desenha();
            mensagemGetReady.desenha();
            getReady.desenha();
            
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){
            
        }
    }
}
Telas.JOGO = {
    desenha(){
        planodefundo.desenha();
        chao.desenha();
        globais.flappybird.desenha();
    },
    click(){
        globais.flappybird.pula();
    },
    atualiza(){
        globais.flappybird.atualiza();
    }
}

// Novo codigo após refatoração*
function loop(){ 
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}


window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
})



mudaParaTela(Telas.Inicio);
loop();


