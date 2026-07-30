import pandas as pd

DATA_PATH = "../data/events_features.csv"

df = pd.read_csv(DATA_PATH)
resource_df = pd.read_csv(
    "../data/resource_plan.csv"
)

def get_event_stats():

    return {
        "total_events": int(len(df)),
        "high_risk": int(
            (df["risk_level"] == "High").sum()
        ),
        "critical": int(
            (df["risk_level"] == "Critical").sum()
        ),
        "hotspots": 20
    }

def get_hotspots():

    hotspots = (
        df.groupby(
            ["lat_grid", "lon_grid"]
        )
        .size()
        .reset_index(name="count")
        .sort_values(
            "count",
            ascending=False
        )
        .head(20)
    )

    return hotspots.to_dict(
        orient="records"
    )

def get_event_causes():

    causes = (
        df["event_cause"]
        .value_counts()
        .reset_index()
    )

    causes.columns = [
        "cause",
        "count"
    ]

    return causes.to_dict(
        orient="records"
    )

def get_heatmap_data(month=0):

    data = df.copy()

    if month != 0:

        data = data[
            data["month"] == month
        ]

    heatmap = (
        data.groupby(
            ["lat_grid", "lon_grid"]
        )
        .size()
        .reset_index(name="count")
    )

    max_count = heatmap["count"].max()

    heatmap["intensity"] = (
        heatmap["count"] / max_count
    )

    return heatmap.to_dict(
        orient="records"
    )

def get_calendar_events():

    planned = df[
        df["event_type"] == "planned"
    ].copy()

    planned["date"] = pd.to_datetime(
        planned["start_datetime"],
        errors="coerce"
    )

    planned = planned.dropna(
        subset=["date"]
    )

    planned["date"] = (
        planned["date"]
        .dt.date
        .astype(str)
    )

    result = (
        planned.groupby(
            ["date", "event_cause", "risk_level"]
        )
        .size()
        .reset_index(name="count")
        .sort_values(
            ["count"],
            ascending=False
        )
    )

    return result.to_dict(
        orient="records"
    )

def recommend_resources(
    event_cause,
    risk_level
):

    recommendations = {

        "Critical": {
            "officers": 20,
            "barricades": 12,
            "diversions": 4,
        },

        "High": {
            "officers": 10,
            "barricades": 6,
            "diversions": 2,
        },

        "Medium": {
            "officers": 5,
            "barricades": 3,
            "diversions": 1,
        },

        "Low": {
            "officers": 2,
            "barricades": 1,
            "diversions": 0,
        },
    }

    result = recommendations.get(
        risk_level,
        recommendations["Low"]
    ).copy()

    if event_cause == "public_event":
        result["officers"] += 5

    if event_cause == "vip_movement":
        result["officers"] += 8

    if event_cause == "procession":
        result["officers"] += 4

    if event_cause == "construction":
        result["barricades"] += 3

    if event_cause == "water_logging":
        result["diversions"] += 2

    return result

def get_resource_plan(
    event_cause,
    risk_level,
    crowd_size,
    hour
):

    base_resources = {

        "construction": (10, 5, 2),
        "accident": (8, 4, 1),
        "vehicle_breakdown": (4, 2, 0),
        "public_event": (11, 5, 2),
        "procession": (13, 6, 2),
        "protest": (14, 7, 2),
        "vip_movement": (18, 9, 3),
        "water_logging": (4, 2, 0)
    }

    officers, barricades, diversions = (
        base_resources.get(
            event_cause,
            (5, 2, 1)
        )
    )

    if risk_level == "High":
        officers += 4
        barricades += 2

    elif risk_level == "Critical":
        officers += 8
        barricades += 4
        diversions += 2

    if crowd_size > 5000:
        officers += 5

    elif crowd_size > 2000:
        officers += 2

    if hour >= 17 and hour <= 21:
        officers += 2

    return {
        "officers": officers,
        "barricades": barricades,
        "diversions": diversions
    }

def get_event_causes(month=None):

    data = df.copy()

    if month:

        data = data[
            data["month"] == month
        ]

    causes = (
        data["event_cause"]
        .value_counts()
        .reset_index()
    )

    causes.columns = [
        "cause",
        "count"
    ]

    return causes.to_dict(
        orient="records"
    )

def get_monthly_events(month):

    filtered = df[
        df["month"] == month
    ]

    hotspots = (
        filtered.groupby(
            ["lat_grid", "lon_grid"]
        )
        .size()
        .reset_index(name="count")
        .sort_values(
            "count",
            ascending=False
        )
        .head(20)
    )

    return hotspots.to_dict(
        orient="records"
    )

def get_event_stats(month=0):

    data = df.copy()

    if month != 0:
        data = data[
            data["month"] == month
        ]

    return {
        "total_events": len(data),

        "high_risk": len(
            data[
                data["risk_level"] == "High"
            ]
        ),

        "critical": len(
            data[
                data["risk_level"] == "Critical"
            ]
        ),

        "hotspots": (
            data.groupby(
                ["lat_grid", "lon_grid"]
            )
            .size()
            .reset_index()
            .shape[0]
        )
    }