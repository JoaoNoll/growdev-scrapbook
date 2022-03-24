const tableBody = document.getElementById('table-body');
const addButton = document.getElementById('add-task-button');
axios.defaults.baseURL = 'https://growdev-scrapbook-api-joao.herokuapp.com';

async function adicionarRecado(event) { 
    try {
        event.preventDefault();
        const descricao = document.getElementById('descricao');
        const detalhamento = document.getElementById('detalhamento');

        const recado = { 
            descricao: descricao.value,
            detalhes : detalhamento.value
        } 

        await axios.post('/anotacoes', recado);
        descricao.value = '';
        detalhamento.value = '';

    mostrarRecados(); 
    } catch (error) {
        console.log(error);
    }
    
}
 
async function editarRecado(event,id) {
    event.preventDefault(); 
    const novoDescricao = prompt('digite uma nova descrição');
    const novoDetalhe = prompt('Digite um novo detalhe');
    const novoRecado = {
        descricao: novoDescricao,
        detalhes : novoDetalhe
    }

    await axios.put(`/anotacoes/${id}`, novoRecado)
    .then(response => console.log(response))
    .catch(err => console.log(err));

    mostrarRecados();
}

async function removerRecado (event,id) {
    event.preventDefault();
    await axios.delete(`/anotacoes/${id}`)
    .then()
    .catch(error => console.log(error))

    mostrarRecados();
  
}


async function mostrarRecados() {
    await axios.get('/anotacoes')
        .then(response => {
            const data = response.data;
            tableBody.innerHTML = '';
        
            for(let item of data.anotacoes) { 
                const posicao = data.anotacoes.indexOf(item);
                tableBody.innerHTML +=
                
                    `<tr>
                        <td class="text-center" scope="row">${posicao + 1}</td>
                        <td class="text-center">${item.descricao}</td>
                        <td class="text-center">${item.detalhamento}</td>
                        <td class="align-center">
                            <div class="d-flex flex-row">
                                <button class="button text-center"  onclick="editarRecado(event,${item.id})">Editar</button>
                                <button class="button text-center" onclick="removerRecado(event,${item.id})">Remover</button>
                            </div>
                        </td>
                    </tr>`
                }        
        })
        .catch(err => console.log(err))
}

mostrarRecados();