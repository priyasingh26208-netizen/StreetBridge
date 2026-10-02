from app.model.notice_decoder import decode_notice


notice = """
Nagar Nigam Notice No: NN/2026/145

All street vendors are requested to submit the required documents
before 15/10/2026.

For further information, contact the Municipal Authority.
"""


result = decode_notice(notice)

print("\nNotice Decoder Result:")
print(result)