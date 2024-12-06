import csv
import io

from fastapi import APIRouter, HTTPException
from starlette.responses import StreamingResponse

from src.config import settings
from src.functions import createGraphic, createCSV
from src.http_client import FHClient, AVClient

fhub_client = FHClient(base_url='https://finnhub.io/api/v1/', api_key=settings.fh_api_key)
av_client = AVClient(base_url='https://www.alphavantage.co', api_key=settings.av_api_key)

router = APIRouter()

company_data_cache = {}


@router.get("/trade/daily/{company}", tags=["Trades"])
async def get_daily_trades(company: str):
    if company.upper() not in company_data_cache:
        data = await av_client.get_daily_trades(company.upper())

        if 'Error Message' in data:
            raise HTTPException(status_code=404, detail='Такой компании не существует')

        if 'Information' in data:
            print('Превышен лимит')
            raise HTTPException(status_code=503, detail='Превышен лимит запросов на AlphaVantage')

        company_data_cache[company.upper()] = data
    else:
        data = company_data_cache[company.upper()]

    filepath = createGraphic(data, company)
    return StreamingResponse(filepath, media_type='image/png')


@router.get("/trade/daily/{company}/csv", tags=["Trades"])
async def get_daily_trades_csv(company: str):
    if company.upper() not in company_data_cache:
        raise HTTPException(status_code=404, detail='Данные компании не найдены. Загрузите график сначала.')

    data = company_data_cache[company.upper()]
    output = createCSV(data)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={company}_data.csv"}
    )


@router.get('/search/{keyword}', tags=["Search"])
async def search_ticker(keyword: str, exchange: str = 'US'):
    data = await fhub_client.search_ticker_by_keyword(keyword, exchange)
    return data['result']
