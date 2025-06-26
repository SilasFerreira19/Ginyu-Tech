DROP DATABASE Bookadex;

-- Banco de dados do Bookadex.
-- Criação do Banco de dados
-- Observação: Alterar no MER o nome dos IDS, Alteração de Polvoedas para Notas e variavel admin no usuário.
CREATE DATABASE Bookadex;
USE Bookadex;

-- Criação das tabelas
-- As tabelas foram criadas na mesma ordem que são apresentadas no diagrama MER (da esquerda pra direita)

CREATE TABLE Inventario(
	Id INT AUTO_INCREMENT,
	PontosGerais INT(10), -- IMPORTANTE: Pontuação Limitada a 10 caracteres (Alterar se necessário)
	Octokens INT(10),
	Notas INT(10), -- IMPORTANTE: Nome ainda não oficializado (Alterar se necessário)
	IdUsuario INT, -- FK
	CONSTRAINT pk_Inventario_Id PRIMARY KEY (Id)
);

CREATE TABLE Usuario(
	Id INT AUTO_INCREMENT,
	StatusConta BOOLEAN,
	TipoConta INT(1), -- 0: Usuário Padrão; 1: Admin; 2: Moderador
	NomeUsuario VARCHAR(100), -- Este é o nome real
	Apelido VARCHAR(55), -- Este é o nickname do usuário
	Email VARCHAR(100),
	Senha VARCHAR(55),
	Telefone VARCHAR(20),
	IdAcessoLivro INT, -- FK
	CONSTRAINT pk_Usuario_Id PRIMARY KEY (Id)
);

CREATE TABLE AcessoLivro(
	Id INT AUTO_INCREMENT,
	DataAcesso DATE,
	IdUsuario INT, -- FK
	IdLivro INT, -- FK
	CONSTRAINT pk_AcessoLivro_Id PRIMARY KEY (Id)
);

-- Observação: Segundo o MER, Ranking está intermediando PontuaçãoLivro e Livro, mas por hora, está relacionado diretamente.
CREATE TABLE PontuacaoLivro(
	Id INT AUTO_INCREMENT,
	Pontos INT(10),
	IdInventario INT,
	IdUsuario INT,
	IdLivro INT,
	CONSTRAINT pk_PontuacaoLivro_Id PRIMARY KEY (Id)
);

CREATE TABLE Livro(
	Id INT AUTO_INCREMENT,
	NomeLivro VARCHAR(255),
	Sinopse VARCHAR(355),
	Autor VARCHAR(100),
	CONSTRAINT pk_Livro_Id PRIMARY KEY (Id)
);

-- Alteração das tabelas para relacionamento

ALTER TABLE Inventario
ADD CONSTRAINT fk_Inventario_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(Id);

ALTER TABLE Usuario
ADD CONSTRAINT fk_Usuario_AcessoLivro FOREIGN KEY (IdAcessoLivro) REFERENCES AcessoLivro(Id);

ALTER TABLE AcessoLivro
ADD CONSTRAINT fk_AcessoLivro_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(Id),
ADD CONSTRAINT fk_AcessoLivro_Livro FOREIGN KEY (IdLivro) REFERENCES Livro(Id);

ALTER TABLE PontuacaoLivro
ADD CONSTRAINT fk_PontuacaoLivro_Inventario FOREIGN KEY (IdInventario) REFERENCES Inventario(Id),
ADD CONSTRAINT fk_PontuacaoLivro_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(Id),
ADD CONSTRAINT fk_PontuacaoLivro_Livro FOREIGN KEY (IdLivro) REFERENCES Livro(Id);

-- Triggers
DELIMITER $$ -- Criação do inventário do usuario
CREATE TRIGGER tgr_criacao_inventario
AFTER INSERT ON Usuario
FOR EACH ROW
BEGIN
	INSERT INTO Inventario (PontosGerais, Octokens, Notas, IdUsuario) VALUES (0, 10, 100, NEW.Id);
END;
$$

DELIMITER $$ -- Trigger para Adicionar pontuação ao Usuário, além de converter em Notas
CREATE TRIGGER tgr_PontuacaoLivro_Inventario
AFTER INSERT ON PontuacaoLivro
FOR EACH ROW
BEGIN
	UPDATE inventario -- Adição da Pontuação.
	SET PontosGerais = PontosGerais + NEW.Pontos WHERE IdUsuario = NEW.IdUsuario;
	UPDATE inventario -- Converção da Pontuação e adição a notas.
	SET Notas = Notas + NEW.Pontos/5 WHERE IdUsuario = NEW.IdUsuario;
END;
$$

-- Teste e Visualização (Não é necessário para o banco de dados funcionar)

INSERT INTO Usuario (StatusConta, TipoConta, NomeUsuario, Apelido, Email, Senha, Telefone)
VALUES (TRUE, 1, 'Gustavo Hirota Alves Velho', 'dethstruck', 'gustavohirotaalves@gmail.com', '12345678', '11981302015');
INSERT INTO Usuario (StatusConta, TipoConta, NomeUsuario, Apelido, Email, Senha, Telefone)
VALUES (FALSE, 0, 'Matheus Cavalcanti', 'mataplays', 'matheuscavalcanti@gmail.com', '12345678', '11283948193');
INSERT INTO Livro (NomeLivro, Sinopse, Autor)
VALUES ('Pequeno Princípe', 'Lorem Ipsum', 'Silas'); -- Corrigir no MER, Livro não tem AcessoLivro
INSERT INTO PontuacaoLivro (Pontos, IdInventario, IdUsuario, IdLivro)
VALUES (500, 1, 1, 1);

-- Esses atributos devem ser requisitados na tela inicial e estão exemplificados aqui.
SELECT CASE WHEN TipoConta = 1 THEN 'Admin' ELSE 'Padrão' END AS 'Tipo de Conta', IF(usuario.StatusConta, 'Ativo', 'Inativo') AS 'Status da Conta', usuario.NomeUsuario AS 'Nome Completo', usuario.Apelido AS 'Nickname', inventario.Octokens, inventario.Notas FROM usuario JOIN inventario ON usuario.Id = inventario.IdUsuario;
