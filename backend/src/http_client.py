from typing import Optional

from aiohttp import ClientSession
from async_lru import alru_cache


class HTTPClient:

    def __init__(self, base_url: str, api_key: str):
        self._session = ClientSession(
            base_url=base_url,
            headers={
                'X-Finnhub-Token': api_key
            }
        )
        self._av_params = {'apikey': api_key}


class AVClient(HTTPClient):

    @alru_cache
    async def get_daily_trades(self, symbol: str):
        self._av_params.update({
            "function": "TIME_SERIES_DAILY",
            "symbol": symbol,
        })

        # На этом этапе происходит проверка есть ли в Редисе график

        async with self._session.get(url='/query', params=self._av_params) as resp:
            res = resp.json()
            return await res


class FHClient(HTTPClient):

    @alru_cache
    async def search_ticker_by_keyword(self, q: str, exchange: Optional[str] = "US"):
        async with self._session.get(url='search', params={'q': q, 'exchange': exchange}) as resp:
            return await resp.json()
