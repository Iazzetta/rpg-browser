# rpg-browser

Criando um RPG 2D em Browser apenas com HTML, CSS, Javascript e Python para o canal Programador Python.

### requerimentos

Estou usando o Poetry para gerenciar as dependencias desse projeto, mas você pode usar o pip, uv ou qualquer outro gerenciador.
Se quiser saber quais libs estou usando, veja o arquivo `pyproject.toml` e procure por `dependencies`.
Para instalar o poetry, siga a documentação: https://python-poetry.org/docs/

### instalar dependencias do projeto
```
poetry install
```

### ativar o venv

```
poetry shell
```

Se aparecer algum erro de "The command 'shell' does not exist.", é porque o [comando shell virou um plugin](https://github.com/python-poetry/poetry-plugin-shell).
Rode o comando no seu terminal: `poetry self add poetry-plugin-shell` para conseguir usa-lo.

### rodar o projeto
```
fastapi dev app.py
```