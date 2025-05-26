document.addEventListener('DOMContentLoaded', () => {
    const tarefaForm = document.getElementById('tarefa-form');
    const listaTarefas = document.getElementById('lista-tarefas');
    const sair = document.getElementById('sair');
    const modalEditar = document.getElementById('modal-editar');
    const editarForm = document.getElementById('editar-form');
    const fecharModal = document.getElementById('fechar-modal');

    const carregarTarefas = async () => {
        try {
            const response = await fetch('/api/tarefas', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const tarefas = await response.json();

            if (response.ok) {
                listaTarefas.innerHTML = '';
                tarefas.forEach(tarefa => {
                    const tarefaDiv = document.createElement('div');
                    tarefaDiv.className = 'bg-white p-4 rounded shadow flex justify-between items-center';
                    tarefaDiv.innerHTML = `
                        <div>
                            <h3 class="text-lg font-semibold ${tarefa.status === 'concluida' ? 'line-through' : ''}">${tarefa.titulo}</h3>
                            <p class="text-gray-600">${tarefa.descricao || ''}</p>
                            <p class="text-sm">Prioridade: ${tarefa.prioridade}</p>
                            <p class="text-sm">Status: ${tarefa.status}</p>
                        </div>
                        <div class="flex gap-2">
                            <button class="editar-btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" data-id="${tarefa.id}" 
                                    data-titulo="${tarefa.titulo}" data-descricao="${tarefa.descricao || ''}" 
                                    data-prioridade="${tarefa.prioridade}" data-status="${tarefa.status}">Editar</button>
                            <button class="excluir-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" data-id="${tarefa.id}">Excluir</button>
                        </div>
                    `;
                    listaTarefas.appendChild(tarefaDiv);
                });

                document.querySelectorAll('.editar-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        const titulo = btn.getAttribute('data-titulo');
                        const descricao = btn.getAttribute('data-descricao');
                        const prioridade = btn.getAttribute('data-prioridade');
                        const status = btn.getAttribute('data-status');

                        document.getElementById('editar-id').value = id;
                        document.getElementById('editar-titulo').value = titulo;
                        document.getElementById('editar-descricao').value = descricao;
                        document.getElementById('editar-prioridade').value = prioridade;
                        document.getElementById('editar-status').value = status;

                        modalEditar.classList.remove('hidden');
                    });
                });

                document.querySelectorAll('.excluir-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        excluirTarefa(id);
                    });
                });
            } else {
                alert('Erro ao carregar tarefas: ' + (await response.text()));
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor: ' + error.message);
            localStorage.removeItem('token');
            window.location.href = '/index.html';
        }
    };

    tarefaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const prioridade = document.getElementById('prioridade').value;
        const status = document.getElementById('status').value;

        try {
            const response = await fetch('/api/tarefas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ titulo, descricao, prioridade, status })
            });

            if (response.ok) {
                tarefaForm.reset();
                carregarTarefas();
            } else {
                alert('Erro ao criar tarefa: ' + (await response.text()));
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor: ' + error.message);
        }
    });

    editarForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editar-id').value;
        const titulo = document.getElementById('editar-titulo').value;
        const descricao = document.getElementById('editar-descricao').value;
        const prioridade = document.getElementById('editar-prioridade').value;
        const status = document.getElementById('editar-status').value;

        try {
            const response = await fetch(`/api/tarefas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ titulo, descricao, prioridade, status })
            });

            if (response.ok) {
                modalEditar.classList.add('hidden');
                carregarTarefas();
            } else {
                alert('Erro ao atualizar tarefa: ' + (await response.text()));
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor: ' + error.message);
        }
    });

    fecharModal.addEventListener('click', () => {
        modalEditar.classList.add('hidden');
    });

    sair.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/index.html';
    });

    const excluirTarefa = async (id) => {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            try {
                const response = await fetch(`/api/tarefas/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });

                if (response.ok) {
                    carregarTarefas();
                } else {
                    alert('Erro ao excluir tarefa: ' + (await response.text()));
                }
            } catch (error) {
                alert('Erro ao conectar com o servidor: ' + error.message);
            }
        }
    };

    carregarTarefas();
});