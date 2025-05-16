import json
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from entity_dto import EntityDto

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html", context={}
    )

@app.get("/map-builder", response_class=HTMLResponse)
async def map_builder(request: Request):
    return templates.TemplateResponse(
        request=request, name="map_builder.html", context={}
    )

@app.get("/monster-builder", response_class=HTMLResponse)
async def monster_builder(request: Request):
    return templates.TemplateResponse(
        request=request, name="monster_builder.html", context={}
    )

@app.get("/modal/configuration", response_class=HTMLResponse)
async def modal_configuration(request: Request):
    return templates.TemplateResponse(
        request=request, name="modal/modal_configuration.html", context={}
    )

@app.get("/monsters", response_class=JSONResponse)
async def monsters(request: Request):
    data = open('static/data/monsters.json', 'r').read()
    data = json.loads(data)
    return data

@app.put("/monsters/{monster_id}", response_class=JSONResponse)
async def monsters(request: Request, monster_id: int):
    enemy_updated = await request.json()

    data = open('static/data/monsters.json', 'r').read()
    data = json.loads(data)
    for m in data['monsters']:
        if m['id'] == monster_id:
            for key, value in enemy_updated.items():
                if key in m:
                    m[key] = value

    with open('static/data/monsters.json', 'w') as f:
        json.dump(data, f)
    return data
