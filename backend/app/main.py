from app.data_service import (
    get_event_stats,
    get_hotspots,
    get_event_causes
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.resource_service import get_resources
from app.data_service import (
    get_monthly_events
)
from app.schemas import (
    RiskPredictionRequest
)
from app.data_service import (
    get_heatmap_data
)
from app.data_service import (
    get_resource_plan
)

from app.data_service import (
    get_calendar_events
)

from app.data_service import (
    recommend_resources
)

from app.predictor import (
    predict_risk
)

app = FastAPI(
    title="Event Traffic Intelligence API",
    version="1.0.0"
)


@app.get("/")
def home():

    return {
        "message": "API Running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }

@app.get("/recommend-resources")
def get_recommendation(
    event_cause: str,
    risk_level: str
):

    return recommend_resources(
        event_cause,
        risk_level
    )
@app.get("/event-stats")
def event_stats(
    month: int = 0
):

    return get_event_stats(month)


@app.get("/hotspots")
def hotspots():

    return get_hotspots()

@app.get("/calendar")
def calendar():

    return get_calendar_events()

@app.get("/event-causes")
def event_causes(
    month: int | None = None
):

    return get_event_causes(
        month
    )

@app.get("/heatmap")
def heatmap(month: int = 0):

    return get_heatmap_data(month)

@app.get("/resource-plan")
def resource_plan(
    event_cause: str,
    risk_level: str,
    crowd_size: int,
    hour: int
):

    return get_resource_plan(
        event_cause,
        risk_level,
        crowd_size,
        hour
    )

@app.get("/simulate-event")
def simulate_event(
    event_cause: str,
    crowd_size: int,
    road_closure: bool
):

    resource = get_resource_plan(
        event_cause
    )

    if crowd_size > 5000:
        risk = "Critical"
    elif crowd_size > 2000:
        risk = "High"
    elif crowd_size > 500:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "risk": risk,
        "officers": resource["officers"],
        "barricades": resource["barricades"],
        "diversions": resource["diversions"]
    }

@app.post("/predict-risk")
def predict(
    request: RiskPredictionRequest
):

    prediction = predict_risk(
        request.model_dump()
    )

    resources = get_resources(
        prediction["risk_level"]
    )

    return {
        **prediction,
        **resources
    }

@app.get("/monthly-events")
def monthly_events(
    month: int
):

    return get_monthly_events(
        month
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)