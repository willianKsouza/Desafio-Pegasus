const entradaDados = document.querySelector('.entradaDados ol');
const listaDados = document.querySelector('.listaDados');
const limparDadosProcess = document.getElementById('limparDadosProcess')
const limpaLista = document.getElementById('limparLista')
const adicionaDados = document.getElementById('adicionaDados');
const processaDados = document.getElementById('processaDados');

let arrayTemp = [];

const formula = (arrItem) => {
    const buscarIndex = arrayTemp.findIndex(i => i == arrItem);
    arrayTemp.splice(buscarIndex, 1);
};

const apagarItem = (event) => {
    const item = event.target;
    const itemPai = item.parentNode.firstChild.textContent;
    item.parentNode.remove();
    formula(itemPai);
    
};



const CriaItemTemperatura = (dado) => {
    const criaLi = document.createElement('li');
    const criaBtn = document.createElement('button');
    criaLi.textContent = dado;
    criaBtn.textContent = 'Apagar';
    criaLi.appendChild(criaBtn);
    criaLi.addEventListener('click', apagarItem);
    listaDados.appendChild(criaLi);
};

const parImp = (arr) => {
    return (arr.length - 1) % 2 == 0 ? true : false;
};

const mediana = (arr) => {
    const arrClone = [...arr].sort((a, b) => a - b);
    if (parImp(arrClone)) {
        return arrClone[(arrClone.length - 1) / 2];
    }
    return (arrClone[arrClone.length / 2 - 1] + arrClone[arrClone.length / 2]) / 2;
};

const media = (arr) => {
    const arrClone = [...arr].reduce((acumulador, item) => {
       return acumulador += item;
    })
    return arrClone / arr.length;
};

const LimparDados = () => {
    document.querySelector('.dadosOrdenados')
    .textContent = 'Temperaturas Ordenadas:';
    document.querySelector('.dadosmediana')
    .textContent = 'Mediana:';
    document.querySelector('.dadosmedia')
    .textContent = 'Média:';
}

const processamento = () => {
    if(arrayTemp == false)
        return;
    arrayTemp.sort((a, b) => a - b);
    const arrayTempClone = arrayTemp.map(i => `${i}K`).join(`, `)
    
    document.querySelector('.dadosOrdenados')
    .textContent = `Temperaturas Ordenadas: ${arrayTempClone}`;
    document.querySelector('.dadosmediana')
    .textContent = `Mediana: ${mediana(arrayTemp)}K`;
    document.querySelector('.dadosmedia')
    .textContent = `Média: ${media(arrayTemp)}K`;

};
const LimparListaDados = () => {
    const lista = listaDados.querySelectorAll('.listaDados li');
    lista.forEach(i => i.remove());
    arrayTemp = [];
}

const pegaDadosInput = () => {
    const campoDados = document.getElementById('campoDados');
    if(campoDados.value == '')
      return;

    CriaItemTemperatura(campoDados.value, entradaDados);
    arrayTemp.push(+campoDados.value);
    campoDados.value = '';
}


adicionaDados.addEventListener('click', pegaDadosInput);
processaDados.addEventListener('click', processamento);
limparDadosProcess.addEventListener('click', LimparDados)
limpaLista.addEventListener('click', LimparListaDados)