from app.model.grievance_generator import generate_grievance


result = generate_grievance(
    problem="Meri vendor registration application 2 mahine se pending hai.",
    vendor_name="Ramesh Kumar",
    location="Delhi",
    authority="Municipal Authority",
    date="30/09/2026"
)

print("\nGrievance Generator Result:")
print(result["subject"])
print()
print(result["draft"])