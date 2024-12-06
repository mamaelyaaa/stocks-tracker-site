from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from src.router import router, av_client, fhub_client

app = FastAPI()


@app.get('/')
def root_message():
    return {'message': 'API is working!'}


@app.on_event("shutdown")
async def shutdown():
    await av_client.close_session()
    await fhub_client.close_session()


app.include_router(router)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)