

import uvicorn
from fastapi import FastAPI

from src import functions
from src.config import settings
from src.http_client import FHClient, AVClient

app = FastAPI()

fhub_client = FHClient(base_url='https://finnhub.io/api/v1/', api_key=settings.fh_api_key)
av_client = AVClient(base_url='https://www.alphavantage.co', api_key=settings.av_api_key)


@app.get('/')
def root_message():
    return {'message': 'API is working!'}


@app.get('/search/{keyword}')
async def search_ticker(keyword: str, exchange: str = 'US'):
    return await fhub_client.search_ticker_by_keyword(keyword, exchange)


@app.get("/trade/daily/{company}", tags=["Trades"])
async def get_daily_trades(company: str):
    await functions.preprocessing(company)
    return await av_client.get_daily_trades(symbol=company)
