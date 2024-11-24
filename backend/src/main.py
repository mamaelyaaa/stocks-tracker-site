from fastapi import FastAPI

from src.router import router

app = FastAPI()


@app.get('/')
def root_message():
    return {'message': 'API is working!'}


app.include_router(router)
