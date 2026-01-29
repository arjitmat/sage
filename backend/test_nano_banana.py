import os
from dotenv import load_dotenv
from google import genai
from image_generator import ImageGenerator

load_dotenv()

# Initialize Gemini client
api_key = os.getenv('GEMINI_API_KEY')
print(f"Testing Nano Banana Pro (Gemini 3 Pro Image)")
print(f"API Key: {api_key[:20]}...")

# Create client and image generator
client = genai.Client(api_key=api_key)
image_gen = ImageGenerator(client)

# Test slide content
test_slide = {
    'title': 'AI Industry Growth',
    'bullets': [
        'Market size reached $200B in 2024',
        'Enterprise adoption grew 45% YoY',
        'Investment in AI infrastructure doubled',
        'Productivity gains averaged 30%'
    ]
}

document_context = """
The artificial intelligence industry experienced unprecedented growth in 2024.
Market analysis shows the total addressable market reached $200 billion, with
enterprise adoption growing 45% year-over-year. Companies invested heavily in
AI infrastructure, with spending doubling compared to the previous year.
Organizations implementing AI solutions reported average productivity gains of 30%.
"""

print("\nGenerating bar chart with Nano Banana Pro...")
print(f"Model: {image_gen.model}")
print(f"Slide: {test_slide['title']}")

try:
    image_data = image_gen.generate_slide_visual(
        slide_content=test_slide,
        visual_type='bar_chart',
        document_context=document_context
    )

    if image_data:
        print("\n✓ SUCCESS!")
        print(f"Image generated: {len(image_data)} characters")
        print(f"Format: {image_data[:50]}...")

        # Check if it's a valid base64 data URL
        if image_data.startswith('data:image/'):
            print("✓ Valid image data URL format")
            mime_type = image_data.split(';')[0].split(':')[1]
            print(f"MIME type: {mime_type}")
        else:
            print("✗ Invalid format")
    else:
        print("\n✗ FAILED: No image data returned")

except Exception as e:
    print(f"\n✗ EXCEPTION: {e}")
    import traceback
    traceback.print_exc()
