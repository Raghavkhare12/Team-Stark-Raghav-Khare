import joblib
import pandas as pd

MODEL_PATH = "ml/saved_models/risk_model_v2.pkl"

TARGET_ENCODER_PATH = "ml/encoders/target_encoder_v2.pkl"

FEATURE_ENCODER_PATH = "ml/encoders/feature_encoders_v2.pkl"

model = joblib.load(MODEL_PATH)

target_encoder = joblib.load(
    TARGET_ENCODER_PATH
)

feature_encoders = joblib.load(
    FEATURE_ENCODER_PATH
)


def predict_risk(data):

    df = pd.DataFrame([data])

    for col in [
        "event_type",
        "event_cause",
        "zone",
        "corridor",
        "junction"
    ]:

        encoder = feature_encoders[col]

        value = str(
            df[col].iloc[0]
        )

        if value not in encoder.classes_:
            value = encoder.classes_[0]

        df[col] = encoder.transform(
            [value]
        )

    feature_order = [
        "event_type",
        "event_cause",
        "requires_road_closure",
        "hour",
        "day_of_week",
        "month",
        "weekend",
        "zone",
        "corridor",
        "junction",
        "latitude",
        "longitude",
        "event_density"
    ]

    df = df[feature_order]

    prediction = model.predict(df)

    probabilities = model.predict_proba(df)

    risk = target_encoder.inverse_transform(
        prediction
    )[0]

    confidence = float(
        probabilities.max()
    )

    crowd_size = data.get(
        "crowd_size",
        1000
    )

    if crowd_size > 7000:

        if risk == "Medium":
            risk = "High"

        elif risk == "High":
            risk = "Critical"

    elif crowd_size < 1000:

        if risk == "Critical":
            risk = "High"

        elif risk == "High":
            risk = "Medium"

    if confidence < 0.90:

        if risk == "Critical":
            risk = "High"

        elif risk == "High":
            risk = "Medium"

    return {
        "risk_level": risk,
        "confidence": round(
            confidence,
            4
        )
    }