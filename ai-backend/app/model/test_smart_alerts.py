from app.model.smart_alerts import create_alert


result = create_alert(
    title="Document Submission",
    message="Required documents submit karein.",
    alert_type="notice",
    deadline="03/10/2026"
)

print("\nSmart Alert Result:")
print(result)