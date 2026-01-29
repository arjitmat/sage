import os
import requests
from dotenv import load_dotenv

load_dotenv()

# Test FLUX.1.1-pro with EXACT parameters from official docs
print("Testing FLUX.1.1-pro with official parameters...")
together_key = os.getenv('TOGETHER_API_KEY')
print(f"API Key: {together_key[:20]}...")

api_url = "https://api.together.xyz/v1/images/generations"
model = "black-forest-labs/FLUX.1.1-pro"

test_prompt = "Create a professional bar chart showing AI industry growth with clean modern design, business style, high quality"

# Exact parameters from official Together.ai documentation
payload = {
    "model": model,
    "prompt": test_prompt,
    "width": 1024,
    "height": 768,
    "steps": 28,
    "n": 1,
    "response_format": "url"
}

headers = {
    "Authorization": f"Bearer {together_key}",
    "Content-Type": "application/json"
}

print(f"\nCalling API: {api_url}")
print(f"Model: {model}")
print(f"Prompt: {test_prompt[:50]}...")
print(f"Parameters: width={payload['width']}, height={payload['height']}, steps={payload['steps']}")

try:
    response = requests.post(
        api_url,
        json=payload,
        headers=headers,
        timeout=120
    )

    print(f"\nResponse status: {response.status_code}")
    print(f"Response body: {response.text[:1000]}")

    if response.status_code == 200:
        result = response.json()
        print("\n✓ SUCCESS!")
        print(f"Result keys: {result.keys()}")
        if 'data' in result:
            print(f"Data length: {len(result['data'])}")
            if len(result['data']) > 0:
                image_url = result['data'][0].get('url', 'N/A')
                print(f"Image URL: {image_url}")

                # Test downloading the image
                print("\nTesting image download...")
                img_response = requests.get(image_url, timeout=30)
                if img_response.status_code == 200:
                    print(f"✓ Image downloaded successfully: {len(img_response.content)} bytes")
                else:
                    print(f"✗ Image download failed: {img_response.status_code}")
    else:
        print(f"\n✗ FAILED: HTTP {response.status_code}")
        print(f"Error: {response.text}")

except Exception as e:
    print(f"\n✗ EXCEPTION: {e}")
    import traceback
    traceback.print_exc()
