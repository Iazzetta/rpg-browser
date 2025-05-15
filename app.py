from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

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

@app.get("/modal/configuration", response_class=HTMLResponse)
async def modal_configuration(request: Request):
    return templates.TemplateResponse(
        request=request, name="modal/modal_configuration.html", context={}
    )