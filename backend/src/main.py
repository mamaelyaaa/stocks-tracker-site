from fastapi import FastAPI

from src.config import settings
from src.http_client import AVClient

app = FastAPI()

av_client = AVClient(base_url='https://www.alphavantage.co', api_key=settings.api_key)


@app.get("/trades/intraday")
async def get_intraday_trades():
    return await av_client.get_intraday_trades()


@app.get("/trades/daily")
async def get_daily_trades():
    return await av_client.get_daily_trades()
