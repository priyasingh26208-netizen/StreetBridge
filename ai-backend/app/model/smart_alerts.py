from datetime import datetime


def create_alert(title, message, alert_type="general", deadline=None):

    alert = {
        "title": title,
        "message": message,
        "type": alert_type,
        "deadline": deadline,
        "priority": "normal"
    }

    if deadline:
        try:
            deadline_date = datetime.strptime(deadline, "%d/%m/%Y")
            today = datetime.now()

            days_left = (deadline_date - today).days

            if days_left < 0:
                alert["priority"] = "expired"

            elif days_left <= 3:
                alert["priority"] = "high"

            elif days_left <= 7:
                alert["priority"] = "medium"

        except ValueError:
            pass

    return alert