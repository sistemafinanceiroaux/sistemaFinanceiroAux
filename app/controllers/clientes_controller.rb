class ClientesController < ApplicationController
  respond_to :js, :html

  def perfil
    if segurancaLogin(0)
      @cliente = Pessoa.getPessoaLogada()
      @contasPagas = []
      @contasDevendo = []
      @contasAtrasadas = []
      if !@cliente.id.nil?
        carregarContas(@cliente.id)
      end
    end
  end

  def index
    segurancaLogin(1)
    @cliente = Cliente.new
    carregar_tabela(params[:pesquisa])
  end

  def new
    segurancaLogin(1)
    @cliente = Cliente.new
  end

  def edit
    segurancaLogin(1)
    @cliente = Cliente.find(params[:id])
    @clientes = Cliente.listaClientes
    render 'clientes/index'
  end

  def update
    segurancaLogin(1)
    @cliente = Cliente.find(params[:id])


    if @cliente.update(cliente_params)
      carregar_tabela('')
      @resultadoCliente = "Cliente Atualizado"
    else
      carregar_tabela('')
      @resultadoCliente = "erro-"
    end

  end

  def create
    segurancaLogin(1)
    @cliente = Cliente.new(cliente_params)
    # tipo = 0 é cliente e. tipo = 1 é funcionario
    @cliente.tipo = 0
    @cliente.inativo = 0

    if @cliente.save
      #carregar_tabela ''
      @resultadoCliente = "Cliente Salvo"
      redirect_to
    else
      @resultadoCliente = "erro-"
    end
  end

  def destroy
    segurancaLogin(1)
    @cliente = Cliente.find(params[:id])
    if !verificar_contas_cliente @cliente.id
      @cliente.update(inativo: 1)
      carregar_tabela ''
      @resultadoCliente = "Cliente Deletado";
    else
      @resultadoCliente = "erro-O cliente não foi deletado pois ele está devendo contas";
    end
  end

  private

  def segurancaLogin pessoa
    resultado = true
    if pessoa == 1
      if Pessoa.getPessoaLogada().nil? || Pessoa.getPessoaLogada().tipo != 1
        resultado = false
        redirect_to logins_path
      end
    else
      if Pessoa.getPessoaLogada().nil? || Pessoa.getPessoaLogada().tipo != 0
        resultado = false
        redirect_to logins_path
      end
    end
    resultado
  end

  def carregarContas id
    contas = Contum.listaContasCliente(id)
    @contasDevendo = contas.listaContasDevendo
    @contasAtrasadas = contas.listaContasAtrasadas
    @contasPagas = contas.listaContasPagas
  end

  def cliente_params
    params.require(:cliente).permit(:nome, :cpf, :telefone, :celular, :email, :senha, :cidade, :rua, :numero)
  end

  def carregar_tabela (pesquisa)
    if pesquisa && pesquisa != ''
      @clientes = Cliente.pesquisa(pesquisa)
    else
      @clientes = Cliente.listaClientes
    end
  end

  def verificar_contas_cliente id
    contas = Contum.listaContasCliente(id)
    contasDevendo = contas.listaContasDevendo
    contasAtrasadas = contas.listaContasAtrasadas
    resultado = false
    if contasDevendo.count > 0 || contasAtrasadas.count > 0
      resultado = true
    end
    resultado
  end
end
