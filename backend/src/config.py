from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    api_key: str = Field()

    model_config = SettingsConfigDict(env_file='.env', extra='forbid')


settings = Settings()
