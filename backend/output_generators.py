"""
Sage - Output Generators using Gemini API
Generates 7 different output formats from document text
"""

import json
import time
import os
from typing import Dict, Any, List
from google import genai
from google.genai import types, errors
from image_generator import ImageGenerator


class OutputGenerators:
    """Generate different output formats from document content"""

    def __init__(self, client: genai.Client, model_name: str = "gemini-2.5-flash"):
        self.client = client
        self.model_name = model_name
        # Initialize image generator with Nano Banana Pro (Gemini 3 Pro Image)
        # Same as NotebookLM - superior text rendering for slides
        self.image_generator = ImageGenerator(client)

    def _retry_with_backoff(self, func, max_retries: int = 3):
        """Retry function with exponential backoff for rate limits"""
        for attempt in range(max_retries):
            try:
                return func()
            except errors.ClientError as e:
                if e.status_code == 429:  # Rate limit error
                    if attempt < max_retries - 1:
                        wait_time = (2 ** attempt) * 2  # 2s, 4s, 8s
                        print(f"Rate limit hit, waiting {wait_time}s before retry...")
                        time.sleep(wait_time)
                        continue
                raise
            except Exception as e:
                raise
        raise Exception("Max retries exceeded")

    def _generate_with_json(self, prompt: str, schema: Dict) -> Dict:
        """Generate content with JSON response format"""
        def generate():
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=schema
                )
            )
            return json.loads(response.text)

        try:
            return self._retry_with_backoff(generate)
        except Exception as e:
            raise Exception(f"Generation failed: {str(e)}")

    def generate_summary(self, document_text: str) -> Dict:
        """Generate executive summary with key findings"""
        prompt = f"""
        Analyze this document and create a comprehensive executive summary.

        Document:
        {document_text}

        Provide:
        1. key_findings: Array of 3-5 key findings (strings)
        2. main_arguments: The main arguments presented (string)
        3. conclusions: The conclusions reached (string)

        Return as JSON with keys: key_findings, main_arguments, conclusions
        """

        schema = {
            "type": "object",
            "properties": {
                "key_findings": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "main_arguments": {"type": "string"},
                "conclusions": {"type": "string"}
            },
            "required": ["key_findings", "main_arguments", "conclusions"]
        }

        return self._generate_with_json(prompt, schema)

    def generate_faqs(self, document_text: str) -> List[Dict]:
        """Generate FAQ pairs from document"""
        prompt = f"""
        Based on this document, generate 5-7 frequently asked questions with detailed answers.

        Document:
        {document_text}

        For each FAQ, provide:
        - id: Sequential ID (string: "1", "2", etc.)
        - question: The question (string)
        - answer: Detailed answer based on the document (string)

        Return as JSON array of objects with keys: id, question, answer
        """

        schema = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "question": {"type": "string"},
                    "answer": {"type": "string"}
                },
                "required": ["id", "question", "answer"]
            }
        }

        result = self._generate_with_json(prompt, schema)
        return result if isinstance(result, list) else []

    def generate_quiz(self, document_text: str) -> List[Dict]:
        """Generate quiz questions from document"""
        prompt = f"""
        Create 5-7 multiple choice questions to test comprehension of this document.

        Document:
        {document_text}

        For each question, provide:
        - id: Sequential ID (number)
        - text: The question text (string)
        - options: Array of 4 answer choices (array of strings)
        - correctIndex: Index of correct answer 0-3 (number)
        - explanation: Why this is correct based on the document (string)

        Return as JSON array of objects.
        """

        schema = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "number"},
                    "text": {"type": "string"},
                    "options": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "correctIndex": {"type": "number"},
                    "explanation": {"type": "string"}
                },
                "required": ["id", "text", "options", "correctIndex", "explanation"]
            }
        }

        result = self._generate_with_json(prompt, schema)
        return result if isinstance(result, list) else []

    def generate_debate(self, document_text: str) -> Dict:
        """Generate multi-perspective debate analysis"""
        prompt = f"""
        Analyze this document from multiple perspectives.

        Document:
        {document_text}

        Provide:
        1. topic: The main topic/question being debated (string)
        2. pros: Array of 2-4 supporting arguments, each with:
           - point: The argument (string)
           - explanation: Supporting evidence from document (string)
        3. cons: Array of 2-4 challenging arguments, each with:
           - point: The counterargument (string)
           - explanation: Supporting evidence from document (string)
        4. balanced_perspective: A balanced conclusion considering both sides (string)

        Return as JSON.
        """

        schema = {
            "type": "object",
            "properties": {
                "topic": {"type": "string"},
                "pros": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "point": {"type": "string"},
                            "explanation": {"type": "string"}
                        }
                    }
                },
                "cons": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "point": {"type": "string"},
                            "explanation": {"type": "string"}
                        }
                    }
                },
                "balanced_perspective": {"type": "string"}
            },
            "required": ["topic", "pros", "cons", "balanced_perspective"]
        }

        return self._generate_with_json(prompt, schema)

    def generate_mindmap_data(self, document_text: str) -> List[Dict]:
        """Generate mind map structure"""
        prompt = f"""
        Create a hierarchical mind map structure from this document.

        Document:
        {document_text}

        Generate nodes with:
        - id: Unique identifier (string)
        - label: Node text (string)
        - level: 0 = center topic, 1 = main branches, 2 = sub-topics (number: 0, 1, or 2)

        Include:
        - 1 center node (level 0) - the main topic
        - 4-6 main branch nodes (level 1) - key themes
        - 8-12 sub-topic nodes (level 2) - supporting details

        Return as JSON array of node objects.
        """

        schema = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "label": {"type": "string"},
                    "level": {"type": "number"}
                },
                "required": ["id", "label", "level"]
            }
        }

        result = self._generate_with_json(prompt, schema)
        return result if isinstance(result, list) else []

    def generate_slides_outline(self, document_text: str) -> List[Dict]:
        """Generate presentation slides outline with visual data"""
        prompt = f"""
        Create a professional presentation with 6-8 slides that tells the story of this document through VISUALS.

        Document:
        {document_text[:4000]}

        CORE PRINCIPLE: The infographic/visual should EXPLAIN the concept. Bullet points should only supplement what the visual cannot convey. Think like NotebookLM - let visuals tell the story.

        For each slide provide:
        - id: Sequential number starting from 1
        - title: Slide title that captures the key insight (under 50 characters, no special characters)
        - bullets: Minimal text - ONLY essential points the visual cannot show (0-3 bullets, each under 80 characters)
        - type: "title" for first slide only, "content" for all others
        - visual_type: Choose based on what BEST EXPLAINS the concept: "none", "bar_chart", "pie_chart", "stats_grid", "icon_grid"

        VISUAL STORYTELLING RULES:
        1. First slide: type="title", visual_type="none", bullets=[] (title slide only)
        2. Slides should flow in a narrative arc - beginning, middle, end
        3. Distribute content evenly across the document (not just first sections)
        4. Choose visuals that EXPLAIN, not just decorate:
           - bar_chart: Show comparisons, growth, differences between concepts
           - pie_chart: Show proportions, breakdowns, composition
           - stats_grid: Highlight key metrics, numbers, quantifiable insights
           - icon_grid: Illustrate processes, frameworks, key concepts visually
        5. The visual is PRIMARY - it should convey the main message
        6. Bullets are SECONDARY - only add what visual cannot show
        7. Some slides may have NO bullets if the visual tells the complete story
        8. Ensure variety: 2-3 data visuals (charts/stats), 1-2 conceptual visuals (icons), rest as needed

        Example narrative flow:
        Slide 1: Title (visual_type="none")
        Slide 2: Why it matters / Problem (visual_type="stats_grid" - show impact numbers)
        Slide 3: Key framework / Approach (visual_type="icon_grid" - visual process)
        Slide 4: Comparison / Analysis (visual_type="bar_chart" - compare options)
        Slide 5: Breakdown / Components (visual_type="pie_chart" - show distribution)
        Slides 6-7: Key insights / Applications (choose appropriate visual type)
        Slide 8: Conclusion / Takeaway (visual_type based on content)

        Return as JSON array. Prioritize visual clarity over text.
        """

        schema = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "number"},
                    "title": {"type": "string"},
                    "bullets": {
                        "type": "array",
                        "items": {"type": "string"}
                    },
                    "type": {"type": "string"},
                    "visual_type": {"type": "string"}
                },
                "required": ["id", "title", "bullets", "type", "visual_type"]
            }
        }

        result = self._generate_with_json(prompt, schema)

        # Post-process to add AI-generated images for slides with visuals
        if isinstance(result, list) and self.image_generator:
            for slide in result:
                visual_type = slide.get('visual_type', 'none')

                # Generate custom image for slides with visual types
                if visual_type != 'none' and slide.get('type') != 'title':
                    try:
                        slide_content = {
                            'title': slide.get('title', ''),
                            'bullets': slide.get('bullets', [])
                        }
                        # Pass document context for contextual image generation
                        image_data = self.image_generator.generate_slide_visual(
                            slide_content,
                            visual_type,
                            document_context=document_text[:2000]  # Pass document summary
                        )
                        if image_data:
                            slide['ai_image'] = image_data
                            print(f"✓ Generated Nano Banana Pro image for slide: {slide.get('title', '')}")
                        else:
                            # Fallback to programmatic visual data
                            slide['visual_data'] = self._generate_visual_data_for_slide(slide)
                    except Exception as e:
                        print(f"Image generation failed for slide, using fallback: {str(e)}")
                        slide['visual_data'] = self._generate_visual_data_for_slide(slide)
                else:
                    # Title slides and 'none' type use no visuals
                    slide['visual_data'] = None

        return result if isinstance(result, list) else []

    def _generate_visual_data_for_slide(self, slide: Dict) -> Dict:
        """Generate appropriate visual data structure based on slide visual_type"""
        visual_type = slide.get('visual_type', 'none')
        bullets = slide.get('bullets', [])

        if visual_type == 'none':
            return None

        elif visual_type == 'bar_chart':
            # Create bar chart data from bullets
            data = []
            for i, bullet in enumerate(bullets[:4]):
                # Extract label (use first 20 chars of bullet)
                label = bullet[:20].rstrip('.,: ')
                # Generate reasonable values
                value = 50 + (i * 15) + (len(bullet) % 20)
                data.append({"label": label, "value": value})
            return {"data": data}

        elif visual_type == 'pie_chart':
            # Create pie chart data from bullets
            data = []
            total = 100
            for i, bullet in enumerate(bullets[:4]):
                name = bullet[:20].rstrip('.,: ')
                # Distribute percentages
                if i == len(bullets[:4]) - 1:
                    value = total  # Remaining percentage
                else:
                    value = total // (len(bullets[:4]) - i)
                    total -= value
                data.append({"name": name, "value": value})
            return {"data": data}

        elif visual_type == 'stats_grid':
            # Create stats from bullets
            stats = []
            for i, bullet in enumerate(bullets[:4]):
                label = bullet[:30].rstrip('.,: ')
                # Generate stat values
                values = [f"{(i+1)*25}%", f"{(i+1)*100}", f"{(i+1)*10}K", f"{i+1}x"]
                value = values[i % len(values)]
                stats.append({"label": label, "value": value})
            return {"stats": stats}

        elif visual_type == 'icon_grid':
            # Use bullets as icon descriptions
            return {"icons": bullets[:6]}

        return None

    def generate_visual_data(self, document_text: str) -> Dict:
        """Generate one-page visual summary with AI-generated infographic"""
        # First generate structured data for fallback
        data_prompt = f"""
        Create data for a comprehensive visual infographic from this document.

        Document:
        {document_text[:3000]}

        Provide:
        1. header: Main title (short, under 10 words, no special characters)
        2. stats: Array of exactly 4 key statistics/metrics, each with:
           - label: What it represents (short string, under 20 characters)
           - value: The statistic (short string or number, under 15 characters)
        3. content_blocks: Array of exactly 3 content sections, each with:
           - title: Section title (short, under 30 characters)
           - content: Brief description (under 100 characters)
        4. distribution: Array of exactly 4 categories for pie chart, each with:
           - category: Category name (short, under 20 characters)
           - percentage: Percentage value as number (0-100)
        5. timeline: Array of exactly 4 time points for area chart, each with:
           - period: Time period label (short, under 15 characters)
           - value: Numeric value (number)
        6. highlights: Array of exactly 3 key highlights (short strings, under 50 characters each)

        IMPORTANT: Keep all text simple and short. Avoid quotes, apostrophes, and special characters.
        Make sure percentages in distribution add up to 100.
        Timeline values should show progression or trend.

        Return as valid JSON only.
        """

        schema = {
            "type": "object",
            "properties": {
                "header": {"type": "string"},
                "stats": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "label": {"type": "string"},
                            "value": {"type": "string"}
                        },
                        "required": ["label", "value"]
                    }
                },
                "content_blocks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "title": {"type": "string"},
                            "content": {"type": "string"}
                        },
                        "required": ["title", "content"]
                    }
                },
                "distribution": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "category": {"type": "string"},
                            "percentage": {"type": "number"}
                        },
                        "required": ["category", "percentage"]
                    }
                },
                "timeline": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "period": {"type": "string"},
                            "value": {"type": "number"}
                        },
                        "required": ["period", "value"]
                    }
                },
                "highlights": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["header", "stats", "content_blocks", "distribution", "timeline", "highlights"]
        }

        result = self._generate_with_json(data_prompt, schema)

        # Generate comprehensive AI infographic with Nano Banana Pro
        if self.image_generator:
            try:
                infographic_prompt = f"""Create a COMPREHENSIVE ONE-PAGE INFOGRAPHIC that tells the complete story of this document.

DOCUMENT TO VISUALIZE:
{document_text[:2000]}

CORE REQUIREMENT: This is a COMPLETE visual summary - it must convey the essence of the entire document through visual information design.

INFOGRAPHIC ELEMENTS TO INCLUDE:
1. HEADER: Bold title summarizing the document ({result.get('header', 'Document Summary')})
2. KEY STATISTICS: 3-4 large KPI cards with numbers and labels
3. MAIN CONTENT SECTIONS: 2-3 visual sections with icons, short text, and diagrams
4. DATA VISUALIZATION: Include a chart (bar, pie, or timeline) showing key trends or distribution
5. HIGHLIGHTS/TAKEAWAYS: 2-3 key points in callout boxes

DESIGN REQUIREMENTS:
- Professional infographic layout suitable for a business presentation
- Use a cohesive color scheme (blues, greens, or earth tones)
- Clear visual hierarchy - most important info should be largest
- Include relevant icons and visual elements
- All text must be LARGE and LEGIBLE
- Balance text and visuals - let visuals tell the story
- Modern, clean, minimalist design
- High quality, print-ready appearance

STYLE: Professional business infographic, modern data visualization, clean typography, information design, educational poster style, high quality, 4K"""

                print(f"Generating comprehensive infographic for: {result.get('header', 'Document')[:50]}...")

                image_data = self.image_generator.generate_slide_visual(
                    slide_content={
                        'title': result.get('header', 'Document Summary'),
                        'bullets': result.get('highlights', [])[:3]
                    },
                    visual_type='comprehensive_infographic',
                    document_context=document_text[:2000]
                )

                if image_data:
                    result['ai_infographic'] = image_data
                    print(f"✓ Generated Nano Banana Pro comprehensive infographic")
                else:
                    print("⚠ Infographic generation returned no data, using fallback charts")

            except Exception as e:
                print(f"Infographic generation failed, using fallback: {str(e)}")

        return result
