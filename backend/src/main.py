from fastapi import FastAPI

from src.http_client import av_client

app = FastAPI()


@app.get('/')
def root_message():
    return {'message': 'API is working!'}


@app.get('/ticker/search/{keyword}')
async def get_ticker(keyword: str):
    return await av_client.search_ticker_by_keyword(keyword)


@app.get("/trade/daily/{company}")
async def get_daily_trades(company: str):
    return await av_client.get_daily_trades(symbol=company)
