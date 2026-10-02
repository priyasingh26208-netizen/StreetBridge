def generate_grievance(
    problem,
    vendor_name="",
    location="",
    authority="",
    date=""
):
    subject = "Request for Resolution of Vendor Grievance"

    vendor_details = {
        "vendor_name": vendor_name if vendor_name else "[Vendor Name]",
        "location": location if location else "[Location]",
        "date": date if date else "[Date]"
    }

    selected_authority = authority if authority else "Concerned Authority"

    draft = f"""
To,
{selected_authority}

Subject: {subject}

Respected Sir/Madam,

I am a street vendor operating at {vendor_details["location"]}.

I am facing the following issue:

{problem}

I request you to kindly look into this matter and take the necessary action.

Vendor Name: {vendor_details["vendor_name"]}
Location: {vendor_details["location"]}
Date: {vendor_details["date"]}

Thank you.

Yours faithfully,
{vendor_details["vendor_name"]}
""".strip()

    return {
        "success": True,
        "subject": subject,
        "authority": selected_authority,
        "problem": problem,
        "vendor_details": vendor_details,
        "draft": draft
    }