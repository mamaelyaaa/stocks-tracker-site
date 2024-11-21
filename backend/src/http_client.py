from aiohttp import ClientSession

from src.config import settings


class HTTPClient:

    def __init__(self, base_url: str, api_key: str):
        self._session = ClientSession(base_url=base_url)
        self._params = {'apikey': api_key}


class AVClient(HTTPClient):

    async def get_daily_trades(self, symbol='IBM', **kwargs):
        self._params.update({
            "function": "TIME_SERIES_DAILY",
            "symbol": symbol,
        })
        self._params.update(**kwargs)

        async with self._session.get(url='/query', params=self._params) as resp:
            res = resp.json()
            return await res

    async def search_ticker_by_keyword(self, keywords: str = 'apple'):
        self._params.update(
            {
                "function": "SYMBOL_SEARCH",
                "keywords": keywords
            }
        )
        async with self._session.get(url='/query', params=self._params) as resp:
            return await resp.json()


av_client = AVClient(base_url='https://www.alphavantage.co', api_key=settings.api_key)
