from aiohttp import ClientSession


class HTTPClient:

    def __init__(self, base_url: str, api_key: str):
        self._session = ClientSession(base_url=base_url)
        self._params = {'apikey': api_key}


class AVClient(HTTPClient):

    async def get_intraday_trades(self, symbol='IBM', interval='60min', **kwargs):
        try:
            self._params.update({
                "function": "TIME_SERIES_INTRADAY",
                "symbol": symbol,
                "interval": interval,
            })
            self._params.update(**kwargs)

            async with self._session.get(url='/query', params=self._params) as resp:
                return await resp.json()
        finally:
            await self._session.close()

    async def get_daily_trades(self, symbol='IBM', **kwargs):
        try:
            self._params.update({
                "function": "TIME_SERIES_DAILY",
                "symbol": symbol,
            })
            self._params.update(**kwargs)

            async with self._session.get(url='/query', params=self._params) as resp:
                return await resp.json()
        finally:
            await self._session.close()