import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
client = genai.Client(api_key=api_key)

print("Testing inline_data format...")

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents="Create a simple bar chart",
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE"],
    )
)

if response.candidates and len(response.candidates) > 0:
    candidate = response.candidates[0]
    if candidate.content and candidate.content.parts:
        part = candidate.content.parts[0]
        if hasattr(part, 'inline_data') and part.inline_data:
            print(f"\nType of inline_data.data: {type(part.inline_data.data)}")
            print(f"Length: {len(part.inline_data.data) if hasattr(part.inline_data.data, '__len__') else 'N/A'}")
            print(f"First 100 chars: {str(part.inline_data.data)[:100]}")
            print(f"MIME type: {part.inline_data.mime_type}")

            # Check if it's bytes or string
            if isinstance(part.inline_data.data, bytes):
                print("\n✓ It's bytes - needs base64 encoding")
                import base64
                b64 = base64.b64encode(part.inline_data.data).decode('utf-8')
                print(f"After encoding first 100: {b64[:100]}")
            elif isinstance(part.inline_data.data, str):
                print("\n✓ It's already a string")
                print(f"String first 100: {part.inline_data.data[:100]}")
