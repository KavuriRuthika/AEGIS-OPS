"""
DIGITAL CRISIS COMMAND CENTER - PYTHON REST API BACKEND SERVER
"""

from flask import Flask, jsonify, request, send_from_directory, Response
from flask_cors import CORS
import datetime
import random
import csv
import io
import os

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app)

# In-Memory Crisis Command Database
incidents_db = [
    {
        "id": "INC-9042",
        "title": "Himalayan Forest Wildfire",
        "type": "fire",
        "severity": "CRITICAL",
        "riskScore": 95,
        "placeName": "Garhwal Forest Range, Uttarakhand",
        "lat": 30.3165,
        "lng": 78.0322,
        "date": "Sep 9, 2025",
        "timestamp": "14:25",
        "summary": "Fast-moving brush fire pushed by 35mph winds along Himalayan ridge line.",
        "affected": 2400,
        "nearestHosp": "2.4 km",
        "eta": "12 mins",
        "reportedBy": "Citizen",
        "status": "ACTIVE"
    },
    {
        "id": "INC-8931",
        "title": "Brahmaputra Flood Inundation",
        "type": "flood",
        "severity": "HIGH",
        "riskScore": 88,
        "placeName": "Kaziranga Basin, Assam",
        "lat": 26.5775,
        "lng": 93.1711,
        "date": "Sep 9, 2025",
        "timestamp": "14:20",
        "summary": "Water level rising +3.4m above crest. Evacuate low lying areas immediately.",
        "affected": 18500,
        "nearestHosp": "1.8 km",
        "eta": "8 mins",
        "reportedBy": "Sensor B-04",
        "status": "ACTIVE"
    },
    {
        "id": "INC-8812",
        "title": "Expressway Pileup & Chemical Spill",
        "type": "accident",
        "severity": "HIGH",
        "riskScore": 76,
        "placeName": "NH-44 Express Corridor, Nagpur",
        "lat": 21.1458,
        "lng": 79.0882,
        "date": "Sep 9, 2025",
        "timestamp": "12:30",
        "summary": "Ammonia tanker rollover on NH-44 highway. Cordon perimeter locked.",
        "affected": 650,
        "nearestHosp": "5.2 km",
        "eta": "11 mins",
        "reportedBy": "Traffic Police",
        "status": "ACTIVE"
    }
]

hospitals_db = [
    {"id": "HOSP-01", "name": "AIIMS National Apex Trauma Center", "placeName": "Central Delhi", "lat": 28.5672, "lng": 77.2100, "icuOccupied": 88, "icuTotal": 100, "bedsAvailable": 12, "status": "CRITICAL_CAPACITY"},
    {"id": "HOSP-02", "name": "KEM Hospital & Research Center", "placeName": "Mumbai Central", "lat": 19.0024, "lng": 72.8422, "icuOccupied": 52, "icuTotal": 65, "bedsAvailable": 13, "status": "OPERATIONAL"},
    {"id": "HOSP-03", "name": "Narayana Health City Complex", "placeName": "Bengaluru East", "lat": 12.8130, "lng": 77.6970, "icuOccupied": 40, "icuTotal": 60, "bedsAvailable": 20, "status": "OPERATIONAL"}
]

shelters_db = [
    {"id": "SHL-01", "name": "National Cyclone Relief Hub", "placeName": "Puri Coastal Zone", "lat": 19.8135, "lng": 85.8312, "occupied": 2400, "capacity": 3500, "status": "OPERATIONAL"},
    {"id": "SHL-02", "name": "Brahmaputra Evacuation Base", "placeName": "Guwahati Base", "lat": 26.1445, "lng": 91.7362, "occupied": 1870, "capacity": 2500, "status": "HIGH_OCCUPANCY"}
]

fleet_db = [
    {"type": "NDRF Response Battalions", "ready": 16, "deployed": 24, "total": 40},
    {"type": "NDRF Hydro Rescue Boats", "ready": 12, "deployed": 18, "total": 30},
    {"type": "IAF Air Rescue Squadrons", "ready": 8, "deployed": 7, "total": 15},
    {"type": "Tactical EMS Ambulances", "ready": 35, "deployed": 45, "total": 80}
]

timeline_db = [
    {"id": "EVT-1", "time": "14:20", "title": "Brahmaputra River Crest Red Alert", "description": "Water level rising, rescue teams dispatched.", "type": "critical"},
    {"id": "EVT-2", "time": "13:45", "title": "Garhwal Fire Escalation", "description": "Command Center upgraded Himalayan ridge fire incident to DEFCON 2.", "type": "warning"},
    {"id": "EVT-3", "time": "12:30", "title": "Road accident on NH-44", "description": "Hazmat containment active. Ambulance on the way.", "type": "info"}
]

@app.route('/')
def serve_index():
    if os.path.exists(os.path.join('dist', 'index.html')):
        return send_from_directory('dist', 'index.html')
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join('dist', path)):
        return send_from_directory('dist', path)
    return send_from_directory('.', path)

@app.route('/api/incidents', methods=['GET', 'POST'])
def handle_incidents():
    if request.method == 'POST':
        data = request.json or {}
        now = datetime.datetime.now()
        new_inc = {
            "id": f"INC-{random.randint(1000, 9999)}",
            "title": data.get("title", "New Emergency Incident"),
            "type": data.get("type", "fire"),
            "severity": data.get("severity", "CRITICAL"),
            "riskScore": random.randint(70, 98),
            "placeName": data.get("placeName", "Visakhapatnam Industrial Zone"),
            "lat": 17.6868 + (random.random() - 0.5) * 0.08,
            "lng": 83.2185 + (random.random() - 0.5) * 0.08,
            "date": now.strftime("%b %d, %Y"),
            "timestamp": now.strftime("%H:%M"),
            "summary": "Logged from Digital Crisis Command Center.",
            "affected": random.randint(150, 1500),
            "nearestHosp": f"{round(random.uniform(1.2, 4.5), 1)} km",
            "eta": f"{random.randint(5, 15)} mins",
            "reportedBy": "Command Center",
            "status": "ACTIVE"
        }
        incidents_db.insert(0, new_inc)
        return jsonify({"success": True, "incident": new_inc}), 201
    return jsonify(incidents_db)

@app.route('/api/hospitals', methods=['GET'])
def get_hospitals():
    return jsonify(hospitals_db)

@app.route('/api/shelters', methods=['GET'])
def get_shelters():
    return jsonify(shelters_db)

@app.route('/api/fleet', methods=['GET'])
def get_fleet():
    return jsonify(fleet_db)

@app.route('/api/timeline', methods=['GET'])
def get_timeline():
    return jsonify(timeline_db)

@app.route('/api/export', methods=['GET'])
def export_csv():
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["DIGITAL CRISIS COMMAND CENTER REPORT"])
    writer.writerow(["Generated At", datetime.datetime.now().strftime("%d %b %Y • %H:%M:%S")])
    writer.writerow([])
    writer.writerow(["INCIDENTS"])
    writer.writerow(["ID", "Title", "Severity", "RiskScore", "PlaceName", "Latitude", "Longitude", "AffectedPeople"])
    for i in incidents_db:
        writer.writerow([i["id"], i["title"], i["severity"], i["riskScore"], i["placeName"], i["lat"], i["lng"], i["affected"]])
    
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-disposition": "attachment; filename=Digital_Crisis_Command_Report.csv"}
    )

if __name__ == '__main__':
    print("Starting Digital Crisis Command Center Python REST API on http://0.0.0.0:5000 ...")
    app.run(host='0.0.0.0', port=5000, debug=False)
