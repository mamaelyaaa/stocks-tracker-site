from fastapi import FastAPI

from src.config import settings
from src.http_client import AVClient

app = FastAPI()

av_client = AVClient(base_url='https://www.alphavantage.co', api_key=settings.api_key)


@app.get("/trades")
async def get_intraday_trades():
    return await av_client.get_trades_intraday()
