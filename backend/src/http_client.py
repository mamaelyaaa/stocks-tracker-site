from aiohttp import ClientSession


class HTTPClient:

    def __init__(self, base_url: str, api_key: str):
        self._session = ClientSession(base_url=base_url)
        self._params = {'apikey': api_key}


class AVClient(HTTPClient):

    async def get_trades_intraday(self):
        self._params.update({
            "function": "TIME_SERIES_INTRADAY",
            "symbol": 'IBM',
            "interval": '60min',
        })

        async with self._session.get(url='/query', params=self._params) as resp:
            return await resp.json()
