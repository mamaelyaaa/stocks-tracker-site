from fastapi import APIRouter, HTTPException
from starlette.responses import StreamingResponse

from src.config import settings
from src.functions import preprocessing
from src.http_client import FHClient, AVClient

fhub_client = FHClient(base_url='https://finnhub.io/api/v1/', api_key=settings.fh_api_key)
av_client = AVClient(base_url='https://www.alphavantage.co', api_key=settings.av_api_key)

router = APIRouter()


@router.get('/search/{keyword}', tags=["Search"])
async def search_ticker(keyword: str, exchange: str = 'US'):
    return await fhub_client.search_ticker_by_keyword(keyword, exchange)


@router.get("/trade/daily/{company}", tags=["Trades"])
async def get_daily_trades(company: str):
    data = await av_client.get_daily_trades(company.upper())

    if 'Information' in data:
        return HTTPException(status_code=503, detail='Превышен лимит запросов на AlphaVantage')

    filepath = preprocessing(data, company)
    return StreamingResponse(filepath, media_type='image/png')
