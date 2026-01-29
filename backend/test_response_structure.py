import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

# Initialize Gemini client
api_key = os.getenv('GEMINI_API_KEY')
client = genai.Client(api_key=api_key)

print("Testing response structure...")

try:
    response = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents="Create a simple bar chart showing sales data",
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
        )
    )

    print("\nResponse type:", type(response))
    print("\nResponse attributes:", dir(response))
    print("\nResponse structure:")
    print(f"- Has candidates: {hasattr(response, 'candidates')}")
    if hasattr(response, 'candidates'):
        print(f"- Number of candidates: {len(response.candidates) if response.candidates else 0}")
        if response.candidates and len(response.candidates) > 0:
            candidate = response.candidates[0]
            print(f"- Candidate type: {type(candidate)}")
            print(f"- Candidate attributes: {[attr for attr in dir(candidate) if not attr.startswith('_')]}")
            if hasattr(candidate, 'content'):
                print(f"- Has content: True")
                content = candidate.content
                print(f"- Content type: {type(content)}")
                print(f"- Content attributes: {[attr for attr in dir(content) if not attr.startswith('_')]}")
                if hasattr(content, 'parts'):
                    print(f"- Has parts: True")
                    print(f"- Number of parts: {len(content.parts)}")
                    if content.parts:
                        part = content.parts[0]
                        print(f"- Part type: {type(part)}")
                        print(f"- Part attributes: {[attr for attr in dir(part) if not attr.startswith('_')]}")

except Exception as e:
    print(f"\nError: {e}")
    import traceback
    traceback.print_exc()
