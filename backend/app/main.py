import sentry_sdk
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware
from elasticapm.contrib.starlette import make_apm_client, ElasticAPM

from app.api.main import api_router
from app.core.config import settings


def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"


if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)
    
apm_config = {
    'SERVICE_NAME': settings.ELASTIC_APM_SERVICE_NAME,
    'SERVER_URL': settings.ELASTIC_APM_SERVER_URL,
    'SECRET_TOKEN': settings.ELASTIC_APM_SECRET_TOKEN,
    'ENVIRONMENT': settings.ELASTIC_APM_ENVIRONMENT,
    'LOG_LEVEL': settings.ELASTIC_APM_LOG_LEVEL,
    'LOG_FILE': settings.ELASTIC_APM_LOG_FILE,
}

apm = make_apm_client(apm_config)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)

app.add_middleware(ElasticAPM, client=apm)

# Set all CORS enabled origins
if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)
