create table if not exists alugueis(
    id serial primary key,
    dataInicio timestamp,
    dataTermino timestamp,
    valor decimal(10, 2) not null,
    status varchar (20) not null check (status in('ativo', 'finalizado', 'atrasado'))
)

create table if not exists cliente(
    id serial primary key,
    cpf char(11) not null unique,
    nome varchar(100) not null,
    contato char(11) not null
)

create table if not exists enderecos(
    id serial primary key,
    cpf char(11) not null,
    cep char(8) not null,
    logradouro varchar(40) not null,
    numero varchar(10) not null,
    complemento varchar(50),
    bairro varchar(40) not null,
    localidade varchar(70) not null,
    uf char(2) not null, 
    Constraint fk_Cliente foreign key (cpf) references cliente(cpf)
)