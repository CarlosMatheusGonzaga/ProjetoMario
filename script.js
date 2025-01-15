// Quando quisermos que o Mario pule, teremos que adicionar a classe ".jump" do CSS à imagem (HTML) do Mario.

//Primeiramente, vamos pegar a imagem do Mario criando uma const vinculada à sua classe do CSS ".mario" da seguinte forma:

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

//agora iremos vincular à imagem à class ".jump", selecionando então uma nova class:

function jump() {
    mario.classList.add('jump');

    // Entretanto, a animacão só pode ser replicada uma vez. Para corrigir este problema, temos que "remover" a classe "jump" toda vez que a mesma for executada e chegar a 500ms (conforme configurado) deste jeito:

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);

    // dentro dos primeiros parênteses do "classlist.remove", colocamos a funcão (no nosso caso a jump e no segundo o tempo que queremos esperar para que a mesma seja removida (500 milissegundos, o tempo de execucão na animacão do Mario).

}

// Agora, iremos fazer a configuracão para que a animacão do tubo em movimento pare quando o Mario encostar no mesmo

// Insta salientar que à medida que o deslocamento aumenta para direita, consequentemente o da esquerda diminui. Precisamos saber qual a distância percorrida para o cano (.pipe) encostar no Mario conforme aquele se locomove para a esquerda. 
// A distância que o cano (.pipe) percorre para chegar no Mario é de "120px". Para fazer um teste, dentro da classe ".pipe" no CSS, desativar momentaneamente o atributo "animation" e incluir: "left: 120px;"

//Deste modo, podemos fazer uma verificacão do deslocamento da esquerda para saber se o tubo (.pipe) já chegou no deslocamento de 120px, implementando um "loop" para concretizar esta lógica. O loop que iremos implementar no nosso jogo irá ficar verificando a todo instante se nós perdemos ou não (se o cano chegou à distância de 120px para baixo ou não). 
//Iremos utilizar: "const loop = setInterval(funcao, tempo)"

//Obs: para aprender mais sobre o código abaixo (arrow functions, funcoes anônimas, acessar a página no desktop: Guanabara Curso Em Vídeo/Sobre JavaScript/ArrowFunctions)

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;

    // const marioPosition =  window.getComputedStyle(mario).bottom 

    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '') //incluir o sinal de "+" ao início faz com que haja a conversão de string para número, pois ainda com a remocão do "px", o console continua a nos fornecer strings.

    // console.log(pipePosition)
    console.log(marioPosition)

    // Observe que ao dar um "console.log" do "marioPosition", o console do navegador nos retornarar os valores como "strings" com o "px" ao final. Teremos que fazer a conversão concatenando o ".replace('px', '');" ao final de "const marioPosition =  window.getComputedStyle(mario).bottom"
    //-------------------------------//

    // a const pipePosition seria a posicão do nosso tubo. Mas para pegarmos as informacões pertinentes ao mesmo, teremos que incluir mais um seletor de CSS no nosso JavaScript (assim como fizemos com a imagem do Mario), só que dessa vez com a classe ".pipe" (do cano). Deste modo, iremos colocar no início "const pipe = document.querySelector('.pipe');"

    // em relacão à "const pipePosition", "pipe" seria a const que criamos no início para colocar o seletor CSS e "offsetLeft" seria a nossa propriedade, que seria o deslocamento para esquerda.

    // Veja que inserindo o "console.log(pipePosition)" e acessando o console no navegador, o comando faz com que seja printado cada distanciamento do cano. Quanto mais à esquerda, maior o número pertinente ao distanciamento (isso porque o "animation" está ativado na classe ".pipe")


    //-------------------------------------  ATRIBUTO IF, QUANDO O JOGO ACABA ------------------------------------------------------------------

    // if (pipePosition <= 120) 

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 111) {

        pipe.style.animation = 'none';

        // Para compreender as propriedades "style" e "animation" verificar a pasta Guanabara Curso em Vídeo/Sobre JavaScript e o arquivo "Entendendo as propriedades Style e Animation"

        // 'none' fará com que a animação especificada no CSS seja interrompida ou removida dinamicamente. Nesse caso, a animação pipe-animation definida no CSS para o elemento com a classe .pipe será desativada. Isto quando houver a coalisão do Mario com o cano.

        //Entretanto, observe que quando o Mario chega no tubo, este acaba indo para o canto inferior direito da tela. Para que o tubo fique no mesmo lugar quando ocorrer a colisão (distanciamento de 120px), podemos utilizar uma template literal pegando o distanciamento do próprio "pipePosition":

        pipe.style.left = `${pipePosition}px` // lembrar de usar crase (`) na template literal

        // Agora, observe que, mesmo quando o Mario pula do cano, a animacão é encerrada do mesmo jeito. Para resolver este problema, primeiramente iremos pegar a propriedade "bottom" do Mario (do mesmo jeito que fizemos com o deslocamento do cano à esquerda "pipe.offsetLeft"). 

        //Entretanto, insta salientar que, para pegar a propriedade do Mario (para saber se o mesmo pulou ou não), não será possível utilizar "mario.offsetBottom", teremos que fazer de outro jeito
        //Invés do "offset", iremos utilizar: "window.getComputedStyle(propriedade CSS desejada).propriedade desejada que se encontra dentro da classe que queremos". Vamos colocar dentro da "const loop = setInterval()"

        //Depois de ter feito a inclusão da propriedade acima na const loop, é necessário saber que quando o pipe se encontra duma distância abaixo de 120px e maior que zero, caso o Mario estiver num bottom abaixo de 111, ele encosta no cano. Sendo assim, mesmo configurar a animacão para que a mesma pare apenas nestas condicões, incluindo ao "if (pipePosition <= 120)" o seguinte:
        // "if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80)"

        //Se não for incluso o "&& > 0", o Mario irá pular o cano, entretanto, no momento que ele cair no chão, tendo passado o cano ou não, a animacão irá parar do mesmo jeito. Isto se dá porque o cano alcanca o Mario na distância 120 e ultrapassa por completo quando está em 0.  Ou seja, quando o cano se encotra numa distâncio de 120 para baixo até 0 (mas não menor que 0) e o Mario estiver num bottom abaixo de 111, este encontra-se colidindo com o cano.


        //---------------------------------------------------------------------------------------------------------------------------//

        // Agora, observe que mesmo tocando no cano e, a animacão parando, o Mario cai. Teremos que fazer uma configuracão para que quando o Mario toque no cano, ele permaneca congelado no exato bottom. Para isto, iremos inserir na const loop (dentro de if):

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // a template literal `${marioPosition}px` vai pegar o bottom do Mario no momento que ele encosta no cano


        //-------------------------------------- MUDANDO A IMAGEM DO MARIO AO MORRER ----------------------------------------------

        mario.src = './mario-jump-images/game-over.png';

        // Entretanto, a imagem fica muito grande do jeito que está. Teremos que diminuir o tamanho:

        mario.style.width = '75px'

        // Outro problema aparece ao diminuir a imagem. Quando o Mario colide com o tubo no solo, a margem entre os dois fica muito espacada. Para corrigir isto:

        mario.style.marginLeft = '50px'
    }
    
} , 10)



document.addEventListener('keydown', jump) // keydown diz respeito à tecla e "jump" a funcão que será realizada quando pressionada alguma tecla.


// Em resumo, a tecla "keydown" irá ativar a funcão "jump", que por sua vez está vinculada à imagem do Mario (representada por "const Mario"), dando origem à animacão de pulo.