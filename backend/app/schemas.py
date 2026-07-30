from pydantic import BaseModel


from pydantic import BaseModel

class RiskPredictionRequest(BaseModel):
    event_type: str
    event_cause: str
    requires_road_closure: bool

    hour: int
    day_of_week: int
    month: int
    weekend: int

    zone: str
    corridor: str
    junction: str

    latitude: float
    longitude: float

    event_density: int

class RiskPredictionResponse(BaseModel):
    risk_level: str
    confidence: float